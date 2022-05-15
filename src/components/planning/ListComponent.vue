<template>
  <div class="box content">
    <div class="columns is-mobile">
      <div class="column">
        <h1 class="title is-5">{{ list.name }}</h1>
      </div>
      <div class="column is-narrow">
        <button
          class="button is-white is-rounded"
          @click="isOptionsOpen = !isOptionsOpen"
        >
          {{ isOptionsOpen ? 'Back' : 'Options' }}
        </button>
      </div>
    </div>
    <ListOptions
      v-if="isOptionsOpen"
      @remove="emits('remove')"
      @clearAll="onClearAll"
      @clearBought="onClearBought"
    />
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
          :isBought="boughtItemsNames.includes(item.name)"
          @click="onExpand(item.name)"
          @increment="emits('increment', item.name)"
          @decrement="emits('decrement', item.name)"
          @remove="emits('removeItem', item.name)"
        />
      </ol>
      <div class="buttons is-justify-content-space-between">
        <button class="button is-black is-rounded" @click="emits('shopping')">
          Shopping
        </button>
        <button class="button is-primary is-rounded" @click="isFormOpen = true">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListItem from '@/components/planning/ListItem.vue';
import { ref } from 'vue';
import ListItemForm from '@/components/planning/ListItemForm.vue';
import ListOptions from '@/components/planning/ListOptions.vue';
import type { ShoppingItem, ShoppingList } from '@/types';

interface Props {
  list: ShoppingList;
  boughtItemsNames: string[];
}

defineProps<Props>();

interface Emits {
  (e: 'newItem', item: ShoppingItem): void;
  (e: 'clearAll'): void;
  (e: 'clearBought'): void;
  (e: 'remove'): void;
  (e: 'increment', item: string): void;
  (e: 'decrement', item: string): void;
  (e: 'removeItem', item: string): void;
  (e: 'shopping'): void;
}

const emits = defineEmits<Emits>();

let isOptionsOpen = ref(false);

function onClearAll() {
  emits('clearAll');
  isOptionsOpen.value = false;
}

function onClearBought() {
  emits('clearBought');
  isOptionsOpen.value = false;
}

let isFormOpen = ref(false);

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
