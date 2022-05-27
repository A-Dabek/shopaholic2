<template>
  <div class="buttons is-justify-content-space-around">
    <button class="button is-warning" @click="emits('clearBought')">
      Clear bought
    </button>
    <button class="button is-info" @click="emits('moveUp')">Move up</button>
    <button class="button is-danger" @click="emits('clearAll')">
      Clear all
    </button>
    <button class="button is-info" @click="emits('moveDown')">Move down</button>
    <button class="button is-black" @click="emits('remove')">
      Remove list
    </button>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'clearAll'): void;
  (e: 'clearBought'): void;
  (e: 'remove'): void;
  (e: 'moveUp'): void;
  (e: 'moveDown'): void;
}
const emits = defineEmits<Emits>();
</script>
