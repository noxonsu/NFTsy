<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <a class="modal-default-button" @click="$emit('close')">
            ×
          </a>

          <div class="modal-header">
            <slot name="header">
              sdfgsdfgsdfg
            </slot>
          </div>

          <div class="modal-body">
            <slot>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal"
}
</script>

<style  >

.modal-header {
  text-align: center;
  font-size: 22px;
  color: #317DC1;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding-bottom: 10px;
  border-bottom: 1px solid #d8d8d8;
  padding-top: 20px;

}

.modal-header  span {
  margin-top: -5px;
  margin-left: 10px;
  position: relative;
  top: -3px;
}
.modal-mask {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 11, 11, 0.8);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  max-width: 900px;
  margin: 0px auto;;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: relative;
}


.modal-body {
  margin: 20px 0;
  padding: 0px 20px 20px 20px;
}
.modal-body img {
  max-width: 100%;
}
.modal-body iframe {
  width: 100%;
}
.modal-default-button {
  cursor: pointer;
  line-height: 44px;
  position: absolute;
  right: 0;
  top: -10px;
  z-index: 9999;
  text-decoration: none;
  opacity: 0.65;
  padding: 0 0 18px 10px;
  font-size: 28px;
  float: right;
  color: #000;
  right: 6px;
  text-align: right;

}
.modal-default-button:hover {
  opacity: 1;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-container {
  max-width: 440px;
}

</style>
