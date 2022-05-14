<template>
  <div class="box content">
    <h1 class="title is-5 mb-0">{{ list.name }}</h1>
    <ListOptions v-if="isOptionsOpen" @remove="onRemove" @clear="onClear" />
    <ListItemForm v-else-if="isFormOpen" @newItem="onNewItem" />
    <div v-else>
      <ol>
        <ListItem v-for="item in list.items" :key="item.name" :item="item" />
      </ol>
      <span @click="onOpenOptions">Options</span>
      <span @click="onOpenForm">+ Add</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListItem from '@/features/planning/ListItem.vue';
import type { ShoppingItem, ShoppingList } from '@/features/planning/types';
import { ref } from 'vue';
import ListItemForm from '@/features/planning/ListItemForm.vue';
import ListOptions from '@/features/planning/ListOptions.vue';

interface Props {
  list: ShoppingList;
}
defineProps<Props>();

interface Emits {
  (e: 'newItem', item: ShoppingItem): void;
  (e: 'clear'): void;
  (e: 'remove'): void;
}
const emits = defineEmits<Emits>();

let isOptionsOpen = ref(false);
function onOpenOptions() {
  isOptionsOpen.value = true;
}

function onRemove() {
  emits('remove');
  isOptionsOpen.value = false;
}

function onClear() {
  emits('clear');
  isOptionsOpen.value = false;
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
