<template>
  <div class="content">
    <div class="buttons is-justify-content-space-between">
      <button class="button is-primary" @click="router.push('/')">
        Planning
      </button>
      <button class="button is-warning" @click="store.resetBuying()">
        Reset
      </button>
    </div>
  </div>
  <ShoppingList
    :itemsToBuy="store.itemsToBuy(listName)"
    :itemsBought="store.itemsBought(listName)"
    @buy="store.buyItem"
    @undo="store.undoBuyingItem"
  />
</template>

<script setup lang="ts">
import { usePlanningStore } from '@/stores/planning.store';
import { useRoute, useRouter } from 'vue-router';
import ShoppingList from '@/components/shopping/ShoppingList.vue';

const store = usePlanningStore();
const router = useRouter();
const route = useRoute();

const listName = route.params['name'];
</script>
