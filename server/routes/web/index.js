module.exports = app => {
   const router = require('express').Router()

   const mongoose = require('mongoose')

   //const Article = require('../../modules/Article')
   //等同如上引用，因为在mongodb数据库里模型已存在
   const Category = mongoose.model('Category')
   const Article = mongoose.model('Article')

   //初始化新闻
   router.get('/news/init',async (req,res) => {
      //const cats = await Category.find().lean()
      const parent = await Category.findOne({
         name:'新闻分类'
      })
      const cats = await Category.find().where({
         parent:parent
      }).lean()
      const newsTitles = ["审判系统信誉经验恢复速率调整公告", "王者荣耀公布“无限开放计划”：探索游戏边界，共享荣耀", "暑期粉丝节狂欢，快手直播邀你一起来上分！", "《王者荣耀》对话岭南优秀非遗文化 跨界融合南狮发力新文创", "《乱世王者》两周年庆：四大看点开启狂欢盛宴", "审判系统信誉经验恢复速率调整公告", "8月17日全服不停机更新公告", "【已开服】8月15日正式服“五虎上将”版本更新公告", "【正式服】“五虎上将”版本异常问题说明", "王者模拟战更新公告", "新版本峡谷狂欢活动周开启", "【微信游戏专属】微信游戏6周年活动已开启", "马超的五虎试炼 马小超专属头像框等你领", "五虎将聚首 新版本超值福利回馈", "首届峡谷最强战队争霸赛 八月开启", "赛程过半，城市赛省赛高光时刻齐回顾！", "2019年KPL秋季转会期俱乐部挂牌名单公布", "AG超玩会重回KPL秋季赛，2019KPL秋季赛转会期窗口今日开启", "我们是世冠冠军！这个2019，eStarPro注定是最璀璨的那颗星", "世冠总决赛今日16:30打响，RW、eStarPro谁将夺得首个世冠冠军？"]
      const newsList = newsTitles.map(title => {
         //slice:表示复制一份cats数据来进行随机排序
         const randomCats =cats.slice(0).sort((a,b) => Math.random() - 0.5)
         return {
            categories:randomCats.slice(0,2),
            title:title
         }
      })
      //插入数据
      await Article.deleteMany({}) // 清空数据
      await Article.insertMany(newsList)//插入数据
      res.send(newsList)
   })
    


   app.use('/web/api',router)
}