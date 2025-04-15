import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { todoistTaskProperties } from '../../properties/taskProperties';
import { todoistProjectsProperties } from '../../properties/projectsProperties';
import { todoistSectionProperties } from '../../properties/sectionProperties';
import { todoistCommentsProperties } from '../../properties/commentsProperties';

import { customMethods } from '../../methods/index';
import { TodoistCustomService } from '../../service/index';
import { OperationType } from '../../types/index';

export class TodoistCustomNode implements INodeType {
	methods = customMethods;
	description: INodeTypeDescription = {
		displayName: 'Todoist Custom Node',
		name: 'todoistCustomNode',
		group: ['output'],
		version: 1,
		defaults: {
			name: 'Todoist Custom Node',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		description: 'A custom node for Todoist with additional request options',
		usableAsTool: true,
		credentials: [
			{
				name: 'todoistApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['apiKey'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'API Key',
						value: 'apiKey',
					},
					// {
					// 	name: 'OAuth2',
					// 	value: 'oAuth2',
					// },
				],
				default: 'apiKey',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Task',
						value: 'task',
						description: 'Task resource',
					},
					{
						name: 'Project',
						value: 'projects',
						description: 'Projects resource',
					},
					{
						name: 'Section',
						value: 'sections',
						description: 'Section resource',
					},
					{
						name: 'Comment',
						value: 'comments',
						description: 'Comments resource',
					},
				],
				default: 'task',
				required: true,
			},
			...todoistTaskProperties.map((property) => property),
			...todoistProjectsProperties.map((property) => property),
			...todoistSectionProperties.map((property) => property),
			...todoistCommentsProperties.map((property) => property),
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		const service = new TodoistCustomService();
		let responseData;
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		console.log(resource, operation);
		console.log(this.getNode().parameters);

		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'task') {
					responseData = await service.execute(this, operation as OperationType, i);
				}

				if (resource === 'projects') {
					responseData = await service.execute(this, operation as OperationType, i);
				}

				if (resource === 'sections') {
					responseData = await service.execute(this, operation as OperationType, i);
				}

				if (resource === 'comments') {
					responseData = await service.execute(this, operation as OperationType, i);
				}

				if (responseData !== undefined && Array.isArray(responseData?.data)) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData.data as IDataObject[]),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
				} else {
					if (responseData?.hasOwnProperty('success')) {
						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray({ success: responseData.success }),
							{ itemData: { item: i } },
						);
						returnData.push(...executionData);
					} else {
						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData?.data as IDataObject),
							{ itemData: { item: i } },
						);
						returnData.push(...executionData);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}
		return [returnData];
	}
}
