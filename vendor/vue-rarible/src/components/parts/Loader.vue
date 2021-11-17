<template>
<!--  <div class="loader-mask2">-->
<!--    <div class="lds-spinner">-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--      <div></div>-->
<!--    </div>-->
<!--  </div>-->

  <div class="loader-mask3"></div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>


@keyframes slidein {
  0% {
    transform: rotate(
        0deg);
  }
  50% {
    transform: rotate(
        180deg);
  }

  100% {
    transform: rotate(
        360deg);
  }
}

.loader-mask3 {
  width: 48px;
  height: 48px;
  border-radius: 48px;
  border-width: 3px;
  position: relative;
  margin: auto;
  animation: 0.66s linear 0s infinite normal none running hHrEIg;
  border-style: solid;
  border-color: rgb(230, 230, 230) rgb(230, 230, 230) rgb(230, 230, 230) rgb(0, 102, 255);
  transform: translateZ(0px);
  user-select: none;

  animation-fill-mode: forwards;
  animation-duration: 0.8s;
  animation-name: slidein;


}

.loader-mask{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 11, 11, 0.8);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #e2e2e2;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>