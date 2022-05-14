<template>
  <div class="columns is-mobile">
    <div class="column is-narrow">
      <button class="button is-dark" @click="goToShopping">Shopping</button>
    </div>
    <div class="column">
      <ListForm @newList="store.addList"></ListForm>
    </div>
  </div>
  <ListComponent
    v-for="list in store.lists"
    :list="list"
    :key="list.name"
    @remove="store.removeList(list.name)"
    @clear="store.clearList(list.name)"
    @newItem="store.addItemToList(list.name, $event)"
    @increment="store.incrementItemQuantity(list.name, $event)"
    @decrement="store.decrementItemQuantity(list.name, $event)"
    @removeItem="store.removeItemFromList(list.name, $event)"
  ></ListComponent>
</template>

<script setup lang="ts">
import ListComponent from '@/components/planning/ListComponent.vue';
import ListForm from '@/components/planning/ListForm.vue';
import { usePlanningStore } from '@/stores/planning.store';
import { useRouter } from 'vue-router';

let store = usePlanningStore();
const router = useRouter();

function goToShopping() {
  router.push('/shopping');
}
</script>
