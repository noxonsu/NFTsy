<template>
  <div>
    <form>
      <div class="mb-3">
        <div class="row">
          <div class="col-12">
            <h4 class="sign__title">Upload file</h4>
          </div>
          <div class="col-12">
            <label for="file1">
              e. g. Image, Audio, Video
            </label>
            <input type="file"
                   class="form-control"
                   id="file1"
                   aria-describedby="emailHelp"
                   accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg"

            >
          </div>
          <div class="col-12">
            <h4 class="sign__title">Item details</h4>
          </div>
          <div class="col-12">
            <div class="sign__group">
              <label class="sign__label" for="itemname">
                Item name
              </label>
              <input
                  id="itemname"
                  type="text"
                  name="itemname"
                  class="sign__input"
                  placeholder="e. g. 'Crypto Heart'"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="sign__group">
              <label class="sign__label" for="description">
                Description
              </label>
              <textarea
                  id="description"
                  name="description"
                  class="sign__textarea"
                  placeholder="e. g. 'After purchasing you will able to recived...'"
                  defaultValue={""}
              />
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="sign__group">
              <label class="sign__label" for="royalties">
                Royalties
              </label>
              <select
                  id="royalties"
                  name="royalties"
                  class="sign__select"
              >
                <option value={1}>5%</option>
                <option value={2}>10%</option>
                <option value={3}>20%</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="sign__group">
              <label class="sign__label" for="size">
                Size
              </label>
              <input
                  id="size"
                  type="text"
                  name="size"
                  class="sign__input"
                  placeholder="e. g. Size"
              />
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="sign__group">
              <label class="sign__label" for="propertie">
                Propertie
              </label>
              <input
                  id="propertie"
                  type="text"
                  name="propertie"
                  class="sign__input"
                  placeholder="Subject"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="sign__group sign__group--row">
              <ul class="sign__radio sign__radio--single">
                <li>
                  <input
                      id="type1"
                      type="radio"
                      name="type"
                      defaultChecked
                  />
                  <label for="type1">Put on sale</label>
                </li>
                <li>
                  <input id="type2" type="radio" name="type"/>
                  <label for="type2">Instant sale price</label>
                </li>
                <li>
                  <input id="type3" type="radio" name="type"/>
                  <label for="type3">Unlock one purchased</label>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-xl-3">
            <button type="button" class="sign__btn">
              Create item
            </button>
          </div>
        </div>

      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button @click.prevent="lazyMint" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {toAddress} from "@rarible/types";
import {create} from 'ipfs-http-client'

export default {
  name: "createNFT",
  props: ['sdk'],
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),

  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async lazyMint() {

      const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
      const buffalo = {
        "description": "The painted turtle (Latin Chrysemus picta) belongs to the American freshwater family ...",
        "external_url": "https://zooclub.org.ua",// <-- this can link to a page for the specific file too
        "image": "https://zooclub.org.ua/uploads/2021/08/09/raspisnaya-cherepaha12-370x240.jpg",
        "name": "Painted turtle",
        "attributes": [
          {
            "trait_type": "BackgroundColor",
            "value": "gray"
          },
          {
            "trait_type": "Eyes",
            "value": "turtle"
          },
          {
            "trait_type": "Stamina",
            "value": 77
          }
        ]
      }
      console.log("Uploading image...")
      const uploaded = await ipfs.add(JSON.stringify(buffalo))

      console.log("Minting  with IPFS hash (" + uploaded.path + ")")
      const res = await axios.get(`https://ipfs.io/ipfs/${uploaded.path}`)
      console.log(res2)
      console.log('sleep for 30 sec')
      await this.sleep(1000 * 30)
      console.log('woke up. start mint')
      const uri = `ipfs/${uploaded.path}`

      console.log('uri', uri)


      const mintFormInitial = {
        id: "0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05", // default collection on "rinkeby" that supports lazy minting
        type: "ERC721",
        isLazy: true,
        isLazySupported: true,
        loading: false,
      }

      const nftCollection = await this.getSdk.apis.nftCollection.getNftCollectionById(
          {collection: mintFormInitial.id})

      const tx = await this.getSdk.nft.mint({
        uri: uri,
        collection: nftCollection,
        creators: [{account: toAddress(this.getAccounts[0]), value: 10000}], // creators of token
        royalties: [],
        lazy: true,
      })
      console.log('tx', uri)
      console.log('tx2', tx)
      console.log({itemId: tx.itemId})
      if (tx) {

        // Get minted nft through SDK

        const token = await this.getSdk.apis.nftItem.getNftItemById({itemId: tx.itemId})
        if (token) {
          console.log(token)
        } else {
          console.log("access denied")
        }
      }

    }
  }

}
</script>

<style scoped>

</style>