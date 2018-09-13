const express = require('express');
const Mock = require('mockjs');

const app = express();

app.get('/api/users', (req, res) => {
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'name': () => {
        return Mock.mock('@cname')
      },
      'createTime': () => {
        return Mock.mock('@datetime')
      },
      'age|1-120': 1,
      'address': () => {
        return Mock.mock('@county(true)')
      }
    }]
  });
  setTimeout(() => {
    res.json(data);
  }, 2000);
});

app.get('/api/users/:id', (req, res) => {
  const params = req.params;
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'user': {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id': params.id,
      'name': () => {
        return Mock.mock('@cname')
      },
      'sex|0-1':'number',
      'no|001': () => {
        return Mock.mock('@integer(60, 100)')
      },
      'phone': () => {
        return Mock.mock({
          'regexp': /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
        })
      },
      'department|0-4': 'number',
      'email': () => {
        return Mock.mock('@email')
      },
      'roles': () => {
        Mock.mock('@range(0, 4, 2)')
      }
    }
  });
  setTimeout(() => {
    res.json(data);
  }, 2000);
})

app.listen(3008, () => {
  console.log('api server is running');
});