<template>
  <v-list>
    <h2 class="pad" v-if="!cart.length">Shopping Cart is empty</h2>
    <div v-else>
      <h2 class="pad">Shopping Cart</h2>
      <!-- extracting the index of each item in the list so we can use that as the key !-->
      <v-list-item v-for="item in cart" :key="item.id" @click="{}">
        <!-- Item contents !-->
        <v-list-item-content>{{ item.name }}</v-list-item-content>
        <v-list-item-content>Complete: {{ item.complete }}</v-list-item-content>
        <v-list-item-content>Quantity: {{ item.order }}</v-list-item-content>

        <!-- add icons for marking items as complete, editing and deleting items !-->
        <!-- display check only if item is not complete !-->
        <v-list-item-action v-if="!item.complete">
          <v-icon @click="updateComplete(item.id)">check_circle</v-icon>
        </v-list-item-action>

        <!-- if the item is marked as complete, have the cancel icon to signal marking it as incomplete !-->
        <v-list-item-action v-else>
          <v-icon @click="updateComplete(item.id)">cancel</v-icon>
        </v-list-item-action>

        <router-link to="/edit-item">
          <v-icon class="pad-left" @click="updateCurrentItem(item)">edit</v-icon>
        </router-link>

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
import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  computed: {
    /*cart() {
      return this.$store.state.cart;
      //return this.getCart();  <= doesn't work (since void)
    },*/
    ...mapState(['cart'])
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    ...mapActions(["updateComplete"]),
    ...mapActions(["updateCurrentItem"]),
    ...mapActions(["clearCart"])
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
</style>
