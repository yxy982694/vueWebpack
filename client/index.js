import Vue from 'vue'
import App from './app.vue'
import './assets/images/gongdan0.png'
import createRouter from './router/router.js'
const router = createRouter()
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
