import "babel-polyfill";
import './mock-server';
import {restStore, jsStoreAdapter} from 'rest-store';

// client
const mappings = {
  todos: {
    url: '/todos'
  }
}
const cache = {
  todos: [
    { id: 1, title: 'usa' }
  ]
}
const store = restStore(mappings, jsStoreAdapter(cache, mappings));

(async function() {
  await store.create('todos', {id: 3, title: 'creating it live'})

  await store.update('todos', {id: 3}, {id: 3, title: 'updating it live'})

  await store.delete('todos', {title: 'usa'})

  const data = await store.findAll('todos')
  console.log(data)

})()
