import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodePropertyOptions,
} from 'n8n-workflow';
import { todoistApiRequest } from '../api/todoistApi';
import { TodoistProjectType } from '../types/taskTypes';

export const customMethods = {
	listSearch: {
		async searchProjects(
			this: ILoadOptionsFunctions,
			filter?: string,
		): Promise<INodeListSearchResult> {
			const projects: TodoistProjectType[] = await todoistApiRequest.call(this, 'GET', '/projects');
			return {
				results: projects
					.filter((project) => !filter || project.name.toLowerCase().includes(filter.toLowerCase()))
					.map((project) => ({
						name: project.name,
						value: project.id,
					})),
			};
		},
	},
	loadOptions: {
		// Get all the available projects to display for user selection
		async getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
			const returnData: INodePropertyOptions[] = [];
			const projects = await todoistApiRequest.call(this, 'GET', '/projects');
			for (const project of projects) {
				returnData.push({
					name: project.name,
					value: project.id,
				});
			}

			return returnData;
		},

		// Get all the available sections in the selected project for user selection
		async getSections(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
			const returnData: INodePropertyOptions[] = [];

			const options = Object.assign(
				{},
				this.getNodeParameter('options', {}),
				this.getNodeParameter('filters', {}),
			) as IDataObject;

			const projectId =
				(options.projectId as number) ??
				(this.getCurrentNodeParameter('project', { extractValue: true }) as number);
			if (projectId) {
				const qs: IDataObject = { project_id: projectId };
				const sections = await todoistApiRequest.call(this, 'GET', '/sections', {}, qs);
				for (const section of sections) {
					returnData.push({
						name: section.name,
						value: section.id,
					});
				}
			}

			return returnData;
		},

		// Get all the available parents in the selected project and section for user selection
		async getItems(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
			const returnData: INodePropertyOptions[] = [];

			const options = Object.assign(
				{},
				this.getNodeParameter('options', {}),
				this.getNodeParameter('filters', {}),
			) as IDataObject;

			const projectId =
				(options.projectId as number) ??
				(this.getCurrentNodeParameter('project', { extractValue: true }) as number);

			const sectionId =
				(options.sectionId as number) ||
				(options.section as number) ||
				(this.getCurrentNodeParameter('sectionId') as number);

			if (projectId) {
				const qs: IDataObject = sectionId
					? { project_id: projectId, section_id: sectionId }
					: { project_id: projectId };

				const items = await todoistApiRequest.call(this, 'GET', '/tasks', {}, qs);
				for (const item of items) {
					returnData.push({
						name: item.content,
						value: item.id,
					});
				}
			}

			return returnData;
		},

		// Get all the available labels to display for user selection
		async getLabels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
			const returnData: INodePropertyOptions[] = [];
			const labels = await todoistApiRequest.call(this, 'GET', '/labels');

			for (const label of labels) {
				returnData.push({
					name: label.name,
					value: label.name,
				});
			}

			return returnData;
		},
	},
};
