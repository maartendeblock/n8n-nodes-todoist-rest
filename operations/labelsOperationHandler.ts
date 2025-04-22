import { Context, OperationHandler, TodoistResponse } from '../types/index';
import { todoistApiRequest } from '../api/todoistApi';
import { IDataObject } from 'n8n-workflow';

export class GetAllPersonalLabels implements OperationHandler {
	async handleOperation(ctx: Context, _: number): Promise<TodoistResponse> {
		const data = await todoistApiRequest.call(ctx, 'GET', '/labels');

		return {
			data,
		};
	}
}
export class CreatePersonalLabel implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('labelName', itemIndex) as string;
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		const body = Object.fromEntries(
			Object.entries({
				name,
				order: options.order,
				color: options.color,
				is_favorite: options.isFavorite,
			}).filter(([_, value]) => value !== null && value !== undefined),
		);

		const data = await todoistApiRequest.call(ctx, 'POST', '/labels', body as IDataObject);

		return {
			data,
		};
	}
}

export class GetPersonalLabel implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const labelId = ctx.getNodeParameter('labelId', itemIndex) as string;
		const data = await todoistApiRequest.call(ctx, 'GET', `/labels/${labelId}`);

		return {
			data,
		};
	}
}

export class UpdatePersonalLabel implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const labelId = ctx.getNodeParameter('labelId', itemIndex) as string;
		const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		const body = Object.fromEntries(
			Object.entries({
				name: options.labelName,
				order: options.order,
				color: options.color,
				is_favorite: options.isFavorite,
			}).filter(([_, value]) => value !== null && value !== undefined),
		);

		console.log(body);

		const data = await todoistApiRequest.call(
			ctx,
			'POST',
			`/labels/${labelId}`,
			body as IDataObject,
		);

		return {
			data,
		};
	}
}

export class DeletePersonalLabel implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const labelId = ctx.getNodeParameter('labelId', itemIndex) as string;

		await todoistApiRequest.call(ctx, 'DELETE', `/labels/${labelId}`);

		return {
			success: true,
		};
	}
}

export class GetAllSharedLabels implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		// const options = ctx.getNodeParameter('options', itemIndex) as IDataObject;

		// const body = Object.fromEntries(
		// 	Object.entries({
		// 		omit_personal: options.omitPersonal,
		// 	}).filter(([_, value]) => value !== null && value !== undefined),
		// );
		const data = await todoistApiRequest.call(ctx, 'GET', '/labels/shared');

		return {
			data,
		};
	}
}

export class RenameSharedLabels implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('labelName', itemIndex) as string;
		const newName = ctx.getNodeParameter('newName', itemIndex) as string;

		await todoistApiRequest.call(ctx, 'POST', `/labels/shared/rename`, {
			name,
			new_name: newName,
		} as IDataObject);

		return {
			success: true,
		};
	}
}

export class RemoveSharedLabels implements OperationHandler {
	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('labelName', itemIndex) as string;

		await todoistApiRequest.call(ctx, 'POST', `/labels/shared/remove`, {
			name,
		} as IDataObject);

		return {
			success: true,
		};
	}
}

export class GetOrCreatePersonalLabel implements OperationHandler {
	constructor(private createPersonalLabel: CreatePersonalLabel) {}

	async handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse> {
		const name = ctx.getNodeParameter('labelName', itemIndex) as string;

		// First, get all labels to check if one with the same name exists
		const allLabels = await todoistApiRequest.call(ctx, 'GET', '/labels');
		
		// Find a label with matching name
		const existingLabel = allLabels.find((label: any) => label.name === name);

		if (existingLabel) {
			return {
				data: existingLabel,
			};
		}

		// If no matching label found, create a new one using the CreatePersonalLabel handler
		return this.createPersonalLabel.handleOperation(ctx, itemIndex);
	}
}
