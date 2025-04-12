import { Context, OperationType, Service, TodoistResponse } from '../types/taskTypes';
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
	};
}
