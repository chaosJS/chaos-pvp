const express = require('express')
const app = express()
app.use(express.json())
app.use(
  require('cors')({
    allowedHeaders:
      // 加Authorization allowed头 否则报跨域错误
      'Origin, x-requested-with, Content-Type, X-Token,Authorization', //X-Token为自定义的头字段
    credentials: true //设置成true 请求中才会带上cookie信息，否则请求失败
  })
)
// 全局设定，并且ignore
app.set('secretKey', 'hello-express')
// 管理平台 api
require('./routes/admin')(app)
// 操作数据库
require('./plugins/db')(app)
// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
app.listen(5222, () => {
  console.log('app run on port 5222: ', 'http://localhost:5222')
})
