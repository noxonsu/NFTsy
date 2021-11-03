<template>
  <div>
    <form id="linzamat-filter-form" name="linzamat-filter-form">
      <div class="filter-group products">
        <div class="filter-group-title" @click="showAssortment = !showAssortment">
          <span>Angebot</span>
          <span class="title-button">
							<img v-if="!showAssortment" class="title-button-add"
                   :src="API_URL + '/wp-content/themes/Divi-child/assets/img/icon-plus.svg'"
                   alt="Hinzufügen">
							<img v-else class="title-button-close"
                   :src="`${API_URL}/wp-content/themes/Divi-child/assets/img/icon-cross.svg`"
                   alt="Hinzufügen">
						</span>
        </div>
        <transition name="slide">
          <div v-if="showAssortment" class="filter-field-list">
            <div v-if="item.showed" v-for="(item, key) in items" class="filter-field" data-product="21">
              <div class="filter-product-name" @click="showItemDesc(key)">
                <span v-html="item.title"></span>

                <span v-if="!item.opened" class="title-button">
										<img class="title-button-add"
                         :src="`${API_URL}/wp-content/themes/Divi-child/assets/img/icon-plus.svg`"
                         alt="Hinzufügen">

								</span>
                <span v-else class="title-button">
										<img class="title-button-close"
                         :src="`${API_URL}/wp-content/themes/Divi-child/assets/img/icon-cross.svg`" alt="Schließen">
								</span>
              </div>

              <slid-down>
                <div v-if="item.opened" class="filter-product-variants-list">
                  <div class="filter-product-variant-wrap" data-prop="BC">
                    <div class="variant-title">Krümmungsradius (BC)</div>
                    <div class="filter-product-variant-list">
                      <span @click="setBC(item)"
                            :class="{active:  item.radius == BC}"

                            class="variant-item" data-value="8.5"> {{ item.radius }}</span>
                    </div>
                  </div>
                  <div class="filter-product-variant-wrap" data-prop="PWR">
                    <div class="variant-title">Optische Leistung (D, PWR)</div>
                    <div class="filter-product-variant-list">
                      <span @click="setPWR(optical)"
                            :class="{active:  optical == PWR}"
                            v-for="optical in item.optical" class="variant-item"
                            data-value="-1.00">{{ optical }}</span>

                    </div>
                  </div>
                  <div class="btn btn-blue filter-product-add" @click="addItemToFilter(item)">Hinzufügen</div>
                </div>

              </slid-down>

            </div>
          </div>
        </transition>

        <div class="filter-products-list">
          <div v-for="(item, key) in  form.selectedItems" class="filter-products-list-item">
            <div class="filter-products-list-item-name">
              <span v-html="item.title"></span>
              <img @click="deleteSelectedItems(key)" class="button-delete"
                   src="https://linzi-tut.ru/local/templates/linzi/images/icon-cross.svg"
                   alt="Удалить">
            </div>
            <div class="filter-products-list-item-props">
              <div v-if="item.BC" class="filter-products-list-item-prop">
                <span class="prop-name">BC</span>
                <span class="prop-value">{{ item.BC }}</span>
              </div>
              <div v-if="item.PWR" class="filter-products-list-item-prop">
                <span class="prop-name">PWR</span>
                <span class="prop-value">{{ item.PWR }}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="filter-group checkbox">
        <div class="filter-group-title">Zahlungsmöglichkeiten</div>
        <div class="filter-field-list">
          <div class="filter-field">
            <input v-model="form.cardPayment" id="PAYMENT_TYPES_12" type="checkbox">
            <label for="PAYMENT_TYPES_12">Kartenzahlung</label>
          </div>
          <div class="filter-field">
            <input v-model="form.cashPayment" id="PAYMENT_TYPES_13" type="checkbox">
            <label for="PAYMENT_TYPES_13">Barzahlung</label>
          </div>
        </div>
      </div>
      <div class="filter-group checkbox">
        <div class="filter-group-title">Öffnungszeiten</div>
        <div class="filter-field-list">
          <div class="filter-field">
            <input v-model="form.dayAndNight" id="SCHEDULE_ALL" type="checkbox" name="FILTER[SCHEDULE][ALL]">
            <label for="SCHEDULE_ALL">Rund um die Uhr</label>
          </div>
          <div class="filter-field">
            <input v-model="form.worksNow" id="SCHEDULE_OPEN" type="checkbox" name="FILTER[SCHEDULE][OPEN]">
            <label for="SCHEDULE_OPEN">Jetzt geöffnet</label>
          </div>
        </div>
      </div>
      <!--      <div class="filter-group checkbox">-->
      <!--        <div class="filter-group-title">Опции</div>-->
      <!--        <div class="filter-field-list">-->
      <!--          <div class="filter-field">-->
      <!--            <input v-model="form.smart" id="OPTIONS_11" type="checkbox" name="FILTER[OPTIONS][11]">-->
      <!--            <label for="OPTIONS_11">Смарт</label>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="filter-controls">
        <input @click.prevent="clearAll" class="btn filter-clear" type="submit" value="Zurücksetzen">
        <input @click.prevent="submitFilter" class="btn btn-blue" type="submit" value="Anwenden">
      </div>
    </form>
  </div>
