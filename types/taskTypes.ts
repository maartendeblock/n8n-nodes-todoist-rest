import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export type Context = IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions;

export type OperationType =
	| 'create'
	| 'close'
	| 'delete'
	| 'get'
	| 'getAll'
	| 'reopen'
	| 'update'
	| 'move'
	| 'sync';

export interface Section {
	name: string;
	id: string;
}

export interface Service {
	execute(ctx: Context, operation: OperationType, itemIndex: number): Promise<TodoistResponse>;
}

export interface TodoistProjectType {
	id: number;
	name: string;
}

export interface TodoistResponse {
	success?: boolean;
	data?: IDataObject;
}

export interface OperationHandler {
	handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse>;
}

export interface CreateTaskRequest {
	content?: string;
	description?: string;
	project_id?: number;
	section_id?: number;
	parent_id?: string;
	order?: number;
	labels?: string[];
	priority?: number;
	due_string?: string;
	due_datetime?: string;
	due_date?: string;
	due_lang?: string;
}

export interface SyncRequest {
	commands: Command[];
	temp_id_mapping?: IDataObject;
}

export const CommandTypes = {
	ITEM_MOVE: 'item_move',
	ITEM_ADD: 'item_add',
	ITEM_UPDATE: 'item_update',
	ITEM_REORDER: 'item_reorder',
	ITEM_DELETE: 'item_delete',
	ITEM_COMPLETE: 'item_complete',
} as const;

export interface Command {
	type: CommandType;
	uuid: string;
	temp_id?: string;
	args: {
		parent_id?: string;
		id?: number;
		section_id?: number;
		project_id?: number | string;
		section?: string;
		content?: string;
	};
}

export type CommandType = (typeof CommandTypes)[keyof typeof CommandTypes];
