import { setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';

test('shuld return object with text value or default empty string (if not provided)', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})