</template>

<script>
import SlidDown from "@/components/parts/SlidDown";
import api from "@/api/api";

export default {
  name: "FormFilter",
  components: {SlidDown},
  props: ['formS'],
  data() {
    return {
      showAssortment: false,
      form: {

        cardPayment: false,
        cashPayment: false,
        dayAndNight: false,
        worksNow: false,
        smart: false,
        selectedItems: []
      },
      items: [],

      BC: false,
      PWR: false,


    }
  },
  watch: {
    formS(val) {
      if (val) {
        this.form = {...val}
      }
    }
  },
  mounted() {

    if (this.formS) {
      this.form = {...this.formS}
    }
    api.get('?action=2go24_get_lenses').then(res => {
      this.items = res.data
    }).catch(res => {
      alert(res.data)
    })
  },
  methods: {
    submitFilter() {
      this.$emit('filterEvent', this.form)

    },
    clearAll() {
      /* this.hideAllElements()
       this.form = {
         cardPayment: false,
         cashPayment: false,
         dayAndNight: false,
         worksNow: false,
         smart: false,
         selectedItems: []
       }*/

    },
    hideAllElements() {
      this.showAssortment = false
      //this.items.map(el => el.opened = false)

      this.items.map((el, k) => {
        el.opened = false
        el.showed = true
        return el
      })
    },
    addItemToFilter(item) {
      if (item.radius && item.optical) {
        if (this.BC && this.PWR) {
          this.form.selectedItems.push({
            id: item.id,
            title: item.title,
            BC: this.BC,
            PWR: this.PWR
          })
          this.hideAllElements()

        }
      } else {
        this.form.selectedItems.push({
          title: item.title
        })
        this.hideAllElements()
      }
    },
    isActiveBC(item) {
      if (item == this.BC) {
        return true
      } else {
        return false
      }
    },
    deleteSelectedItems(key) {
      this.form.selectedItems = this.form.selectedItems.filter((value, index, arr) => index != key);
    },
    setBC(item) {
      if (this.BC == item.radius) {
        this.BC = false
      } else {
        this.BC = item.radius
      }
    },

    setPWR(optical) {
      if (this.PWR == optical) {
        this.PWR = false
      } else {
        this.PWR = optical
      }

    },
    showItemDesc(key) {
      this.BC = false
      this.PWR = false

      if (!this.items[key].opened) {

        this.items = this.items.map((el, k) => {
          if (k != key) {
            el.showed = false
          }
          return el
        })
      } else {
        this.items = this.items.map((el, k) => {
          el.showed = true
          return el
        })
      }
      this.items[key].opened = !this.items[key].opened


    }
  },

}
</script>

<style scoped>
.filter-form-wrap .form-title {
  text-align: center;
  font-size: 22px;
  color: #317DC1;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding-bottom: 20px;
  border-bottom: 1px solid #d8d8d8;
}

.filter-form-wrap .form-title span {
  margin-left: 10px;
}

