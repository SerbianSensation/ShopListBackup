<template>
  <div>
    <h2 class="pad">Welcome to my shopping list app!</h2>
    <p>Navigate to the items page to see the list of available items.</p>
    <p>Navigate to the cart page to see what is in your cart.</p>
  </div>
</template>

<script>
import {mapState} from "vuex";

// Need to make get call to API here so on the home page the cart.length is correct when refreshing
export default {
  computed: {
    ...mapState(['cart'])
  },
  mounted() {
    this.$store.dispatch("getCart");
  }
}
</script>
