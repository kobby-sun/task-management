import React from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addTask } from '../actions';
import _ from 'lodash';
import Priority from './Priority'
import Delete from './Delete'
import Complete from './Complete'

const ViewTask = props => {
    const task = _.find(props.tasks, x => x.id === props.match.params.id)
    if (!task) return <label>Invalid task id</label>
    return (
        <div className="container">
            <h4>View Task</h4>
            <div className="card card-body bg-light">
                <div className="form-group">
                    <label><strong>Task Name</strong></label>
                    <div>
                        {task.taskName}
                    </div>
                </div>
                <div className="form-group">
                    <label><strong>Task Description</strong></label>
                    <div>
                        {task.taskDesc}
                    </div>
                </div>
                <div className="form-group">
                    <label><strong>Task Priority</strong></label>
                    <div>
                        <Priority task={task} />
                    </div>
                </div>
                <br />
                <div>
                    <Complete task={task} />
                    <span style={{ paddingRight: '20px' }}></span>
                    <Delete task={task} />
                    <span style={{ paddingRight: '20px' }}></span>
                    <button className="btn btn-info">Return</button>
                    <span style={{ paddingRight: '20px' }}></span>
                </div>
            </div>
        </div>


    );
}

const mapStoreToProps = (store) => ({
    tasks: store.app.tasks
})

const decorators = _.flow([
    connect(mapStoreToProps),
    withRouter
]);

export default decorators(ViewTask)