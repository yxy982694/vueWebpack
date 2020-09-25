import Vue from 'vue'
import Router from 'vue-router'
import routerArr from './routes.js'
Vue.use(Router)
export default () => {
  return new Router({
    routes: routerArr
  })
}
