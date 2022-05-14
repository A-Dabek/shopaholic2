<template>
  <ListComponent v-for="list in lists" :name="list" :key="list"></ListComponent>
</template>

<script setup lang="ts">
import ListComponent from '@/features/planning/ListComponent.vue';
import { reactive } from 'vue';

const lists = reactive(['List1', 'List2', 'List3']);
</script>
