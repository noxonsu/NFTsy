<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
<!--          <span class="modal-default-button" @click="$emit('close')">-->
<!--            ×-->
<!--          </span>-->

          <div class="modal-header">
            <slot name="header">
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

<style lang="scss" scoped>

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
  padding-top: 20px;

}

.modal-header span {
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
  font-family: Roboto-Light;
  width: 100%;
  max-width: 900px;
  margin: 0px auto;;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: relative;
  margin: auto;
  min-width: 380px;
  transform-origin: center center;
  border-radius: 16px;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-duration: 0.3s;
  animation-name: czaBCI;
}


.modal-body {
  margin: 20px 0;
  padding: 0px 20px 20px 20px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  flex-shrink: 0;
  flex-direction: column;
  flex-basis: auto;
  display: flex;
  text-align: center;
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
  color: red;
  text-decoration: none;
  font-weight: bold;
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

::v-deep {
  h2 {
    font-family: Roboto-Light;
    font-weight: 900 !important;
    text-align: center;
    font-size: 22px;
    vertical-align: inherit;
    border: none;
    font-weight: 900;

    &:before {
      display: none;
    }
  }

  p {
    font-family: Roboto-Light;
    font-weight: inherit;
    color: rgb(128, 128, 128);
    text-align: center;
    vertical-align: inherit;
    font-size: 18px;
    line-height: 22.4px;
  }

  .r-btn {
    background: transparent;
    color: rgb(4, 4, 5);
    display: flex;
    flex-flow: row nowrap;
    white-space: nowrap;
    background-color: rgba(4, 4, 5, 0.08);
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
    font-size: 16px;
    font-weight: 900;
    font-family: inherit;
    transition: all 0.12s ease-in-out 0s;
    transform-origin: center center;
    user-select: none;
    cursor: pointer;
    border-color: rgba(4, 4, 5, 0.1);
    color: rgb(4, 4, 5);
    background: transparent;

    &:hover {
      background: transparent;
      color: rgb(4, 4, 5);
      border-color: rgba(4, 4, 5, 0.18);
    }

  }
}


</style>
