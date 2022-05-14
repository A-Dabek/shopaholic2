<template>
  <div class="box content">
    <div class="columns is-mobile">
      <div class="column">
        <h1 class="title is-5">{{ list.name }}</h1>
      </div>
      <div class="column is-narrow">
        <button class="button is-white is-rounded" @click="toggleOptions">
          {{ isOptionsOpen ? 'Back' : 'Options' }}
        </button>
      </div>
    </div>
    <ListOptions v-if="isOptionsOpen" @remove="onRemove" @clear="onClear" />
    <ListItemForm
      v-else-if="isFormOpen"
      @newItem="onNewItem"
      @cancel="isFormOpen = false"
    />
    <div v-else>
      <ol class="is-full mx-0 mt-0">
        <ListItem
          v-for="item in list.items"
          :key="item.name"
          :item="item"
          :expanded="expanded === item.name"
          @click="onExpand(item.name)"
          @increment="emits('increment', item.name)"
          @decrement="emits('decrement', item.name)"
          @remove="emits('removeItem', item.name)"
        />
      </ol>
      <div class="has-text-right">
        <button class="button is-primary is-rounded" @click="onOpenForm">
          Add
        </button>
      </div>
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
  (e: 'increment', item: string): void;
  (e: 'decrement', item: string): void;
  (e: 'removeItem', item: string): void;
}

const emits = defineEmits<Emits>();

let isOptionsOpen = ref(false);

function toggleOptions() {
  isOptionsOpen.value = !isOptionsOpen.value;
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

let expanded = ref('');
function onExpand(name: string) {
  expanded.value = expanded.value === name ? '' : name;
}
</script>

<style scoped>
ol {
  list-style: none !important;
}
</style>
