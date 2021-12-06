<template>
  <div v-if="post">
    <a v-if=""
       @click.prevent="putOnSale"
       class="btn btn--sm press--right">{{text}}</a>
    <modal v-if="openModal">
      <template v-if="step == 1">
        <h2>Fixed price</h2>
        <p>Enter new price. Your NFT will be pushed in top of marketplace
        </p>
        <div class="col-md-12">
          <label class="floating-label">Price (ETH)</label>
          <input required=""
                 v-model="form.price"
                 name="place_title"
                 class="form-control"
                 type="number"
                 placeholder="Enter price"
                 value="">
          <br>
          <div class="r-error-msg">{{ error }}</div>
        </div>
        <button @click.prevent="makeOrder" :disabled="loading" type="button" class="r-btn r-btn-blue ">Done
        </button>
        <button @click.prevent="closeModal" type="button" class="r-btn ">Cancel</button>

        <br>
        <loader v-if="loading" style="margin-bottom: 20px;"/>

      </template>
      <template v-else>
        <h2>Success</h2>
        <button @click.prevent="closeModal" type="button" class="r-btn ">Close</button>
      </template>
    </modal>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import Modal from "./Modal";
import Loader from "./Loader";
import {toAddress} from "@rarible/types";
import api from "../../api/api";
import {stringify} from "qs";

export default {
  name: "PutOnSale",
  props: ['post','text'],
  components: {
    Modal, Loader
  },
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),
  },
  data() {
    return {
      form: {
        price: '',
      },
      loading: false,
      openModal: false,
      step: 1,
      error: ''

    }
  },
  watch: {

    'form.price'(newVal) {
      //to work with changes in "myArray"
      console.warn(newVal)
      if (newVal < 0) {
        this.error = 'Enter price should be more that 0'
      } else {
        this.error = ''
      }
    },
  },
  methods: {
    async makeOrder() {
      if (this.form.price > 0) {
        try {
          this.loading = true
          this.error = ''

          let order = await this.getSdk.order.sell({
            maker: toAddress(this.getAccounts[0]),
            makeAssetType: {
              assetClass: "ERC721",
              contract: this.$collectionId,
              tokenId: this.post.tokenId,
            },
            price: this.form.price * 1000000000000000000, // "60000000000000000", // 0.06 ETH
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

          await api.post('wp-admin/admin-ajax.php?action=nftcy_update_nft_post', stringify({
            postId: this.post.id,
            tx_item_id: this.post.nftcy_tx_item_id,
            order_hash: order.hash,
            price: this.form.price

          }))
          this.step = 2
          this.$emit('orderDone')

        } catch (e) {
          console.warn(e.message)
          this.error = e.message ? e.message : e
        } finally {
          this.loading = false
        }
      } else {
        this.error = 'Enter price should be more that 0'
      }
    },
    putOnSale() {
      this.openModal = true
    },
    closeModal() {
      this.openModal = false
    }
  }

}
</script>

<style lang="scss" scoped>
input.form-control {
  border: none;
  border-bottom: 1px solid rgba(4, 4, 5, 0.07);
  min-height: 50px;
  line-height: 50px;
  width: 100%;
  padding: 0;
  font-weight: 300;
  font-size: 16px;
  transition-duration: .2s;
  transition-property: all;
  color: #0e0f11;
  background: transparent !important;
  height: 62px;
  outline: none;
  margin-bottom: 20px;
}

input.form-control:active, input.form-control:focus, input.form-control:hover {
  border-color: rgba(4, 4, 5, 0.25);
  outline: none;
}

.r-btn-blue {
  border-color: rgb(0, 102, 255);
  color: rgb(255, 255, 255);
  background: rgb(0, 102, 255);
  margin-bottom: 10px;
}

.r-error-msg {
  font-weight: 900;
  font-size: 15px;
  color: red;
}
</style>