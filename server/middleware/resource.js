module.exports = options => {
    return async(req,res,next) => {
        //因为以下部分为每个接口都需要调用，所以写成中间件，也就是在router加一个前置的处理函数
        const modelName = require('inflection').classify(req.params.resource);//转换模型名称
        //引入模型
        req.Model = require(`../modules/${modelName}`);
        //表示执行下一个函数，在写中间件需要定义这个参数，来控制执行下一个函数
        next();
   }
}