import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div>
    <h3>Please login</h3>
    <input type='text' placeholder='Login'/>
    <input type ='password' />
    <button onClick={startLogin}> Login </button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin:() => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage)