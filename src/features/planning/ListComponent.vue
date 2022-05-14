<template>
  <div>
    <h1>{{ list.name }}</h1>
    <ListItemForm v-if="isFormOpen" @newItem="onNewItem" />
    <div v-else>
      <ol>
        <ListItem v-for="item in list.items" :key="item.name" :item="item" />
      </ol>
      <span @click="onRemove">X remove</span>
      <span @click="onOpenForm">+ Add</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListItem from '@/features/planning/ListItem.vue';
import type { ShoppingItem, ShoppingList } from '@/features/planning/types';
import { ref } from 'vue';
import ListItemForm from '@/features/planning/ListItemForm.vue';

interface Props {
  list: ShoppingList;
}
defineProps<Props>();

interface Emits {
  (e: 'remove'): void;
  (e: 'newItem', item: ShoppingItem): void;
}
const emits = defineEmits<Emits>();

function onRemove() {
  emits('remove');
}

let isFormOpen = ref(false);
function onOpenForm() {
  isFormOpen.value = true;
}

function onNewItem(item: ShoppingItem) {
  emits('newItem', item);
  isFormOpen.value = false;
}
</script>
