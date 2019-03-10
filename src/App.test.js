import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import _ from 'lodash';
import shortid from 'shortid'
import { appState } from './InitialState'
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import * as consts from './constants'
import { Dropdown } from 'react-bootstrap';

import SetPriority from './Task/SetPriority'
import PriorityBadge from './Task/PriorityBadge'

const InitialState = {
  app: appState
}

const mockStore = configureStore()

const task = { id: shortid.generate(), taskName: 'Test task', taskDesc: 'Test task description', taskPriority: '0' }


const wrapper = (component) => {
  const store = mockStore(InitialState)
  return <Provider store={store}>{component}</Provider>
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(wrapper(<App />), div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('set task priority', () => {
  it('should render snapshot', () => {
    const component = renderer.create(wrapper(<SetPriority />));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render empty content', () => {
    const component = mount(wrapper(<SetPriority />));

    expect(component.find('SetPriority').get(0)).toBeFalsy()
  });

  it('should render dropdown', () => {
    const component = mount(wrapper(<SetPriority task={task} />));

    expect(component.find('Dropdown').get(0)).toBeTruthy()
  });

  it('should render all priority options', () => {
    const component = mount(wrapper(<SetPriority task={task} />));

    expect(component.find(Dropdown.Menu)).toHaveLength(1)
    component.find(Dropdown.Toggle).simulate('click');
    expect(component.find(Dropdown.Item)).toHaveLength(consts.TASK_PRIORITY.length)
  });

  it('should render active priority option', () => {
    const component = mount(wrapper(<SetPriority task={task} />));

    expect(component.find(Dropdown.Menu)).toHaveLength(1)
    component.find(Dropdown.Toggle).simulate('click');
    expect(component.find(Dropdown.Menu).children().find(Dropdown.Item).first().find(PriorityBadge)).toHaveLength(1)
    expect(component.find(Dropdown.Menu).children().find(Dropdown.Item).children().find({ active: true }).first().find(PriorityBadge).prop('p')).toEqual(task.taskPriority)
  });

});