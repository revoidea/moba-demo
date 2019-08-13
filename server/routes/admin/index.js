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
    router.get('/',async(req,res,next) =>{
        //中间件：注意要加一个next参数，然后在函数里面调用
        /**
         * http-assert包：用于测试的时候，判断确保东西是否存在或者条件是否正确
         */
        /**
         * 验证用户是否登陆
         * 获取用户信息,这个用户信息一般情况下，习惯性的在请求头里面去传
         * pop():表示提取最后一个元素
         * 1.获取token（userId），并解密
         **/
        const token =String(req.headers.authorization || '').split(' ').pop();// 获取token
        assert(token,401,'请先登陆')//请提供jwt token
        // console.log(req.headers.authorization)
        //解密：verify()会进行验证
        const { id } = jwt.verify(token,app.get('secret'))//返回的是一个对象
        assert(id,401,'请先登陆')//无效的jwt token
        //2.根据用户id去查找用户,挂在req上表示在后续可以调用user
        req.user = await AdminUser.findById(id)
        assert(req.user,401,'请先登陆')
        await next()//表示中间执行完之后，会调用下一个处理函数
   },async(req,res) =>{
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