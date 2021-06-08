<template>
  <v-app>
    <header>
      <h1 class="pad">Stefan Gligorevic's Shopping List Site</h1>
    </header>
    <!-- adding a nav toolbar with Vuetify !-->
    <v-toolbar class="shrink">
      <v-toolbar-items>
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/items" text>Items</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- add other pages using the router !-->
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
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
</style>
