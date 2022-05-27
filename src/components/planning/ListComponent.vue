<template>
  <div class="box content mb-2">
    <div class="columns is-mobile my-0">
      <div class="column py-0">
        <h1 class="title is-5 my-0">{{ name }}</h1>
      </div>
      <div class="column py-0 is-narrow">
        <button
          class="button py-0 is-white is-rounded"
          @click="isOptionsOpen = !isOptionsOpen"
        >
          {{ isOptionsOpen ? 'Back' : 'Options' }}
        </button>
      </div>
    </div>
    <ListOptions
      v-if="isOptionsOpen"
      @remove="
        emits('remove');
        expanded = '';
      "
      @clearAll="onClearAll"
      @clearBought="onClearBought"
    />
    <ListItemForm
      v-else-if="isFormOpen"
      @newItem="onNewItem"
      @saveAndNext="onSaveAndNext"
      @cancel="isFormOpen = false"
    />
    <div v-else>
      <ol class="is-full mx-0 mt-0">
        <ListItem
          v-for="item in items"
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
        <button
          class="button is-black is-rounded"
          @click="
            emits('shopping');
            expanded = '';
          "
        >
          Shopping
        </button>
        <button
          class="button is-primary is-rounded"
          @click="
            isFormOpen = true;
            expanded = '';
          "
        >
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
import type { ShoppingItem } from '@/types';

interface Props {
  name: string;
  items: ShoppingItem[];
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
  expanded.value = '';
}

function onClearBought() {
  emits('clearBought');
  isOptionsOpen.value = false;
  expanded.value = '';
}

let isFormOpen = ref(false);

function onNewItem(item: ShoppingItem) {
  emits('newItem', item);
  expanded.value = '';
  isFormOpen.value = false;
}

function onSaveAndNext(item: ShoppingItem) {
  emits('newItem', item);
  expanded.value = '';
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
