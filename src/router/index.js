import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilmView from '../views/FilmView.vue'
import CharacterView from '../views/CharacterView.vue'
import VehicleView from '../views/VehicleView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Film/:episodeId',
    name: 'Film',
    component: FilmView,
    props: true 
  },
  {
    path: '/Character/:id',
    name: 'Character',
    component: CharacterView,
    props: true 
  },
  {
    path: '/Vehicle/:id',
    name: 'Vehicle',
    component: VehicleView,
    props: true 
  },
  /*
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(
      // webpackChunkName: "about" 
      '../views/AboutView.vue')
  }
  */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
