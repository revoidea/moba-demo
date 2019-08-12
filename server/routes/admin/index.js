module.exports = app => {
   const express = require('express')
   const router = express.Router()
   const Category = require('../../modules/Category')
   
   //新增分类
   router.post('/categories',async(req,res) =>{
       const model = await  Category.create(req.body)
       res.send(model)
   });

   //根据id修改分类名称
   router.put('/categories/:id',async(req,res) =>{
      const model = await Category.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
   })

   //根据id删除分类
   router.delete('/categories/:id',async(req,res) =>{
       await Category.findByIdAndDelete(req.params.id,req.body)
       //不需要返回对象，返回状态即可
       res.send({
           success:true
       })
   })

   //获取数据列表
   router.get('/categories',async(req,res) =>{
       const items = await Category.find().populate('parent').limit(10);//populate():表示取出关联的信息
       res.send(items);
   })

   //根据id获取数据
   router.get('/categories/:id',async(req,res) =>{
       const model = await Category.findById(req.params.id)
       res.send(model)
   })
   app.use('/admin/api',router);
}