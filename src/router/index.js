import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Items from '@/views/Items'
import Cart from '@/views/Cart'
import EditItem from '@/views/EditItem'

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
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/edit-item/:id',
      component: EditItem,
      name: 'editForm'
    }
  ]
})
