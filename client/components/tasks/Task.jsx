import React, { useState, useEffect } from 'react';
import EditTaskForm from '../forms/EditTaskForm';
import ButtonComponent from '../buttons/ButtonComponent';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { taskCompleted } from '../../apis/tasks';
import { Box, Checkbox, ListItem, Typography, Paper } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

const Task = ({
  task,
  setGroup,
  uncheckAll,
  setUncheckAll,
  setLists,
  listId,
}) => {
  const [checked, setChecked] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const { taskId, name, description, deadline } = task;

  //changes the status of a task from incomplete to complete in the database
  const handleCompleted = () => {
    taskCompleted(taskId);
    //--------------------------------------------------------
    //update the list that's saved in state to update the user interface
    setLists((lists) =>
      lists.map((list) => {
        if (list.listId === listId) {
          const tasks = list.tasks.filter((task) => task.taskId !== taskId);
          return { ...list, tasks: tasks };
        }
        return list;
      }),
    );

    setUncheckAll(true);
    setGroup({});
  };
  //--------------------------------------------------------
  //handles the revealing and hiding of the edit task form
  const handleEditOpen = () => {
    setEditFormOpen(true);
  };

  const handleCloseEdit = () => {
    setEditFormOpen(false);
  };
  //--------------------------------------------------------
  // functions related to checkbox
  // this is a work-around for a bug that occurred, where the checkboxes wouldn't uncheck after tasks are deleted
  // this requires refactoring

  // When checked, save the task's id in state. When unchecked, remove the task's id from state.
  const handleChecked = (event) => {
    if (event.target.checked) {
      setGroup((group) => {
        return { ...group, [taskId]: true };
      });
    } else {
      setGroup((group) => {
        delete group[taskId];
        return group;
      });
    }
  };

  // controls whether the checkbox is checked or not
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  // Unchecks the checkbox whenever uncheckAll is true
  useEffect(() => {
    setChecked(false);
  }, [uncheckAll]);

  return (
    <ListItem>
      <Checkbox
        checked={uncheckAll ? false : checked}
        onClick={handleCheck}
        onChange={handleChecked}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Paper>
        <Accordion className="task-layout">
          <AccordionSummary>
            <Typography variant="subtitle1" className="task-title">
              {name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" className="task-deadline">
              {deadline === 'Invalid DateTime'
                ? 'No Deadline'
                : `Deadline: ${deadline}`}
            </Typography>
            {description && (
              <Box className="task-description-layout">
                <Typography variant="body2">{description}</Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Paper>
      <ButtonComponent icon={<EditIcon />} handleFunction={handleEditOpen} />
      <ButtonComponent icon={<CheckIcon />} handleFunction={handleCompleted} />
      {/* forms that are by default hidden */}
      <EditTaskForm
        editFormOpen={editFormOpen}
        handleCloseEdit={handleCloseEdit}
        taskId={taskId}
        task={task}
        setLists={setLists}
        listId={listId}
      />
    </ListItem>
  );
};

export default Task;
