module.exports = options =>{

    const jwt = require('jsonwebtoken')
    const AdminUser = require('../modules/AdminUser')
    const assert = require('http-assert')

    return async(req,res,next) =>{
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
        const { id } = jwt.verify(token,req.app.get('secret'))//返回的是一个对象
        assert(id,401,'请先登陆')//无效的jwt token
        //2.根据用户id去查找用户,挂在req上表示在后续可以调用user
        req.user = await AdminUser.findById(id)
        assert(req.user,401,'请先登陆')
        await next()//表示中间执行完之后，会调用下一个处理函数
    }
}