.filter-group-title {
  text-transform: uppercase;
  color: #7b8296;
  font-size: 15px;
}

.filter-group.checkbox .filter-field {
  font-size: 15px;
  color: #1f2025;
  padding: 5px;
  width: calc(50% - 10px);
}

.filter-group.checkbox .filter-field-list {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: space-between;
}

.filter-group {
  padding: 15px 0;
}

.filter-group + .filter-group {
  border-top: 1px solid #d8d8d8;
}

.filter-group.checkbox .filter-group-title {
  margin-bottom: 10px;
}

.filter-group.checkbox .filter-field input[type="checkbox"] {
  display: none;
}

.filter-group.checkbox .filter-field input[type="checkbox"] + label {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  cursor: pointer;
  position: relative;
  transition: color 300ms ease-in-out;
}

.filter-group.checkbox .filter-field input[type="checkbox"] + label:before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid #9dafc7;
  border-radius: 3px;
  margin-right: 10px;
  transition: border-color 300ms ease-in-out;
}

.filter-group.checkbox .filter-field input[type="checkbox"] + label:after {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  background-color: transparent;
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 3px;
  transition: background-color 300ms ease-in-out;
}

.filter-group.checkbox .filter-field input[type="checkbox"]:checked + label:after {
  background-color: #317DC1;
}

.filter-group.checkbox .filter-field input[type="checkbox"] + label:hover:before {
  border-color: #317DC1;
}

.filter-group.checkbox .filter-field input[type="checkbox"] + label:hover {
  color: #317DC1;
}

.filter-controls {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  margin-top: 10px;
}

.filter-controls * + * {
  margin-left: 25px;
}

.filter-controls .btn {
  font-weight: bold;
}

.filter-controls .btn.filter-clear {
  background-color: #f4f4f8;
  border-color: transparent;
  color: #a0a4ab;
}

.filter-controls .btn.filter-clear:hover {
  background-color: #317DC1;
  color: white;
}

.filter-group.products {
  padding-bottom: 10px;
  padding: 0;
}

.filter-group.products .filter-group-title {
  padding: 15px 0;
}

.filter-group.products .filter-field-list {
  border-top: 1px solid #d8d8d8;
}

.filter-group.products .filter-field .filter-product-name {
  font-size: 17px;
  padding: 7px 0;
}

/*.filter-group.products .filter-field {
  padding: 7px 0;
}
.filter-group.products .filter-field + .filter-field {
  border-top: 1px solid #d8d8d8;
}*/
.filter-group.products .filter-field .filter-product-name,
.filter-group.products .filter-group-title {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
}

.filter-group.products .filter-group-title {
  cursor: pointer;
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: -1px;
}


.filter-group.products .filter-field-list {
  transition: all .5s ease-in-out;

}

/*
.filter-group.products .filter-field-list.list-opened {
  line-height: 1.5;
  padding-top: 1em;
  padding-bottom: 1em;
  color: black;
  height: 100%;
}*/

.filter-group.products .filter-field .filter-product-name:hover {
  cursor: pointer;
}

.filter-group.products .filter-field .filter-product-name span {
  transition: color 300ms ease-in-out;
  line-height: 1.1;
}

.filter-group.products .filter-field .filter-product-name:hover span {
  color: #317DC1;
}

.filter-group.products .title-button {
  width: 24px;
  height: 24px;
  display: -webkit-inline-flex;
  display: -moz-inline-flex;
  display: -ms-inline-flex;
  display: -o-inline-flex;
  display: inline-flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
}

.filter-group.products .title-button .title-button-add,
.filter-group.products .title-button.opened .title-button-close {
  display: inline-block;
  transition: opacity 300ms ease-in-out,
  filter 300ms ease-in-out;
}

.filter-group.products .title-button .title-button-add {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}

.filter-group.products .title-button.opened .title-button-add {
  /*  display: none;*/
}

.filter-group.products .title-button .title-button-close {
  /*display: none;*/
  width: 50%;
  height: 50%;
  opacity: .5;
}

.filter-group.products .filter-field:hover .title-button .title-button-add,
.filter-group.products .filter-group-title:hover .title-button .title-button-add {
  filter: grayscale(0);
}

