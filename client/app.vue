<template>
  <div>
    <div>
      <router-link to="/login">登录页</router-link>
      <router-link to="/todo">todo页</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
	import './assets/styles/test.styl'
	import todo from './views/todo.vue'
	export default {
	  name: 'App',
	  components: {
	    todo
	  },
	  data () {
	    return {
	      name: '张三221111122',
	      age: '23'
	    }
	  },
	  mounted () {
	    console.log('jkjk')
	  }
	}
</script>

<style scoped>
	div{
		border: 1px solid yellow;
		font-size: 13px;
	}
</style>