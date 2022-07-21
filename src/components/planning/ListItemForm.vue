<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <input
        class="input"
        autofocus
        ref="nameInput"
        v-model="name"
        type="text"
        placeholder="Name"
        :disabled="!nameEnabled"
        required
      />
    </div>
    <div class="field is-grouped">
      <div class="control is-expandedl">
        <input
          class="input is-small"
          v-model="quantity"
          type="number"
          placeholder="1"
          step="0.01"
          min="0"
        />
      </div>
      <div class="control">
        <div class="select is-small">
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
          rows="2"
          v-model="description"
          placeholder="Description"
        ></textarea>
      </div>
    </div>
    <div class="buttons is-justify-content-end">
      <button class="button is-white" @click="emits('cancel')">Back</button>
      <button class="button is-primary" type="submit">Save</button>
      <button class="button is-primary" type="button" @click="onSaveAndNext">
        Save & Next
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { QuantityType, ShoppingItem } from '@/types';
import { onMounted, ref } from 'vue';

interface Props {
  default?: ShoppingItem;
}
const props = defineProps<Props>();
interface Emits {
  (e: 'newItem', item: ShoppingItem): void;
  (e: 'saveAndNext', item: ShoppingItem): void;
  (e: 'cancel'): void;
}
const emits = defineEmits<Emits>();

let nameEnabled = ref(true);
let nameInput = ref<HTMLInputElement>();
let quantityTypes = ref<QuantityType[]>(['x', 'kg', 'g', 'ml', 'l']);
let name = ref('');
let description = ref('');
let quantity = ref<number | undefined>();
let quantityType = ref<QuantityType>('x');
let urgent = ref(false);

onMounted(() => {
  nameEnabled.value = true;
  if (props.default) {
    nameEnabled.value = false;
    name.value = props.default?.name;
    description.value = props.default?.description;
    quantity.value = props.default?.quantity;
    quantityType.value = props.default?.quantityType;
    urgent.value = props.default?.urgent;
  }
  nameInput.value?.focus();
  nameInput.value?.scrollIntoView({ behavior: 'smooth' });
});

function getNewItem() {
  const newItem = {
    name: name.value,
    description: description.value,
    quantity: quantity.value || 1,
    quantityType: quantityType.value,
    timestamp: new Date().getTime(),
    urgent: urgent.value,
  };
  name.value = '';
  description.value = '';
  quantity.value = undefined;
  quantityType.value = 'x';
  urgent.value = false;
  return newItem;
}

function onSubmit() {
  emits('newItem', getNewItem());
  nameEnabled.value = true;
}

function onSaveAndNext() {
  emits('saveAndNext', getNewItem());
  nameEnabled.value = true;
}
</script>
