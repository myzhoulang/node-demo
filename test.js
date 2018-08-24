const assert = require('assert');
const CountStream = require('./countstream');
const countStream = new CountStream('example');
const fs = require('fs');
let passed = 0;

countStream.on('total', (count) => {
  console.log(assert.strictEqual(count, 1));
  passed++
});

fs.createReadStream(__filename).pipe(countStream);

process.on('exit', () => {
  console.log('Assertions passed:', passed);
});
