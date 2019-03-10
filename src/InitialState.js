import _ from 'lodash';

export const appState = {
    loading: false,
    error: false,
    task: null,
    tasks: !_.isEmpty(sessionStorage.getItem('tasks')) ? JSON.parse(sessionStorage.getItem('tasks')) : [],
}