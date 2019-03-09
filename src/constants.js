export const VIEW_TASK = 'TaskList/VIEW_TASK';
export const LOAD_TASKS = 'TaskList/LOAD_TASKS';
export const ADD_TASK = 'TaskList/ADD_TASK';
export const DELETE_TASK = 'TaskList/DELETE_TASK';
export const COMPLETE_TASK = 'TaskList/COMPLETE_TASK';
export const SET_PRIORITY = 'TaskList/SET_PRIORITY';

export const TASK_PRIORITY = [
    { label: 'Very Low', value: '-2', badge: 'light' },
    { label: 'Low', value: '-1', badge: 'info' },
    { label: 'Normal', value: '0', badge: 'secondary' },
    { label: 'High', value: '1', badge: 'primary' },
    { label: 'Very High', value: '2', badge: 'warning' }
]