import { ApplicationError, IDataObject, jsonParse } from 'n8n-workflow';
import { Command, CommandTypes, CreateTaskRequest, Section, SyncRequest } from '../types/taskTypes';
import { Context, OperationHandler, TodoistResponse } from '../types/index';
import { FormatDueDatetime, todoistApiRequest, todoistSyncRequest } from '../api/todoistApi';
import { v4 as uuid } from 'uuid';

export class CreateHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		//https://developer.todoist.com/api/v1/tasks
		const content = ctx.getNodeParameter('content', itemIndex) as string;
		const projectId = ctx.getNodeParameter('project', itemIndex, undefined, {
			extractValue: true,
		}) as string;
		const labels = ctx.getNodeParameter('labels', itemIndex) as string[];
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		const body: CreateTaskRequest = {
			content,
			project_id: projectId,
			priority: options.priority! ? parseInt(options.priority as string, 10) : 1,
		};

		if (options.description) {
			body.description = options.description as string;
		}

		if (options.dueDateTime) {
			body.due_datetime = FormatDueDatetime(options.dueDateTime as string);
		}

		if (options.dueString) {
			body.due_string = options.dueString as string;
		}

		if (labels !== undefined && labels.length !== 0) {
			body.labels = labels;
		}

		if (options.section) {
			body.section_id = options.section as string;
		}

		if (options.dueLang) {
			body.due_lang = options.dueLang as string;
		}

		if (options.parentId) {
			body.parent_id = options.parentId as string;
		}

		const data = await todoistApiRequest.call(ctx, 'POST', '/tasks', body as IDataObject);

		return {
			data,
		};
	}
}

export class CloseHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const id = ctx.getNodeParameter('taskId', itemIndex) as string;

		await todoistApiRequest.call(ctx, 'POST', `/tasks/${id}/close`);

		return {
			success: true,
		};
	}
}

export class DeleteHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const id = ctx.getNodeParameter('taskId', itemIndex) as string;

		await todoistApiRequest.call(ctx, 'DELETE', `/tasks/${id}`);

		return {
			success: true,
		};
	}
}

export class GetHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const id = ctx.getNodeParameter('taskId', itemIndex) as string;
		const options = ctx.getNodeParameter('options', itemIndex, {}) as IDataObject;
		const includeSubtasks = options.includeSubtasks as boolean;

		// Get the main task
		const responseData = await todoistApiRequest.call(ctx, 'GET', `/tasks/${id}`);
		
		// If includeSubtasks is enabled, fetch subtasks
		if (includeSubtasks) {
			// Get all tasks in the same project to find subtasks
			const projectId = responseData.project_id;
			const allTasksResponse = await todoistApiRequest.call(ctx, 'GET', '/tasks', {}, { project_id: projectId });
			
			// API v1 returns results in a 'results' array
			const allTasks = allTasksResponse.results || allTasksResponse;
			
			// Find subtasks (tasks with parent_id matching our task id)
			const subtasks = allTasks.filter((task: any) => task.parent_id === id);
			
			// Add subtasks to the response
			responseData.subtasks = subtasks;
		}

		return {
			data: responseData,
		};
	}
}

export class GetAllHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		//https://developer.todoist.com/api/v1/tasks
		const returnAll = ctx.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = ctx.getNodeParameter('filters', itemIndex) as IDataObject;
		const qs: IDataObject = {};
		let endpoint = '/tasks';
		let shouldUseFilterEndpoint = false;

		// Check if we need to use the filter endpoint
		if (filters.filter || filters.lang) {
			endpoint = '/tasks/filter';
			shouldUseFilterEndpoint = true;
		}

		// Basic filters supported by both endpoints
		if (filters.projectId) {
			qs.project_id = filters.projectId as string;
		}
		if (filters.sectionId) {
			qs.section_id = filters.sectionId as string;
		}
		if (filters.labelId) {
			qs.label = filters.labelId as string;
		}
		if (filters.ids) {
			qs.ids = filters.ids as string;
		}

		// Filter-specific parameters (only for filter endpoint)
		if (shouldUseFilterEndpoint) {
			if (filters.filter) {
				qs.filter = filters.filter as string;
			}
			if (filters.lang) {
				qs.lang = filters.lang as string;
			}
		}

		let allResults: any[] = [];
		let nextCursor: string | null = null;
		
		do {
			if (nextCursor) {
				qs.cursor = nextCursor;
			}

			if (!returnAll) {
				const limit = ctx.getNodeParameter('limit', itemIndex) as number;
				qs.limit = Math.min(limit - allResults.length, 100); // API max is 100
			}

			const response = await todoistApiRequest.call(ctx, 'GET', endpoint, {}, qs);
			const results = response.results || response;
			
			if (Array.isArray(results)) {
				allResults = allResults.concat(results);
			} else {
				allResults.push(results);
			}

			nextCursor = response.next_cursor;
			
			// Stop if we have enough results for non-returnAll case
			if (!returnAll) {
				const limit = ctx.getNodeParameter('limit', itemIndex) as number;
				if (allResults.length >= limit) {
					allResults = allResults.slice(0, limit);
					break;
				}
			}
		} while (nextCursor && returnAll);

		return {
			data: allResults as any,
		};
	}
}

async function getSectionIds(ctx: Context, projectId: string): Promise<Map<string, string>> {
	const sections: Section[] = await todoistApiRequest.call(
		ctx,
		'GET',
		'/sections',
		{},
		{ project_id: projectId },
	);
	return new Map(sections.map((s) => [s.name, s.id]));
}

export class ReopenHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		//https://developer.todoist.com/rest/v2/#get-an-active-task
		const id = ctx.getNodeParameter('taskId', itemIndex) as string;

		await todoistApiRequest.call(ctx, 'POST', `/tasks/${id}/reopen`);

		return {
			success: true,
		};
	}
}

