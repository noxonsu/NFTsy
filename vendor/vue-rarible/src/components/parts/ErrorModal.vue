<template>
  <modal>
      <h2 style="font-size: 30px;">Some Error occurred</h2>
      <p class="r-error">{{error}}</p>
      <button @click.prevent="$emit('close')" type="button" class="r-btn ">Close</button>
  </modal>
</template>

<script>
import Modal from "./Modal";
import Loader from "./Loader";

export default {
  name: "ErrorModal",
  components: {
    Modal, Loader
  },
  props: ['error']
}
</script>

<style scoped>
.r-error {
  color: red;
  font-size: 15px;
  font-weight: 500;
}
</style>