<template>
  <div>
    <h2 class="pad">Shopping List Items</h2>
    <!-- search bar !-->
    <v-icon>search</v-icon>
    <input type="text" v-model="search" placeholder="Search Items" /> <br>
    <!-- v-for to go through all items !-->
    <v-flex v-for="item in filteredItems" :key="item.id">
      <!-- insert Item component (app-item because HTML tags translate it to kebab case) !-->
      <!-- pass item to the Item component with :item="item" !-->
      <app-item :item="item" @addToCart="addToCart"></app-item>
    </v-flex>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
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
      items: Items,
      search: ''
    };
  },
  methods: {
    ...mapActions(["addToCart"])
  },
  computed: {
    filteredItems: function () {
      //return items matching the current filter in search bar
      return this.items.filter((item) => {
        return item.name.toLowerCase().match(this.search.toLowerCase());
      })
    }
  },
};

/* TODO:
  Create an endpoint in the API to hold all the available (const) items
  After the endpoint has been created, grab them from the API instead of from data/items.js
 */

</script>

