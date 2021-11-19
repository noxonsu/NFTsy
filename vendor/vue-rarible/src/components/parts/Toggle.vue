<template>
  <label class="switch">
    <input type="checkbox" v-model="localState" />
    <span class="slider round"></span>
  </label>
</template>

<script>

export default {
  name: 'toggle',
  props: {
    value: null,
  },
  computed: {
    localState: {
      get() {
        return this.value
      },
      set(localState) {
        this.$emit('input', localState)
      },
    },
  },
  data() {
    return {
      states: { },
    }
  },
  methods: {

  },

};
</script>

<style lang="scss" scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 102, 255, 0.1);;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  width: 12px;
  height: 12px;
  left: 4px;
  bottom: 4px;
  border-radius: 12px;
  background-color: rgba(0, 102, 255, 0.1);
  -webkit-transition: .4s;
  transition: all 0.12s ease-in-out 0s;
}

input:checked + .slider {
  background-color: rgb(0, 102, 255);
}
input:checked + .slider:before {

  background-color: white;
}

input:focus + .slider {
  box-shadow: 0 0 1px rgb(0, 102, 255);
}

input:checked + .slider:before {
/*  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);*/
  transform: translateX(18px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
  width: 40px;
  height: 20px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>