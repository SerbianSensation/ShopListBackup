<template>
  <div>
    <h2 class="pad">Shopping List Items:</h2>
    <!-- v-for to go through all items !-->
    <v-flex v-for="item in items" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>Complete: {{ item.complete }}</p>
      <br />
    </v-flex>
  </div>
</template>

<script>
//import items (to purchase) from data/items.js
import { Items } from "../data/items";

export default {
  data() {
    return {
      items: Items
    };
  }
};

</script>
