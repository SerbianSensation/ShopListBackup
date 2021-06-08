<!-- Item component, simplifies Items.vue because we can just call this component inside the v-for loop !-->
<!-- This reduces the amount of code and makes it cleaner and easier to understand !-->

<template>
  <v-card color="grey lighten-2">
    <v-card-title>
      <h3 class="pad-right">{{ item.name }}</h3>
      <v-btn @click="$emit('addToCart', item)">Add to Cart</v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
};
</script>

<style>
.pad-right {
  padding-right: 12px;
}
</style>

