<template>
  <main class="container p-1">
    <div class="columns is-centered">
      <div class="column is-one-third-desktop is-half-tablet">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watchEffect } from 'vue';
import { cloudStore } from '@/stores/firebase.store';
import { usePlanningStore } from '@/stores/planning.store';

const store = usePlanningStore();

watchEffect(onCleanup => {
  const unsub = cloudStore.onBoughtSnapshot(items =>
    store.setBoughtItems(items)
  );
  onCleanup(unsub);
});

watchEffect(onCleanup => {
  const unsub = cloudStore.onListsSnapshot(items => store.setLists(items));
  onCleanup(unsub);
});

watchEffect(onCleanup => {
  const unsubs = store.orderedListNames.map(listName =>
    cloudStore.onItemsSnapshot(listName, items =>
      store.setItems(listName, items)
    )
  );

  const unsub = () => {
    unsubs.forEach(fn => fn());
  };
  onCleanup(unsub);
});
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
</style>
