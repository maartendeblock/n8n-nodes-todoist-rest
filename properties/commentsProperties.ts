import { INodeProperties } from 'n8n-workflow';

export const todoistCommentsProperties = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['comments'],
			},
		},
		options: [
			{
				name: 'Get All Comments',
				value: 'getAllComments',
				description: 'Get all comments',
				action: 'Get all comments',
			},
			{
				name: 'Create',
				value: 'createComment',
				description: 'Create a new comment',
				action: 'Create a new comment',
			},
			{
				name: 'Get',
				value: 'getComment',
				description: 'Get a comment',
				action: 'Get a comment',
			},
			{
				name: 'Update',
				value: 'updateComment',
				description: 'Update a comment',
				action: 'Update a comment',
			},
			{
				name: 'Delete',
				value: 'deleteComment',
				description: 'Delete a comment',
				action: 'Delete a comment',
			},
		],
		default: 'getAllComments',
	},
	{
		displayName: 'Project or Task ID',
		name: 'id',
		type: 'resourceLocator',
		default: { mode: 'projectId', value: '' },
		required: true,
		modes: [
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
			},
		],
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['getAllComments', 'createComment'],
			},
		},
		description: 'ID of the project or task used to filter comments.',
	},
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['getComment', 'updateComment', 'deleteComment'],
			},
		},
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		required: true,
		description: 'Comment content. This value may contain markdown-formatted text and hyperlinks.',
		displayOptions: {
			show: {
				resource: ['comments'],
				operation: ['createComment', 'updateComment'],
			},
		},
	},
	// {
	// 	displayName: 'Additional Fields',
	// 	name: 'options',
	// 	type: 'collection',
	// 	placeholder: 'Add option',
	// 	default: {},
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['comments'],
	// 			operation: ['createComment'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			displayName: 'Attachment',
	// 			name: 'attachment',
	// 			type: 'string',
	// 			default: 'data',
	// 			placeholder: 'e.g data',
	// 			hint: 'The name of the input binary field containing the file to be uploaded',
	// 		},
	// 	],
	// },
] as INodeProperties[];
