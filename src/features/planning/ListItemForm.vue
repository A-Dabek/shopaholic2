<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="name" />
    <input type="number" v-model="quantity" />
    <ul>
      <li
        v-for="type in quantityTypes"
        :key="type"
        @click="quantityType = type"
      >
        {{ type }}
      </li>
    </ul>
    <textarea v-model="description" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { QuantityType, ShoppingItem } from '@/features/planning/types';

interface Emits {
  (e: 'newItem', item: ShoppingItem): void;
}
const emits = defineEmits<Emits>();

let quantityTypes = ref<QuantityType[]>(['x', 'kg', 'g', 'ml', 'l']);
let name = ref('');
let description = ref('');
let quantity = ref(1);
let quantityType = ref<QuantityType>('x');

function onSubmit() {
  emits('newItem', {
    name: name.value,
    description: description.value,
    quantity: quantity.value,
    quantityType: quantityType.value,
    timestamp: new Date().getTime(),
  });
  name.value = '';
  description.value = '';
  quantity.value = 1;
  quantityType.value = 'x';
}
</script>
