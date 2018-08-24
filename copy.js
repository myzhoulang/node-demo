// const CountStream = require('./countstream');
// const countStream = new CountStream('家');
// const https = require('https');
//
// https.get('https://www.jd.com', function(res){
//   res.pipe(countStream);
// });
//
// countStream.on('total', function (count) {
//   console.log('Total matches:', count)
// })

// import express from 'express';
// import session from 'express-session';
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path')
const MemcachedStore = require('connect-memcached')(session)

const app = express();
app.use(cookieParser());
// app.use(session({
//   secret: 'some-private-key',
//   key: 'test',
//   proxy: 'true',
//   store: new MemcachedStore({
//     hosts: ['127.0.0.1:11211'],
//     secret: 'memcached-secret-key'
//   })
// }));

const readStream = fs.createReadStream(path.join(__dirname, 'index.js'));

const writeStream = fs.createWriteStream(path.join(__dirname,'copy.js'))

readStream.pipe(writeStream)

console.log('OK')

app.get('/', (req, res, next) => {
  let sessData = req.session;
  sessData.someAttribute = 'foo';
  res.send('Returning with som text')
});

app.get('/bar', (req, res, next) => {
  console.log(req.session)

  let someAttribute = req.session.someAttribute;
  res.send(`This will print the attribute I set earlier: ${someAttribute}`);
});

app.listen(3001)

