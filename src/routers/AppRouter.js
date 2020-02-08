import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import ExpenseHomePage from '../components/ExpenseHomePage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';

export const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/homepage" component={ExpenseHomePage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
