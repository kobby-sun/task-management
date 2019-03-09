import React from "react";
import { withRouter } from 'react-router';
import _ from 'lodash';
import { completeTask } from '../actions';
import { connect } from 'react-redux';

const Complete = ({ task, completeTask, history }) => {
    if (!task) return null
    return <button onClick={() => { completeTask(task.id); history.push('/') }} className="btn btn-primary">Complete Task</button>
}

const mapDispatchToProps = (dispatch) => ({
    completeTask: (id) => dispatch(completeTask(id))
});

const decorators = _.flow([
    connect(null, mapDispatchToProps),
    withRouter
]);


export default decorators(Complete)