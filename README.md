# Task Tracker - Web based todo app
A simple task tracker app built with [React](https://react.dev/) and [Django](https://www.djangoproject.com/) - a Python based web framework

## Recruitment Tasks
### Given
1. Create a React component called TaskList  - :white_check_mark:
2. Create a React component called TaskForm - :white_check_mark:
name of the task and the button should be used to add the task.
3. Implement the functionality to add a task - :white_check_mark:
4. Implement completed tasks UI - :white_check_mark:
5. Implement the functionality to grey out done tasks - :white_check_mark:
6. Implement the functionality to sort done tasks to the bottom - :white_check_mark:
7. While adding the task to “TaskList”, try to make this interaction more engaging or intuitive - :white_check_mark:

### Additional
1. Implement a Django CRUD REST API for the task model to persist the state for the frontend app - :white_check_mark:
2. Integrate the React app with the API server - :white_check_mark:

## Prerequisites
- Node (>16)
- yarn

## Steps to run locally
- Clone / fork the repository
- Install all the dependencies
	```shell
	yarn
	```
- Run the app on local server in port 3000
	``` shell
	yarn start
	```
- Follow [this](./task_tracker_backend/README.md) to run the Django API server

## Testing
- Add tests under `/tests`folder
- Run the tests using
	```shell
	yarn test
	```

## Documentation
- Generate the JS documentations using
	```shell
	yarn docs
	open docs/index.html
	```
- Navigate to the document to go through the code base
