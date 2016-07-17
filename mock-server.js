import Pretender from 'pretender';
import _ from 'lodash';
import _db from './underscore-db';
_.mixin(_db);

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

server.put('/todos/:id', (request) => {
  const id = Number(request.params.id)
  const todo = _.replaceById(db.todos, id, JSON.parse(request.requestBody));
  return [200, {}, todo];
});
