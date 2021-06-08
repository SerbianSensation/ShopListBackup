<template>
  <v-app>
    <!-- link to google material icons (used for cart page mainly) !-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <header>
      <h1 class="pad">Stefan Gligorevic's Shopping List Site</h1>
    </header>
    <!-- adding a nav toolbar with Vuetify !-->
    <v-toolbar class="shrink">
      <v-toolbar-items>
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/items" text>Items</v-btn>
        <v-spacer></v-spacer>
        <!-- use a shopping cart icon to link to the cart !-->
        <!-- also include a badge showing the number of items in the cart !-->
        <router-link to="/cart">
          <v-badge color="grey lighten-1" overlap right v-model="cart.length">
            <template #badge>
              {{cart.length}}
            </template>
            <v-icon large class="icon">shopping_cart</v-icon>
          </v-badge>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
    <!-- add other pages using the router !-->
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.pad {
  padding: 40px;
}
.icon {
  position: absolute;
  padding-top: 10px;
}
</style>
