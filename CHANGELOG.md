# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-08-27

### Changed
- **BREAKING**: Migrated from Todoist REST API v2 to the new unified Todoist API v1
- API endpoint changed from `api.todoist.com/rest/v2/` to `api.todoist.com/api/v1/`
- All list operations now support cursor-based pagination for improved performance
- Task filtering operations now use dedicated `/tasks/filter` endpoint
- All resource IDs are now opaque strings instead of numeric values

### Added
- Cursor-based pagination support for all list operations (tasks, projects, sections, labels, comments)
- Dedicated filter endpoint for tasks with advanced filter syntax support
- Enhanced error handling for the new API structure
- Better response handling with `results` array structure

### Technical Details
- Automatic pagination handling with `next_cursor` support
- Response structure now includes `results` array for list operations
- Maintains full backwards compatibility in n8n interface
- All existing functionality preserved while gaining performance improvements

### Migration Notes
- No changes required for existing workflows - all n8n interfaces remain the same
- Existing credentials continue to work unchanged
- Better performance for large data sets due to improved pagination
- Enhanced reliability with the new unified API structure

## [1.0.0] - 2025-08-27

### Added
- Initial stable release of n8n-nodes-todoist-rest
- Complete Todoist REST API v2 integration
- Task operations: Create, Get, Get Many, Update, Delete, Close, Reopen, Move
- Project operations: Create, Get, Get Many, Update, Delete
- Section operations: Create, Get, Get Many, Update, Delete
- Comment operations: Create, Get, Get Many, Update, Delete
- Label operations: Create, Get, Get Many, Update, Delete
- Advanced task features:
  - Get task with subtasks option (includes child tasks in response)
  - Task creation with parent/child relationships
  - Support for due dates, priorities, labels, and descriptions
- OAuth2 and API key authentication support
- Custom sync operations for complex workflows
- Get or Create task operation (idempotent task creation)

### Features
- **Comprehensive CRUD Operations**: Full create, read, update, delete support for all Todoist resources
- **Subtask Support**: Retrieve parent tasks with their subtasks in a single operation
- **Flexible Authentication**: Both API key and OAuth2 authentication methods
- **Advanced Filtering**: Filter tasks by project, section, label, and custom filters
- **Batch Operations**: Sync API integration for complex multi-task operations
- **Smart Task Creation**: Get-or-create functionality to prevent duplicate tasks

### Technical Details
- Built for n8n workflow automation platform
- Uses Todoist REST API v2
- TypeScript implementation with full type safety
- Comprehensive error handling and validation
- Optimized for performance with minimal API calls

### Breaking Changes
- None (initial stable release)

### Dependencies
- n8n-workflow: ^1.82.0
- n8n-core: ^1.14.1
- uuid: ^10.0.0 (for sync operations)

### Installation
Install via n8n Community Nodes or manually with:
```bash
npm install n8n-nodes-todoist-rest
```