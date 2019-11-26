import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/expenses-total';
import numeral from 'numeral';

const ExpenseSummary = ({expensesCount, expensesAmount}) => {
  const formattedExpenses = numeral(expensesAmount / 100).format('$0,0.00');

  return (
    <div>
      <h3>
        Viewing {expensesCount} expenses totaling: {formattedExpenses}
      </h3>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expenseAmount: getTotalExpenses(visibleExpenses)
  };
};
  
export default connect(mapStateToProps)(ExpenseSummary);