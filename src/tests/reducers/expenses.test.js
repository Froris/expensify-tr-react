import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';
import moment from 'moment';

test('shuld return default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should edit expense by id', () => {
  const note = 'parrot food'
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      note
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].note).toEqual('parrot food');
});

test('should add expense', () => {
  const expense = {
    id: 'asdqw123',
    description: 'Cat',
    note: 'Food for Cat',
    amount: 123,
    createdAt: moment(0)
  };

    const action = {
    type: 'ADD_EXPENSE',
    expense
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should set expense', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);

})