export class UpdateHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		//https://developer.todoist.com/api/v1/tasks/{task_id}
		const id = ctx.getNodeParameter('taskId', itemIndex) as string;
		const updateFields = ctx.getNodeParameter('updateFields', itemIndex) as IDataObject;

		const body: CreateTaskRequest = {};

		if (updateFields.content) {
			body.content = updateFields.content as string;
		}

		if (updateFields.priority) {
			body.priority = parseInt(updateFields.priority as string, 10);
		}

		if (updateFields.description) {
			body.description = updateFields.description as string;
		}

		if (updateFields.dueDateTime) {
			body.due_datetime = FormatDueDatetime(updateFields.dueDateTime as string);
		}

		if (updateFields.dueString) {
			body.due_string = updateFields.dueString as string;
		}

		if (
			updateFields.labels !== undefined &&
			Array.isArray(updateFields.labels) &&
			updateFields.labels.length !== 0
		) {
			body.labels = updateFields.labels as string[];
		}

		if (updateFields.dueLang) {
			body.due_lang = updateFields.dueLang as string;
		}

		await todoistApiRequest.call(ctx, 'POST', `/tasks/${id}`, body as IDataObject);

		return { success: true };
	}
}

export class MoveHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		//https://api.todoist.com/sync/v9/sync
		const taskId = ctx.getNodeParameter('taskId', itemIndex) as string;
		const projectId = ctx.getNodeParameter('project', itemIndex, undefined, {
			extractValue: true,
		}) as string;
		const nodeVersion = ctx.getNode().typeVersion;

		const body: SyncRequest = {
			commands: [
				{
					type: CommandTypes.ITEM_MOVE,
					uuid: uuid(),
					args: {
						id: taskId,
						// Set section_id only if node version is below 2.1
						...(nodeVersion < 2.1
							? { section_id: ctx.getNodeParameter('section', itemIndex) as string }
							: {}),
					},
				},
			],
		};

		if (nodeVersion >= 2.1) {
			const options = ctx.getNodeParameter('options', itemIndex, {}) as IDataObject;
			// Only one of parent_id, section_id, or project_id must be set to move the task
			if (options.parent) {
				body.commands[0].args.parent_id = options.parent as string;
			} else if (options.section) {
				body.commands[0].args.section_id = options.section as string;
			} else {
				body.commands[0].args.project_id = projectId;
			}
		}

		await todoistSyncRequest.call(ctx, body);
		return { success: true };
	}
}

export class SyncHandler implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const commandsJson = ctx.getNodeParameter('commands', itemIndex) as string;
		const projectId = ctx.getNodeParameter('project', itemIndex, undefined, {
			extractValue: true,
		}) as string;
		const sections = await getSectionIds(ctx, projectId);
		const commands: Command[] = jsonParse(commandsJson);
		const tempIdMapping = new Map<string, string>();

		for (let i = 0; i < commands.length; i++) {
			const command = commands[i];
			this.enrichUUID(command);
			this.enrichSection(command, sections);
			this.enrichProjectId(command, projectId);
			this.enrichTempId(command, tempIdMapping, projectId);
		}

		const body: SyncRequest = {
			commands,
			temp_id_mapping: this.convertToObject(tempIdMapping),
		};

		await todoistSyncRequest.call(ctx, body);

		return { success: true };
	}

	private convertToObject(map: Map<string, string>) {
		return Array.from(map.entries()).reduce((o, [key, value]) => {
			o[key] = value;
			return o;
		}, {} as IDataObject);
	}

	private enrichUUID(command: Command) {
		command.uuid = uuid();
	}

	private enrichSection(command: Command, sections: Map<string, string>) {
		if (command.args?.section !== undefined) {
			const sectionId = sections.get(command.args.section);
			if (sectionId) {
				command.args.section_id = sectionId;
			} else {
				throw new ApplicationError(
					'Section ' + command.args.section + " doesn't exist on Todoist",
					{ level: 'warning' },
				);
			}
		}
	}

	private enrichProjectId(command: Command, projectId: string) {
		if (this.requiresProjectId(command)) {
			command.args.project_id = projectId;
		}
	}

	private requiresProjectId(command: Command) {
		return command.type === CommandTypes.ITEM_ADD;
	}

	private enrichTempId(command: Command, tempIdMapping: Map<string, string>, projectId: string) {
		if (this.requiresTempId(command)) {
			command.temp_id = uuid();
			tempIdMapping.set(command.temp_id!, projectId);
		}
	}

	private requiresTempId(command: Command) {
		return command.type === CommandTypes.ITEM_ADD;
	}
}

export class GetOrCreateTask implements OperationHandler {
	constructor(private createHandler: CreateHandler) {}

	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const content = ctx.getNodeParameter('content', itemIndex) as string;
		const projectId = ctx.getNodeParameter('project', itemIndex, undefined, {
			extractValue: true,
		}) as string;
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		// First, get all tasks in the project to check if one with the same content exists
		const qs: IDataObject = { project_id: projectId };
		if (options.section) {
			qs.section_id = options.section;
		}
		const allTasks = await todoistApiRequest.call(ctx, 'GET', '/tasks', {}, qs);
		
		// Find a task with matching content, project, section, and parent
		const existingTask = allTasks.find((task: any) => 
			task.content === content && 
			task.project_id === projectId &&
			(!options.section || task.section_id === options.section) &&
			(!options.parentId || task.parent_id === options.parentId)
		);

		if (existingTask) {
			return {
				data: existingTask,
			};
		}

		// If no matching task found, create a new one using the CreateHandler
		return this.createHandler.handleOperation(ctx, itemIndex);
	}
}
