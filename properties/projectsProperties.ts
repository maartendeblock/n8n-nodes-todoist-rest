import { INodeProperties } from 'n8n-workflow';

const colorOptions = [
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

export const todoistProjectsProperties = [
	// Projects operation
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['projects'],
			},
		},
		options: [
			{
				name: 'Get Projects',
				value: 'getAllProjects',
				description: 'Get all projects',
				action: 'Get all projects',
			},
			{
				name: 'Create',
				value: 'createProject',
				description: 'Create a project',
				action: 'Create a project',
			},
			{
				name: 'Get',
				value: 'getProject',
				description: 'Get a project',
				action: 'Get a project',
			},
			{
				name: 'Update',
				value: 'updateProject',
				description: 'Update a project',
				action: 'Update a project',
			},
			{
				name: 'Archive',
				value: 'archiveProject',
				description: 'Archive a project',
				action: 'Archive a project',
			},
			{
				name: 'Unarchive',
				value: 'unarchiveProject',
				description: 'Unarchive a project',
				action: 'Unarchive a project',
			},
			{
				name: 'Delete',
				value: 'deleteProject',
				description: 'Delete a project',
				action: 'Delete a project',
			},
			{
				name: 'Get Project Collaborators',
				value: 'getProjectCollaborators',
				description: 'Get all collaborators',
				action: 'Get all collaborators',
			},
		],
		default: 'getAllProjects',
	},
	{
		displayName: 'Project Name',
		name: 'projectName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createProject'],
			},
		},
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: [
					'deleteProject',
					'getProject',
					'updateProject',
					'archiveProject',
					'unarchiveProject',
					'getProjectCollaborators',
				],
			},
		},
	},

	{
		displayName: 'Additional Fields',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createProject'],
			},
		},
		options: [
			{
				displayName: 'Parent ID',
				name: 'parentId',
				type: 'string',
				default: '',
				description: 'Parent project ID',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				default: 'charcoal',
				description: 'The color of the project icon.',
				options: colorOptions,
			},
			{
				displayName: 'Favorite',
				name: 'isFavorite',
				type: 'boolean',
				default: false,
				description: 'Whether the project is a favorite (a true or false value).',
			},
			{
				displayName: 'View Style',
				name: 'viewStyle',
				type: 'options',
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'Display the project as a list',
					},
					{
						name: 'Board',
						value: 'board',
						description: 'Display the project as a board',
					},
				],
				default: 'list',
				description:
					'A string value (either list or board, default is list). This determines the way the project is displayed within the Todoist clients.',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['updateProject'],
			},
		},
		options: [
			{
				displayName: 'Project Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Edit Project Name',
			},
			{
				displayName: 'Parent ID',
				name: 'parentId',
				type: 'string',
				default: '',
				description: 'Parent project ID',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				default: 'charcoal',
				description: 'The color of the project icon.',
				options: colorOptions,
			},
			{
				displayName: 'Favorite',
				name: 'isFavorite',
				type: 'boolean',
				default: false,
				description: 'Whether the project is a favorite (a true or false value).',
			},
			{
				displayName: 'View Style',
				name: 'viewStyle',
				type: 'options',
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'Display the project as a list',
					},
					{
						name: 'Board',
						value: 'board',
						description: 'Display the project as a board',
					},
				],
				default: 'list',
				description:
					'A string value (either list or board, default is list). This determines the way the project is displayed within the Todoist clients.',
			},
		],
	},
] as INodeProperties[];
