import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    // дефолтные свойства для expenseData, если они не переданы
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0      
    } = expenseData;
    // expenseData => expense
    // Объект, сохраняемый в firebase и store, с данными из expenseData
    const expense = { description, note, amount, createdAt };
    // expense (push) -> firebase (promise(ref)) -> (dispatch) store
    // возвращаем результат для тестирования
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = (id = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({id}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
        dispatch(removeExpense(id));
    })
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setExpenses(expenses))
    });
  };
};