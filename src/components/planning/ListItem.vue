<template>
  <li>
    <div
      class="columns is-mobile is-multiline is-gapless"
      :class="{ box: expanded }"
    >
      <div class="column">
        <span
          :class="{
            'is-invisible': !(item.urgent || daysPassed > 1),
            'is-danger': item.urgent,
            'is-warning': daysPassed > 1,
          }"
          class="tag mr-1"
          >{{ item.urgent ? '!' : daysPassed }}</span
        >
        <label :class="{ bought: isBought }">{{ item.name }}</label>
      </div>
      <div class="column is-narrow">
        <span>{{ item.quantity }}{{ item.quantityType }}</span>
      </div>
      <div class="column is-offset-2 is-10">
        <small>{{ item.description }}</small>
      </div>
      <template v-if="expanded">
        <div class="column mt-1">
          <button class="button" @click.stop="emits('remove')">❌</button>
        </div>
        <div class="column mt-1">
          <button class="button" @click.stop="emits('edit')">✏️</button>
        </div>
        <div class="column is-narrow mt-1">
          <div class="buttons">
            <button class="button" @click.stop="emits('increment')">➕</button>
            <button class="button" @click.stop="emits('decrement')">➖</button>
          </div>
        </div>
      </template>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ShoppingItem } from '@/types';
import { computed } from 'vue';

interface Props {
  item: ShoppingItem;
  expanded: boolean;
  isBought: boolean;
}
interface Emits {
  (e: 'increment'): void;
  (e: 'decrement'): void;
  (e: 'remove'): void;
  (e: 'edit'): void;
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

<style scoped>
.bought {
  text-decoration: line-through;
}
</style>
