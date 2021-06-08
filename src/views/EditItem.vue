<template>
  <div class="form-wrapper">
    <v-form>
      <v-text-field label="Item" :placeholder="currentItem.name"></v-text-field>
      <v-text-field label="Quantity" :placeholder="currentItem.order"></v-text-field>
      <v-btn>Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  computed: {
    currentItem() {
      return this.$store.state.currentItem;
    },
    itemName() {
      return this.$store.state.currentItem.name;
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  padding: 40px;
  text-align: center;
}
</style>
