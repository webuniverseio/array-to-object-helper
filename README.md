# array-to-object-helper
Install with `yarn add array-to-object-helper` or `npm i array-to-object-helper`.

Ever had a situation when conversion from array to object looked way too verbose?

```js
Promise.resolve([1,2,3,4,5,6,7,8])
.then(([one, two, three, four, five, six, seven, eight]) => 
  ({one, two, three, four, five, six, seven, eight}))
```

With this utility you can turn in into less verbose version:
```js
const AtoO = require('array-to-object-helper');

Promise.resolve([1,2,3,4,5,6,7,8])
.then(AtoO(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']))
```

Or even less verbose:
```js
const {to} = require('array-to-object-helper');

Promise.resolve([1,2,3,4,5,6,7,8])
.then(to`{one, two, three, four, five, six, seven, eight}`)
```
This basically looks like a syntax sugar. Maybe one day js will have something similar built in.

This is also valid:
```js
Promise.resolve([1,2]).then(to`{one, x-two,}`);
Promise.resolve([1,2,3]).then(to`{
  $,2,
  x-three
}`);
```

# api
- AtoO(keysArray)(valuesArray): Object
- AtoO(valuesArray, keysArray): Object
- AtoO throws nice error if keysArray.length !== valuesArray.length or when length is 0
- AtoO.to\`objectShapeFormat\`(valuesArray): Object
- AtoO.to validates objectShapeFormat and throws nice error if format is not valid