import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemsEdit from './views/ItemEdit.vue'
import ItemsList from './views/ItemList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'


import Demo from './views/Demo.vue'


Vue.use(Router)

//导航守卫（vue router 官方文档）
const router = new Router({
  routes: [
    {path:'/login',name:'login',component:Login,meta:{isPublic:true} },//isPublic:路由限制
    {path:'/demo',name:'demo',component:Demo },//isPublic:路由限制
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:"/categories/create",component:CategoryEdit},
        {path:"/categories/edit/:id",component:CategoryEdit,props:true},
        {path:"/categories/list",component:CategoryList},

        {path:"/items/create",component:ItemsEdit},
        {path:"/items/edit/:id",component:ItemsEdit,props:true},
        {path:"/items/list",component:ItemsList},

        {path:"/heroes/create",component:HeroEdit},
        {path:"/heroes/edit/:id",component:HeroEdit,props:true},
        {path:"/heroes/list",component:HeroList},

        {path:"/articles/create",component:ArticleEdit},
        {path:"/articles/edit/:id",component:ArticleEdit,props:true},
        {path:"/articles/list",component:ArticleList},

        {path:"/ads/create",component:AdEdit},
        {path:"/ads/edit/:id",component:AdEdit,props:true},
        {path:"/ads/list",component:AdList},

        {path:"/admin_users/create",component:AdminUserEdit},
        {path:"/admin_users/edit/:id",component:AdminUserEdit,props:true},
        {path:"/admin_users/list",component:AdminUserList},
      ]
    }
  ]
})


/**
 * beforeEach的作用
 *表示在每一次切换路由的时候要做什么
 * to:去那个界面
 * from：来自那个界面
 * next：表示要不要进去或者怎么处理
 * */
router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router