const mongoose = require('mongoose');

const schema  = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},//表示数据库里的object的id，mongodb里面的这种id是ObjectId,ref指定关联对象（模型）
    
})



//获取子分类的方式
schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',//外键
    justOne:false,
    ref:'Category'
})

//获取子分类下的文章的方式
schema.virtual('newList',{
    localField:'_id',
    foreignField:'categories',//外键
    justOne:false,
    ref:'Article'
})
module.exports = mongoose.model('Category',schema)