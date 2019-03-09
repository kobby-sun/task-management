import React from "react";
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import PriorityBadge from './PriorityBadge'

const columns = [{
    dataField: 'id',
    text: 'Task ID',
    hidden: true
}, {
    dataField: 'taskName',
    text: 'Task Name',
    formatter: (cell, row) => { return <Link to={`/task/view/${row.id}`}>{row.taskName}</Link> },
    sort: true
}, {
    dataField: 'taskDesc',
    text: 'Task Description'
}, {
    dataField: 'taskPriority',
    text: 'Task Priority',
    formatter: (cell, row) => { return <PriorityBadge p={row.taskPriority} /> },
    sort: true
}];

const ListFilter = ({ match }) => {
    let filter = match.params.filter
    return <Row>
        <Col xs={1}><Link to="/tasks" className={`badge${_.isEmpty(filter) ? ' badge-primary' : ''}`}><span style={{ fontSize: '15px' }}>My Tasks</span></Link></Col>
        <Col xs={1}><Link to="/tasks/completed" className={`badge${filter === 'completed' ? ' badge-success' : ''}`}><span style={{ fontSize: '15px' }}>Completed Tasks</span></Link></Col>
    </Row>
}

const List = ({ tasks, match }) => {
    let tsks = _.filter(tasks, x => !x.completed)
    let filter = match.params.filter
    if (filter) {
        switch (filter) {
            case 'completed':
                tsks = _.filter(tasks, x => x.completed);
                break;
            default:

                break;
        }
    }

    return <div className="container">
        <h4>Task List</h4>
        <br />
        <ListFilter match={match} />
        <br />
        <BootstrapTable keyField='id' data={tsks} columns={columns} noDataIndication={() => <strong>No task</strong>} />
    </div>
}

const mapStoreToProps = (store) => ({
    tasks: store.app.tasks
})

const decorators = _.flow([
    connect(mapStoreToProps),
    withRouter
]);

export default decorators(List)