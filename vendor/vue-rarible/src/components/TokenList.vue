<template>
  <div id="content" >
    <div v-if="!loading" class="b-place-list r-place-list">
      <div v-if="localItems.length > 0"  v-masonry transition-duration="0.3s" item-selector=".item" :origin-top="true" :horizontal-order="false" >

        <div v-masonry-tile  class="b-grid-item b-grid-item--masonry item" v-for="item in localItems" >
          <div class="b-event">
            <div class="event-top"></div>
            <div class="b-event__img ">
              <div class="event-img-warp">
                <router-link class="b-pop-place__img__img" :to="{ name: 'tokens.single', params: { id: item.id }}">
                  <img :src="item.img" class="" alt=""> </router-link>
              </div>

            </div>
            <div class="b-event__desc clearfix">
              <div class="press--left _mod-width">
                <router-link   class="b-event__name" :to="{ name: 'tokens.single', params: { id: item.id }}">
                  {{item.title}}
                </router-link>


              </div>
              <div style="display: flex; justify-content: space-between; align-items: center">
                <spna class="b-t-btn " v-if="item.order_hash.length && item.price"  >{{item.price}} ETH</spna>
                <router-link   class="b-t-btn " :to="{ name: 'tokens.single', params: { id: item.id }}">{{getViewTokenText(item)}}</router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
<div v-else>Nothing to show. Add NFT in the admin panel</div>
      <a :disabled="loadingMore" v-if="localItems.length > 0 && max_num_pages > page_number"  @click.prevent="getItems" href=""
         class="btn btn--sm r-load-more press--right">Load more</a>


    </div>

    <div>
      powered by OnOut - <a href="https://tools.onout.org/nft">no-code tool for creating NFT marketplace</a>
    </div>
    <div v-if="loading" style="display: flex; align-items: center; justify-content: center; min-height: 400px">
      <loader  />
    </div>

    </div>
</template>

<script>
import api from "../api/api";
import Loader from "./parts/Loader";
import {mapGetters} from "vuex";

export default {
  name: "TokenList",
  computed: {
    ...mapGetters(['getSdk', 'getProvider', 'getAccounts']),
  },
  components: {
   Loader
  },
  data() {
    return {
      showFlash: false,
      loadingMore: false,
      localItems: [],
      pagination: this.modules,
      canLoad: true,
      max_num_pages: 1,
      page_number: 0,
      loading: true
    }
  },

  methods: {
    getViewTokenText(item){
      if(item.order_hash.length > 0 && item.price){
        return  ' Buy Token'
      }
      if(item.order_hash && item.order_hash.length < 1 && this.getAccounts[0].toUpperCase() == item.owner.toUpperCase()){
        return  'Put on Sale'
      }
      return  'Not For Sale'

    },
    getItems(){
      if(this.loadingMore) return
      this.loadingMore = true
      api.get('wp-admin/admin-ajax.php',
          { params: { action: 'nftcy_list_nft_post', page_number: this.page_number+1} }
      ).then(res => {
        console.log(res.data)
        console.warn([...res.data.items])
        this.localItems = [
          ...this.localItems, ...res.data.items,
        ]
        this.max_num_pages = res.data.max_num_pages
        this.page_number = res.data.page_number
        this.loadingMore = false

      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.getItems()
  }
}
</script>

<style scoped lang="scss">

a:active, a:hover {
  outline: 0;
}
a:hover {
  color: #eb7b73;
}
.b-place-list .b-grid-item {
  float: left;
  width: 300px;
  height: initial;
  margin-bottom: 20px;
  margin-right: 0;
}
.b-event {
  inset: 0px;
  z-index: 1;
  height: 100%;
  position: relative;
  background: rgb(255, 255, 255);
  padding: 0px;
  border-radius: 16px;
  border: 1px solid rgba(4, 4, 5, 0.1);
  overflow: hidden;
  max-width: 370px;
  width: 100%;
  box-shadow: 0 2px 2px #ddd;
}
.b-grid-item .b-pop-place__img, .b-place-list .b-event__img {
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  margin-left: 12px;
  margin-right: 12px;

}
.event-img-warp {
  display: flex;
  position: relative;
  width: 100%;
  height: 230px;
}
.b-event__desc {
  background-color: #fff;
  padding: 20px;
  position: relative;
}
.b-event__desc .press--left._mod-width {
  width: 55%;
}
.b-event__desc .btn {
  font-size: 15px;
  height: 37px;
  margin-top: 10px;
  line-height: 37px;
  margin-left: 15px;
}
 .btn {
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
   float: right;
   text-decoration: none !important;

 }






.b-pop-place__img__img {
  display: flex;
  flex-flow: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
  & img {
    border-radius: 6px;
    vertical-align: inherit;
   }
}
.event-top {
  height: 20px;
}
.b-grid-item {
  margin: 15px;
}
.b-sm-post__day {
  font: 300 18px inherit;
  color: #fff;
}
.b-sm-post__date {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 60px;
  height: 60px;
  text-align: center;
  background: rgba(0,0,0,.7);
  padding-top: 10px;
  z-index: 11111;
}
.b-sm-post__month {
  font: 300 12px inherit;
  color: #fff;
  text-transform: uppercase;
}
.b-events__time {
  position: absolute;
  z-index: 11111;
  text-transform: uppercase;
  top: 20px;
  left: 80px;
  font: 300 12px inherit;
  color: white;
}
.b-event__name {
  margin: 5px 0;
  font-weight: 900;
  color: #0e0f11;
  line-height: 25px;
  display: block;
  text-decoration: none !important;

}

.b-t-btn {

  font-weight: 900;
  color: rgb(0, 102, 255);
  vertical-align: inherit;
  text-decoration: none !important;
  font-size: 14px;
}
.r-load-more {

  display: flex;
  flex-flow: row nowrap;
  white-space: nowrap;
  line-height: 48px;
  height: 48px;
  padding-left: 26.4px;
  padding-right: 26.4px;
  min-width: 192px;
  border: 1px solid transparent;
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
  cursor: pointer;
  background: rgb(255, 255, 255);
  color: rgb(0, 102, 255);
  position: relative;
  margin: 4px;
  width: 100%;
&:before {
  content: "";
  position: absolute;
  inset: 0px;
  z-index: -1;
  margin: -3px;
  border-radius: inherit;
  background: linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%);
}
  &:hover {
    background-color: rgba(4, 4, 5, 0.05);
    color: rgb(4, 4, 5);

  }
}

</style>
