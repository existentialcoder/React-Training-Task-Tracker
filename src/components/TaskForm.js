import { useState } from 'react';

import { Box, Button, FormControlLabel, FormGroup, Modal, Switch, TextField, Typography } from '@mui/material';

import Dataservice from '../api/Dataservice';

import { useToast } from './ToastProvider';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4
};

const taskFields = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        multi: false
    },
    {
        name: 'description',
        label: 'Description',
        type: 'text',
        multi: true
    },
    {
        name: 'completed',
        label: 'Mark as completed',
        type: 'radio',
        multi: false
    }
];

const TaskForm = ({ currentTaskId, tasks, updateTasksListFromApi, setCurrentTaskId, setShowTaskForm }) => {
    const [currentTask, setCurrentTask] = useState(tasks.find(task => task.id === currentTaskId) || {});

    const showToast = useToast();

    const handleFormChange = (key, value) => {
        setCurrentTask({
            ...currentTask,
            [key]: value
        });
    };

    const saveTaskChange = async () => {
        const reqBodyTask = {
            title: currentTask.title,
            description: currentTask.description,
            completed: currentTask.completed
        };

        if (currentTaskId) {
            await Dataservice.updateExistingTask(currentTaskId, reqBodyTask);
            showToast(`Successfully updated the task with name - ${reqBodyTask.title}`, 'success');
        } else {
            await Dataservice.createNewTask(reqBodyTask);
            showToast(`Successfully created new task with name - ${reqBodyTask.title}`, 'success');
        }

        updateTasksListFromApi();
        setCurrentTaskId(null);
        setShowTaskForm(false);
    };

    return (
        <Modal open onClose={() => { setCurrentTaskId(null); setShowTaskForm(false) }}>
            <Box sx={modalStyle}>
                <Typography variant='h6' pb={1} pt={1}>
                    {currentTaskId ? currentTask.title : 'Add new task'}
                </Typography>
                <FormGroup>
                    {
                        taskFields.map(taskField => (
                            <FormControlLabel key={taskField.name} label={taskField.type === 'radio' ? taskField.label : ''} control={taskField.type === 'text' ? <TextField
                                slotProps={{ inputLabel: { shrink: true } }}
                                style={{ paddingBottom: '15px' }}
                                variant='outlined'
                                label={taskField.label}
                                multiline={taskField.multi}
                                rows={5}
                                onChange={(ev) => handleFormChange(taskField.name, ev.target.value)}
                                value={currentTask && currentTask[taskField.name]?.length ? currentTask[taskField.name] : ''}
                                fullWidth /> : <Switch onChange={(_, checked) => handleFormChange(taskField.name, checked)} checked={currentTask[taskField.name] || false} />}>
                            </FormControlLabel>
                        ))
                    }
                </FormGroup>

                <div>
                    <Button onClick={saveTaskChange} style={{
                        float: 'right'
                    }} variant='contained' color='primary'>{currentTaskId ? 'Update' : 'Save'}</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default TaskForm;
