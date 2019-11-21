import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/expenses-total';
import numeral from 'numeral';

const TotalExpenseList = (props) => (
  <div>
    <h3>
      Total expenses amount: {numeral(getTotalExpenses(props.expenses) / 100).format('$0,0.00')}
    </h3>
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};
  
export default connect(mapStateToProps)(TotalExpenseList);