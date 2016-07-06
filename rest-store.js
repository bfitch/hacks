import Pretender from 'pretender';
import _ from 'lodash';
import _db from './underscore-db';
_.mixin(_db);
const {restStore, jsStoreAdapter} = require('rest-store');
const server = new Pretender();

server.prepareBody = (body) => {
  return body ? JSON.stringify(body) : '{"error": "not found"}';
}

const db = { todos: [] }
_.insert(db.todos, {title: 'wurk it'});

server.get('/todos', (request) => {
  return [200, {}, {todos: db.todos}];
});

server.post('/todos', (request) => {
  const todo = _.insert(db.todos, JSON.parse(request.requestBody));
  return [200, {}, todo];
});

const mappings = {
  todos: {
    url: '/todos'
  }
}
const cache = {
  todos: [
    {jammin: 'usa'}
  ]
}
const store = restStore(mappings, jsStoreAdapter(cache, mappings));

// store.findAll('todos', {}, {force: true}).then(data => console.log(data))

store.create('todos', {id: 3, title: 'creating it live'}).then(data => {
  console.log(store.cache)
})
