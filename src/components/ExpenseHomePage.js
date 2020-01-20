import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import TotalExpenseHeader from './TotalExpensesHeader';
const ExpenseHomePage = () => (
  <div>
    <TotalExpenseHeader />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseHomePage;
