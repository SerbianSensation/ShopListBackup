import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    currentItem: { id: -1, name: "currentItem", complete: false, order:-1 }
  },
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload);
    },
    removeFromCart(state, payload) {
      state.cart.splice(state.cart.indexOf(payload), 1);
    },
    updateItem(state, { item, index }) {
      //update item in cart
      Vue.set(state.cart, index, item);
      //Vue.set preserves reactivity
    },
    updateName(state, id, payload) {
      //filter out the item from cart list using id
    },
    updateComplete(state, id) {
      //filter out the item from cart list using id
      const item = state.cart.find(item => item.id === id);
      //flip its complete field
      item.complete = !item.complete;
    },
    updateOrder(state, id, payload) {
      //filter out the item from cart list using id
    },
    updateCurrentItem(state, payload) {
      state.currentItem = payload;
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ commit, state }, item) {
      //get item from cart using id
      const findItem = state.cart.find(it => it.id === item.id);
      //only add the item to the cart if it isn't already there
      if(findItem === undefined) {
        //make copy of object so the exact one from items.js isn't used
        const copy = {...item};
        commit("addToCart", copy);
      }
    },
    removeFromCart({ commit }, payload) {
      commit("removeFromCart", payload);
    },
    updateItem({ commit, state }, item){
      //get index of item from cart using id
      const index = state.cart.findIndex(it => it.id === item.id);
      const payload = {
        item: item,
        index: index
      }
      //if item exists, call mutator to update
      if(index >= 0) {
        commit("updateItem", payload);
      }
    },
    updateName({ commit }, id, payload) {
      commit("updateName", id, payload);
    },
    updateComplete({ commit }, id) {
      //reverse item's complete field with a PATCH request
      commit("updateComplete", id);
    },
    updateOrder({ commit }, id, payload) {
      //set item's order to the payload with a PATCH request
      commit("updateOrder", id, payload);
    },
    updateCurrentItem({ commit }, payload) {
      commit("updateCurrentItem", payload);
    },
    clearCart({ commit }) {
      commit("clearCart");
    }
  },
  getters: {
    //get all completed items
    completedItems: (state) => {
      return state.cart.filter((item) => item.complete);
    },
    //get all non-completed items
    nonCompletedItems: (state) => {
      return state.cart.filter((item) => !item.complete);
    },
    //get the current item
    currentItem: (state) => {
      return state.currentItem;
    }
  }
});

/* TODO:
Update the store actions to interact with the API
 */
