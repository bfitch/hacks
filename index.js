// import $ from 'jquery';
// import Backbone from 'backbone';
import Baobab from 'baobab';

var baobab = new Baobab({
  todos: [{id: 1, title: 'boo'}, {id: 2, title: 'boo'}],
  currentUser: { first_name: 'boo'}
});

baobab.select('currentUser').on('update', function() {
  console.log('user uuuuupdate');
});

baobab.select('todos').on('update', function() {
  console.log('todos uuuuupdate');
});

function setWhere(path, attrs, newAttrs = null) {
  const key    = Object.keys(attrs).pop();
  const value  = attrs[key]
  const cursor = baobab.select(path);

  if (Array.isArray(cursor.get())) {
    setCollection(cursor, key, value, newAttrs);
  } else {
    setObject(cursor, key, value, newAttrs);
  }
}

function setObject(cursor, key, value, newAttrs) {
  if (cursor.get()[key]) {
    !newAttrs ? cursor.set(null) : cursor.deepMerge(newAttrs);
  }
}

function setCollection(collection, key, value, newAttrs) {
  const items   = collection.get().filter(item => item[key] === value);
  const indices = items.map(item => collection.get().indexOf(item));
  indices.forEach(i => {
    if (!newAttrs) {
      items.map(item => collection.unset(collection.get().indexOf(item)));
    } else {
      collection.splice([i, 1, Object.assign({}, items[i], newAttrs)]);
    }
  });
}

setWhere('todos', {title: 'boo'}, {completed: true});

setWhere('currentUser', {first_name: 'boo'}, {isAdmin: true});

console.log(JSON.stringify(baobab.get(),null,2))
