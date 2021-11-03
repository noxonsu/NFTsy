<template>
  <div class="container">


    <div v-if="this.getProvider" class="col-md-3">
      <button-connect />
      <h1>Your Account</h1>
      <p>{{getAccounts[0]}}</p>
      <div class="alert alert-danger" v-if="this.getProvider.isMetaMask == 'true'">
        Please install metamask to use the app
      </div>
      <div v-else class="alert-success">all ok</div>

      <create-n-f-t />
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
import {mint} from "@rarible/protocol-ethereum-sdk/build/nft/mint";

const NETWORK = "ropsten" // "rinkeby" // "e2e" | "ropsten" | "rinkeby" | "mainnet"
export default {
  props: ['icon', 'place', 'iconActive'],
  name: 'App',
  data() {
    return {
      sdk: {}
    }
  },
  components: {buttonConnect, createNFT},
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  methods: {
    ...mapMutations(['setSdk', 'setProvider', 'setAccounts']),


  },
  created() {

    const {ethereum} = window
    console.log('8888888888888')
    console.log(ethereum.isMetaMask)

    if (ethereum && ethereum.isMetaMask) {
      console.log('Ethereum successfully detected!')

      this.setProvider(ethereum)
      ethereum.on('accountsChanged', (accounts) => {
        this.setAccounts(accounts)
        console.log('Ethereum  accountsChanged')
      })

      const web3 = new Web3(ethereum)
      const raribleSdk = createRaribleSdk(new Web3Ethereum({web3}), NETWORK)
      this.setSdk(raribleSdk)   //
      this.sdk = raribleSdk
      web3.eth.getAccounts().then(e => {
        this.setAccounts(e)
        console.log(e)
      })
    } else {
      alert('Please install MetaMask!')
    }
  },
  mounted() {
    console.log('try to mint')
    setTimeout(() => {
      /*
      mint({
        "collection": {
          "id": "0x6ede7f3c26975aad32a475e1021d8f6f39c89d82",
          "type": "ERC721",
          "supportsLazyMint": true
        },
        "uri": "ipfs/QmaC6EAfPcJhyXRTHgkZPKReYdn9VpnJ1CJTWmM8SCZ5po",
        "supply": "100",
        "creators": [
          {
            "account": "0x2f1489f53f56b2d6d734dd18cdbf0511e14e00f4",
            "value": 10000
          }
        ],
        "royalties": [],
        "lazy": true
      }).then(res => {
        console.log(222222222222)
        console.log(res)
      })
*/
    },500)
    console.log(this.getProvider.isMetaMask)


  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
