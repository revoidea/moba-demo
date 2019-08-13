import axios from 'axios'
import Vue from 'vue'
import router from './router'
 
const http = axios.create({
    baseURL :'http://localhost:3000/admin/api'
})

/**
 * 加一个拦截器（axios的官方文档找：interceptors）
 * 
 */
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    //Authorization:传的授权信息，值前面加个类型（Bearer），因为类型有很多种
    if(localStorage.token){
        config.headers.Authorization = 'Bearer '+localStorage.token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


/**
 * 关于返回的错误提示消息，一般都是全局捕获
 * 跟http请求加一个拦截器
 * 
 * 去npm官方网站，查看axios的官方文档interceptors(请求拦截器)
 */
http.interceptors.response.use(res => {
    return res 
},err => {
    /**
     * 当服务端返回的错误代码，有message的话，就采用这种处理方案 (响应拦截)
     * 好处是：不用在每个界面去监听有什么错误返回（调用接口的时候）
     */
    //当message有数据才执行该代码
     if(err.response.data.message){
        //err.response :返回一个响应的数据对象
        Vue.prototype.$message({ //用的是element-ui里面的$message方法
            type:'error',
            message:err.response.data.message
        })
       if(err.response.status === 401){
            router.push('/login')
       }
     }
     return Promise.reject(err)
})

export default http