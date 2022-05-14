<template>
  <li>
    <label>{{ item.name }}</label>
    <span>2 days</span>
    <span>{{ item.quantity }}{{ item.quantityType }}</span>
    <p>{{ item.description }}</p>
  </li>
</template>

<script setup lang="ts">
import type { ShoppingItem } from '@/features/planning/types';

interface Props {
  item: ShoppingItem;
}

defineProps<Props>();
</script>
