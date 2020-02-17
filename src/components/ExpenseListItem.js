import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = ({ id, description, amount, createdAt, note }) => (
  <li className="list-item">
    <Link to={`/edit/${id}`}>
      <h3>Description: {description}</h3>
    </Link>
    <div className="item-content">
      <b>Amount: <span className="amount">{numeral(amount / 100).format('$0,0.00')}</span></b>
      <p><b>Date:</b> {moment(createdAt).format('MMMM, Do, YYYY')}</p>
    </div>
  </li>
);

export default ExpenseListItem;
