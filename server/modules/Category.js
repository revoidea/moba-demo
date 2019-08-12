const mongoose = require('mongoose');

const schema  = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},//表示数据库里的object的id，mongodb里面的这种id是ObjectId,ref指定关联对象（模型）
    
})

module.exports = mongoose.model('Category',schema)