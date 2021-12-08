<template>
  <div class="r-layout">
    <slot></slot>
    <WrongNetwork/>
    <metamask-modal />

  </div>
</template>

<script>

import MetamaskModal from "../MetamaskModal";

export default {
  name: "LayoutDefault",
  components: {
    MetamaskModal
  }
}
</script>


<style lang="scss" scoped>

::v-deep {
  .r-layout {
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;

    * {
      font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
  }
}
</style>