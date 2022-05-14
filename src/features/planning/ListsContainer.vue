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
    @increment="onIncrement(list.name, $event)"
    @decrement="onDecrement(list.name, $event)"
    @removeItem="onRemoveItem(list.name, $event)"
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
        urgent: false,
      },
      {
        name: 'item2',
        description: 'desc rip tion 1',
        quantity: 23,
        quantityType: 'kg',
        timestamp: new Date().getTime(),
        urgent: false,
      },
      {
        name: 'item3',
        description: 'desc rip tion 1',
        quantity: 23,
        quantityType: 'kg',
        timestamp: new Date().getTime(),
        urgent: false,
      },
      {
        name: 'item4',
        description: 'desc rip tion 1',
        quantity: 23,
        quantityType: 'kg',
        timestamp: new Date().getTime(),
        urgent: false,
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

function onIncrement(list: string, item: string) {
  lists.value = lists.value.map(l => {
    if (l.name !== list) return l;
    const items = l.items.map(i => {
      if (i.name !== item) return i;
      return { ...i, quantity: i.quantity + 1 };
    });
    return { ...l, items };
  });
}
function onDecrement(list: string, item: string) {
  lists.value = lists.value.map(l => {
    if (l.name !== list) return l;
    const items = l.items.map(i => {
      if (i.name !== item) return i;
      return { ...i, quantity: i.quantity - 1 };
    });
    return { ...l, items };
  });
}
function onRemoveItem(list: string, item: string) {
  lists.value = lists.value.map(l => {
    if (l.name !== list) return l;
    const items = l.items.filter(i => i.name !== item);
    return { ...l, items };
  });
}
</script>
