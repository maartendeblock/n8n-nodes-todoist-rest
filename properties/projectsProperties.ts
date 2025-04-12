export const todoistProjectProperties = [
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
				name: 'Get',
				value: 'getProjects',
				description: "Get a user's projects",
				action: "Get a user's projects",
			},
			{
				name: 'Create Project',
				value: 'createProject',
				description: 'Create a project',
				action: 'Create a project',
			},
			{
				name: 'Delete',
				value: 'deleteProject',
				description: 'Delete a project',
				action: 'Delete a project',
			},
		],
		default: 'getProjects',
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
				operation: ['deleteProject'],
			},
		},
	},
];
