# n8n-nodes-todoist-rest

[![npm version](https://badge.fury.io/js/n8n-nodes-todoist-rest.svg)](https://badge.fury.io/js/n8n-nodes-todoist-rest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive n8n community node for Todoist REST API integration, providing advanced task management capabilities including subtask support and complex workflow operations.

## Features

### 🎯 Complete Todoist Integration
- **Tasks**: Create, read, update, delete, close, reopen, move tasks
- **Projects**: Full CRUD operations for project management  
- **Sections**: Organize tasks within projects using sections
- **Comments**: Add and manage task comments
- **Labels**: Create and manage task labels for organization

### ⚡ Advanced Features
- **Subtask Support**: Get tasks with their subtasks in a single operation
- **Hierarchical Tasks**: Create parent-child task relationships
- **Smart Task Creation**: Get-or-create functionality to prevent duplicates
- **Batch Operations**: Sync API integration for complex workflows
- **Flexible Filtering**: Filter tasks by project, section, labels, and custom filters

### 🔐 Authentication
- **API Key Authentication**: Simple token-based authentication
- **OAuth2**: Full OAuth2 flow support for secure access

## Installation

### Via n8n Community Nodes (Recommended)
1. Go to **Settings** → **Community Nodes** in your n8n instance
2. Click **Install** and enter: `n8n-nodes-todoist-rest`
3. Click **Install**

### Manual Installation
```bash
# In your n8n installation directory
npm install n8n-nodes-todoist-rest
```

### For Development
```bash
# Clone the repository
git clone https://github.com/maartendeblock/n8n-nodes-todoist-rest.git
cd n8n-nodes-todoist-rest

# Install dependencies
pnpm install

# Build the project
pnpm build
```

## Configuration

### API Key Authentication
1. Get your Todoist API token from [Todoist Settings](https://todoist.com/prefs/integrations)
2. In n8n, create new credentials for "Todoist API"
3. Enter your API token

### OAuth2 Authentication  
1. Create a Todoist app at [Todoist App Console](https://developer.todoist.com/appconsole.html)
2. In n8n, create new credentials for "Todoist OAuth2 API"
3. Enter your Client ID, Client Secret, and redirect URI

## Usage Examples

### Create a Task with Subtasks
```json
{
  "operation": "create",
  "content": "Plan project launch",
  "project": "Work Projects",
  "options": {
    "description": "Comprehensive project launch planning",
    "priority": 3,
    "labels": ["important", "planning"]
  }
}
```

### Get Task with Subtasks
```json
{
  "operation": "get",
  "taskId": "7498765432",
  "options": {
    "includeSubtasks": true
  }
}
```

### Filter Tasks
```json
{
  "operation": "getAll",
  "filters": {
    "projectId": "Work Projects",
    "filter": "today | overdue"
  }
}
```

## Supported Operations

### Tasks
- **Create**: Create new tasks with full metadata support
- **Get**: Retrieve individual tasks (with optional subtasks)
- **Get Many**: List tasks with advanced filtering
- **Update**: Modify existing tasks
- **Delete**: Remove tasks
- **Close**: Mark tasks as completed
- **Reopen**: Reactivate completed tasks
- **Move**: Move tasks between projects/sections
- **Get or Create**: Idempotent task creation

### Projects, Sections, Comments, Labels
- Full CRUD operations for all resource types
- Advanced filtering and organization capabilities

## API Compatibility

This node uses **Todoist REST API v2** for maximum stability and feature support.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Issues: [GitHub Issues](https://github.com/maartendeblock/n8n-nodes-todoist-rest/issues)
- 📖 Documentation: [Todoist API Docs](https://developer.todoist.com/rest/v2/)
- 💬 n8n Community: [n8n Community Forum](https://community.n8n.io/)