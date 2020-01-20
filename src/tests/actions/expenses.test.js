import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

test('Should setup action edit ogject', () => {
  const action = editExpense('123', {note: 'Cat food' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      note: 'Cat food'
    }
  })
});

test('should return object with expense data', () => {
  const expense = {
    description: 'House rent',
    note: 'Last month rent',
    amount: 10,
    createdAt: 120000
  };

  const action = addExpense(expense);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expense,
      id: expect.any(String)
    }
  });
});

test('Should return object with default properties', () => {
  const expense = {
    description: 'House rent',
    note: 'Last month rent',
    amount: 10,
    createdAt: 10000
  };

  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }   
  })
})