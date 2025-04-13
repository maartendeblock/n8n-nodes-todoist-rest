import { Context, OperationHandler, TodoistResponse } from '../types/index';
import { todoistApiRequest } from '../api/todoistApi';
import { IDataObject } from 'n8n-workflow';

export class GetAllSections implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		const qs: IDataObject = {};

		if (options.projectId) {
			qs.project_id = options.projectId;
		}

		const data = await todoistApiRequest.call(ctx, 'GET', '/sections', {}, qs);

		return {
			data,
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
