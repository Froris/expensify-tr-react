import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <ul className="expenses-list">
    {
      props.expenses.length === 0 ? (
       <li className="list-item-empty"><p>No expenses</p></li>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key={expense.id} {...expense} />; // props.expense => props.id, amount и т.д. => id
        })
      )      
    }
  </ul>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
