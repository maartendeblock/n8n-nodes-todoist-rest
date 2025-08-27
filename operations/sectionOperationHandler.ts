import { Context, OperationHandler, TodoistResponse } from '../types/index';
import { todoistApiRequest } from '../api/todoistApi';
import { IDataObject } from 'n8n-workflow';

export class GetAllSections implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;
		
		let allResults: any[] = [];
		let nextCursor: string | null = null;
		
		do {
			const qs: IDataObject = {};
			if (options.projectId) {
				qs.project_id = options.projectId;
			}
			if (nextCursor) {
				qs.cursor = nextCursor;
			}

			const response = await todoistApiRequest.call(ctx, 'GET', '/sections', {}, qs);
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

export class CreateSection implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('sectionName', itemIndex) as string;
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;

		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		const body = Object.fromEntries(
			Object.entries({
				name,
				project_id: projectId,
				order: options.order,
			}).filter(([_, value]) => value !== null && value !== undefined),
		);

		const data = await todoistApiRequest.call(ctx, 'POST', '/sections', body as IDataObject);

		return {
			data,
		};
	}
}

export class GetSection implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const sectionId = ctx.getNodeParameter('sectionId', itemIndex) as string;
		const data = await todoistApiRequest.call(ctx, 'GET', `/sections/${sectionId}`);

		return {
			data,
		};
	}
}

export class UpdateSection implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('sectionName', itemIndex) as string;
		const sectionId = ctx.getNodeParameter('sectionId', itemIndex) as string;

		const data = await todoistApiRequest.call(ctx, 'POST', `/sections/${sectionId}`, {
			name,
		} as IDataObject);

		return {
			data,
		};
	}
}

export class DeleteSection implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const sectionId = ctx.getNodeParameter('sectionId', itemIndex) as string;

		await todoistApiRequest.call(ctx, 'DELETE', `/sections/${sectionId}`);

		return {
			success: true,
		};
	}
}

export class GetOrCreateSection implements OperationHandler {
	constructor(private createSection: CreateSection) {}

	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('sectionName', itemIndex) as string;
		const projectId = ctx.getNodeParameter('projectId', itemIndex) as string;

		// First, get all sections to check if one with the same name exists in the project
		const allSections = await todoistApiRequest.call(
			ctx,
			'GET',
			`/sections?project_id=${projectId}`,
		);

		// Find a section with matching name in the same project
		const existingSection = allSections.find((section: any) => section.name === name);

		if (existingSection) {
			return {
				data: existingSection,
			};
		}

		// If no matching section found, create a new one using the CreateSection handler
		return this.createSection.handleOperation(ctx, itemIndex);
	}
}
