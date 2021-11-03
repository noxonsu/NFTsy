<template>
  <button @click="connectWalletHandler" class="btn btn-warning">{{ buttonMessage }}

    <svg style="width: 25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
          d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"/>
    </svg>
  </button>

</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "buttonConnect",
  computed: {
    ...mapGetters( ['getProvider','getAccounts']),

  },
  data() {
    return {
      buttonMessage: "Connect Wallet"
    }
  },
  mounted() {
    console.log('2222222222')

    setTimeout(() => {
      console.log(this.getAccounts[0])
      if(this.getAccounts[0]){
        this.buttonMessage = "Wallet connected"
      }
    },50)
  },
  methods: {

    connectWalletHandler() {
      this.getProvider.request({method: 'eth_requestAccounts'})
      this.buttonMessage = "Wallet connected"
    }

  },
}
</script>

<style scoped>

</style>