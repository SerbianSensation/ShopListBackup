import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const baseURL = "http://localhost:3000/items";

export default new Vuex.Store({
  state: {
    cart: [],
    currentItem: { id: -1, name: "currentItem", complete: false, order:-1 }
  },
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload);
    },
    removeFromCart(state, item) {
      state.cart.splice(state.cart.indexOf(item), 1);
    },
    updateItem(state, { item, index }) {
      //update item in cart
      Vue.set(state.cart, index, item);
      //Vue.set preserves reactivity
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
      //POST to API
      axios.post(baseURL, item)
        .then(() => {
          //get item from cart using id
          const findItem = state.cart.find(it => it.id === item.id);
          //only add the item to the cart if it isn't already there
          if(findItem === undefined) {
            //make copy of object so the exact one from items.js isn't used
            const copy = {...item};
            commit("addToCart", copy);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeFromCart({ commit }, item) {
      //DELETE to API (baseURL/:id)
      axios.delete(baseURL + "/" + item.id, item)
        .then(() => {
          commit("removeFromCart", item);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateItem({ commit, state }, item){
      //PUT to API (baseURL/:id)
      axios.put(baseURL + "/" + item.id, item)
        .then(() => {
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateComplete({ commit, state }, id) {
      //filter out the item from cart list using id
      const item = state.cart.find(item => item.id === id);
      //PATCH to API (baseURL/:id)
      axios.patch(baseURL + "/" + id, { complete: !item.complete})
        .then(() => {
          commit("updateComplete", id);
        })
        .catch((error) => {
          console.log(error);
        });
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
  },
});


/* TODO:
Update the store actions to interact with the API
 */
