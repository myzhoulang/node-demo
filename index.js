const fs = require('fs');
const path = require('path');


const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const uuid = require('node-uuid');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const mySql = require('mysql');
const RedisStore = require('connect-redis')(session);
const app = express();
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

const redisStore = new RedisStore({
  host: '192.168.1.176',
  port: 6379,
  prefix: 'node:',
  ttl: 60*60*24,
  // client: client,
  pass: '1017~Fulin2017',
  logErrors: true
});

morgan.token('query', (req, res) => {
  return JSON.stringify(req.query) || '-'
});

morgan.token('body', (req, res) => {
  return JSON.stringify(res.body) || '-'
})

app.use(morgan('[request  info]  =====> :method :url 请求参数 ===> :query', {stream: accessLogStream}));
app.use(morgan('[response info]  =====> :url :status 响应数据 ===> :body', {stream: accessLogStream}));

app.use(session({
  // use UUIDs for session IDs
  genid: function(req) {
    return uuid.v4()
  },
  // 设置 cookie的信息 这里的值在redis中会提现出
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  },
  rolling: true,
  name: 'sessionId',
  store: redisStore,
  secret: 'secretSign#143_!223',
  resave: false,
  saveUninitialized: false
}));

// request body parse
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// get port or set default port
app.set('port', process.env.PORT || 3001);

const connection = mySql.createConnection({
  host: '192.168.1.176',
  port: 3506,
  database: 'eaglehorn_engine',
  user: 'root',
  password: '1017~Fulin'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('数据库连接成功');
});

app.get('/login', (req, res, next) => {
  req.session.email = '604389771@163.com'
  res.json({ message: 'login'});
  res.body = { message: 'login'}
});

app.get('/', (req, res) => {
  if (req.session.email) {
    res.json({
      email: req.session.email,
      message: 'Sucess'
    })
  } else {
    res.json({
      message: 'No auth'
    })
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        message: 'Logout'
      })
    }
  })
});

// connection.query('SELECT * FROM ')

//
//
//
//
//
//
//
//
//
// app.get('/', (req, res) => {
//   res.send(`
//     <form action="/login" method="post">
//       <input type="submit" value="Login">
//     </form>`)
// });
//
// // Login
// app.get('/login', (req, res) => {
//   // mock user
//   const user = {
//     id: 1,
//     userName: 'zhoul'
//   };
// console.log(req.session.id)
//   // jwt.sign({user}, privateKey, (err, token) => {
//   //   if (!err) {
//       redisStore.set('sid', user)
//       req.session.user = user;
//       // req.session.save();  //保存一下修改后的Session
//       // res.cookie('sessionId', req.session.id)
//       res.json({
//
//       });
//   //   }
//   // });
// });
//
// app.get('/Users', (req, res) => {
//   console.log(req.session.id)
//   res.json({})
// });
//
// app.get('/post', (req, res) => {
//   console.log(req.session.id)
//
//   res.json({
//     name: '123',
//     age: 123
//   })
// })
//
//
//
// // // app.use(session({
// // //   secret: 'some-private-key',
// // //   key: 'test',
// // //   proxy: 'true',
// // //   store: new MemcachedStore({
// // //     hosts: ['127.0.0.1:11211'],
// // //     secret: 'memcached-secret-key'
// // //   })
// // // }));
// //
// // const readStream = fs.createReadStream(path.join(__dirname, 'index.js'));
// //
// // const writeStream = fs.createWriteStream(path.join(__dirname,'copy.js'))
// //
// // readStream.pipe(writeStream)
// //
// // console.log('OK')
// //
// // app.get('/', (req, res, next) => {
// //   let sessData = req.session;
// //   sessData.someAttribute = 'foo';
// //   res.send('Returning with som text')
// // });
// //
// // app.get('/bar', (req, res, next) => {
// //   console.log(req.session)
// //
// //   let someAttribute = req.session.someAttribute;
// //   res.send(`This will print the attribute I set earlier: ${someAttribute}`);
// // });
//
// app.get('/Users', (req, res) => {
//   console.log(req.session)
//   res.status(200).json({userName: 'ABC'})
// });

app.listen(app.get('port'), () => {
  console.log(`Servers start in http://localhost:${app.get('port')}`);
});
