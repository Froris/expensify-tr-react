// Get total expenses amount
export default (expenses) => {
  let total = expenses.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
  return total;
};
