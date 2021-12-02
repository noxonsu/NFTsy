<template>
  <div class="r-single-token">
    <template v-if="!loading">
      <div class="row ">
        <div class="col-md-7" style="align-items: center; ">
          <img :src="post.img" :alt="post.title">

        </div>
        <div class="col-md-5" style="word-break: break-all">
          <h1 style="font-size: 40px;" class="r-title">{{ post.title }}</h1>
          <div class="r-content" v-html="post.content"></div>
          <div>
            <!--        <span style="font-weight: 900; font-size: 30px;"-->
            <!--        >Owner</span>-->
            <div>
              <div class="row">

                <!--            <div class="col-md-3"><a>-->
                <!--              <div style="width: 40px; height: 40px;">-->
                <!--                <img alt="Identicon"-->
                <!--                     src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDM4LDEzOCwxKTsgc3Ryb2tlOnJnYmEoMjE3LDM4LDEzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuMjsnPjxyZWN0ICB4PScxOCcgeT0nMTInIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTgnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE4JyB5PScyNCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxNScgeT0nMTUnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjEnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE1JyB5PScyNCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScyMScgeT0nMjQnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTInIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzI0JyB5PScxNScgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxMicgeT0nMjQnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjQnIHk9JzI0JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PC9nPjwvc3ZnPg=="-->
                <!--                ></div>-->

                <!--            </a>-->
                <!--            </div>-->
                <!--            <div class="col-md-8">-->
                <!--              <span-->
                <!--                  class=""><a><span-->

                <!--                  :title="post.owner" class="sc-bdnxRM sc-hKFxyN sc-eCApnc RWHKB">{{ post.owner }}</span></a>-->
                <!--              </span>-->
                <!--            </div>-->
                <!--            <br><br>-->
                <div class="col-md-4">
              <span v-if="type === 'order'"
                    class=""><span style="font-weight: 900; font-size: 28px;"
                                   class="sc-bdnxRM sc-hKFxyN sc-eCApnc RWHKB">Price:
              </span>
              </span>
                </div>


                <div class="col-md-8">
              <span
                  class="" style="padding-top: 0px; display: block"><a><span

                  v-if="post.price" style=" font-weight: 900; font-size: 28px">{{ post.price }} ETH</span></a>
              </span>
                </div>

                <div class="col-md-12" style="margin-top: 30px">
                  <buttonConnect v-if="!getAccounts[0]"/>

                  <single-tabs :post="post"/>
                  <template v-if="getAccounts[0]">
                    <a v-if="type === 'order' && getAccounts[0] != post.owner" @click.prevent="buyOrder"
                       class="btn btn--sm press--right">Buy an order</a>

                    <PlaceBid v-if="$enableBid" :post="post"/>
                  </template>


                  <!--       <a @click.prevent="makeOrder"-->
                  <!--                 class="btn btn&#45;&#45;sm press&#45;&#45;right">makeOrder</a>-->


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-if="loading" style="display: flex; align-items: center; justify-content: center; min-height: 400px">
      <loader/>
    </div>
  </div>


</template>
<script>
import api from "../api/api";
import {mapGetters} from "vuex";
import {toAddress} from "@rarible/types";
import buttonConnect from "./parts/buttonConnect";
import SingleTabs from "./parts/singleTabs";
import PlaceBid from "./parts/PlaceBid";
import Loader from "./parts/Loader";

export default {
  name: "TokenSingle",
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  components: {
    buttonConnect, SingleTabs, PlaceBid, Loader
  },
  data() {
    return {
      post: {},
      type: 'bid', // bid order,
      loading: true

    }
  },
  methods: {
    buyOrder() {
      console.log('try buyOrder ', this.post.order_hash)
      this.getSdk.apis.order.getOrderByHash({hash: this.post.order_hash})
          .then(order => {
            console.warn('order', order)
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

    api.get('wp-admin/admin-ajax.php',
        {params: {action: 'rarible_nft_post', post_id: this.$route.params.id}}
    ).then(res => {
      this.post = res.data
      this.type = this.post.order_hash.length > 1 ? 'order' : 'bid'
    }).finally(this.loading = false)

    this.getSdk.apis.order.getOrderByHash({hash: '0x549f6ad9ecffd5bc7d0059b80d48ff995049e73bf8d21a1536a0a594aab3bb9f'}).then(res => {
      console.warn('getOrderByHash')
      console.warn(res)
    })
    this.getSdk.apis.order.getOrdersAll({}).then(res => {
      console.warn('getOrdersAll')
      console.warn(res)
    })

  }
}
</script>

<style lang="scss" scoped>


@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/utilities";

@import '~bootstrap/scss/grid';
@import '~bootstrap/scss/containers';
@import '~bootstrap/scss/buttons';
@import '~bootstrap/scss/bootstrap-reboot';

::v-deep {

  .r-single-token {

    font-weight: 400;
    font-size: 16pc;
    color: rgb(4, 4, 5);
  }

  .btn {

    outline: none;
    text-decoration: none !important;
    display: flex;
    flex-flow: row nowrap;
    white-space: nowrap;
    line-height: 48px;
    height: 48px;
    padding-left: 26.4px;
    padding-right: 26.4px;
    min-width: 100%;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 48px;
    font-size: 15px;
    font-weight: 900;
    transition: all 0.12s ease-in-out 0s;
    transform-origin: center center;
    user-select: none;
    border-color: rgb(0, 102, 255);
    color: rgb(255, 255, 255);
    background: rgb(0, 102, 255);
    margin-bottom: 10px;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
      background: rgba(0, 102, 255, 0.95);

    }

    &:active {
      transform: scale(0.95);
    }
  }

  .r-title {
    overflow-wrap: break-word;
    font-size: 36px;
    line-height: 1.22;
    font-weight: 900;

    &:before {
      content: none;
      display: none;
    }
  }

  .r-content {
    margin-bottom: 24px;
    vertical-align: inherit;
    max-width: 100%;
    min-height: 0px;
    min-width: 0px;
    flex-shrink: 0;
    flex-direction: column;
    flex-basis: auto;
    display: flex;
    -webkit-box-align: stretch;
    align-items: stretch;
  }
}
</style>