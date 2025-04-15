import { Context, OperationHandler, TodoistResponse } from '../types/index';
import { todoistApiRequest } from '../api/todoistApi';
import { IDataObject } from 'n8n-workflow';

const parameterOptions: Record<string, string> = {
	projectId: 'project_id',
	taskId: 'task_id',
};

export class GetAllComments implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const idObject = ctx.getNodeParameter('id', itemIndex) as IDataObject;
		const id = idObject['value'] as string;
		const mode = idObject['mode'] as string;

		const parameterName = parameterOptions[mode];

		const queryParameters: IDataObject = {};
		queryParameters[parameterName] = id;

		const data = await todoistApiRequest.call(
			ctx,
			'GET',
			'/comments',
			{},
			queryParameters as IDataObject,
		);

		return {
			data,
		};
	}
}

export class CreateComment implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const idObject = ctx.getNodeParameter('id', itemIndex) as IDataObject;
		const id = idObject['value'] as string;
		const mode = idObject['mode'] as string;

		const parameterName = parameterOptions[mode] as string;
		const content = ctx.getNodeParameter('content', itemIndex) as string;

		const body = Object.fromEntries(
			Object.entries({
				content: content,
			}).filter(([_, value]) => value !== null && value !== undefined),
		);

		body[parameterName] = id;

		const data = await todoistApiRequest.call(ctx, 'POST', '/comments', body as IDataObject);

		return {
			data,
		};
	}
}

export class GetComment implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const commentId = ctx.getNodeParameter('commentId', itemIndex) as string;
		const data = await todoistApiRequest.call(ctx, 'GET', `/comments/${commentId}`);

		return {
			data,
		};
	}
}

export class UpdateComment implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const commentId = ctx.getNodeParameter('commentId', itemIndex) as string;
		const content = ctx.getNodeParameter('content', itemIndex) as string;

		const data = await todoistApiRequest.call(ctx, 'POST', `/comments/${commentId}`, {
			content,
		} as IDataObject);

		return {
			data,
		};
	}
}

export class DeleteComment implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const commentId = ctx.getNodeParameter('commentId', itemIndex) as string;
		await todoistApiRequest.call(ctx, 'DELETE', `/comments/${commentId}`);

		return {
			success: true,
		};
	}
}
