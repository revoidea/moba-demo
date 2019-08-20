const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String},//标题
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String},
},{
    timestamps:true//时间戳
})

//导出模型
module.exports = mongoose.model('Article',schema)