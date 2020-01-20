const newArr = [
  {
    id: 12312312313,
    name: 'Vasya',
    age: 23
  },
  {
    id: 111233,
    name: 'Alex',
    age: 26
  },
  {
    id: 123,
    name: 'Kolya',
    age: 13
  }
];

const persArr = [];

const showPerson = (arr, id) => {
  return arr.filter((per) => {
    return id === per.id
  });
};

const promise = new Promise((resolve, reject) => {
  const person = showPerson(newArr, 123);
  if(person){
    resolve(person)
  } else {
    reject(new Error('Error: there is no such person'));
  }
}).then((person) => {
  persArr.push(person);
  return persArr;
}).then((val) => console.log(val))
  .catch((err) => console.log(err));

  let foo = {n: 1}
  const bar = foo
  foo.x = foo = {n:2}