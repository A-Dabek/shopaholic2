<template>
  <div class="column">
    <ListForm @newList="cStore.addList"></ListForm>
  </div>
  <ListComponent
    v-for="name in store.orderedListNames"
    :key="name"
    :name="name"
    :items="store.listItems(name)"
    :boughtItemsNames="store.boughtItemsNames"
    @remove="cStore.removeList(name)"
    @clearAll="store.clearList(name)"
    @clearBought="store.clearBoughtFromList(name)"
    @newItem="store.addItemToList(name, $event)"
    @increment="store.incrementItemQuantity(name, $event)"
    @decrement="store.decrementItemQuantity(name, $event)"
    @removeItem="store.removeItemFromList(name, $event)"
    @shopping="goToShopping(name)"
  ></ListComponent>
</template>

<script setup lang="ts">
import ListComponent from '@/components/planning/ListComponent.vue';
import ListForm from '@/components/planning/ListForm.vue';
import { usePlanningStore } from '@/stores/planning.store';
import { useRouter } from 'vue-router';
import { cloudStore } from '@/stores/firebase.store';

let store = usePlanningStore();
const router = useRouter();
const cStore = cloudStore;

function goToShopping(listName: string) {
  router.push(`/shopping/${listName}`);
}
</script>
