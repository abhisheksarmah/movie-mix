import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowDetails from '../views/show/Details.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/shows/:id',
    name: 'ShowDetails',
    props: true,
    component: ShowDetails
    // component: () => import( /* webpackChunkName: "show-details" */ '../views/show/Details.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router