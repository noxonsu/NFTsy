import App from "./App";
import Vue from 'vue'
import CreateNFTAndPost from './components/CreateNFTAndPost'
import store from './store';
import Web3 from "web3";
import {createRaribleSdk} from "@rarible/protocol-ethereum-sdk";
import {Web3Ethereum} from "@rarible/web3-ethereum";
import {mapMutations} from "vuex";
import {VueMasonryPlugin} from 'vue-masonry';
import TokenList from "./components/TokenList";
import VueRouter from 'vue-router'
import TokenStartPage from "./components/TokenStartPage";
import TokenSingle from "./components/TokenSingle";

window.axios = require('axios');

window.vueGoogleMap = false
Vue.component('CreateNFTAndPost', CreateNFTAndPost);
Vue.component('TokenList', TokenList);
Vue.component('TokenStartPage', TokenStartPage);

Vue.use(VueMasonryPlugin)
Vue.use(VueRouter)

if (document.getElementById('v-app')) {

    const NETWORK = "ropsten" // "rinkeby" // "e2e" | "ropsten" | "rinkeby" | "mainnet"
    Vue.prototype.API_URL = rarible_obj.site_url  // rarible_obj.site_url;
    const router = new VueRouter({
        mode: 'hash',
        routes: [{
            path: "",
            component: TokenList,
            name: 'tokens',
            // children: [
            //     {
            //         path: ':id',
            //         name: 'tokens.single',
            //         component: TokenSingle,
            //     }]

        },
            {
                path: ":id",
                component: TokenSingle,
                name: 'tokens.single'

            }
        ]
    });
    new Vue({
        el: '#v-app',
        router,
        components: {
            App
        },
        store,
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
    });
}
