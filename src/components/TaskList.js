/**
 * @module TaskList - TaskList component
 */

import React from 'react';

import { Box, Chip, Grid, Tooltip, Typography } from '@mui/material';

import { IconButton } from '@mui/material';

import { Delete, Done, Replay } from '@mui/icons-material';

import Dataservice from '../api/Dataservice';

import { useToast } from './ToastProvider';

/**
 * React component for TaskList to show the list of tasks
 *
 * @param {Object} props - The props object.
 * @param {string} props.tasks - List of tasks from API
 * @param {Function} props.updateTasksListFromApi - Method handler to update tasks list
 * @param {Function} props.setCurrentTaskId - Method set handler to set the task id as current
 * @param {Function} props.setShowTaskForm - Method to change the show form flag.
 * @returns {JSX.Element} The rendered component. 
 */
const TaskList = ({ tasks, updateTasksListFromApi, setShowTaskForm, setCurrentTaskId }) => {
    const showToast = useToast();

    /**
     * Takes UTC time stamp and builds the time string in desired format
     * 
     * @param {string} taskCreatedAtUtc - UTC Timestamp
     * @returns  {string} - Date string
     */
    const getCreatedAtText = (taskCreatedAtUtc) => {
        const date = new Date(taskCreatedAtUtc);

        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const suffixes = ['th', 'st', 'nd', 'rd'];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const daySuffix = (day % 10 >= 1 && day % 10 <= 3 && ![11, 12, 13].includes(day % 100))
            ? suffixes[day % 10]
            : suffixes[0];

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${day}${daySuffix} ${month} ${year} ${formattedHours}:${formattedMinutes}`;
    };

    /**
     * Takes taskId as input and updates the completed flag
     * 
     * @param {number} taskId - Task id of the task
     */
    const handleTaskCompleteOrReopen = async (taskId) => {
        const taskToUpdate = tasks.find(task => task.id === taskId);

        await Dataservice.updateExistingTask(taskId, {
            ...taskToUpdate,
            completed: !taskToUpdate.completed
        });

        showToast(`Successfully updated the task with name - ${taskToUpdate.title}`, 'success');

        updateTasksListFromApi();
    };

    /**
     * Takes taskId as input and deletes the task from API
     * 
     * @param {number} taskId - Task id of the task
     */
    const handleTaskDelete = async (taskId) => {
        const taskToDelete = tasks.find(task => task.id === taskId);

        await Dataservice.deleteTaskFromApi(taskId);

        showToast(`Successfully deleted the task with name - ${taskToDelete.title}`, 'success');

        updateTasksListFromApi();
    };

    /**
     * Takes taskId as input, sets it as current task id and opens the form
     * 
     * @param {number} taskId - Task identifier 
     */
    const handleTaskOpen = (taskId) => {
        setCurrentTaskId(taskId);
        setShowTaskForm(true);
    };

    return tasks.length > 0 ? tasks.map((task) => (
        <Box key={task.id} pt={2} pb={2}>
            <Grid container justifyContent={'space-between'}>
                <Grid item>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <Typography variant='h6' fontWeight={600} onClick={() => handleTaskOpen(task.id)} style={{
                                cursor: 'pointer',
                                opacity: task.completed ? 0.5 : 1
                            }}>
                                {task.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {task.completed && <Chip size={'small'} style={{ opacity: '1', marginLeft: '10px' }} label='done' color='success' variant='filled' />}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Tooltip title={task.completed ? 'Reopen task' : 'Mark as complete'}>
                        <IconButton aria-label='complete' onClick={() => handleTaskCompleteOrReopen(task.id)}>
                            {task.completed ? <Replay color='action' /> : <Done color='success' />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete task'>
                        <IconButton aria-label='delete' onClick={() => handleTaskDelete(task.id)}>
                            <Delete color='error' />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'}>
                <Grid item>
                    <Typography fontWeight={'300'} onClick={() => handleTaskOpen(task.id)} style={{
                        cursor: 'pointer',
                        opacity: task.completed ? 0.5 : 1
                    }}> {task.description} </Typography></Grid>
                <Grid item><div style={{fontSize: '14px'}}>
                    Created at {getCreatedAtText(task.created_at)}</div></Grid>
            </Grid>
        </Box>
    )) : <Typography variant='h6' style={{ textAlign: 'center' }}>No tasks found</Typography>;
};

export default TaskList;
