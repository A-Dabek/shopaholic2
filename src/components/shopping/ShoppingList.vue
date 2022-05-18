<template>
  <div class="box">
    <ol class="block">
      <ShoppingListItem
        v-for="item of itemsToBuy"
        :key="item.name"
        :item="item"
        :isBought="false"
        @click="emits('buy', item.name)"
      />
    </ol>

    <ol>
      <ShoppingListItem
        v-for="item of itemsBought"
        :key="item.name"
        :item="item"
        :isBought="true"
        @click="emits('undo', item.name)"
      />
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { ShoppingItem } from '@/types';
import ShoppingListItem from '@/components/shopping/ShoppingListItem.vue';

interface Props {
  itemsToBuy: ShoppingItem[];
  itemsBought: ShoppingItem[];
}
defineProps<Props>();

interface Emits {
  (e: 'buy', name: string): void;
  (e: 'undo', name: string): void;
}
const emits = defineEmits<Emits>();
</script>

<style scoped>
ol {
  list-style: none !important;
}
</style>
