<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="name" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Emits {
  (e: 'newList', name: string): void;
}
const emits = defineEmits<Emits>();

let name = ref('');

function onSubmit() {
  emits('newList', name.value);
  name.value = '';
}
</script>
