import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should sort by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0).valueOf(),
    endDate: moment(0).add(5, 'days')
  }

  const action = selectExpenses(expenses, filters)
  expect(action).toEqual([expenses[0]])
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const action = selectExpenses(expenses, filters);
  expect(action).toEqual([expenses[1], expenses[2], expenses[0]])
});