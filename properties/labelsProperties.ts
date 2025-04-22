import { INodeProperties } from 'n8n-workflow';
import { colorOptions } from '../types';

export const todoistLabelsProperties = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		required: true,
		displayOptions: {
			show: {
				resource: ['labels'],
			},
		},
		options: [
			{
				name: 'Get All Personal Labels',
				value: 'getAllPersonalLabels',
				description: 'Get all personal labels',
				action: 'Get all personal labels',
			},
			{
				name: 'Create',
				value: 'createPersonalLabel',
				description: 'Create a new personal label',
				action: 'Create a new personal label',
			},
			{
				name: 'Get or Create',
				value: 'getOrCreatePersonalLabel',
				description: 'Get a personal label by name, or create it if it doesn\'t exist',
				action: 'Get or create a personal label',
			},
			{
				name: 'Get',
				value: 'getPersonalLabel',
				description: 'Get a personal label',
				action: 'Get a personal label',
			},
			{
				name: 'Update',
				value: 'updatePersonalLabel',
				description: 'Update a personal label',
				action: 'Update a personal label',
			},
			{
				name: 'Delete',
				value: 'deletePersonalLabel',
				description: 'Delete a personal label',
				action: 'Delete a personal label',
			},
			{
				name: 'Get All Shared Labels',
				value: 'getAllSharedLabels',
				description: 'Get all shared labels',
				action: 'Get all shared labels',
			},
			{
				name: 'Rename',
				value: 'renameSharedLabels',
				description: 'Rename shared labels',
				action: 'Rename shared labels',
			},
			{
				name: 'Remove',
				value: 'removeSharedLabels',
				description: 'Remove shared labels',
				action: 'Remove shared labels',
			},
		],
		default: 'getAllPersonalLabels',
	},
	{
		displayName: 'Label Name',
		name: 'labelName',
		description: 'Name of the label',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['labels'],
				operation: ['createPersonalLabel', 'getOrCreatePersonalLabel'],
			},
		},
	},
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['labels'],
				operation: ['getPersonalLabel', 'updatePersonalLabel', 'deletePersonalLabel'],
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
				resource: ['labels'],
				operation: ['createPersonalLabel', 'getOrCreatePersonalLabel'],
			},
		},
		options: [
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: '',
				description: 'Label order',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				default: 'charcoal',
				description: 'The color of the label icon',
				options: colorOptions,
			},
			{
				displayName: 'Favorite',
				name: 'isFavorite',
				type: 'boolean',
				description: 'Whether the label is a favorite (a true or false value)',
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
				resource: ['labels'],
				operation: ['updatePersonalLabel'],
			},
		},
		options: [
			{
				displayName: 'Label Name',
				name: 'labelName',
				description: 'Name of the label',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: '',
				description: 'Label order',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				default: 'charcoal',
				description: 'The color of the label icon',
				options: colorOptions,
			},
			{
				displayName: 'Favorite',
				name: 'isFavorite',
				type: 'boolean',
				description: 'Whether the label is a favorite (a true or false value)',
			},
		],
	},

	// {
	// 	displayName: 'Additional Fields',
	// 	name: 'options',
	// 	type: 'collection',
	// 	placeholder: 'Add option',
	// 	default: {},
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['labels'],
	// 			operation: ['getAllSharedLabels'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			displayName: 'Omit Personal',
	// 			name: 'omitPersonal',
	// 			description: "Whether to exclude the names of the user's personal labels from the results",
	// 			type: 'boolean',
	// 			default: false,
	// 		},
	// 	],
	// },
	{
		displayName: 'Label Name',
		name: 'labelName',
		description: 'The name of the existing label to rename',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['labels'],
				operation: ['renameSharedLabels'],
			},
		},
	},
	{
		displayName: 'New Name',
		name: 'newName',
		description: '	The new name for the label',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['labels'],
				operation: ['renameSharedLabels'],
			},
		},
	},
	{
		displayName: 'Label Name',
		name: 'labelName',
		description: 'The name of the label to remove',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['labels'],
				operation: ['removeSharedLabels'],
			},
		},
	},
] as INodeProperties[];
