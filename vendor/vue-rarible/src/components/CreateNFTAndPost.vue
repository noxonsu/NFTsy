<template>
  <layout-default>
    <div class="container">
      <div class="row aligncenter">
        <div>
          <form action="#" method="post" class="b-form-cont " style="position: relative" id="add-places-1"
          >
            <h2 class="b-form-cont__title">Create single collectible</h2>
            <div class="b-form b-form--place container-fluid">

              <div class="b-form__row row">
                <div class="col-md-9">
                  <label class="floating-label">Upload file</label>


                  <div style="max-width: 300px; max-height: 800px; margin: 0 auto">
                    <picture-input
                        :removable="true"
                        style=""
                        ref="pictureInput"
                        margin="1"
                        accept="image/jpeg,image/png"
                        size="10"
                        button-class="btn"
                        :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a image'
      }"
                        :clear="clearImage"
                        @change="onChange"
                        @remove="removeImage"
                        @cleared="clearedImage">
                    </picture-input>
                  </div>

                  <div  class="b-form__row row">

                    <div class="col-md-12">

                      <div style="display: flex; justify-content: space-between; margin-top: 50px;">
                        <div class="">
                          <div class="label-primary">Put on marketplace</div>
                          <div class="label-primary-desc">Enter price to allow users instantly purchase your NFT</div>
                        </div>
                        <div class="">
                          <div style="float: right">
                            <toggle id="v-t-default" v-model="form.putOnMarket"></toggle>
                          </div>

                        </div>
                      </div>

                        <div v-if="form.putOnMarket"  class="btn-market-put-btns" >
                          <button type="button"
                                  @click="type ='fixedPrice'"
                                  :class="{active: type == 'fixedPrice'}"
                                  class="btn-market-put">
                            <img alt="Fixed price" src="https://ropsten.rarible.com/25d23f2b0f1b54429ce9.svg" loading="lazy"
                                 class="">
                            <div class=""><span
                                class="">Fixed price</span></div>
                          </button>
                          <button type="button"
                                  @click="type ='bid'"
                                  :class="{active: type == 'bid'}"
                                  class="btn-market-put">
                            <img alt="Open for bids" src="https://ropsten.rarible.com/cec4bdb514ea63a26280.svg" loading="lazy"
                                 class="">
                            <div class=""><span
                                class="">Open for bids</span></div>
                          </button>

                        </div>


                    </div>
                  </div>
                  <div  class="b-form__row row">

                    <div class="col-md-12">
                      <div style="display: flex; justify-content: space-between; margin-top: 50px;">
                        <div class="">
                          <div class="label-primary">Free minting</div>
                          <div class="label-primary-desc">Buyer will pay gas fees for minting</div>
                        </div>
                        <div class="">
                          <div style="float: right">
                            <toggle id="v-t-default2" v-model="form.lazy"></toggle>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                  <div v-if="form.putOnMarket && type == 'fixedPrice'" class="b-form__row row">
                    <div class="col-md-12">
                      <label class="floating-label">Price (ETH)</label>
                      <input required=""
                             v-model="form.price"
                             name="place_title"
                             class="form-control"
                             type="number"
                             placeholder="Enter price"
                             value="">
                    </div>
                  </div>

                  <div class="b-form__row row">
                    <div class="col-md-12">
                      <label class="floating-label">Name</label>
                      <input v-model="form.title"
                             name="place_title"
                             class="form-control"
                             type="text"
                             placeholder="Enter text"
                             value="">
                    </div>
                  </div>

                  <div class="b-form__row row">
                    <div class="col-md-12">
                      <label class="floating-label">Description</label>
                      <textarea v-model="form.description" class="form-control  form-control-textarea"
                                placeholder="Description"
                                value=""> </textarea>


                    </div>
                  </div>
                  <div class="b-form__row row">
                    <div class="col-md-12">
                      <label class="floating-label">Royalties</label>
                      <input v-model="form.royalties" required=""
                             class="form-control"
                             type="number"
                             placeholder="Enter %"
                             value="">
                      <small>Suggested: 0%, 10%, 20%, 30%. Maximum is 50%</small>
                    </div>
                  </div>
                  <div class="b-form__row row">
                  <div class="col-md-12">
                    <label class="floating-label">Properties (Optional)</label>

                    <div class="row" v-for="(item , key) in form.properties">
                      <div class="col-md-5">
                        <input required="" v-model="item.key"
                                                   class="form-control"
                                                   type="text"
                                                   placeholder="e.g Size"
                                                   value=""></div>
                      <div class="col-md-5">
                        <input  required="" v-model="item.value"
                                                    class="form-control"
                                                   type="text"
                                                   placeholder="e.g M"
                                                   value="">


                      </div>
                      <div class="col-md-1">
                        <button :disabled="form.properties.length == 1" type="button" @click="deleteRow(key,item)"
                                class="btn btn-danger">X
                        </button>
                      </div>
                    </div>


                    <br>
                    <button type="button" @click="addNewRow" class="btn btn-primary " >+</button>

                  </div>
                </div>

                  <div>



                </div>
                </div>

              </div>






              <div class="b-form__row row">
                <div class="col-md-12">

                  <div class="alert alert-danger" v-if="errors" v-for="error in errors"> {{ error }}</div>
                </div>
              </div>


              <div style="color: red; padding: 15px;     word-break: break-all;">{{ loadText }}</div>

              <div class="b-form__row row" style="position: relative">
                <div class="col">
                  <buttonConnect v-if="!getAccounts[0]"/>
                  <button v-else :disabled="loader" type="submit" @click.prevent="submit" class="btn save-btn">Create item
                  </button>


                  <span class="ajax_saved_text" style="display: none;">saved...</span>
                </div>
                <div class="col" style="padding: 20px;">
                  <Loader
                      v-if="loader"
                      style="float: right; position: static " class="pull-right"></Loader>

                </div>
              </div>


            </div>
          </form>
        </div>

      </div>
    </div>
  </layout-default>


