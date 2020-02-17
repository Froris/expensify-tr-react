import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

// Класс - компонент для разгрузки верстки от инлайн функций
export class AddExpensePage extends React.Component {
  // функция, вызывающая action creator
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };
  
  render() {
    return ( 
      <div className="page-wrapper">
        <h2 className="page-title">Add Expense</h2>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// dispatch с вызовом addExpense передается в props
const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
