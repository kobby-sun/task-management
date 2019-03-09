import React from "react";
import { Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import { Field } from 'redux-form';
// import { reduxForm } from 'redux-form';
import { setPriority } from '../actions';
import * as consts from '../constants'
import _ from 'lodash';
import PriorityBadge from './PriorityBadge'

// const SetPriority = props => {
//     const { handleSubmit, pristine, submitting, valid } = props;
//     return (
//         <span>
//             <form style={{ width: '300px' }} onSubmit={handleSubmit}>
//                 <Field name="taskPriority" style={{ width: '150px', float: 'left' }} className="form-control" component="select">
//                     <option />
//                     {_.map(consts.TASK_PRIORITY, x => <option key={x.value} value={x.value}>{x.label}</option>)}
//                 </Field>

//                 <button className="btn btn-primary" type="submit" style={{ marginLeft: '10px', float: 'left' }} disabled={!valid || pristine || submitting}>Set Priority</button>

//             </form>
//         </span>
//     );
// }

// const SetPriorityForm = reduxForm({
//     form: 'setPriority'
// })(SetPriority)

const SetTaskPriority = ({ setPriority, history, task }) => {
    if (!task) return null
    // return <SetPriorityForm onSubmit={val => { setPriority({ id: task.id, ...val }); history.push('/') }} />
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
    connect(null, mapDispatchToProps),
    withRouter
]);


export default decorators(SetTaskPriority)