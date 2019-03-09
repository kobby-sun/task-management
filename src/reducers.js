import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { ADD_TASK, DELETE_TASK, COMPLETE_TASK } from './constants'
import shortid from 'shortid'
import _ from 'lodash';

const initialState = {
    loading: false,
    error: false,
    task: null,
    tasks: !_.isEmpty(sessionStorage.getItem('tasks')) ? JSON.parse(sessionStorage.getItem('tasks')) : [],
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            state.tasks.push({ id: shortid.generate(), ...action.task })
            sessionStorage.setItem('tasks', JSON.stringify(state.tasks));
            return state
        case DELETE_TASK:
            _.remove(state.tasks, {
                id: action.taskId
            });
            sessionStorage.setItem('tasks', JSON.stringify(state.tasks));
            return state
        case COMPLETE_TASK:
            let task = _.find(state.tasks, { id: action.taskId })
            if (task)
                task.completed = true
            sessionStorage.setItem('tasks', JSON.stringify(state.tasks));
            return state
        default:
            return state;
    }
}

export default function createReducer() {
    return combineReducers({
        form: reduxFormReducer,
        app: appReducer
    });
}
