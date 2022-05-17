<template>
  <li>
    <div class="columns is-mobile is-multiline is-gapless">
      <div class="column">
        <span
          :class="{
            'is-invisible': !item.urgent,
          }"
          class="tag mr-1 is-danger"
          >!</span
        >
        <label :class="{ bought: isBought }">{{ item.name }}</label>
      </div>
      <div v-if="showQuantity" class="column is-narrow">
        <span>{{ item.quantity }}{{ item.quantityType }}</span>
      </div>
      <div class="column is-offset-2 is-10">
        <small>{{ item.description }}</small>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ShoppingItem } from '@/types';
import { computed } from 'vue';

interface Props {
  item: ShoppingItem;
  isBought: boolean;
}

const props = defineProps<Props>();
const showQuantity = computed(() => {
  const isSingleItem =
    props.item.quantityType === 'x' && props.item.quantity === 1;
  return !isSingleItem;
});
</script>

<style scoped>
.bought {
  text-decoration: line-through;
}
</style>
