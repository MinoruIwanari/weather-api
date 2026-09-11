<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">3-3</RouterLink>,
        <RouterLink to="/about">About</RouterLink>,
        <RouterLink to="/4-1">4-1</RouterLink>,
        <RouterLink to="/5-1">5-1</RouterLink>,
        <RouterLink to="/6-1">6-1</RouterLink>,
        <RouterLink to="/7-1">7-1</RouterLink>
      </nav>
    </div>
    <hr>
  </header>

  <RouterView />
</template>
