/**
 * @module App - Main App Component module
 */

import { Paper, Box, Typography, Grid, Button, Select, InputLabel, FormControl, MenuItem, Skeleton } from '@mui/material';

import { useEffect, useState } from 'react';

import Dataservice from './api/Dataservice'

import TaskList from './components/TaskList';

import { Add } from '@mui/icons-material';

import TaskForm from './components/TaskForm';

import { ToastProvider } from './components/ToastProvider';

import constants from './helpers/constants';

/**
 * 
 * @returns {JSX.Element} The rendered component. 
 */
function App() {
  const [tasks, setTasks] = useState([]);

  const [tasksToList, setTasksToList] = useState([]);

  const [showTaskForm, setShowTaskForm] = useState(false);

  const [currentTaskId, setCurrentTaskId] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const [isTaskListLoading, setIsTaskListLoading] = useState(false);

  /**
   * Takes the original array of tasks, applies the selected sort filter and returns the modified array of same length
   * 
   * @param {Array} tasks - List of tasks
   * @returns Array - Sorts by filter and returns modified array
   */
  function getTasksAfterFiler(tasks) {
    let filteredTasks = [];
  
    switch (selectedFilter) {
      case 'all':
        filteredTasks = [...tasks];
        break;
      case 'by_created_time':
        filteredTasks = [...tasks].sort((task1, task2) => task1.created_at - task2.created_at);
        break;
      case 'by_incomplete_tasks':
        filteredTasks = [...tasks].sort((a, b) => a.completed - b.completed);
        break;
    }

    return filteredTasks;
  }

  /**
   * Fetches tasks from api and sets in the state
   */
  async function getTasksFromApi() {
    const tasks = await Dataservice.getTasksFromApi();

    setTasks(tasks);
    setTasksToList(selectedFilter === 'all' ? tasks : getTasksAfterFiler(tasks));
    setIsTaskListLoading(false);
  }

  useEffect(() => {
    // Fetch tasks from API
    getTasksFromApi();
  }, []);

  useEffect(() => {
    setIsTaskListLoading(true);

    setTasksToList(getTasksAfterFiler(tasks));
    setTimeout(() => setIsTaskListLoading(false), 500);
  }, [selectedFilter]);

  return (
    <ToastProvider>
      <Box mx={5} my={5}>
        <Paper mx={5}>
          <Box mx={5}>
            <Box pt={3} pb={3}>
              <Grid container justifyContent='space-between '>
                <Grid item>
                  <Typography variant='h4'>Task Tracker </Typography>
                </Grid>
                <Grid item>
                  <FormControl style={{ marginRight: '10px' }}>
                    <InputLabel>Sort</InputLabel>
                    <Select
                      style={{ height: '38px', width: '200px', textAlign: 'center' }}
                      value={selectedFilter}
                      label='Sort'
                      onChange={(ev) => setSelectedFilter(ev.target.value)}
                    >
                      {
                        constants.filterItems.map(filterItem => (
                          <MenuItem key={filterItem.label} value={filterItem.value}>{filterItem.label}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <Button
                    variant='contained'
                    startIcon={<Add />}
                    onClick={() => setShowTaskForm(true)} color='primary'>Add Task</Button>
                </Grid>
              </Grid>
            </Box>
            {isTaskListLoading ? Array(10).fill('.').map((val, indx) => <Skeleton key={indx} height={50} />) : <TaskList
              tasks={tasksToList}
              updateTasksListFromApi={getTasksFromApi}
              setShowTaskForm={setShowTaskForm}
              setCurrentTaskId={setCurrentTaskId} />}
            {showTaskForm && <TaskForm currentTaskId={currentTaskId}
              tasks={tasks}
              updateTasksListFromApi={getTasksFromApi}
              setCurrentTaskId={setCurrentTaskId}
              setShowTaskForm={setShowTaskForm} />}
          </Box>
        </Paper>
      </Box>
    </ToastProvider>
  );
}

export default App;
