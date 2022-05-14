<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <input
        class="input is-small"
        v-model="name"
        type="text"
        placeholder="Name"
      />
    </div>
    <div class="field is-grouped">
      <div class="control">
        <input
          class="input is-small"
          v-model="quantity"
          type="number"
          placeholder="Quantity"
        />
      </div>
      <div class="control">
        <div class="select is-small">
          <select>
            <option v-for="type in quantityTypes" :key="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <textarea
          class="textarea is-small"
          v-model="description"
          placeholder="Description"
        ></textarea>
      </div>
    </div>
    <button class="button is-primary is-small" type="submit">Submit</button>
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
