import moment from 'moment';

export default [
  {
    id: '12311',
    description: 'Rent',
    note:'',
    amount: 123,
    createdAt: moment(0)
  },
  {
    id: '12312221',
    description: 'Gum',
    note:'',
    amount: 21,
    createdAt: moment(0).add(24, 'days').valueOf()
  },
  {
    id: '12311123123123',
    description: 'Gas bill',
    note:'',
    amount: 11110,
    createdAt: moment(0).add(10, 'days').valueOf()
  }
];