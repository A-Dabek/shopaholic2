<template>
  <li>
    <div class="columns is-mobile is-multiline is-gapless">
      <div class="column">
        <label>{{ item.name }}</label>
        <span v-if="item.urgent" class="ml-1 tag is-danger">!</span>
        <span v-if="daysPassed > 1" class="ml-1 tag is-warning">{{
          daysPassed
        }}</span>
      </div>
      <div class="column is-narrow">
        <span>{{ item.quantity }}{{ item.quantityType }}</span>
      </div>
      <div class="column is-full">
        <small>{{ item.description }}</small>
      </div>
      <template v-if="expanded">
        <div class="column">
          <button class="button" @click.stop="emits('remove')">x</button>
        </div>
        <div class="column is-narrow">
          <div class="buttons">
            <button class="button" @click.stop="emits('increment')">+</button>
            <button class="button" @click.stop="emits('decrement')">-</button>
          </div>
        </div>
      </template>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ShoppingItem } from '@/features/planning/types';
import { computed } from 'vue';

interface Props {
  item: ShoppingItem;
  expanded: boolean;
}
interface Emits {
  (e: 'increment'): void;
  (e: 'decrement'): void;
  (e: 'remove'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

function daysBetween(date1: Date, date2: Date) {
  let difference = date1.getTime() - date2.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
}

const daysPassed = computed(() => {
  let itemDate = new Date();
  itemDate.setTime(props.item.timestamp);
  let todayDate = new Date();

  return daysBetween(todayDate, itemDate);
});
</script>
