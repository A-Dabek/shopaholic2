<template>
  <div class="block">
    <ListForm @newList="store.addList"></ListForm>
  </div>
  <ListComponent
    v-for="list in store.lists"
    :list="list"
    :key="list.name"
    @remove="store.removeList(list.name)"
    @clear="store.clearList(list.name)"
    @newItem="store.addItemToList(list.name, $event)"
    @increment="store.incrementItemQuantity(list.name, $event)"
    @decrement="store.decrementItemQuantity(list.name, $event)"
    @removeItem="store.removeItemFromList(list.name, $event)"
  ></ListComponent>
</template>

<script setup lang="ts">
import ListComponent from '@/features/planning/ListComponent.vue';
import ListForm from '@/features/planning/ListForm.vue';
import { usePlanningStore } from '@/stores/planning.store';

let store = usePlanningStore();
</script>
