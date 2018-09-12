const express = require('express');
const Mock = require('mockjs');

const app = express();

app.get('/api/users', (req, res) => {
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'name': function () {
        return Mock.mock('@cname')
      },
      'age|1-120': 1,
      'address': function () {
        return Mock.mock('@county(true)')
      }
    }]
  })
  res.json(data)
})

app.listen(3008, () => {
  console.log('api server is running');
})