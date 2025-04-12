import { Context, OperationType, Service, TodoistResponse } from '../types/index';
import {
	CloseHandler,
	CreateHandler,
	DeleteHandler,
	GetAllHandler,
	GetHandler,
	MoveHandler,
	ReopenHandler,
	SyncHandler,
	UpdateHandler,
} from '../operations/taskOperationHandler';
import {
	GetAllProjects,
	GetProject,
	DeleteProject,
	CreateProject,
	UpdateProject,
	ArchiveProject,
	UnarchiveProject,
	GetAllCollaborators,
} from '../operations/projectsOperationHandler';

export class TodoistCustomService implements Service {
	async execute(
		ctx: Context,
		operation: OperationType,
		itemIndex: number,
	): Promise<TodoistResponse> {
		return await this.handlers[operation].handleOperation(ctx, itemIndex);
	}

	private handlers = {
		create: new CreateHandler(),
		close: new CloseHandler(),
		delete: new DeleteHandler(),
		get: new GetHandler(),
		getAll: new GetAllHandler(),
		reopen: new ReopenHandler(),
		update: new UpdateHandler(),
		move: new MoveHandler(),
		sync: new SyncHandler(),
		getAllProjects: new GetAllProjects(),
		createProject: new CreateProject(),
		getProject: new GetProject(),
		deleteProject: new DeleteProject(),
		updateProject: new UpdateProject(),
		archiveProject: new ArchiveProject(),
		unarchiveProject: new UnarchiveProject(),
		getProjectCollaborators: new GetAllCollaborators(),
	};
}
