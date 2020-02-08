import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// PrivateRoute - обертка для Route,
// позволяющая настроить условия для отображения элементов при login/logout
export const PrivateRoute = ({ isAuthenticaded, component: Component, ...rest }) => (

  // Получаем оставшиеся свойства PrivateRoute через rest.
  // Передаем rest в свойства component/Component через props
  <Route {...rest} component={(props) => (
    isAuthenticaded ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to='/' />
    )
  )} />
);

const mapStateToProps = (state) => ({
  // Превращаем в boolean
  isAuthenticaded: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);