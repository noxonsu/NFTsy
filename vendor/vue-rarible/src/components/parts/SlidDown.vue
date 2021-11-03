<template>
  <transition  v-on:before-enter="beforeEnter"
               v-on:enter="enter"
               v-on:after-enter="afterEnter"
               v-on:enter-cancelled="enterCancelled"
               v-on:before-leave="beforeLeave"
               v-on:leave="leave"
               v-on:after-leave="afterLeave"
               v-on:level-cancelled="leaveCancelled"
               v-bind:css="false">
    <slot>
    </slot>
  </transition>
</template>

<script>
export default {
name: "SlidDown",
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
      el.style.['padding-bottom'] = 0;
      el.style.overflow = "hidden";
    },
    enter(el, done) {
      const increaseHeight = () => {
        if (el.clientHeight < el.scrollHeight) {
          const height = `${parseInt(el.style.height) + 5}px`;
          el.style.height = height;
        } else {
          clearInterval(this.enterInterval);
          done();
        }
      };
      this.enterInterval = setInterval(increaseHeight, 10);
    },
    afterEnter(el) {},
    enterCancelled(el) {
      clearInterval(this.enterInterval);
    },
    beforeLeave(el) {},
    leave(el, done) {
      const decreaseHeight = () => {
        if (el.clientHeight > 0) {
          const height = `${parseInt(el.style.height) - 5}px`;
          el.style.height = height;
        } else {
          clearInterval(this.leaveInterval);
          done();
        }
      };
      this.leaveInterval = setInterval(decreaseHeight, 10);
    },
    afterLeave(el) {},
    leaveCancelled(el) {
      clearInterval(this.leaveInterval);
    },
  },
}
</script>

<style scoped>

</style>