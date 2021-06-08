<!-- Item component, simplifies Items.vue because we can just call this component inside the v-for loop !-->
<!-- This reduces the amount of code and makes it cleaner and easier to understand !-->

<template>
  <div>
    <h3>{{ item.name }}</h3>
    <p>Complete: {{ item.complete }}</p>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
};
</script>

