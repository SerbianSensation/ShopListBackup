<template>
  <div>
    <h2 class="pad">Shopping List Items:</h2>
    <!-- v-for to go through all items !-->
    <v-flex v-for="item in items" :key="item.id">
      <!-- insert Item component (app-item because HTML tags translate it to kebab case) !-->
      <!-- pass item to the Item component with :item="item" !-->
      <app-item :item="item"></app-item>
    </v-flex>
  </div>
</template>

<script>
//import items (to purchase) from data/items.js
import { Items } from "../data/items";
//import Item component
import Item from "../components/Item";

export default {
  components: {
    appItem: Item
  },
  data() {
    return {
      items: Items
    };
  }
};

</script>
