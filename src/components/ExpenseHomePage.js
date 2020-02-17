import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import TotalExpenseHeader from './TotalExpensesHeader';
import { connect } from 'react-redux';

const ExpenseHomePage = () => (
  <div className="main-content">
    <TotalExpenseHeader />
    <div className="content-wrapper">
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  </div>
);

export default connect()(ExpenseHomePage);
