<template>

  <layout-default><router-view /></layout-default>


</template>

<script>
import LayoutDefault from "./Layouts/LayoutDefault";

export default {
  name: "TokenStartPage",
  props: ['post'],
  components: {
    LayoutDefault
  },
  mounted() {
    if(this.post){
      this.$router.push({ name: 'tokens.single', params: { id: this.post }})
    }
  }
}
</script>

<style scoped>

</style>