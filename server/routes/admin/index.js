module.exports = app => {
   const express = require('express')
   const jwt = require('jsonwebtoken')
   const AdminUser = require('../../modules/AdminUser')
   const assert = require('http-assert')
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
      const items = await req.Model.find().setOptions(queryOption).limit(100);//populate():表示取出关联的信息
      res.send(items);
    })
    //根据id获取数据
    router.get('/:id',async(req,res) =>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

     
    //登陆授权中间件
    const authMiddleware = require('../../middleware/auth')

    /** 
     *资源中间件（获取模型）
     *inflection包：大小写，单复数，或者下划线等一些单词的格式转换
    */
    const resourceMiddleware = require('../../middleware/resource')
    /**
     * 通用接口
     *有两个中间件：一个是登陆授权的，一个是获取模型类名
     * */
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router);

  

    /** 
     * 因为上传文件，使用的不是router，所以需要另外声明一个接口
     * req因为获取不到上传文件的数据，所以需要一个中间件：multer
     */
    const multer = require('multer')
    //__dirname 表示绝对地址
    const upload = multer({dest:__dirname +'/../../uploads'}) //传一个目标地址的参数：dest
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async(req,res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })



    /**登陆接口 */
    app.post('/admin/api/login',async(req,res) => {
       const {username,password} = req.body;
       //1.根据用户名找用户
      // const AdminUser = require('../../modules/AdminUser')
        //    const user = await AdminUser.findOne({
        //        username:username
        //    })

        //因为查出来的username 跟定义的username 名称一致，可以简写
        const user = await AdminUser.findOne({username}).select('+password') //password默认是不查出来的，现在把password成查出来
    
        //    if(!user){//用户不存在时
        //         return res.status(422).send({
        //             message:'用户不存在'
        //         })
        //    }
        //以上屏蔽代码可以写成如下代码
        assert(user,422,'用户不存在')

       //2.校验密码
        const isValid =  require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,'密码错误')
       //3.返回token
       /**
        * 需要用到的模块:jsonwebtoken
        */
        /**
         * sign的第一个参数是可以加任何的前端数据
         * sign的第二个参数是一个密钥，可以赋一个字符串（全局的）
         */
        const token = jwt.sign({id:user._id},app.get('secret')) //app.get('xxx'):一个参数表示是获取配置，多个参数表示获取路由，因为两者获取的方式是一样的
        res.send({token})
    });



    /**
     * 错误处理函数（抛出http异常的处理函数）
     **/
    app.use(async(err,req,res,next) => {
        //console.log(err)
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })


    /**
     * 在node环境下，需要访问或者被访问，都一定要写路由
     */
    
}