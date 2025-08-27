# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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