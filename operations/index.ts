export {
	CloseHandler,
	CreateHandler,
	DeleteHandler,
	GetAllHandler,
	GetHandler,
	MoveHandler,
	ReopenHandler,
	SyncHandler,
	UpdateHandler,
} from './taskOperationHandler';

export {
	GetAllProjects,
	GetProject,
	DeleteProject,
	CreateProject,
	UpdateProject,
	ArchiveProject,
	UnarchiveProject,
	GetAllCollaborators,
} from './projectsOperationHandler';

export {
	CreateSection,
	DeleteSection,
	GetAllSections,
	GetSection,
	UpdateSection,
} from './sectionOperationHandler';

export {
	CreateComment,
	DeleteComment,
	GetAllComments,
	GetComment,
	UpdateComment,
} from './commentsOperationHandler';

export {
	CreatePersonalLabel,
	DeletePersonalLabel,
	GetAllPersonalLabels,
	GetAllSharedLabels,
	GetPersonalLabel,
	RemoveSharedLabels,
	RenameSharedLabels,
	UpdatePersonalLabel,
} from './labelsOperationHandler';
