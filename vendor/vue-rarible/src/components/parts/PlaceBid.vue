<template>
  <div>


    <a v-if="getAccounts[0] != post.owner" @click.prevent="createBid" class="btn btn--sm press--right">
      Place a bid
    </a>

<!--    <a  href="" @click.prevent="makeOrder">App order</a>-->
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {toAddress} from "@rarible/types";

export default {
  name: "PlaceBid",
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  props: ['post'],
  methods: {
    async makeOrder(){
      this.getSdk.apis.order.getOrderByHash({hash: '0x0f729d2c398454ec5d41a6b54d8f8704cab6299eb54f16d7e85a969979483c02'})
          .then(order => {
            console.warn('order1', order)
            this.getSdk.order.fill(
                {
                  order: order, payouts: [], originFees: [],
                  amount: 1
                }
            ).then(a => {
              a.runAll()
              console.log('token bought');
            })
          })
    },
    async createBid() {

      console.log('try to make bid')
      // const request = {
      //   makeAssetType: {
      //     assetClass: "ETH",
      //     // assetClass: "ERC20",
      //     // contract: '0xb0ea149212eb707a1e5fc1d2d3fd318a8d94cf05',
      //   },
      //   maker: toAddress(this.getAccounts[0]),
      //   takeAssetType: {
      //     assetClass: "ERC721",
      //     contract: '0xb0ea149212eb707a1e5fc1d2d3fd318a8d94cf05',
      //     tokenId: this.post.tokenId,
      //   },
      //   taker: this.post.owner,
      //   amount: 1,
      //   originFees: [{
      //     account: this.getAccounts[0],
      //     value: 1,
      //   }],
      //   payouts: [],
      //   price: 0.04 * 1000000000000000000,
      //
      // }
      //
      //
      // const order = await this.getSdk.order.bid(request)

      const order = await this.getSdk.order.bid({
        makeAssetType: {
           assetClass: "ERC20",
           contract: toAddress(this.post.owner),
        },
        takeAssetType: {
          assetClass: "ERC721",
          contract: toAddress('0xb0ea149212eb707a1e5fc1d2d3fd318a8d94cf05'),
          tokenId:  this.post.tokenId,
        },
        amount: 1,
        maker:  toAddress(this.getAccounts[0]),
        originFees: [],
        payouts: [],
        price: 0.04 * 1000000000000000000,
      })


   /*   const order = await this.getSdk.order.bid({
        maker: toAddress(this.getAccounts[0]),
        takeAssetType: {
          assetClass: "ERC721",
          contract: this.post.contract,
          tokenId: this.post.tokenId,
        },
        price: 0.04 * 1000000000000000000,
        makeAssetType: {
          assetClass: "ETH",
        },
        amount: 1,
        payouts: [],
        originFees: [{
          account: '0xB2bcFa5631d52b73493fd63364660815c732f2EE',
          value: 250,
        }],


      })*/
      console.warn('order', order)
      this.getSdk.order.fill(
          {
            order: order, payouts: [], originFees: [],
            amount: 1
          }
      ).then(a => {
        a.runAll()
        console.log('token bought');
        console.log(a);
      })

      console.warn('bid')
      console.warn(order)


// Bid request example:

    }

  }
}
</script>

<style scoped>

</style>