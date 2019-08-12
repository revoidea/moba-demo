const express = require('express')

const app = express()


app.use(require('cors')())
app.use(express.json())

//静态文件托管
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000,() => {
   console.log('http://localhost:3000');
});