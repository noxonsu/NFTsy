<template>
  <div id="content">
    <div class="b-place-list">
      <div v-masonry transition-duration="0.3s" item-selector=".item" :origin-top="true" :horizontal-order="false" >

        <div v-masonry-tile  class="b-grid-item b-grid-item--masonry item" v-for="item in localItems" >
          <div class="b-event">
            <div class="b-event__img">
              <a class="b-pop-place__img__img" href="#">
                <img :src="item.img" class="" alt=""> </a>
              <div class="b-events__time"><span v-if="item.price"> {{item.price}}  ETH</span>
              </div>
              <div class="b-sm-post__date">
                <div class="b-sm-post__month">Sep</div>
                <div class="b-sm-post__day">25</div>
              </div>
              <a href="#" class="noajax b-icon-like  ">
                <i class="fa fa-heart" aria-hidden="true"></i>
              </a>
              <div class="b-event__links">
                <div class="press--left">
                </div>
                <div class="press--right">

                </div>
              </div>
            </div>
            <div class="b-event__desc clearfix">
              <div class="press--left _mod-width">
                <a href="/" class="b-event__name">{{item.title}}</a>

              </div>
              <div style="margin-bottom: 50px;">
                <router-link   class="btn btn&#45;&#45;sm press&#45;&#45;right" :to="{ name: 'tokens.single', params: { id: item.id }}"> Buy Token </router-link>

<!--                <a href="https://city2.wpmix.net/product/new-years-eve-celebrations/"-->
<!--                   class="btn btn&#45;&#45;sm press&#45;&#45;right"> Buy Token </a>-->
              </div>

            </div>
          </div>
        </div>

      </div>

      <a :disabled="loadingMore" v-if="max_num_pages > page_number" @click.prevent="getItems" href=""
         class="btn btn--sm press--right">Load more</a>

    </div>
    </div>
</template>

<script>
import api from "../api/api";

export default {
  name: "TokenList",
  data() {
    return {
      showFlash: false,
      loadingMore: false,
      localItems: [],
      pagination: this.modules,
      canLoad: true,
      max_num_pages: 1,
      page_number: 0,
    }
  },
  methods: {
    getItems(){
      if(this.loadingMore) return
      this.loadingMore = true
      api.get('wp-admin/admin-ajax.php',
          { params: { action: 'rarible_list_nft_post', page_number: this.page_number+1} }
      ).then(res => {
        console.log(res.data)
        console.warn([...res.data.items])
        this.localItems = [
          ...this.localItems, ...res.data.items,
        ]
        this.max_num_pages = res.data.max_num_pages
        this.page_number = res.data.page_number
        this.loadingMore = false
      })
    }
  },
  mounted() {
    this.getItems()
  }
}
</script>

<style scoped>
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
  max-width: 370px;
  width: 100%;
  box-shadow: 0 2px 2px #ddd;
}
.b-grid-item .b-pop-place__img, .b-place-list .b-event__img {
  height: 199px;
  background: #0e0f11;
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
  transform: scale(1.15);
  width: 100%;
  height: auto;
  display: block;
  transition: all .4s ease 0s;
}
.b-event__img:hover .b-pop-place__img__img {
  transform: scale(1);
}
.b-pop-place__img__img {
  overflow: hidden;
}

pop-place__img__img img {
  max-width: 100%;
}

.b-pop-place__img:hover .b-pop-place__img__img, .b-event__img:hover .b-pop-place__img__img {
  transform: scale(1)
}
.b-grid-item .b-pop-place__img, .b-place-list .b-event__img {
  height: 199px;
  background: #0e0f11
}
.b-event__img {
  position: relative;
  overflow: hidden;
}
 .b-event__img>.b-pop-place__img__img:before, .b-event__img>a:first-child:before, .b-album>a:first-child:before, .b-pop-place__img__img:before, .b-price-card .b-price-card__img:before, .b-sm-post__img-cont a:before {
  position: absolute;
  content: '';
  transition: all .4s ease 0s;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.15);
  width: 100%;
  height: 100%;
  z-index: 111;
}
.b-pop-place__img__img, .b-event__img {
  position: relative;
  display: block;
  z-index: 123;
}
.b-grid-item .b-pop-place__img, .b-place-list .b-event__img {
  height: 199px;
  background: #0e0f11;
}
.b-grid-item {
  margin: 15px;
}
.b-sm-post__day {
  font: 300 18px Roboto-Light;
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
  font: 300 12px Roboto-Light;
  color: #fff;
  text-transform: uppercase;
}
.b-events__time {
  position: absolute;
  z-index: 11111;
  text-transform: uppercase;
  top: 20px;
  left: 80px;
  font: 300 12px Roboto-Light;
  color: white;
}
.b-event__name {
  margin: 5px 0;
  font: 400 18px Roboto-Regular;
  color: #0e0f11;
  line-height: 25px;
  display: block;
  text-decoration: none !important;

}


</style>