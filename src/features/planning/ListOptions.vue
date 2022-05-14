<template>
  <div>
    <span @click="onClear">Clear</span>
    <span @click="onRemove">X remove</span>
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
