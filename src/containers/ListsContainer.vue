<template>
  <div class="columns is-mobile">
    <div class="column is-narrow">
      <button
        class="button is-warning"
        :class="{ 'is-danger': !!store.boughtItemsNames.length }"
        @click="store.resetBuying()"
      >
        Reset
      </button>
    </div>
    <div class="column">
      <ListForm @newList="cStore.addList"></ListForm>
    </div>
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
    @moveUp="store.moveListUp(name)"
    @moveDown="store.moveListDown(name)"
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
import { cloudStore } from '@/stores/firebase.store';
import { usePlanningStore } from '@/stores/planning.store';
import { useRouter } from 'vue-router';

let store = usePlanningStore();
const router = useRouter();
const cStore = cloudStore;

function goToShopping(listName: string) {
  router.push(`/shopping/${listName}`);
}
</script>
