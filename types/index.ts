import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export type Context = IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions;

export interface TodoistResponse {
	success?: boolean;
	data?: IDataObject;
}

export type OperationType =
	| 'create'
	| 'close'
	| 'delete'
	| 'get'
	| 'getAll'
	| 'reopen'
	| 'update'
	| 'move'
	| 'sync'
	| 'getAllProjects'
	| 'createProject'
	| 'getProject'
	| 'updateProject'
	| 'archiveProject'
	| 'unarchiveProject'
	| 'deleteProject'
	| 'getProjectCollaborators'
	| 'getAllSections'
	| 'createSection'
	| 'getSection'
	| 'updateSection'
	| 'deleteSection';

export interface Service {
	execute(ctx: Context, operation: OperationType, itemIndex: number): Promise<TodoistResponse>;
}

export interface OperationHandler {
	handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse>;
}
