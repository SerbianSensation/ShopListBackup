<template>
  <v-list>
    <h2 v-if="!cart.length">Shopping Cart is empty</h2>
    <div v-else>
      <h2 class="pad">Shopping Cart</h2>
      <!-- extracting the index of each item in the list so we can use that as the key !-->
      <v-list-item v-for="(item, index) in cart" :key="index" @click="{}">
        <!-- Item contents !-->
        <v-list-item-content>{{ item.name }}</v-list-item-content>
        <v-list-item-content>Complete: {{ item.complete }}</v-list-item-content>
        <v-list-item-content>Quantity: {{ item.order }}</v-list-item-content>

        <!-- add icons for marking items as complete, editing and deleting items !-->
        <!-- display check only if item is not complete !-->
        <v-list-item-action v-if="!item.complete">
          <v-icon>check_circle</v-icon>
        </v-list-item-action>

        <v-list-item-action>
          <v-icon>edit</v-icon>
        </v-list-item-action>

        <v-list-item-action>
          <v-icon>delete</v-icon>
        </v-list-item-action>

      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  }
};
</script>
