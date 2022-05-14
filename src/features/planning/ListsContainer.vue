<template>
  <div class="block">
    <ListForm @newList="onNewList"></ListForm>
  </div>
  <ListComponent
    v-for="list in lists"
    :list="list"
    :key="list.name"
    @remove="onRemove(list.name)"
    @clear="onClear(list.name)"
    @newItem="onNewItem(list.name, $event)"
  ></ListComponent>
</template>

<script setup lang="ts">
import ListComponent from '@/features/planning/ListComponent.vue';
import { ref } from 'vue';
import ListForm from '@/features/planning/ListForm.vue';
import type { ShoppingItem, ShoppingList } from '@/features/planning/types';

let lists = ref<ShoppingList[]>([
  {
    name: 'List1',
    items: [
      {
        name: 'item1',
        description: 'desc rip tion 1',
        quantity: 23,
        quantityType: 'kg',
        timestamp: new Date().getTime(),
      },
      {
        name: 'item2',
        description: 'desc rip tion 1',
        quantity: 23,
        quantityType: 'kg',
        timestamp: new Date().getTime(),
      },
      {
        name: 'item3',
        description: 'desc rip tion 1',
        quantity: 23,
        quantityType: 'kg',
        timestamp: new Date().getTime(),
      },
      {
        name: 'item4',
        description: 'desc rip tion 1',
        quantity: 23,
        quantityType: 'kg',
        timestamp: new Date().getTime(),
      },
    ],
  },
  {
    name: 'List2',
    items: [],
  },
  {
    name: 'List3',
    items: [],
  },
]);

function onNewList(name: string) {
  lists.value = [...lists.value, { name: name, items: [] }];
}

function onNewItem(name: string, item: ShoppingItem) {
  lists.value = lists.value.map(list => {
    if (list.name !== name) return list;
    return { ...list, items: [...list.items, item] };
  });
}

function onClear(name: string) {
  lists.value = lists.value.map(list => {
    if (list.name !== name) return list;
    return { ...list, items: [] };
  });
}

function onRemove(name: string) {
  lists.value = lists.value.filter(list => list.name !== name);
}
</script>
