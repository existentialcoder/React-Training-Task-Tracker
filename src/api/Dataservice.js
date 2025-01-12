/**
 * @module Dataservice - Fetch API Wrapper module
 */

const baseUrl = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_BASE_URL}/api` : '/api';

const headers = {
    'Content-Type': 'application/json'
};

/**
 * Fetches the list of tasks from API and returns
 * 
 * @returns array - List of tasks from API
 */
async function getTasksFromApi() {
    const result = await fetch(`${baseUrl}/tasks/`, {
        method: 'GET',
        headers
    });

    const tasks = await result.json();

    return tasks;
}

/**
 * Creates task from requesy body through API
 * 
 * @param {object} taskToCreate - Task to create payload
 * @returns {object} - Response object
 */
async function createNewTask(taskToCreate) {
    const result = await fetch(`${baseUrl}/tasks/`, {
        method: 'POST',
        body: JSON.stringify(taskToCreate),
        headers
    });

    return result;
}

/**
 * Updates task from requesy body through API
 * 
 * @param {number} taskId - Task identifier
 * @param {object} taskToUpdate -Task to update payload
 * @returns {object} - Response object
 */
async function updateExistingTask(taskId, taskToUpdate) {
    const result = await fetch(`${baseUrl}/tasks/${taskId}/`, {
        method: 'PUT',
        body: JSON.stringify(taskToUpdate),
        headers
    });

    return result;
}


/**
 * Deletes task from requesy body through API
 * 
 * @param {number} taskId - Task identifier
 * @param {object} taskToUpdate -Task to update payload
 * @returns {object} - Response object
 */
async function deleteTaskFromApi(taskId) {
    const result = await fetch(`${baseUrl}/tasks/${taskId}/`, {
        method: 'DELETE',
        headers
    });

    return result
}

const Dataservice = {
    getTasksFromApi,
    createNewTask,
    updateExistingTask,
    deleteTaskFromApi
};

export default Dataservice;
