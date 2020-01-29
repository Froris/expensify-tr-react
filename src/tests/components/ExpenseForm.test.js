import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with fixtures data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>)
  expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot()
})

// ***
// Input description test
test('should set description on input change', () => {
  // Введенное значение в поле
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  // Находим нужное поле и передаем объект со значением (симулируем ввод)
  // element.target: {
  //   value: value => 'New description' 
  // } 
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  // Проверяем наличие введенного значения в state/description
  expect(wrapper.state('description')).toBe(value);
});

// Textearea test
test('should set note on textarea change', () => {
  const value = 'New note value';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});


// Amount test
test('should set correct value for amount, if value valid', () => {
  const value = '12.33';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('amount')).toBe(value);
})

// Submit test
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

// Calendar test
test('should correctly setup date', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
})

test('should focus date', () => {
  const focused = true
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
  expect(wrapper.state('calendarFocused')).toEqual(true);
})

