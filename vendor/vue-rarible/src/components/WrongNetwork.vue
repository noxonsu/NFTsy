<template>

  <modal v-if="getNetworkType != $networkName && showModal">
    <loader style="margin-bottom: 20px;" />
    <h2>Wrong network </h2>
    <p>Looks like you connected to unsupported network. Change network to {{$networkName}} </p>
    <button type="button" class="r-btn ">Sign out</button>

  </modal>
</template>

<script>
import Modal from "./parts/Modal";
import Loader from "./parts/Loader";
import {mapGetters} from "vuex";

export default {
  name: "WrongNetwork",
  components: {
    Modal, Loader
  },
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts','getNetworkType']),

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