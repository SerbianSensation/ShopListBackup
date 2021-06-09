<template>
  <div class="form-wrapper">
    <v-form v-model="valid">
      <v-text-field label="Item" required :rules="nameRules" v-model="name" :placeholder="currentItem.name"></v-text-field>
      <!-- require a number for the quantity (order) field !-->
      <v-text-field type="number" label="Quantity" required :rules="quantityRules" v-model="order" :placeholder="currentItem.order.toString()"></v-text-field>

      <!-- radio buttons for complete/incomplete !-->
      <div>
        <input type="radio" id="done" value="true" v-model="complete">
        <label for="done">Complete</label>
        <br>
        <input type="radio" id="undone" value="false" v-model="complete">
        <label for="undone">Incomplete</label>
      </div>

      <v-btn @click="updateItemFields(currentItem.id, name, order, complete)" :disabled="!valid" to="/cart">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import {mapActions} from "vuex";

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
      ],
      quantityRules: [
        (order) => !!order || 'Quantity is required'
      ]
    };
  },
  computed: {
    currentItem() {
      return this.$store.state.currentItem;
    }
  },
  methods: {
    ...mapActions(["updateItemFields"])
  }
};

/*
Possible issue in future:
Changing item's name and not its id auto changing could result in different item names but duplicate ids

Ex: Eggs (id: 1) are added to the cart, then name is changed to milk (still id 1)
    Then, eggs are added to cart again from items list (id 1)
    Now eggs (id 1) have the same name as milk (id 1)

    Also, milk could now be added twice because the id's don't match, so they are not the same item (technically)
 */
</script>

<style scoped>
.form-wrapper {
  padding: 40px;
  text-align: center;
}
</style>


