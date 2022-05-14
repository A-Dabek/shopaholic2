<template>
  <form @submit.prevent="onSubmit">
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input
          class="input is-small"
          v-model="name"
          type="text"
          placeholder="Name"
        />
      </p>
      <p class="control">
        <button class="button is-small is-primary" type="submit">Submit</button>
      </p>
    </div>
  </form>
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
