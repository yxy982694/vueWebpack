<template>
	<div>
		<div>jwwwkjk2wwwww2111221111222222{{name}}</div>
		<todo></todo>
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
			console.log('jkjk');
		}
	}
</script>

<style scoped>
	div{
		border: 1px solid yellow;
		font-size: 15px;
	}
</style>

