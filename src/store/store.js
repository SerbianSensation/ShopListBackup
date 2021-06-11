import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
//import items (to purchase) from data/items.js
import { Items } from "../data/items";

Vue.use(Vuex);

const baseURL = "http://localhost:3000/items";

export default new Vuex.Store({
  state: {
    cart: [],
    item: { id: -1, name: "item", complete: false, order:-1 }
  },
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload);
    },
    removeFromCart(state, item) {
      state.cart.splice(state.cart.indexOf(item), 1);
    },
    setCart(state, items) {
      Vue.set(state, 'cart', [...items]);
    },
    setItem(state, item) {
      state.item = item;
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
    incOrder(state, id) {
      //filter out the item from cart list using id
      const item = state.cart.find(item => item.id === id);
      item.order += 1;
    },
    updateCurrentItem(state, payload) {
      state.item = payload;
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ commit, state }, item) {
      //search item in cart using id
      const findItem = state.cart.find(it => it.id === item.id);
      //only add the item to the cart if it isn't already there
      if(findItem === undefined) {
        //POST to API
        axios.post(baseURL, item)
          .then(() => {
            //make copy of object so the exact one from items.js isn't used
            const copy = {...item};
            //add to store cart
            commit("addToCart", copy);
          })
          .catch((error) => {
            console.log(error);
            alert("Unable to add the item to the cart. Something went wrong, try again later.");
          });
      } else {
        alert("Item is already in the cart!");
      }
    },
    removeFromCart({ commit }, item) {
      //DELETE to API (baseURL/:id)
      axios.delete(baseURL + "/" + item.id)
        .then(() => {
          commit("removeFromCart", item);
        })
        .catch((error) => {
          console.log(error);
          alert("Unable to remove item from the cart. Something went wrong, try again later.");
        });
    },
    checkItem({ commit, state, dispatch }, item){
      /* Error checking
         Make sure name was not set to the name of another item in the cart or items list
       */
      //check to see if new item is in cart or items list using name
      let cartItem = state.cart.find(i => i.name === item.name);
      let listItem = Items.find(i => i.name === item.name);

      //if item is either in the cart or list, check for different IDs
      if(cartItem !== undefined) {
        //item with same name but different id is already in cart
        if (cartItem.id !== item.id) {
          alert("Item with the same name already exists in the cart!");
        } else {
          //else, the item was renamed to itself, so it is ok
          dispatch("updateItem", item);
        }
      }
      else if(listItem !== undefined) {
        //item with same name but different id is already in the list
        if (listItem.id !== item.id) {
          alert("Item with the same name already exists in the items list. Please add it from there.");
        } else {
          //else, the item was renamed to itself, so it is ok
          dispatch("updateItem", item);
        }
      }
      //if item is not in cart or items, proceed
      else {
        dispatch("updateItem", item);
      }
    },
    updateItem({ commit, state }, item) {
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
          alert("Item could not be updated. Something went wrong, try again later.");
        });
    },
    updateComplete({ commit, state }, id) {
      //filter out the item from cart list using id
      const item = state.cart.find(item => item.id === id);
      //PATCH to API (baseURL/:id)
      axios.patch(baseURL + "/" + id, { complete: !item.complete })
        .then(() => {
          commit("updateComplete", id);
        })
        .catch((error) => {
          console.log(error);
          alert("Item could not be marked as complete/incomplete. Something went wrong, try again later.");
        });
    },
    incOrder({ commit, state }, id) {
      //filter out the item from cart list using id
      const item = state.cart.find(item => item.id === id);
      //PATCH to API (baseURL/:id)
      axios.patch(baseURL + "/" + id, { order: item.order + 1 })
        .then(() => {
          commit("incOrder", id);
        })
        .catch((error) => {
          console.log(error);
          alert("Item quantity could not be incremented. Something went wrong, try again later.");
        });
    },
    updateCurrentItem({ commit }, payload) {
      commit("updateCurrentItem", payload);
    },
    clearCart({ commit, state }) {
      const items = state.cart;
      //loop through the array, calling axios delete on each item in API
      items.forEach(function(item) {
        //DELETE to API (baseURL/:id)
        axios.delete(baseURL + "/" + item.id)
          .then(() => {
            commit("removeFromCart", item);
          })
          .catch((error) => {
            console.log(error);
            alert("Could not clear cart. Something went wrong, try again later.");
          })
      });
    },
    getCart({ commit }) {
      axios.get(baseURL)
        .then((response) => {
          console.log(response.data);
          commit("setCart", response.data);
        })
        .catch((error) => {
          console.log(error);
          alert("Could not get cart. Something went wrong, try again later.");
        });
    },
    getItem({ commit }, id) {
      axios.get(baseURL + "/" + id)
        .then((response) => {
          console.log(response.data);
          commit("setItem", response.data);
        })
        .catch((error) => {
          console.log(error);
          alert("Could not get the item. Something went wrong, try again later.");
        });
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
    item: (state) => {
      return state.item;
    },
    cart: state => {
      return state.cart;
    }
  },
});

