import login from '../views/login.vue'
import todo from '../views/todo.vue'
// const login = () => import(/* webpackChunkName: "login" */ '../views/login.vue')
// const todo = () => import(/* webpackChunkName: "todo" */ '../views/todo.vue')
export default [
  {
    path: '/',
    name: '主页面',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: login
  },
  {
    path: '/todo',
    name: 'todo',
    component: todo
  }
]
