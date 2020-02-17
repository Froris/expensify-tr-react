import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { startSetExpenses } from './actions/expenses';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './styles/styles.scss';
import './firebase/firebase';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();

// Избегаем двойного рендеринга при login/logout
let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}
 
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// Login/logout настройки
firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      // Перенаправляем пользователя на главную 
      // только если он находится на экране авторизации
      if(history.location.pathname === '/'){
        history.push('/homepage');
      }
    })
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})