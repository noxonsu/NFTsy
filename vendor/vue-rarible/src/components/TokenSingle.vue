<template>
  <div class="r-single-token">
    <template v-if="!loading">
      <div class="row ">
        <div class="col r-parent-img " style="">
          <img :src="post.img" :alt="post.title">

        </div>
        <div class="col r-parent-img" style="word-break: break-all">
          <h1 style="font-size: 40px;" class="r-title">{{ post.title }}</h1>
          <div class="r-content" v-html="post.content"></div>
          <div>

            <div>
              <div class="row">


                <template v-if="post.price && post.order_hash.length > 1">
                  <div class="col-md-4">
              <span v-if="type === 'order' && post.order_hash.length > 1"
                    class=""><span style="font-weight: 900; font-size: 22px;"
                                   class="sc-bdnxRM sc-hKFxyN sc-eCApnc RWHKB">Price:
              </span>
              </span>
                  </div>


                  <div class="col-md-8">
              <span
                  class="" style="padding-top: 0px; display: block"><a>
                <span v-if="post.price && post.order_hash.length > 1"
                      style=" font-weight: 900; font-size: 22px">{{ post.price }} ETH</span>

              </a>

              </span>

                  </div>
                </template>
                <span v-else class="not-for-sale">Not for sale</span>

                <div class="col-md-12" style="margin-top: 30px">
                  <buttonConnect v-if="!getAccounts[0]"/>

                  <single-tabs :post="post"/>
                  <template v-if="getAccounts[0]">
                    <br>
                    <a v-if="post.order_hash && post.order_hash.length > 1 && getAccounts[0].toUpperCase() != post.owner.toUpperCase()"
                       @click.prevent="buyOrder"
                       class="btn btn--sm press--right">Buy token</a>
                    <put-on-sale
                        v-if="post.order_hash.length < 1 && getAccounts[0].toUpperCase() == post.owner.toUpperCase() "
                        :text="'Put OnSale' " @orderDone="getPost" :post="post"/>

                    <put-on-sale
                        v-if="post.order_hash && post.order_hash.length > 1 && getAccounts[0].toUpperCase() == post.owner.toUpperCase() "
                        :text="'Change Price' " @orderDone="getPost" :post="post"/>


                    <loader v-if="buyOrderLoader"/>
                    <PlaceBid v-if="$enableBid" :post="post"/>
                  </template>


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
    <error-modal @close="closeErrorModal" v-if="error" :error="error"></error-modal>

  </div>


</template>
<script>
import api from "../api/api";
import {mapGetters} from "vuex";
import buttonConnect from "./parts/buttonConnect";
import SingleTabs from "./parts/singleTabs";
import PlaceBid from "./parts/PlaceBid";
import Loader from "./parts/Loader";
import PutOnSale from "./parts/PutOnSale";
import ErrorModal from "./parts/ErrorModal";
import {stringify} from "qs";

export default {
  name: "TokenSingle",
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  components: {
    buttonConnect, SingleTabs, PlaceBid, Loader, PutOnSale, ErrorModal
  },
  data() {
    return {
      post: {},
      type: 'bid', // bid order,
      loading: true,
      buyOrderLoader: false,
      error: false

    }
  },
  methods: {
    closeErrorModal() {
      this.error = false
    },
    transferToken() {
      api.post('wp-admin/admin-ajax.php?action=nftcy_transfer_nft_post', stringify({
        postId: this.post.id
      })).then(res => {
        let response = res.data
        if (!(response.success && response.changed)) {
          setTimeout(() => this.transferToken(), 1500)
        } else {
          console.log('transfer post done')
          this.getPost()
          this.buyOrderLoader = false
        }

      })
    },
    buyOrder() {
      this.buyOrderLoader = true
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
              // a.runAll()
              // alert('Token bought');
              console.log('Token bought')
              this.transferToken()
            }).catch(e => {
              this.error = e.message
              this.buyOrderLoader = false
              console.error(e)

            })
                .finally(() => {

                  setTimeout(() => {
                    api.post('wp-admin/admin-ajax.php?action=nftcy_transfer_nft_post', stringify({
                      postId: this.post.id
                    })).then(res => {
                      console.log('transfer post done 2')
                    })
                  }, 2000)


                  console.log('finally 11')
                  setTimeout(() => {
                    this.getPost()
                    //this.buyOrderLoader = false
                  }, 1500)
                })

          }).catch(e => {
        console.error(e)
        this.error = e.message
      }).finally(() => {

        // this.buyOrderLoader = false
      })

    },
    getPost() {
      api.get('wp-admin/admin-ajax.php',
          {params: {action: 'nftcy_nft_post', post_id: this.$route.params.id}}
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
  },
  async mounted() {
    this.getPost()

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

    * {
      font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

  }

  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  h5,
  .h5,
  h6,
  .h6 {
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .not-for-sale {
    font-size: 18px;
    font-weight: 900;
    color: rgb(0, 102, 255);
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
    background-color: rgb(0, 102, 255);
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

  .r-parent-img {
    align-items: center;
    flex: unset;
    width: unset;
    max-width: 50%
  }

}

@media (max-width: 576px) {
  .r-parent-img {
    max-width: 100%
  }
}
</style>