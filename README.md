# Angular Task Management Application

## Overview

A task management application built with Angular 19 and standalone components. Users can create, view, edit, delete, search, and filter tasks. A dashboard displays task statistics, including overdue tasks.

## Features

- Create and edit tasks using Reactive Forms.
- Validate required fields and enforce a minimum title length of three characters.
- Search tasks by title.
- Filter tasks by status and priority.
- Display task status, priority, and due dates.
- Highlight overdue tasks.
- Confirm before deleting a task.
- Display dashboard statistics.
- Provide loading, error, and success feedback.
- Navigate using Angular Router.

## Technology Stack

- Angular 19
- TypeScript
- Angular Router
- Reactive Forms
- RxJS
- HTML and CSS
- Jasmine and Karma for unit testing

## Architecture

- **Models:** Define the task structure and allowed status and priority values.
- **Services:** Manage task data and expose operations for retrieving, creating, updating, and deleting tasks.
- **Task List Component:** Displays tasks, search and filter controls, and dashboard statistics.
- **Task Form Component:** Handles task creation, editing, and validation.
- **Not Found Component:** Handles unknown routes.
- **Routing:** Supports `/tasks`, `/tasks/new`, and `/tasks/:id/edit`.

The service is intended to act as the central source of task data. Components should consume service data rather than independently maintaining competing copies of the task collection.

## Task Model

Each task contains:

- `id`: Unique identifier.
- `title`: Task title.
- `description`: Optional task description.
- `status`: `todo`, `in-progress`, or `completed`.
- `priority`: `low`, `medium`, or `high`.
- `dueDate`: Due date in `YYYY-MM-DD` format.

## Setup

Requirements: Node.js, npm, and Angular CLI compatible with Angular 19.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open `http://localhost:4200`.

## Testing

Run unit tests:

```bash
ng test
```

The test suite should cover service operations and state changes, component behaviour, Reactive Forms validation, and error handling.

## Data and Limitations

The current implementation uses mock in-memory data rather than a persistent backend. Data may reset when the application is restarted or reloaded. API loading and failure scenarios should be tested using suitable mocks.

## Future Improvements

- Integrate a real REST API.
- Add persistent storage and server-side validation.
- Introduce pagination for large task collections.
- Add sorting and more advanced filters.
- Add end-to-end tests.
- Improve accessibility and keyboard navigation.

## AI Assistance Declaration

AI coding assistance was used during development for implementation guidance, debugging, and test-writing support. The final submission should be reviewed and understood by the candidate, who remains responsible for the code and its behaviour.
