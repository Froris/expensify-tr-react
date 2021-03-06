import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/expenses-total';
import numeral from 'numeral';

const ExpenseSummary = ({expensesCount, expensesAmount}) => {
  const formattedExpenses = numeral(expensesAmount / 100).format('$0,0.00');

  return (
    <div className="total-wrapper">
      <h3>
        Viewing {expensesCount} expenses totaling: <span className="total-amount">{formattedExpenses}</span>
      </h3>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expensesCount: visibleExpenses.length,
    expensesAmount: getTotalExpenses(visibleExpenses)
  };
};
  
export default connect(mapStateToProps)(ExpenseSummary);