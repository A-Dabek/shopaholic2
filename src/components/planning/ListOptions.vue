<template>
  <div class="buttons">
    <button class="button is-danger" @click="onClear">Clear</button>
    <button class="button is-black" @click="onRemove">Remove</button>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'clear'): void;
  (e: 'remove'): void;
}
const emits = defineEmits<Emits>();

function onRemove() {
  emits('remove');
}

function onClear() {
  emits('clear');
}
</script>
