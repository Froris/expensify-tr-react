import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h3>Warning: do not show this to anybody!</h3>
    <p>User detales: {props.info}</p>
  </div>    
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <h2>Here is a confidentional message: </h2>}
      <WrappedComponent {...props}/>
    </div>
  )
}

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAutho ? <WrappedComponent {...props}/> : <h2>Please, login first!</h2>}
    </div>
  )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(AdminInfo);

ReactDOM.render(<AuthInfo isAutho={false} isAdmin={true} info='Some user details'/>, document.getElementById('app'));