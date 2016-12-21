import Vue from 'vue'

import App from './App'

import Books from './components/Books'
import Chapters from './components/Chapters'
import Reader from './components/Reader'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter()

router.map({
  '/books': {
    component: Books
  },
  '/books/:id': {
    component: Chapters
  },
  '/chapters': {
    component: Reader
  }
})
router.redirect({
  '*': '/books'
})

router.start(App, 'app')
