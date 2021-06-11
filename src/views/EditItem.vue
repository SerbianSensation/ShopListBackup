<template>
  <div class="form-wrapper">
    <v-form v-model="valid">
      <v-text-field label="Item" required :rules="nameRules" v-model="name" :placeholder="item.name"></v-text-field>
      <!-- require a number for the quantity (order) field !-->
      <v-text-field type="number" label="Quantity" required :rules="quantityRules" v-model="order" :placeholder="item.order.toString()"></v-text-field>

      <!-- radio buttons for complete/incomplete !-->
      <div>
        <input type="radio" id="done" value="true" v-model="complete">
        <label for="done">Complete</label>
        <br>
        <input type="radio" id="undone" value="false" v-model="complete">
        <label for="undone">Incomplete</label>
      </div>

      <v-btn @click="submit()" :disabled="!valid">Submit</v-btn>
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
  created() {
    this.getItem(this.$route.params.id);
  },
  computed: {
    item() {
      return this.$store.state.item;
    }
  },
  methods: {
    ...mapActions(["checkItem", "getItem"]),
    submit() {
      const item = {
        id: this.item.id,
        name: this.name,
        order: this.order,
        complete: this.complete
      }
      this.checkItem(item);
      //redirect to /cart
      this.$router.push('/cart');
    }
  }
};

/*
Possible issue in future:
Changing item's name and not its id auto changing could result in different item names but duplicate ids

Ex: Eggs (id: 1) are added to the cart, then name is changed to milk (still id 1)
    Then, eggs are added to cart again from items list (id 1)
    Now eggs (id 1) have the same name as milk (id 1)

    Also, milk could now be added twice because the id's don't match, so they are not the same item (technically)

    UPDATE: Item is distinguished by id in store, so as a result it is not added, since it is considered a dup.
    Ex: Add eggs to cart. Rename to milk. Try adding eggs to cart again. Won't work because eggs and the edited 'milk'
        have the same id, so they are considered dups. Check store.js to see, find is done on the list using id.

 */
</script>

<style scoped>
.form-wrapper {
  padding: 40px;
  text-align: center;
}
</style>


