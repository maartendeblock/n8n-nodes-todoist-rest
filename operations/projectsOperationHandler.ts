import { Context, OperationHandler, TodoistResponse } from '../types/index';
import { todoistApiRequest } from '../api/todoistApi';
import { IDataObject } from 'n8n-workflow';

export class GetAllProjects implements OperationHandler {
	async handleOperation(ctx: Context, _: number): Promise<TodoistResponse> {
		let allResults: any[] = [];
		let nextCursor: string | null = null;
		
		do {
			const qs: IDataObject = {};
			if (nextCursor) {
				qs.cursor = nextCursor;
			}

			const response = await todoistApiRequest.call(ctx, 'GET', '/projects', {}, qs);
			const results = response.results || response;
			
			if (Array.isArray(results)) {
				allResults = allResults.concat(results);
			} else {
				allResults.push(results);
			}

			nextCursor = response.next_cursor;
		} while (nextCursor);

		return {
			data: allResults as any,
		};
	}
}

export class CreateProject implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('projectName', itemIndex) as string;
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		const body = Object.fromEntries(
			Object.entries({
				name,
				parent_id: options.parentId,
				color: options.color,
				is_favorite: options.isFavorite,
				view_style: options.viewStyle,
			}).filter(([_, value]) => value !== null && value !== undefined),
		);

		const data = await todoistApiRequest.call(ctx, 'POST', '/projects', body as IDataObject);

		return {
			data,
		};
	}
}

export class UpdateProject implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		const body = Object.fromEntries(
			Object.entries({
				name: options.name,
				parent_id: options.parentId,
				color: options.color,
				is_favorite: options.isFavorite,
				view_style: options.viewStyle,
			}).filter(([_, value]) => value !== null && value !== undefined),
		);

		const data = await todoistApiRequest.call(
			ctx,
			'POST',
			`/projects/${projectId}`,
			body as IDataObject,
		);

		return {
			data,
		};
	}
}

export class GetProject implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;
		const data = await todoistApiRequest.call(ctx, 'GET', `/projects/${projectId}`);

		return {
			data,
		};
	}
}

export class ArchiveProject implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;
		const data = await todoistApiRequest.call(ctx, 'POST', `/projects/${projectId}/archive`);

		return {
			data,
		};
	}
}

export class UnarchiveProject implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;
		const data = await todoistApiRequest.call(ctx, 'POST', `/projects/${projectId}/unarchive`);

		return {
			data,
		};
	}
}

export class GetAllCollaborators implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;
		const data = await todoistApiRequest.call(ctx, 'GET', `/projects/${projectId}/collaborators`);

		return {
			data,
		};
	}
}

export class DeleteProject implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;
		await todoistApiRequest.call(ctx, 'DELETE', `/projects/${projectId}`);

		return {
			success: true,
		};
	}
}

export class GetOrCreateProject implements OperationHandler {
	constructor(private createProject: CreateProject) {}

	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('projectName', itemIndex) as string;
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		// First, get all projects to check if one with the same name and parent exists
		const allProjects = await todoistApiRequest.call(ctx, 'GET', '/projects');
		
		// Find a project with matching name and parent_id
		const existingProject = allProjects.find((project: any) => 
			project.name === name && 
			(!options.parentId || project.parent_id === options.parentId)
		);

		if (existingProject) {
			return {
				data: existingProject,
			};
		}

		// If no matching project found, create a new one using the CreateProject handler
		return this.createProject.handleOperation(ctx, itemIndex);
	}
}
