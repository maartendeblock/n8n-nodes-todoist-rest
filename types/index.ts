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
	| 'getOrCreateProject'
	| 'getAllSections'
	| 'createSection'
	| 'getSection'
	| 'updateSection'
	| 'deleteSection'
	| 'getAllComments'
	| 'createComment'
	| 'getComment'
	| 'updateComment'
	| 'deleteComment'
	| 'getAllPersonalLabels'
	| 'createPersonalLabel'
	| 'getPersonalLabel'
	| 'updatePersonalLabel'
	| 'deletePersonalLabel'
	| 'getAllSharedLabels'
	| 'renameSharedLabels'
	| 'removeSharedLabels';

export interface Service {
	execute(ctx: Context, operation: OperationType, itemIndex: number): Promise<TodoistResponse>;
}

export interface OperationHandler {
	handleOperation(ctx: Context, itemIndex: number): Promise<TodoistResponse>;
}

export const colorOptions = [
	{
		name: 'Berry Red',
		value: 'berry_red',
	},
	{
		name: 'Red',
		value: 'red',
	},
	{
		name: 'Orange',
		value: 'orange',
	},
	{
		name: 'Yellow',
		value: 'yellow',
	},
	{
		name: 'Olive Green',
		value: 'olive_green',
	},
	{
		name: 'Lime Green',
		value: 'lime_green',
	},
	{
		name: 'Green',
		value: 'green',
	},
	{
		name: 'Mint Green',
		value: 'mint_green',
	},
	{
		name: 'Teal',
		value: 'teal',
	},
	{
		name: 'Sky Blue',
		value: 'sky_blue',
	},
	{
		name: 'Light Blue',
		value: 'light_blue',
	},
	{
		name: 'Blue',
		value: 'blue',
	},
	{
		name: 'Grape',
		value: 'grape',
	},
	{
		name: 'Violet',
		value: 'violet',
	},
	{
		name: 'Lavender',
		value: 'lavender',
	},
	{
		name: 'Magenta',
		value: 'magenta',
	},
	{
		name: 'Salmon',
		value: 'salmon',
	},
	{
		name: 'Charcoal',
		value: 'charcoal',
	},
	{
		name: 'Grey',
		value: 'grey',
	},
	{
		name: 'Taupe',
		value: 'taupe',
	},
];
