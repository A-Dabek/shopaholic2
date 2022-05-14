<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <div class="columns">
    <header class="column">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />

      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </header>

    <main class="column">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import '../node_modules/bulma/css/bulma.css';
</style>
