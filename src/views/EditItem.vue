<template>
  <div>
    <h2 class="pad">Coming soon!</h2>
    <p> {{ currentItem.name }} {{ currentItem.id }} {{ currentItem.complete }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    currentItem() {
      return this.$store.state.currentItem;
    }
  },
  methods: {
    printItem(item) {
      console.log(item.id + item.name + item.complete + item.order);
    }
  }
};
</script>
