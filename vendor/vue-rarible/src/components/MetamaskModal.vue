<template>
  <modal v-if="getMetamaskModal">
    <h2>Please install metamask!</h2>
    <p>
      <a target="_blank"  href="https://metamask.io/">metamask.io</a>
    </p>
  </modal>
</template>

<script>
import Modal from "./parts/Modal";
import Loader from "./parts/Loader";
import {mapGetters} from "vuex";

export default {
  name: "MetamaskModal",
  components: {
    Modal, Loader
  },
  computed: {
    ...mapGetters(['getMetamaskModal']),

  },
  data() {
    return {
      showModal: false,
    }
  },
  mounted() {
    const {ethereum} = window
    if (ethereum && ethereum.isMetaMask) {
      setTimeout(() => this.showModal = true, 2000)
    }
  }
}
</script>

<style scoped>

</style>