const baseUrl = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_BASE_URL}/api` : '/api';

const headers = {
    'Content-Type': 'application/json'
};

async function getTasksFromApi() {
    const result = await fetch(`${baseUrl}/tasks/`, {
        method: 'GET',
        headers
    });

    const tasks = await result.json();

    return tasks;
}

async function createNewTask(taskToCreate) {
    const result = await fetch(`${baseUrl}/tasks/`, {
        method: 'POST',
        body: JSON.stringify(taskToCreate),
        headers
    });

    return result;
}

async function updateExistingTask(taskId, taskToUpdate) {
    const result = await fetch(`${baseUrl}/tasks/${taskId}/`, {
        method: 'PUT',
        body: JSON.stringify(taskToUpdate),
        headers
    });

    return result;
}

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
