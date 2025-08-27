# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-beta.1] - 2025-08-27

### 🚀 Major Changes
- **BREAKING**: Migrated from Todoist REST API v2 to the new unified Todoist API v1
- API endpoint changed from `api.todoist.com/rest/v2/` to `api.todoist.com/api/v1/`
- All resource IDs are now opaque strings instead of numeric values for future compatibility

### ✨ New Features  
- **Parent/Subtask Management**: Full support for task parent-child relationships
  - Create subtasks directly with `parent_id` parameter in task creation
  - Convert existing tasks to subtasks via update operation with `parent_id`
  - Remove parent relationship (convert subtask back to regular task) by updating with empty `parent_id`
- **Enhanced Task Retrieval**: Added `includeSubtasks` option to get task operation
  - Automatically fetches and includes all subtasks when retrieving a parent task
  - Subtasks returned in a `subtasks` array on the parent task object

### 🔧 Improvements
- **Cursor-based Pagination**: Support for all list operations (tasks, projects, sections, labels, comments)
- **Advanced Task Filtering**: Dedicated `/tasks/filter` endpoint with natural language filter support
- **Enhanced Error Handling**: Improved API response processing and error messages
- **Better Response Structure**: All list operations now use `results` array structure

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