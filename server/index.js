const express = require('express')

const app = express()

/**
 * 该变量最合理的方式是在环境变量里面去配置
 **/
app.set('secret','i2u2m3l6n2b9d0l3b5')

app.use(require('cors')())
app.use(express.json())

//静态文件托管
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000,() => {
   console.log('http://localhost:3000');
});