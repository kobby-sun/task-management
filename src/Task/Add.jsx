import React from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { addTask } from '../actions';
import * as consts from '../constants'
import _ from 'lodash';

const AddTask = props => {
    const { handleSubmit, pristine, reset, submitting, valid } = props;
    return (
        <div className="card card-body bg-light">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Name</label>
                    <div>
                        <Field
                            name="taskName"
                            component="input"
                            className="form-control"
                            type="text"
                            placeholder="Task Name"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Task Description</label>
                    <div>
                        <Field
                            name="taskDesc"
                            component="textarea"
                            className="form-control"
                            placeholder="Task Description"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Task Priority</label>
                    <div>
                        <Field name="taskPriority" className="form-control" component="select">
                            <option />
                            {_.map(consts.TASK_PRIORITY, x => <option key={x.value} value={x.value}>{x.label}</option>)}
                        </Field>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" type="submit" disabled={!valid || pristine || submitting}>Submit</button>
                    <span style={{ paddingRight: '20px' }}></span>
                    <button className="btn" type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
          </button>
                </div>
            </form>
        </div>
    );
}

const validate = values => {
    const errors = {}
    if (!values.taskName) {
        errors.taskName = 'Required'
    }
    if (!values.taskDesc) {
        errors.taskDesc = 'Required'
    }
    if (!values.taskPriority) {
        errors.taskPriority = 'Required'
    }
    return errors
}

const AddTaskForm = reduxForm({
    form: 'addtask',
    validate
})(AddTask)

const Add = ({ addTask, history }) => {
    return <div className="container">
        <h4>Add Task</h4>
        <AddTaskForm onSubmit={val => { addTask(val); history.push('/') }} />
    </div>
}

const mapDispatchToProps = (dispatch) => ({
    addTask: (task) => dispatch(addTask(task))
});


const decorators = _.flow([
    connect(null, mapDispatchToProps),
    withRouter
]);


export default decorators(Add)