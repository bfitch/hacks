import Database from 'jseg';

const db = new Database({
  todos: [
    {id: 1, title: 'boo'},
    {id: 2, title: 'wow'},
    {id: 3, title: 'cool'}
  ],
  users: [
    {id: 1, name: 'bob'},
    {id: 2, name: 'wbob'},
    {id: 3, name: 'cobob'}
  ]
});

db.put({
  lid: 1,
  todos: {id: 1, title: 'CHANGE'}
});

console.log(db.get('todos'));
