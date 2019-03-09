import React from "react";
import _ from 'lodash';
import { deleteTask } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const Delete = ({ task, deleteTask, history }) => {
    if (!task) return null
    return <button onClick={() => { deleteTask(task.id); history.push('/') }} className="btn btn-danger">Delete Task</button>
}

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(deleteTask(id))
});


const decorators = _.flow([
    connect(null, mapDispatchToProps),
    withRouter
]);


export default decorators(Delete)