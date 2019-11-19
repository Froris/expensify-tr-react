import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const filteredExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(filteredExpenses);  
});

store.dispatch(addExpense({description: 'Water bill', amount: 250, createdAt: 10}));
store.dispatch(addExpense({description: 'Gas bill', amount: 650, createdAt: 24}));
store.dispatch(addExpense({description: 'Air bill', amount: 0, createdAt: 40}))
 
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
)

ReactDOM.render(jsx , document.getElementById('app'));
