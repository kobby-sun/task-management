import React from "react";
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setPriority } from '../actions';
import * as consts from '../constants'
import _ from 'lodash';
import PriorityBadge from './PriorityBadge'

const SetTaskPriority = ({ setPriority, task }) => {
    if (!task) return null
    return <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
            <PriorityBadge p={task.taskPriority} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {_.map(consts.TASK_PRIORITY, x => <Dropdown.Item onSelect={() => setPriority({ id: task.id, taskPriority: x.value })} active={task.taskPriority === x.value} key={x.value}><PriorityBadge p={x.value} /></Dropdown.Item>)}
        </Dropdown.Menu>
    </Dropdown>
}

const mapDispatchToProps = (dispatch) => ({
    setPriority: (task) => dispatch(setPriority(task))
});


const decorators = _.flow([
    connect(null, mapDispatchToProps)
]);


export default decorators(SetTaskPriority)