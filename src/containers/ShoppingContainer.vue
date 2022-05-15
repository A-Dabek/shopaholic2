<template>
  <div class="content">
    <div class="buttons is-justify-content-space-between">
      <button class="button is-primary" @click="goToPlanning">Planning</button>
      <button class="button is-warning" @click="onReset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlanningStore } from '@/stores/planning.store';
import { useRouter } from 'vue-router';

const store = usePlanningStore();
const router = useRouter();

function goToPlanning() {
  router.push('/');
}

function onReset() {}
</script>
