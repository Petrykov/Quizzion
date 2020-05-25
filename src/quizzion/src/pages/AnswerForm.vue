<template>
  <q-page>
    <div class="bg-image row window-height items-center">
      <div class="left-half col-xs-12 col-sm-6">
        <h3 class="xs-hide">{{ currentQuestion.title}}</h3>
        <h5 class="xs"><strong>{{ currentQuestion.title}}</strong></h5>
        <h5 class="xs-hide"> {{currentQuestion.description}} </h5>
        <p class="xs"> {{currentQuestion.description}} </p>
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-full.svg"
        >
      </div>
      <div class="right-half col-xs-12 col-sm-6">
        <div class="counter-container">
          <h4 class="xs-hide counter">15</h4>
          <h5 class="xs counter">15</h5>
        </div>
        <p style="margin-top: 5%">A: Quasar</p>
        <p>B: JavaScript</p>
        <p>C: VueJS</p>
        <p style="margin-bottom: 16%">D: C++</p>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: "AnswerForm",

    data() {
      return {
        currentQuestion: {
          title: 'What is this framework\'s name?',
          description: 'Hint: its in the pic'
        }
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .counter-container {
    transform: translateY(-50%);
    border-radius: 100%;
    margin: auto;
    height: fit-content;
    width: fit-content;
    background-color: #ffdcb4;
  }

  .counter {
    line-height: 70px;
    width: 70px
  }

  .bg-image {
    background-image: url("~assets/bg_answer_screen.png");
  }

  .left-half {
    margin-bottom: 10%;
    margin-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
  }

  .right-half {
    background: #522785;
    border-radius: 25px;
    border-right: 5px solid white;
    text-align: center;
  }

  img {
    display: block;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
  }

  .right-half p {
    background: white;
    display: inline-block;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 85%;
    line-height: 75px;
    text-align: center;
    font-size: large;
  }

  @media screen and (max-width: 600px) {
    .right-half {
      border-right: 0;
    }

    .right-half p {
      line-height: 50px;
    }

    .counter {
      line-height: 50px;
      width: 50px
    }

    .bg-image {
      background-size: 750px;
    }
  }
</style>
