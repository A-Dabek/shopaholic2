<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <input class="input" v-model="name" type="text" placeholder="Name" />
    </div>
    <div class="field is-grouped">
      <div class="control is-expanded">
        <input
          class="input"
          v-model="quantity"
          type="number"
          placeholder="Quantity"
        />
      </div>
      <div class="control">
        <div class="select">
          <select v-model="quantityType">
            <option v-for="type in quantityTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="urgent" />
          Urgent
        </label>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          v-model="description"
          placeholder="Description"
        ></textarea>
      </div>
    </div>
    <div class="buttons is-justify-content-end">
      <button class="button is-white" @click="onCancel">Back</button>
      <button class="button is-primary" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { QuantityType, ShoppingItem } from '@/features/planning/types';

interface Emits {
  (e: 'newItem', item: ShoppingItem): void;
  (e: 'cancel'): void;
}
const emits = defineEmits<Emits>();

let quantityTypes = ref<QuantityType[]>(['x', 'kg', 'g', 'ml', 'l']);
let name = ref('');
let description = ref('');
let quantity = ref(1);
let quantityType = ref<QuantityType>('x');
let urgent = ref(false);

function onSubmit() {
  emits('newItem', {
    name: name.value,
    description: description.value,
    quantity: quantity.value,
    quantityType: quantityType.value,
    timestamp: new Date().getTime(),
    urgent: urgent.value,
  });
  name.value = '';
  description.value = '';
  quantity.value = 1;
  quantityType.value = 'x';
  urgent.value = false;
}

function onCancel() {
  emits('cancel');
}
</script>
