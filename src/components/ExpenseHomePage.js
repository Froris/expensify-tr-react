import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import TotalExpenseHeader from './TotalExpensesHeader';
import { connect } from 'react-redux';

const ExpenseHomePage = () => (
  <div>
    <TotalExpenseHeader />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default connect()(ExpenseHomePage);
