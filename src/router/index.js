import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const ShowDetails = () => import('../views/show/Details.vue')
const PageNotFound = () => import('../views/PageNotFound.vue')

Vue.use(VueRouter)

export const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shows/:id',
    name: 'ShowDetails',
    props: true,
    component: ShowDetails
  },
  {
    path: '*',
    name: 'not-found',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router