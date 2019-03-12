import React from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import Delete from './Delete'
import Complete from './Complete'
import SetPriority from './SetPriority'

const ViewTask = props => {
    const { tasks, match, history } = props
    const task = _.find(tasks, x => x.id === match.params.id)
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
                        <SetPriority task={task} />
                    </div>
                </div>
                <div>
                    <Complete task={task} />
                    <span style={{ paddingRight: '20px' }}></span>
                    <Delete task={task} />
                    <span style={{ paddingRight: '20px' }}></span>
                    <button onClick={() => history.goBack()} className="btn btn-info">Return</button>
                    <span style={{ paddingRight: '20px' }}></span>
                </div>
            </div>
        </div>


    );
}

const mapStoreToProps = (store) => ({
    tasks: _.map(_.keys(store.app.tasks), o => store.app.tasks[o])
})

const decorators = _.flow([
    connect(mapStoreToProps),
    withRouter
]);

export default decorators(ViewTask)