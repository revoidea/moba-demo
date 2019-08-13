const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username:{type:String},
    password:{
        type:String,
        select:false,//表示不把密码查出来
        set(val){
            //散列: bcrypt  --不可逆的，建议用bcrypt做密码的散列
            return require('bcrypt').hashSync(val,10);
        }}
})
module.exports = mongoose.model('AdminUser',schema)