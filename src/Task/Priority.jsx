import React from "react";
import _ from 'lodash';
import * as consts from '../constants'

const Priority = ({ task }) => {
    const priority = _.find(consts.TASK_PRIORITY, x => x.value === task.taskPriority)
    if (!priority) return null
    return <span className={`badge badge-pill badge-${priority.badge}`}>{priority.label}</span>
}

export default Priority