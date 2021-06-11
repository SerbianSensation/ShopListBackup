<template>
  <v-list>
    <h2 class="pad" v-if="!cart.length">Shopping Cart is empty</h2>
    <div v-else>
      <h2 class="pad">Shopping Cart</h2>
      <!-- search bar !-->
      <v-icon>search</v-icon>
      <input type="text" v-model="searchIncomplete" placeholder="Search Incomplete Items" /> <br>
      <!-- loop through non-completed items first !-->
      <h3 class="text-left">Incomplete Items</h3>
      <v-list-item v-for="item in filterIncompleteItems" :key="item.id" @click="{}">
        <!-- Item contents !-->
        <v-list-item-content>{{ item.name }}</v-list-item-content>
        <v-list-item-content>Complete: {{ item.complete }}</v-list-item-content>
        <v-list-item-content>Quantity: {{ item.order }}</v-list-item-content>

        <v-list-item-action>
          <v-icon @click="incOrder(item.id)">add_circle</v-icon>
        </v-list-item-action>

        <v-list-item-action>
          <v-icon class="pad-left" @click="updateComplete(item.id)">check_circle</v-icon>
        </v-list-item-action>

        <v-btn class="pad-left" :to="{ name: 'editForm', params: {id: item.id } }"><v-icon>edit</v-icon></v-btn>

        <v-list-item-action>
          <v-icon @click="removeFromCart(item)">delete</v-icon>
        </v-list-item-action>
      </v-list-item>

      <!-- search bar !-->
      <v-icon>search</v-icon>
      <input type="text" v-model="searchComplete" placeholder="Search Complete Items" /> <br>
      <!-- loop through completed items first !-->
      <h3 class="text-left">Completed Items</h3>
      <v-list-item v-for="item in filterCompleteItems" :key="item.id" @click="{}">
        <!-- Item contents !-->
        <v-list-item-content>{{ item.name }}</v-list-item-content>
        <v-list-item-content>Complete: {{ item.complete }}</v-list-item-content>
        <v-list-item-content>Quantity: {{ item.order }}</v-list-item-content>

        <v-list-item-action>
          <v-icon @click="incOrder(item.id)">add_circle</v-icon>
        </v-list-item-action>

        <v-list-item-action>
          <v-icon class="pad-left" @click="updateComplete(item.id)">cancel</v-icon>
        </v-list-item-action>

        <v-btn icon class="pad-left" :to="{ name: 'editForm', params: {id: item.id } }"><v-icon>edit</v-icon></v-btn>

        <v-list-item-action>
          <v-icon @click="removeFromCart(item)">delete</v-icon>
        </v-list-item-action>
      </v-list-item>

      <!-- add button to clear cart !-->
      <v-btn @click="clearCart()">Clear Cart</v-btn>
    </div>
  </v-list>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchComplete: '',
      searchIncomplete: ''
    };
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['completedItems', 'nonCompletedItems']),
    //filter complete and incomplete items for search bar
    filterCompleteItems: function () {
      //return items matching the current filter in search bar
      return this.completedItems.filter((item) => {
        return item.name.toLowerCase().match(this.searchComplete.toLowerCase());
      })
    },
    filterIncompleteItems: function () {
      //return items matching the current filter in search bar
      return this.nonCompletedItems.filter((item) => {
        return item.name.toLowerCase().match(this.searchIncomplete.toLowerCase());
      })
    }
  },
  methods: {
    ...mapActions(["removeFromCart", "updateComplete", "updateCurrentItem", "clearCart", "incOrder"])
  },
  mounted() {
    this.$store.dispatch("getCart");
  }
};
</script>

<style>
.pad-left {
  padding-left: 14px;
}
.text-left {
  text-align: left;
  padding: 20px;
}
</style>
