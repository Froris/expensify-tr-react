import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { startSetExpenses } from './actions/expenses';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';
import './firebase/firebase';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const filteredExpenses = getVisibleExpenses(state.expenses, state.filters)
});
 
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
})
