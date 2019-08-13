import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
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

Vue.use(Router)

export default new Router({
  routes: [
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
      ]
    }
  ]
})
