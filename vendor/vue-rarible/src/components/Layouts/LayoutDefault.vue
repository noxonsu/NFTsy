<template>
  <div class="r-layout">
    <slot></slot>
    <WrongNetwork/>
  </div>
</template>

<script>
export default {
  name: "LayoutDefault"
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