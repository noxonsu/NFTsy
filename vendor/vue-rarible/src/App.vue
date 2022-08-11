<template>
  <div class="container">


    <div v-if="this.getProvider">
      <!--      <button-connect />-->
      <!--      <h1>Your Account</h1>-->
      <!--      <p>{{getAccounts[0]}}</p>-->
      <!--      <div class="alert alert-danger" v-if="this.getProvider.isMetaMask == 'true'">-->
      <!--        Please install metamask to use the app-->
      <!--      </div>-->
      <!--      <div v-else class="alert-success">all ok</div>-->

      <!--      <create-n-f-t />-->
<!--      <create-n-f-t-and-post/>-->
      <token-list />
    </div>


  </div>
</template>

<script>
import Web3 from "web3"
import {createRaribleSdk} from "@rarible/protocol-ethereum-sdk"
import {Web3Ethereum} from "@rarible/web3-ethereum";
import {mapGetters, mapMutations} from "vuex";
import buttonConnect from "./components/parts/buttonConnect";
import createNFT from "./components/createNFT";
import CreateNFTAndPost from "./components/CreateNFTAndPost";
import TokenList from "./components/TokenList";

const NETWORK = "ropsten" // "rinkeby" // "e2e" | "ropsten" | "rinkeby" | "main"
export default {
  props: ['icon', 'place', 'iconActive'],
  name: 'App',
  data() {
    return {
      sdk: {}
    }
  },
  components: {buttonConnect, createNFT, CreateNFTAndPost, TokenList},
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  methods: {
    ...mapMutations(['setSdk', 'setProvider', 'setAccounts']),


  },
  created() {
    const {ethereum} = window
    console.log(ethereum.isMetaMask)

    if (ethereum && ethereum.isMetaMask) {
      console.log('Ethereum successfully detected!')

      this.setProvider(ethereum)
      ethereum.on('accountsChanged', (accounts) => {
        this.setAccounts(accounts)
        console.log('accounts',accounts)
        console.log('Ethereum  accountsChanged1')
      })
      ethereum.on('networkChanged', (networkId) => {
        console.log('Ethereum  networkId',networkId)
      })

      const web3 = new Web3(ethereum)
      const raribleSdk = createRaribleSdk(new Web3Ethereum({web3}), NETWORK)
      this.setSdk(raribleSdk)   //
      this.sdk = raribleSdk
      web3.eth.getAccounts().then(e => {
        this.setAccounts(e)
        console.log(e)
      })
      web3.eth.net.getNetworkType().then(e => {

        console.log('getNetworkType', e)
      })

      setInterval(function () {

        web3.eth.net.getNetworkType().then(e => {

          console.log('getNetworkType', e)
        })

      }, 1000);




    } else {
      alert('Please install MetaMask!')
    }
  },
  mounted() {
    //    console.log('try to mint')
    //    setTimeout(() => {
    //      const configuration = new Configuration(getApiConfig(NETWORK))
    //      const nftCollectionApi = new NftCollectionControllerApi(configuration)
    //      const nftItemApi = new NftItemControllerApi(configuration)
    // nftItemApi.getNftItemById({ itemId: " 0x60f80121c31a0d46b5279700f9df786054aa5ee5:717802" }).then(token => {
    //   console.warn(token)
    // })
    //    /* this.sdk.apis.nftItem.getNftItemById({ itemId: '0x2b8f301f5a5aa5afd56b416e170324d1818e9cfbc7759f8fe34ec458f078b085' }).then(token => {
    //       console.warn(token)
    //     })*/
    //
    //    },500)
    //    console.log(this.getProvider.isMetaMask)


  }
}
</script>

<style lang="scss">

// scss-docs-start import-stack
// Configuration



</style>