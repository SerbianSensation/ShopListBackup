import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Items from '@/views/Items'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/items',
      component: Items
    }
  ]
})
