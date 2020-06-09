<template>
  <q-page style="width:100%; height:100%">
    <div class="split-l">
      <div class="centered">
        <LoginForm />
      </div>
    </div>
    <div class="split-r">
      <carousel  v-bind:autoplay="true" v-bind:loop="true">
        <slide>
          <img src="~assets/quizz-image-login.png" />
        </slide>
        <slide>
          <img src="~assets/quizz-image-login.png" />
        </slide>
        <slide>
          <img src="~assets/quizz-image-login.png" />
        </slide>
        <slide>
          <img src="~assets/quizz-image-login.png" />
        </slide>
        <slide>
          <img src="~assets/quizz-image-login.png" />
        </slide>
      </carousel>
    </div>
  </q-page>
</template>

<script >
import LoginForm from "../components/LoginForm";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "PageLogin",

  components: {
    LoginForm,
    Carousel,
    Slide
  },
  data() {
    return {
      slide: 1,
      fullscreen: true
    };
  }
};
</script>

<style>
.split-l {
  height: 100%;
  width: 40%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
  left: 0;
}
.split-r {
  height: 100%;
  width: 60%;
  position: fixed;
  z-index: 1;
  position: fixed;
  top: 0;
  background-color: #050152;
  overflow-x: hidden;
  padding-top: 20px;
  bottom: 0;
  right: 0;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.centered img.logo {
  width: 150px;
  border-radius: 0%;
}
</style>>

