import { startAddExpense, addExpense, removeExpense, editExpense } from "../../actions/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk])

// Тестируем actions в изоляции от хранилища
test('Should setup action edit ogject', () => {
  const action = editExpense('123', {note: 'Cat food' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      note: 'Cat food'
    }
  });
});

test('should return expense data correctly', () => {
  const expenseData = addExpense(expenses[1]);
  expect(expenseData).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1]
  });
});

// Тестируем actions с записью в хранилище =================
// startAddExpense test
test('should add expense to store and database', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }

  store.dispatch(startAddExpense(expenseData)).then(() => {
    // Получаем из стора отправленный action и данные
    const actions = store.getActions();
    // Проверяем отправленный action
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    // Проверяем сохранился ли объект в firebase
    // Получаем объект по id
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    // Сравниваем объект из firebase с данными action
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  })
});

// startAddExpense test with default data 
test('should setup default values for addExpense action', (done) => {
  const store = createMockStore({});
  const defaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0  
  }

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultData
      }
    })

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultData)
    done();
  })
});