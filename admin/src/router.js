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
      ]
    }
  ]
})
