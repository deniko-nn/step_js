import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AnimeList from '../views/AnimeList.vue'
import ShowAnime from '../views/ShowAnime.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/v1/anime',
    name: 'Anime',
    component: AnimeList
  },
  {
    path: '/v1/anime/:id',
    name: 'ShowAnime',
    component: ShowAnime
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
