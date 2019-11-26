import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const filteredExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(filteredExpenses);  
});
 
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
)

ReactDOM.render(jsx , document.getElementById('app'));
