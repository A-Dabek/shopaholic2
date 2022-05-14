<template>
  <li>
    <div class="columns is-mobile is-multiline is-gapless">
      <div class="column">
        <label>{{ item.name }}</label>
      </div>
      <div class="column is-narrow">
        <span>{{ item.quantity }}{{ item.quantityType }}</span>
      </div>
      <div class="column is-full">
        <small>{{ item.description }}</small>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ShoppingItem } from '@/features/planning/types';

interface Props {
  item: ShoppingItem;
}

defineProps<Props>();
</script>
