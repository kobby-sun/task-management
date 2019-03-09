import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Add, View, List } from './Task'

function AppRouter() {
  return (
    <Router>

      <div className="container">
        <br />
        <h3>Task List</h3>
        <hr />

        <nav>
          <ul>
            <li>
              <Link to="/">Task List</Link>
            </li>
            <li>
              <Link to="/task/add/">Add Task</Link>
            </li>
          </ul>
        </nav>

        <br />

        <Route path="/" exact component={() => <List />} />
        <Route path="/tasks" exact component={() => <List />} />
        <Route path="/tasks/:filter" component={() => <List />} />
        <Route path="/task/add" component={() => <Add />} />
        <Route path="/task/view/:id" component={(props) => <View {...props} />} />
      </div>
    </Router>
  );
}

export default AppRouter;