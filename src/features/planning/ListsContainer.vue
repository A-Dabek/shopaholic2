<template>
  <ListComponent
    v-for="list in lists"
    :name="list"
    :key="list"
    @remove="onRemove(list)"
  ></ListComponent>
</template>

<script setup lang="ts">
import ListComponent from '@/features/planning/ListComponent.vue';
import { ref } from 'vue';

let lists = ref(['List1', 'List2', 'List3']);

function onRemove(name: string) {
  console.log('REMOVAL', name);
  lists.value = lists.value.filter((n) => n !== name);
}
</script>
