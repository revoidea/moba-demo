module.exports = app => {
   const express = require('express')
   const router = express.Router({
        mergeParams:true//表示合并参数到router，使当前接口方法可以访问
   })
  // const req.Model = require('../../modules/req.Model')
   
   //新增分类
   router.post('/',async(req,res) =>{
       const model = await  req.Model.create(req.body)
       res.send(model)
   });

   //根据id修改分类名称
   router.put('/:id',async(req,res) =>{
      const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
   })

   //根据id删除分类
   router.delete('/:id',async(req,res) =>{
       await req.Model.findByIdAndDelete(req.params.id,req.body)
       //不需要返回对象，返回状态即可
       res.send({
           success:true
       })
   })

   //获取数据列表
   router.get('/',async(req,res) =>{
      const queryOption = {}//需要关联的信息
      if(req.Model.modelName === "Category"){//需要查parent信息的模型
         queryOption.populate = 'parent'
      }
      const items = await req.Model.find().setOptions(queryOption).limit(10);//populate():表示取出关联的信息
       res.send(items);
   })
   //根据id获取数据
   router.get('/:id',async(req,res) =>{
       const model = await req.Model.findById(req.params.id)
       res.send(model)
   })

   //表示通用接口
   app.use('/admin/api/rest/:resource',async(req,res,next) => {
      //因为以下部分为每个接口都需要调用，所以写成中间件，也就是在router加一个前置的处理函数
      const modelName = require('inflection').classify(req.params.resource);//转换模型名称
      //引入模型
      req.Model = require(`../../modules/${modelName}`);
      //表示执行下一个函数，在写中间件需要定义这个参数，来控制执行下一个函数
      next();
   },router);


   /** 
    * inflection包：大小写，单复数，或者下划线等一些单词的格式转换
   */

    /** 
     * 因为上传文件，使用的不是router，所以需要另外声明一个接口
     * 
     * req因为获取不到上传文件的数据，所以需要一个中间件：multer
     * */
     
    const multer = require('multer')
    //__dirname 表示绝对地址
    const upload = multer({dest:__dirname +'/../../uploads'}) //传一个目标地址的参数：dest
    app.post('/admin/api/upload',upload.single('file'),async(req,res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    /**
     * 在node环境下，需要访问或者被访问，都一定要写路由
     */
    
}