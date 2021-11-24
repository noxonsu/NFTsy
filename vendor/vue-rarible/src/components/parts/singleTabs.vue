<template>
  <div class="tab-com">
    <div role="tablist" class="r-tablist">
      <button
          class="tab-button "
          :class="{active: activeTab == 1}"
          style="margin-right: 0; padding-left: 0;"
          role="tab" aria-selected="true" type="button"
          @click.prevent="activeTab = 1"
      ><span
      >Details</span>
        <div class="border"></div>
      </button>
      <button class="tab-button"
              :class="{active: activeTab == 2}"
              role="tab" aria-selected="false" type="button"
              @click.prevent="activeTab = 2"
      ><span
      >Bids</span>
        <div class="border"></div>
      </button>
      <button class="tab-button"
              role="tab"
              aria-selected="false"
              type="button"
              :class="{active: activeTab == 3}"
              @click.prevent="activeTab = 3"
      ><span
      >History</span>
        <div class="border"></div>
      </button>
    </div>
    <div>
      <div v-if="activeTab == 1" class="tab-panel tab1">

        <div>
          <div><span class="tab-panel-label">Owner</span>
            <div>
              <div class="properties">
                <div><img style="border-radius: 100%" alt="Identicon"
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDEyNiwzOCwxKTsgc3Ryb2tlOnJnYmEoMjE3LDEyNiwzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuMjsnPjxyZWN0ICB4PScxOCcgeT0nMTInIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTgnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE4JyB5PScxOCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxNScgeT0nMTInIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjEnIHk9JzEyJyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE1JyB5PScxNScgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScyMScgeT0nMTUnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTInIHk9JzIxJyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzI0JyB5PScyMScgd2lkdGg9JzMnIGhlaWdodD0nMycvPjwvZz48L3N2Zz4="
                          loading="lazy"></div>
                <div style="padding-left: 10px;"><span><span> <b
                    style="font-size: 14px;">{{ post.owner }}</b></span></span></div>
              </div>
            </div>
          </div>

          <div v-if="post.properties">
            <span class="tab-panel-label">Properties</span>
            <div>
              <div class="properties">

                <button v-for="property in post.properties" type="button">
                  <span class="p-1">{{property.key}}</span>
                  <span class="p-2">{{property.value}}</span>
<!--                  <span  class="p-3">0% rarity</span>-->
                </button>


              </div>
            </div>
          </div>
          <div><span class="tab-panel-label">Blockchain</span>
            <div>
              <div>
                <div class="properties">
                  <div><img alt="ETHEREUM" src="https://ropsten.rarible.com/9b703a21b9f93a1f0065.svg" loading="lazy">
                  </div>
                  <div style="padding-left: 10px;"><span><span> <b style="font-size: 14px;">Ethereum</b></span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab == 2" class="tab-panel tab1">
        <div>
          <div>
            <div class="properties" >
              <div><img style="border-radius: 100%; margin-top: 10px;" alt="Identicon"
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDYsMjQ2LDI0NiwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDEyNiwzOCwxKTsgc3Ryb2tlOnJnYmEoMjE3LDEyNiwzOCwxKTsgc3Ryb2tlLXdpZHRoOjAuMjsnPjxyZWN0ICB4PScxOCcgeT0nMTInIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTgnIHk9JzE1JyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE4JyB5PScxOCcgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScxNScgeT0nMTInIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMjEnIHk9JzEyJyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzE1JyB5PScxNScgd2lkdGg9JzMnIGhlaWdodD0nMycvPjxyZWN0ICB4PScyMScgeT0nMTUnIHdpZHRoPSczJyBoZWlnaHQ9JzMnLz48cmVjdCAgeD0nMTInIHk9JzIxJyB3aWR0aD0nMycgaGVpZ2h0PSczJy8+PHJlY3QgIHg9JzI0JyB5PScyMScgd2lkdGg9JzMnIGhlaWdodD0nMycvPjwvZz48L3N2Zz4="
                        loading="lazy"></div>
              <div style="padding-left: 10px; display: flex;
    flex-direction: column;"><span><span>
                <b style="font-size: 14px;" :title="post.owner">
0.2 ETH by {{ cutAddress(post.owner) }}</b></span></span>

              <span class="bid-time">  1 hours ago</span>
              </div>

            </div>
          </div>
        </div>

      </div>
      <div v-if="activeTab == 3" class="tab-panel tab1">
        3
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleTabs",
  props: ['post'],
  data() {
    return {
      activeTab: 1,

    }
  },
  methods: {
    cutAddress(address) {
      return address.substring(0, 11) +'...' + address.slice(address.length - 5)
    }
  }
}
</script>

<style lang="scss" scoped>

.tab-com {
  font-family: Roboto-Light;

  .bid-time {

    font-weight: 500;
    margin-top: -4px;
    font-size: 13px;
    vertical-align: inherit;
  }
}

.tab-button {
  background: transparent;
  border: none;
  cursor: pointer;
  line-height: normal;
  color: rgba(4, 4, 5, 0.6);
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  padding-bottom: 2px;
  font-size: 16px;
  outline: none;
  text-align: left;
  padding-bottom: 20px;

  &.active, &:hover {
    color: rgb(4, 4, 5);
  }

}

.r-tablist {
  flex-flow: row nowrap;
  -webkit-box-align: stretch;
  align-items: stretch;
  max-width: initial;
  min-width: 100%;
  width: auto;
  border-bottom: 1px solid rgb(230, 230, 230);
  margin-bottom: 25px;

}

.active .border {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgb(4, 4, 5);
  height: 1px;
  width: 100%;

}

.tab-panel-label {
  font-weight: 900;
  color: rgb(128, 128, 128);
  font-size: 16px;
  font-weight: 900;
  vertical-align: inherit;
}

.properties {
  margin-top: 8px;
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  flex-shrink: 0;
  flex-basis: auto;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  border-width: 0px;
  border-style: solid;
  border-color: rgb(4, 4, 5);
  flex-flow: row wrap;

  > * {
    margin-right: 10px;
    margin-bottom: 10px
  }

  a {
    text-decoration: none;
    color: rgb(0, 102, 255);
  }

  button {
    font-family: inherit;
    font-weight: 500;
    vertical-align: inherit;
    color: inherit;
    padding: 0px;
    overflow: visible;
    background: transparent;
    border: none;
    cursor: pointer;
    line-height: normal;
    border: 2px solid rgba(4, 4, 5, 0.1);
    border-radius: 16px;
    transition: all 0.12s ease-in-out 0s;
    user-select: none;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 10px 16px 12px;
    color: rgb(4, 4, 5);
    font-size: 16px;
    min-width: 80px;

    &:hover, &:focus {
      border-color: rgba(4, 4, 5, 0.2);

    }

    & span {
      line-height: 21px;
    }

    & .p-1 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
      font-family: inherit;
      font-weight: inherit;
      color: rgb(0, 102, 255);
      font-size: 13px;
      vertical-align: inherit;
    }

    & .p-2 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
      font-family: inherit;
      font-size: 15px;
      vertical-align: inherit;
      color: rgb(4, 4, 5);
      font-weight: 900;
    }

    & .p-3 {
      font-weight: inherit;
      margin-top: 4px;
      color: rgb(128, 128, 128);
      font-size: 11px;
      vertical-align: inherit;
    }
  }
}
</style>