.filter-group.products .filter-field:hover .title-button .title-button-close,
.filter-group.products .filter-group-title:hover .title-button .title-button-close {
  opacity: 1;
}


.filter-product-variants-list .filter-product-add.btn-blue {
  padding: 5px 15px;
  width: 100%;
  background-color: transparent;
  color: #317DC1;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
}

.filter-product-variants-list .filter-product-add.btn-blue:hover {
  background-color: #317DC1;
  color: white;
}

.filter-product-variants-list {
  /* display: none;*/
  padding-bottom: 15px;
}

.filter-product-variants-list .filter-product-variant-wrap + .filter-product-variant-wrap {
  margin-top: 5px;
}

.filter-product-variant-list {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
}

.variant-item {
  font-family: "FedraSansPro-Normal";
  font-size: 16px;
  user-select: none;
  display: -webkit-inline-flex;
  display: -moz-inline-flex;
  display: -ms-inline-flex;
  display: -o-inline-flex;
  display: inline-flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  line-height: 1.1;
  margin: 3px;
  border: 1px solid #317DC1;
  color: #317DC1;
  border-radius: 5px;
  min-width: 65px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 0 0 0 transparent;
  transition: background-color 300ms ease-in-out,
  border-color 300ms ease-in-out,
  box-shadow 300ms ease-in-out,
  opacity 300ms ease-in-out,
  color 300ms ease-in-out;
}

.variant-item:not(.disabled):hover {
  /*background-color: #317DC1;
  color: white;*/
  box-shadow: 0 0 7px 1px rgba(49, 125, 193, .6);
}

.variant-item.active {
  background-color: #317DC1;
  color: white;
}

.variant-item.disabled {
  border-color: #7b8294;
  color: #7b8294;
  opacity: 0.4;
  pointer-events: none;
  cursor: default;
}

.variant-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}


.filter-products-list-item.empty {
  /* display: none;*/
}

.filter-products-list-item {
  padding: 0 0 7px;
}

.filter-products-list-item .filter-products-list-item-name {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
  font-size: 17px;
  padding: 7px 0 0;
}

.filter-products-list-item-props {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  font-size: 13px;
}

.filter-products-list-item-prop + .filter-products-list-item-prop {
  margin-left: 15px;
}

.filter-products-list-item-props .filter-products-list-item-prop .prop-name {
  color: #317DC1;
}

.filter-products-list-item .button-delete {
  padding: 5px;
  opacity: .5;
  display: inline-block;
  cursor: pointer;
  transition: opacity 300ms ease-in-out;
}

.filter-products-list-item .button-delete:hover {
  opacity: 1;
}

.filter-products-list-item:not(.empty) + .filter-products-list-item {
  border-top: 1px solid #d8d8d8;
}

@media (max-width: 520px) {
  .filter-group.checkbox .filter-field {
    width: 100%;
  }

  .variant-item {
    width: calc(33.33% - 6px);
  }
}

@media (max-width: 420px) {
  .filter-controls .btn {
    padding: 10px 15px;
  }
}

/* End */

/**** BTN ***********/

.btn {
  display: inline-block;
  text-decoration: none;
  background-color: transparent;
  padding: 10px 35px;
  border: 1px solid #317DC1;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  color: #317DC1;
  font-weight: 600;
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  transition: background-color 300ms ease-in-out, border-color 300ms ease-in-out, color 300ms ease-in-out;
}

.filter-controls .btn.filter-clear {
  background-color: #f4f4f8;
  border-color: transparent;
  color: #a0a4ab;
}

.btn-blue {
  background-color: #317DC1;
  border-color: #317DC1;
  color: white;
  font-weight: 300;
}


.btn:hover {
  background-color: #317DC1;
  color: white;
}

.btn-blue:hover {
  background-color: transparent;
  color: #317DC1;
  border-color: #317DC1;
}


.slide-enter-active {

  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {

  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 150px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.show-enter-active,
.show-leave-enter {
  height: 0;
  transition-property: all;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(0, 1, 0.3, 1);
}

.show-enter,
.show-leave-to {
  height: 100%;
}
</style>