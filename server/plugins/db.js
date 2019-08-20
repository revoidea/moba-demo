module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/moba-demo',{
        useNewUrlParser:true
    })

    //把所有的模型引用一遍
    require('require-all')(__dirname + '/../modules')
}

