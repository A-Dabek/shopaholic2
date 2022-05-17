<template>
  <div class="content">
    <div class="buttons is-justify-content-space-between">
      <button class="button is-primary" @click="router.push('/')">
        Planning
      </button>
      <button class="button is-warning" @click="cStore.resetBuying()">
        Reset
      </button>
    </div>
  </div>
  <ShoppingList
    :itemsToBuy="store.itemsToBuy(listName)"
    :itemsBought="store.itemsBought(listName)"
    @buy="cStore.buyItem"
    @undo="cStore.undoBuyingItem"
  />
</template>

<script setup lang="ts">
import { usePlanningStore } from '@/stores/planning.store';
import { useRoute, useRouter } from 'vue-router';
import ShoppingList from '@/components/shopping/ShoppingList.vue';
import { cloudStore } from '@/stores/firebase.store';

const store = usePlanningStore();
const router = useRouter();
const route = useRoute();
const cStore = cloudStore;

const listName = route.params['name'];
</script>
