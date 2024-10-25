# Task Tracker CLI

This is a simple command-line interface (CLI) project for managing tasks.

## Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/nick-0037/Task-tracker-cli.git
cd task-tracker-cli
npm install
```

## Usage

To use the Task Tracker CLI, run the following commands:

- Add a Task:

  node index.js add "My new task"

- Update a Task:

  node index.js update <task-id> "Updated task description"

- Delete a Task:

  node index.js delete <task-id>

- Mark a Task as In Progress:

  node index.js mark-in-progress <task-id>

- Mark a Task as Done:

  node index.js mark-done <task-id>

- List tasks:

  node index.js list

- List tasks todo:

  node index.js list todo

- List tasks in-progress:

  node index.js list progress

- List tasks done:

  node index.js list done
