<template>
  <div class="container">
    <div class="row aligncenter">
      <div>
        <form action="#" method="post" class="b-form-cont " style="position: relative" id="add-places-1"
        >
          <h2 class="b-form-cont__title">Create single collectible</h2>
          <div class="b-form b-form--place container-fluid">

            <div class="b-form__row row">
              <div class="col-md-5">
                <label class="floating-label">Upload file</label>

                <div style="max-width: 300px; max-height: 800px">
                  <picture-input
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
                      @change="onChange">
                  </picture-input>
                </div>

              </div>
              <div class="col-md-7">
                <div class="b-form__row row">
                  <div class="col-md-12">
                    <label class="floating-label">Title</label>
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
                    <label class="floating-label">Price</label>
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
                    <label class="floating-label">Royalties</label>
                    <input v-model="form.royalties" required=""
                           class="form-control"
                           type="number"
                           placeholder="Enter %"
                           value="">
                    <small>Suggested: 0%, 10%, 20%, 30%. Maximum is 50%</small>
                  </div>
                </div>
              </div>
            </div>


            <div class="b-form__row row">

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

            </div>
            <!--            <div class="b-form__row row">-->
            <!--              <div class="col-md-12">-->
            <!--                <label class="floating-label">Properties (Optional)</label>-->

            <!--                <div class="row">-->
            <!--                  <div class="col-md-6"><input required=""-->
            <!--                                               class="form-control"-->
            <!--                                               type="number"-->
            <!--                                               placeholder="e.g Size"-->
            <!--                                               value=""></div>-->
            <!--                  <div class="col-md-6"><input required=""-->
            <!--                                               class="form-control"-->
            <!--                                               type="number"-->
            <!--                                               placeholder="e.g M"-->
            <!--                                               value=""></div>-->
            <!--                </div>-->


            <!--              </div>-->
            <!--            </div>-->


            <div class="b-form__row row">
              <div class="col-md-12">

                <div class="alert alert-danger" v-if="errors" v-for="error in errors"> {{ error }}</div>
              </div>
            </div>


            <div style="color: red; padding: 15px;     word-break: break-all;">{{ loadText }}</div>

            <div class="b-form__row row" style="position: relative">
              <div class="col">
                <buttonConnect v-if="!getAccounts[0]"/>
                <button v-else :disabled="loader" type="submit" @click.prevent="submit" class="btn save-btn">Save
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

</template>

<script>


import PictureInput from 'vue-picture-input'
import api from "../api/api";
import Loader from "./parts/Loader";
import {create} from "ipfs-http-client";
import {toAddress} from "@rarible/types";
import {stringify} from "qs";
import {mapGetters} from "vuex";
import buttonConnect from "./parts/buttonConnect";

