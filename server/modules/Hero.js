const mongoose = require('mongoose');

const schema  = new mongoose.Schema({

    /**从界面布局以及展示的信息，可以推测出它的数据结构 */

    name:{type:String},//名称
    avatar:{type:String},//头像
    title:{type:String},//称号
    //一个分类时
   // category:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},//关联--类型

    //多个分类时
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],//类型
    scores:{
        difficult:{type:Number},//难度
        skills:{type:Number},//技能
        attack:{type:Number},//攻击
        survive:{type:Number}//生存
    },//评分

    skills:[{
        icon:{type:String},//图标
        name:{type:String},//名称
        description:{type:String},//介绍
        tips:{type:String}//小提示
    }],//技能

    //items1表示顺风组装，items2表示逆风组装
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],//装备--关联（物品）
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],//装备--关联（物品）

    //usage_tips ---monogodb字段命名方式
     usageTips:{type:String},//使用技巧
     battleTips:{type:String},//对抗技巧
     teamTips:{type:String},//团战思路

     partners:[{
         hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},//英雄
         description:{type:String}//描述
     }]//英雄关系（搭档）

    /**在mongodb里面可以轻松定义‘数组’，‘对象’等这些特殊类型 */
    /**命名时需要注意单复数 */

    /**命名规范：
     * 类名：首字母大写，
     * js属性名称：首字母小写的驼峰命名法，
     * monogodb字段名称：多个单词间用‘_’隔开，但是在js中，因为语法跟js相似，所以采用js
     * 的命名方式
     */
})


//第一个参数是模型名称，第二个参数是表结构，第三个参数是表名(集合名)，可不传，默认是模型名称小写+s，如 articles
module.exports = mongoose.model('Hero',schema,'heroes')