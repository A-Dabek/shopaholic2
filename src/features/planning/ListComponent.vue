<template>
  <div>
    <h1>{{ name }}</h1>
    <span @click="onRemove">X remove</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}
interface Emits {
  (e: 'remove'): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

function onRemove() {
  emits('remove');
}
</script>
