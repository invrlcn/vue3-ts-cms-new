<script setup lang="ts">
import useCounterStore from './store/test'
const store = useCounterStore()

const incrementHandle = () => {
  store.incrementAction()
}
</script>

<template>
  <div class="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">主页</router-link>
    <h2>{{ store.count }} -- {{ store.doubleCounter }}</h2>
    <button @click="incrementHandle()">+10</button>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
