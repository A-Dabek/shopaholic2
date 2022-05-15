<template>
  <div class="column">
    <ListForm @newList="store.addList"></ListForm>
  </div>
  <ListComponent
    v-for="list in store.lists"
    :list="list"
    :key="list.name"
    :boughtItemsNames="store.boughtItemsNames"
    @remove="store.removeList(list.name)"
    @clearAll="store.clearList(list.name)"
    @clearBought="store.clearBoughtFromList(list.name)"
    @newItem="store.addItemToList(list.name, $event)"
    @increment="store.incrementItemQuantity(list.name, $event)"
    @decrement="store.decrementItemQuantity(list.name, $event)"
    @removeItem="store.removeItemFromList(list.name, $event)"
    @shopping="goToShopping(list.name)"
  ></ListComponent>
</template>

<script setup lang="ts">
import ListComponent from '@/components/planning/ListComponent.vue';
import ListForm from '@/components/planning/ListForm.vue';
import { usePlanningStore } from '@/stores/planning.store';
import { useRouter } from 'vue-router';

let store = usePlanningStore();
const router = useRouter();

function goToShopping(listName: string) {
  router.push(`/shopping/${listName}`);
}
</script>
