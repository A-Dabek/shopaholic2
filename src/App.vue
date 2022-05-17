<template>
  <main class="container is-max-widescreen p-1">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watchEffect } from 'vue';
import { cloudStore } from '@/stores/firebase.store';
import { usePlanningStore } from '@/stores/planning.store';

const store = usePlanningStore();
watchEffect(async () => {
  return cloudStore.onBoughtSnapshot(items => store.setBoughtItems(items));
});
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
</style>
