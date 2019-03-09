import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { ADD_TASK, DELETE_TASK, COMPLETE_TASK, SET_PRIORITY } from './constants'
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
            let tsks1 = _.clone(state.tasks)
            tsks1.push({ id: shortid.generate(), ...action.task })
            sessionStorage.setItem('tasks', JSON.stringify(tsks1));
            return {
                ...state,
                tasks: tsks1
            }
        case DELETE_TASK:
            let tsks2 = _.clone(state.tasks)
            _.remove(tsks2, {
                id: action.taskId
            });
            sessionStorage.setItem('tasks', JSON.stringify(tsks2));
            return {
                ...state,
                tasks: tsks2
            }
        case COMPLETE_TASK:
            let tsks3 = _.clone(state.tasks)
            let tsk3 = _.find(tsks3, { id: action.taskId })
            if (tsk3)
                tsk3.completed = true
            sessionStorage.setItem('tasks', JSON.stringify(tsks3));
            return {
                ...state,
                tasks: tsks3
            }
        case SET_PRIORITY:
            let tsks4 = _.clone(state.tasks)
            let tsk4 = _.find(tsks4, { id: action.task.id })
            if (tsk4)
                tsk4.taskPriority = action.task.taskPriority
            sessionStorage.setItem('tasks', JSON.stringify(tsks4));
            return {
                ...state,
                tasks: tsks4
            }
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
