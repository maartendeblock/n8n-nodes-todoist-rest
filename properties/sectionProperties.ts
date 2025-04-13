import { INodeProperties } from 'n8n-workflow';

export const todoistSectionProperties = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['sections'],
			},
		},
		options: [
			{
				name: 'Get All Sections',
				value: 'getAllSections',
				description: 'Get all sections',
				action: 'Get all sections',
			},
			{
				name: 'Create',
				value: 'createSection',
				description: 'Create a new section',
				action: 'Create a new section',
			},
			{
				name: 'Get',
				value: 'getSection',
				description: 'Get a single section',
				action: 'Get a single section',
			},
			{
				name: 'Update',
				value: 'updateSection',
				description: 'Update a section',
				action: 'Update a section',
			},
			{
				name: 'Delete',
				value: 'deleteSection',
				description: 'Delete a section',
				action: 'Delete a section',
			},
		],
		default: 'getAllSections',
	},
	{
		displayName: 'Additional Fields',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: {
				resource: ['sections'],
				operation: ['getAllSections'],
			},
		},
		options: [
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				required: false,
				description: 'Filter sections by project ID',
			},
		],
	},
	{
		displayName: 'Section Name',
		name: 'sectionName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['sections'],
				operation: ['createSection', 'updateSection'],
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
				resource: ['sections'],
				operation: ['createSection'],
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
				resource: ['sections'],
				operation: ['createSection'],
			},
		},
		options: [
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: '',
				required: false,
				description: 'Order among other sections in a project',
			},
		],
	},
	{
		displayName: 'Section ID',
		name: 'sectionId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['sections'],
				operation: ['getSection', 'updateSection', 'deleteSection'],
			},
		},
	},
] as INodeProperties[];
