import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/doc',
    name: 'Document',
    component: () => import('@/views/Document.vue')
  },
  {
    path: '/datasource',
    name: 'DataSource',
    component: () => import('@/views/console/DataSource.vue')
  },
  {
    path: '/prjectinfo',
    name: 'PrjectInfo',
    component: () => import('@/views/console/PrjectInfo.vue')
  },
  {
    path: '/datatype',
    name: 'DataType',
    component: () => import('@/views/console/DataType.vue')
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import('@/views/console/Generator.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
