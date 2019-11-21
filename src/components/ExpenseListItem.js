import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>Description: {description}</h3>
    </Link>
    <div>
      <b>Amount: {numeral(amount / 100).format('$0,0.00')}</b>
      <p>Date: {moment(createdAt).format('MMMM, Do, YYYY')}</p>
    </div>
  </div>
);

export default ExpenseListItem;