export default {
  name: "CreateNFTAndPost",
  components: {
    PictureInput, Loader, buttonConnect
  },
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  data() {
    return {
      form: {
        image: null,
        title: '',
        price: '',
        royalties: '',
        description: '',
        properties: {}

      },
      errors: false,
      loader: false,
      loadText: '',
      imgLink: false,
      postId: false
    }
  },
  methods: {
    onChange(image) {
      console.log('New picture selected!')
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
    submit1() {
      this.getSdk.order.sell({
        maker: toAddress(this.getAccounts[0]),
        makeAssetType: {
          assetClass: "ERC721",
          contract: '0xb0ea149212eb707a1e5fc1d2d3fd318a8d94cf05',
          tokenId: '21294992975815871805933535892073127469301996728786004586751131538920447148064',
        },
        price: 0.008 * 1000000000000000000, // "60000000000000000", // 0.06 ETH
        takeAssetType: {
          assetClass: "ETH",
        },
        amount: 1,
        payouts: [],
        originFees: [{
          account: this.getAccounts[0],
          value: 1,
        }],
      }).then(order => {
        console.log('order', order)
      })

      console.log('555555555555555555')
      return
    },
    submit() {


      let params = new URLSearchParams();
      params.append('action', 'get_names');
      params.append('key2', 'value2');
      let file = this.$refs.pictureInput.file
      console.warn('222')

      this.loadText = 'Please wait for the token to be created, it may take about a minute. do not close / reload this tab!'
      let formData = new FormData();
      let fileName = '';
      if (file) {
        fileName = file.name
        formData.append('file', file);
        formData.append('file_name', file.name);
      }
      formData.append('title', this.form.title); //coming from props
      formData.append('price', this.form.price); //coming from props
      formData.append('royalties', this.form.royalties); //coming from props
      formData.append('description', this.form.description); //coming from props
      formData.append('properties', this.form.properties); //coming from props

      let headers = {};
      headers['Content-Disposition'] = 'form-data; filename=\'' + fileName + '\'';


      this.errors = false
      this.loader = true


      api.post('wp-admin/admin-ajax.php?action=rarible_create_nft_post', formData, headers).then(res => {

        console.log(res.data)
        //this.loader = false
        this.imgLink = res.data.img
        this.postId = res.data.ID
        this.makeNftToken()


      }).catch(error => {
        console.warn(error)
        console.warn(error.response.data.errors)
        this.errors = {...error.response.data.errors}
        this.loader = false
        this.loadText = ''
      })
    },
    makeNftToken() {

      console.log('price', this.form.price)
      const ipfsItem = {
        "description": this.form.description,
        "external_url": "",// <-- this can link to a page for the specific file too
        "image": this.imgLink, // this.imgLink
        "name": this.form.title,
        //  "attributes": []
      }
      const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
      ipfs.add(JSON.stringify(ipfsItem)).then(uploaded => {
        const uri = `ipfs/${uploaded.path}`
        console.log('uri', uri)
        console.log('sleep 42', uri)

        axios.get(`https://ipfs.io/ipfs/${uploaded.path}`).then(() => {
          this.sleep(1000 * 32).then(() => {
            console.log('woke up. start mint')
            this.loadText = 'Start mint...'
            const mintFormInitial = {
              id: "0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05", // default collection on "rinkeby" that supports lazy minting
              type: "ERC721",
              isLazy: true,
              isLazySupported: true,
              loading: false,
            }
            this.getSdk.apis.nftCollection.getNftCollectionById(
                {collection: mintFormInitial.id}).then(nftCollection => {
              this.getSdk.nft.mint({
                uri: uri,
                collection: nftCollection,
                creators: [{account: toAddress(this.getAccounts[0]), value: 10000}], // creators of token
                royalties: [
                  {
                    account: toAddress(this.getAccounts[0]), value: 1000
                  }
                ],
                lazy: true,
              }).then(tx => {
                console.log('tx', uri)
                console.log('tx2', tx)
                console.log({itemId: tx.itemId})
                console.log('itemId', tx.itemId)
                api.post('wp-admin/admin-ajax.php?action=rarible_update_nft_post', stringify({
                  IPFS: uploaded.path,
                  postId: this.postId,
                  tx: tx,
                  tx_item_id: tx.itemId,
                  order_hash: ''  //order.hash,

                })).then(() => {
                  this.loadText ='sleep 40s before create order'

                  console.log('sleep 10 before create order')
                  console.log('tokenId', tx.tokenId)

                  this.sleep(1000 * 10).then(() => {
                    console.log('order make ob', {
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

                    this.loadText = 'Start make order for token...'
                    this.getSdk.order.sell({
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
                    }).then(order => {
                      api.post('wp-admin/admin-ajax.php?action=rarible_update_nft_post', stringify({
                        IPFS: uploaded.path,
                        postId: this.postId,
                        tx: tx,
                        tx_item_id: tx.itemId,
                        order_hash: order.hash,

                      })).then(res => {
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
                        setTimeout(() => {
                          this.loadText = ''
                        }, 3000)

                      })
                    }).catch(e => {
                      this.loadText = 'Error. order not created'
                      console.log('Error. order not created')
                      this.loader = false
                      setTimeout(() => {
                        this.loadText = ''
                      }, 3000)
                    }).finally(() => {
                      this.form = {
                        image: null,
                        title: '',
                        price: '',
                        royalties: '',
                        description: '',
                        properties: {}

                      }
                    })
                  })
                })

                /* this.getSdk.order.sell({
                    maker: toAddress(this.getAccounts[0]),
                    makeAssetType: {
                      assetClass: "ERC721",
                      contract: '0xb0ea149212eb707a1e5fc1d2d3fd318a8d94cf05',
                      tokenId: tx.itemId,
                    },
                    price: this.price *  1000000000000000000, // "60000000000000000", // 0.06 ETH
                    takeAssetType: {
                      assetClass: "ETH",
                    },
                    amount: 1,
                    payouts: [],
                    originFees: [{
                      account: this.getAccounts[0],
                      value: 1,
                    }],
                  }).then(order => {
                    api.post('wp-admin/admin-ajax.php?action=rarible_update_nft_post', stringify({
                      IPFS: uploaded.path,
                      postId: this.postId,
                      tx: tx,
                      tx_item_id: tx.itemId,
                      order_hash: order.hash,

                    })).then(res => {
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
                      setTimeout(() => {
                        this.loadText = ''
                      },3000)

                    })
                  })*/
                //console.warn(order)

              })

            })
          })
        })

      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/utilities";

  @import '~bootstrap/scss/grid';
  @import '~bootstrap/scss/containers';
  @import '~bootstrap/scss/buttons';
  @import '~bootstrap/scss/bootstrap-reboot';

  .b-form--place input[type=text], .b-form--place input[type=email], .b-form--place input[type=tel], .b-form--place input[type=search], .b-form--place input[type=time], .b-form--place textarea {
    background: #f7f7f7;
    height: 62px;
  }

  label {
    font-weight: 900;
    color: rgb(4, 4, 5);
    font-size: 17px;
    margin-bottom: 10px;
  }

  .form-control {
    border: 1px solid #e2e2e2;
    background: #fff;
    min-height: 50px;
    line-height: 50px;
    width: 100%;
    padding: 0 15px;
    font-weight: 300;
    font-size: 16px;
    font-family: Roboto-Light;
    transition-duration: .2s;
    transition-property: all;
    color: #0e0f11;
    background: #f7f7f7;
    height: 62px;

  }

  .form-control-textarea {

    height: auto;
    min-height: 180px;
  }

  .save-btn {
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
    position: relative;
    box-sizing: border-box;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
  }

  .b-form--place .b-form__row {
    padding: 0 15px;
  }

  .b-form__row {
    margin-bottom: 30px;
  }

  .preview-container {
    padding: 0 !important;
    margin: 0;
  }


  .b-form--place input[type=text], .b-form--place input[type=email], .b-form--place input[type=tel], .b-form--place input[type=search], .b-form--place input[type=time], .b-form--place textarea {
    background: #f7f7f7;
    height: 62px;
    font-size: 16px;
    font-family: Roboto-Light;
  }

  select:focus, textarea:focus, input[type=text]:focus, input[type=password]:focus, input[type=datetime]:focus, input[type=datetime-local]:focus, input[type=date]:focus, input[type=month]:focus, input[type=time]:focus, input[type=week]:focus, input[type=number]:focus, input[type=email]:focus, input[type=url]:focus, input[type=search]:focus, input[type=tel]:focus, input[type=color]:focus {
    border: 1px solid #de443a;
    outline: 0 none;
  }

  .b-form-cont {
    background: #fff;
    width: 100%;
    box-shadow: 0 2px 2px #ddd;
    margin-bottom: 40px;
    padding-bottom: 30px;

  }

  .b-form-cont__title {
    padding: 20px 40px;
    border-bottom: 1px solid #ececec;
    margin: 0 0 40px;

  }

  .alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .alert-danger {
    color: #fff;;
    background-color: #de443a;
    border-color: #de443a;
  }
}
</style>