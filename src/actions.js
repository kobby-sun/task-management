import { ADD_TASK, DELETE_TASK, COMPLETE_TASK, SET_PRIORITY } from './constants';

export function addTask(task) {
    return {
        type: ADD_TASK,
        task
    };
}

export function deleteTask(taskId) {
    return {
        type: DELETE_TASK,
        taskId
    };
}

export function completeTask(taskId) {
    return {
        type: COMPLETE_TASK,
        taskId
    };
}

export function setPriority(task) {
    return {
        type: SET_PRIORITY,
        task
    };
}