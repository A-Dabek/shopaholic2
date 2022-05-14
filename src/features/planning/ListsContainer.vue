<template>
  <ListComponent
    v-for="list in lists"
    :name="list"
    :key="list"
    @remove="onRemove(list)"
  ></ListComponent>
  <ListForm @newList="onNewList($event)"></ListForm>
</template>

<script setup lang="ts">
import ListComponent from '@/features/planning/ListComponent.vue';
import { ref } from 'vue';
import ListForm from '@/features/planning/ListForm.vue';

let lists = ref(['List1', 'List2', 'List3']);

function onRemove(name: string) {
  lists.value = lists.value.filter((n) => n !== name);
}

function onNewList(name: string) {
  lists.value = [...lists.value, name];
}
</script>
