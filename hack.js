const cached = [
  {id: 1, title: 'foo'},
  {id: 2, title: 'foo'},
  {id: 3, title: 'foo'}
]

const newCollection = [
  {id: 1, title: 'big'},
  {id: 2, title: 'bigger'},
  {id: 4, title: 'biggest'}
]

const expect = [
  {id: 1, title: 'big'},
  {id: 2, title: 'bigger'},
  {id: 3, title: 'foo'},
  {id: 4, title: 'biggest'}
]

// function _addCollection(cachedData, newCollection, identifier = 'id') {
//   const indexToNewObject = newCollection.map(newObject => {
//
//     const i = cachedData.find(cache => {
//       return cache[identifier] === newObject[identifier]
//     })
//     if (i) {
//       return {
//         cacheIndex: cachedData.indexOf(i),
//         newObject: newObject
//       }
//     } else {
//       return null;
//     }
//   }).filter(i => i);
//
//   indexToNewObject.forEach(item => {
//     cachedData.splice(item.cacheIndex, 1, item.newObject);
//   });
// }

function _addCollection(cachedData, newCollection, identifier = 'id') {
  const cached = cachedData.reduce((memo, object) => {
    return Object.assign(memo, {[object[identifier]]: object});
  },{});

  const payload = newCollection.reduce((memo, object) => {
    return Object.assign(memo, {[object[identifier]]: object});
  },{});

  const updated = Object.assign(cached, payload);

  return Object.keys(updated).reduce((memo, key) => {
    return memo.concat([updated[key]]);
  },[]);
}

console.log(JSON.stringify(_addCollection(cached, newCollection),null, 2));


// console.log(JSON.stringify(cached,null,2));
