<template>
  <div class="form-wrapper">
    <v-form v-model="valid">
      <v-text-field label="Item" required :rules="nameRules" v-model="name" :placeholder="currentItem.name"></v-text-field>
      <v-text-field label="Quantity" required v-model="order" :placeholder="currentItem.order"></v-text-field>
      <v-btn :disabled="!valid">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      order: "",
      complete: false,
      valid: true,
      nameRules: [
        (name) => !!name || 'Item name is required',
        (name) => name.length > 2 || 'Item name must be longer than 2 characters',
      ]
    };
  },
  computed: {
    currentItem() {
      return this.$store.state.currentItem;
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