</template>

<script>


import PictureInput from './parts/CustumPictureInput'
import api from "../api/api";
import Loader from "./parts/Loader";
import {create} from "ipfs-http-client";
import {toAddress} from "@rarible/types";
import {stringify} from "qs";
import {mapGetters} from "vuex";
import buttonConnect from "./parts/buttonConnect";
import WrongNetwork from "./WrongNetwork";
import LayoutDefault from "./Layouts/LayoutDefault";
import Toggle from "./parts/Toggle";
import {convertKeyVale} from "../../../../../../rariblewp/vendor/vue-rarible/src/helpers/utils";
export default {
  name: "CreateNFTAndPost",
  components: {
    PictureInput, Loader, buttonConnect, WrongNetwork, LayoutDefault, Toggle
  },
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  data() {
    return {
      form: {
        toggle: false,
        image: null,
        title: '',
        price: '',
        royalties: 0,
        description: '',
        properties: [
          {
            key: null,
            value: null,

          }],
        putOnMarket: true,
        lazy: true

      },
      type: 'fixedPrice',
      clearImage: false,
      errors: false,
      loader: false,
      loadText: '',
      imgLink: false,
      postId: false
    }
  },
  mounted: function () {
    let res = [{"key": "10", "value": "20120120"},
      {"key": "pppppppppp", "value": "2222222"},
      {"key": "", "value": ""}

    ]

    console.warn(convertKeyVale(res))

    // res.forEach(element => console.log(element));

  },
  methods: {
    convertKeyVale(res){
      return res.filter(({key, value}) => key && key.length > 1 && value && value.length > 1)
          .map(({key, value}) => ({[key]: value}))

    },
    deleteRow(index, item){
      var idx = this.form.properties.indexOf(item)
      if (idx > -1) {
        this.form.properties.splice(idx, 1)
      }
    },
    addNewRow(){
      this.form.properties.push({

      })
    },
    clearedImage() {
      this.clearImage = false
    },
    removeImage() {
      this.form.image = null
      this.clearImage = true
    },
    onChange(image) {
      if (image) {
        console.log('Picture loaded.')
        this.form.image = image
      } else {
        this.form.image = false
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async submit() {
      this.loadText = 'Please wait for the token to be created, it may take about a minute. do not close / reload this tab!'
      let headers = {};
      let fileName = ''
      let file = this.$refs.pictureInput.file
      if (file) {
        fileName = file.name
      }
      headers['Content-Disposition'] = 'form-data; filename=\'' + fileName + '\'';
      let formData =
      this.errors = false
      this.loader = true
      try {
        let res = await api.post('wp-admin/admin-ajax.php?action=rarible_create_nft_post', this.makeRequestForPost(), headers)
        console.log(res.data)
        this.imgLink = res.data.img
        this.postId = res.data.ID
        try {
          await this.makeNftToken()
        } catch (error) {
          this.loadText = error
          this.loader = false
        }
      } catch (error) {

        console.warn(error)
        console.warn(error.response.data.errors)
        this.errors = {...error.response.data.errors}
        this.loader = false
        this.loadText = ''
      }


    },
    makeRequestForPost() {
      let file = this.$refs.pictureInput.file
      let formData = new FormData();
      let fileName = '';
      if (file) {
        fileName = file.name
        formData.append('file', file);
        formData.append('file_name', file.name);
      }
      formData.append('title', this.form.title);
      formData.append('price', this.form.price);
      formData.append('royalties', this.form.royalties);
      formData.append('description', this.form.description);
      formData.append('properties', this.form.properties);

      return  formData
    },
    async makeNftToken() {

      const ipfsItem = {
        "description": this.form.description,
        "external_url": "",// <-- this can link to a page for the specific file too
        "image": this.imgLink, // this.imgLink
        "name": this.form.title,
      }
      if(convertKeyVale(this.form.properties).length > 0){
        ipfsItem.attributes = convertKeyVale(this.form.properties)
      }
      const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
      let uploaded = await ipfs.add(JSON.stringify(ipfsItem))
      const uri = `ipfs/${uploaded.path}`
      console.log('uri', uri)
      console.log('check IPS', uri)
      await axios.get(`https://ipfs.io/ipfs/${uploaded.path}`)
      await this.sleep(1000 * 5)
      this.loadText = 'Start minting...'

      const mintFormInitial = {
        id: "0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05", // default collection on "rinkeby" that supports lazy minting
        type: "ERC721",
        isLazy: true,
        isLazySupported: true,
        loading: false,
      }
      let nftCollection = await this.getSdk.apis.nftCollection.getNftCollectionById(
          {collection: mintFormInitial.id})
      let tx = await this.getSdk.nft.mint({
        uri: uri,
        collection: nftCollection,
        creators: [{account: toAddress(this.getAccounts[0]), value: 10000}], // creators of token
        royalties: [
          {
            account: toAddress(this.getAccounts[0]),
            value: this.form.royalties 	* 100 //2000 means 20%.
          }
        ],
        lazy: this.form.lazy,
      })
      console.log('tx', uri)
      console.log('tx2', tx)
      console.log({itemId: tx.itemId})
      console.log('itemId', tx.itemId)
      await api.post('wp-admin/admin-ajax.php?action=rarible_update_nft_post', stringify({
        IPFS: uploaded.path,
        postId: this.postId,
        tx: tx,
        tx_item_id: tx.itemId,
        order_hash: '',  //order.hash,
        type: this.type

      }))
      if(this.type =='fixedPrice') {
        await this.makeOrder(tx, uploaded)
      } else {
        this.allDone(tx)
      }


    },
    allDone(tx){
      console.log('all done')
      this.loadText = 'all done, nft token created ' + tx.itemId
      this.loader = false
      this.form = {
        image: null,
        title: '',
        price: '',
        royalties: '',
        description: '',
        properties: {}

      }
      this.removeImage()
      setTimeout(() => {
        this.loadText = ''
      }, 3000)

    },
    async makeOrder(tx, uploaded) {
      this.loadText = 'sleep 3s before create order'
      await this.sleep(1000 * 3)
      this.loadText = 'Start make order for token...'

      let order = await this.getSdk.order.sell({
        maker: toAddress(this.getAccounts[0]),
        makeAssetType: {
          assetClass: "ERC721",
          contract: '0xb0ea149212eb707a1e5fc1d2d3fd318a8d94cf05',
          tokenId: tx.tokenId,
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
      console.log('order', order)
      await api.post('wp-admin/admin-ajax.php?action=rarible_update_nft_post', stringify({
        IPFS: uploaded.path,
        postId: this.postId,
        tx: tx,
        tx_item_id: tx.itemId,
        order_hash: order.hash,

      }))
     this.allDone(tx)
    }
  }
}
</script>

<style lang="scss" scoped src="./style/CreateNFTAndPost.scss"></style>