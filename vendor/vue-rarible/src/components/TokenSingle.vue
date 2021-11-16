<template>
  <div class="row">
    <div class="col-md-6">
      <img :src="post.img" :alt="post.title">
    </div>
    <div class="col-md-4">
      <h1 style="font-size: 40px;">{{ post.title }}</h1>
      <div v-html="post.content"></div>
      <div>
        <span style="font-weight: 900; font-size: 30px;"
        >Owner</span>
        <div>
          <div class="row">

            <div class="col-md-3"><a>
              <div style="width: 40px; height: 40px;">
                <img alt="Identicon"
                     src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDM4LDEzOCwxKTsgc3Ryb2tlOnJnYmEoMjE3LDM4LDEzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuMjsnPjxyZWN0ICB4PScxOCcgeT0nMTInIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTgnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE4JyB5PScyNCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxNScgeT0nMTUnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjEnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE1JyB5PScyNCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScyMScgeT0nMjQnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTInIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzI0JyB5PScxNScgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxMicgeT0nMjQnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjQnIHk9JzI0JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PC9nPjwvc3ZnPg=="
                ></div>

            </a>
            </div>
            <div class="col-md-8">
              <span
                  class=""><a><span

                  :title="post.owner" class="sc-bdnxRM sc-hKFxyN sc-eCApnc RWHKB">{{ post.owner }}</span></a>
              </span>
            </div>
            <br><br>
            <div class="col-md-4">
              <span
                  class=""><a><span style="font-weight: 900; font-size: 30px;"
                                    class="sc-bdnxRM sc-hKFxyN sc-eCApnc RWHKB">Price:</span></a>
              </span>
            </div>


            <div class="col-md-8">
              <span
                  class="" style="padding-top: 0px; display: block"><a><span

                  v-if="post.price" style=" font-weight: 900; font-size: 32px">{{ post.price }} ETC</span></a>
              </span>
            </div>

            <div class="col-md-12" style="margin-top: 30px">
              <buttonConnect v-if="!getAccounts[0]"/>

              <a @click.prevent="buyOrder"
                 class="btn btn--sm press--right">Buy an order</a>
       <a @click.prevent="makeOrder"
                 class="btn btn--sm press--right">makeOrder</a>


            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import api from "../api/api";
import {mapGetters} from "vuex";
import {toAddress} from "@rarible/types";
import buttonConnect from "./parts/buttonConnect";

export default {
  name: "TokenSingle",
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  components: {
    buttonConnect
  },
  data() {
    return {
      post: {},

    }
  },
  methods: {
    buyOrder() {
      console.log('try buyOrder')
      this.getSdk.apis.order.getOrderByHash({hash: '0x549f6ad9ecffd5bc7d0059b80d48ff995049e73bf8d21a1536a0a594aab3bb9f'})
          .then(order => {
            console.warn('order', order.type)
             this.getSdk.order.fill(
                  {order: order, payouts: [], originFees: [],
                    amount: 1 }
              ).then(a => {
                a.runAll()
                console.log('token bought');
              })
          })

    },
    async makeOrder() {
      const order = await this.getSdk.order.sell({
        maker: toAddress(this.getAccounts[0]),
        makeAssetType: {
          assetClass: "ERC721",
          contract: '0xb0ea149212eb707a1e5fc1d2d3fd318a8d94cf05',
          tokenId: '21294992975815871805933535892073127469301996728786004586751131538920447148058',
        },
        price: "60000000000000000", // 0.06 ETH
        takeAssetType: {
          assetClass: "ETH",
        },
        amount: 1,
        payouts: [],
        originFees: [{
          account: this.getAccounts[0],
          value: 1,
        }],
      })
      console.warn(order)

    }
  },
  async mounted() {

    console.log('your wallet', this.getAccounts)
    api.get('wp-admin/admin-ajax.php',
        {params: {action: 'rarible_nft_post', post_id: this.$route.params.id}}
    ).then(res => {
      this.post = res.data
    })

    this.getSdk.apis.order.getOrderByHash({hash: '0x549f6ad9ecffd5bc7d0059b80d48ff995049e73bf8d21a1536a0a594aab3bb9f'}).then(res => {
      console.warn('getOrderByHash')
      console.warn(res)
    })

  }
}
</script>

<style lang="scss" scoped>

// scss-docs-start import-stack
// Configuration
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/utilities";

@import '~bootstrap/scss/grid';
//@import '~bootstrap/scss/containers';
//@import '~bootstrap/scss/buttons';
@import '~bootstrap/scss/bootstrap-reboot';

.btn {

}

.btn {

  outline: none;
  display: inline-block;
  padding: 0 20px;
  border: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 60px;
  outline: 0;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  text-shadow: none;
  vertical-align: middle;
  color: #fff;
  cursor: pointer;
  background: #de443a;
  height: 60px;
  border-radius: 0;
  letter-spacing: 1.3px;
  box-sizing: border-box;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -o-transition: all .3s ease;
  -ms-transition: all .3s ease;
  transition: all .3s ease;
  text-decoration: none !important;
}
</style>