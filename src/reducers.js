import { reducer as reduxFormReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { ADD_TASK, DELETE_TASK, COMPLETE_TASK, SET_PRIORITY } from './constants'
import shortid from 'shortid'
import _ from 'lodash';
import { appState } from './InitialState'

function appReducer(state = appState, action) {
    switch (action.type) {
        case ADD_TASK:
            let id = shortid.generate()
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [id]: { id, ...action.task }
                }
            }
        case DELETE_TASK:
            if (!state.tasks[action.taskId]) return state
            delete state.tasks[action.taskId]
            return {
                ...state,
                tasks: state.tasks
            }
        case COMPLETE_TASK:
            if (!state.tasks[action.taskId]) return state
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.taskId]: {
                        ...state.tasks[action.taskId],
                        completed: true
                    }
                }
            }
        case SET_PRIORITY:
            if (!state.tasks[action.task.id]) return state
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.task.id]: {
                        ...state.tasks[action.task.id],
                        taskPriority: action.task.taskPriority
                    }
                }
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
