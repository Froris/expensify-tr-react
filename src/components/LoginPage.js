import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <section className="login-page">
    <div className="login-box-wrapper">
      <h1>Expen$ify App</h1>
      <h3>Please login</h3>
      <button className="google-login" onClick={startLogin}> Login with Google </button>
    </div>
  </section>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin:() => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage)