import { startAddExpense, addExpense, removeExpense, editExpense, startSetExpenses, startEditExpense } from "../../actions/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  // Преобразуем в подходящий формат с id для отправки в базу
  expenses.forEach(({id, description, note, amount, createdAt }) => {
    expenseData[id] = {description, note, amount, createdAt}
  });
  database.ref('expenses').set(expenseData).then(() => done());
});

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
  // Создаем хранилище
  const store = createMockStore({});
  const defaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0  
  }

  // Делаем диспэтч и через промис проверяем отправленные данные
  store.dispatch(startAddExpense({})).then(() => {
    // получаем отправленные actions (сам action и его данные) из хранилища
    const actions = store.getActions();
    // сравниваем action и его данные
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultData
      }
    })

    // Проверяем наличие нового expense в базе данных путем
    // возвращения промиса с value объекта expense
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  }).then((snapshot) => {
    // Сравниваем полученное значение с дефолтными данными
    expect(snapshot.val()).toEqual(defaultData)
    done();
  })
});

// SET_EXPENSES test
test('should fetch and set expenses to the store', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    
    done()
  });
})

// EDIT_EXPENSE
test('should edit expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id
  const updates = { note: 'New description of the Rent' }

  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });

    return database.ref(`expenses/${id}`).once('value');

  }).then((snapshot) => {
    expect(snapshot.val().note).toEqual(updates.note);
    done();
  });
});