import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('shuld setup default filters values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('shuld setup text filter', () => {
  const defaultState = {
    text: undefined,
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const state = filtersReducer(defaultState, {type: 'SET_TEXT_FILTER', text: 'UWU'});
  expect(state).toEqual({
    text: 'UWU',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')   
  })
})