<template>
  <q-page>
    <q-btn @click="log">LOG</q-btn>
    <div class="bg-image row window-height items-center">
      <div class="left-half col-xs-12 col-sm-6">
        <h3 class="xs-hide">{{ currentQuestion.title}}</h3>
        <h5 class="xs"><strong>{{ currentQuestion.title}}</strong></h5>
        <h5 class="xs-hide"> {{currentQuestion.description}} </h5>
        <p class="xs"> {{currentQuestion.description}} </p>
        <img
          :src="currentQuestion.image"
        >
      </div>
      <div class="right-half col-xs-12 col-sm-6">
        <div class="counter-container">
          <h4 class="xs-hide counter">{{ timer }}</h4>
          <h5 class="xs counter">{{ timer }}</h5>
        </div>

        <q-btn
          class="answer-button"
          no-caps
          v-for="(answerId, idx) in currentQuestion.answers"
          :key="answerId"
          @click="selectAnswer(answerId)"
        >

          {{ indexes[idx] }}: {{ answerLabel(answerId) }}

        </q-btn>

        <div style="display: flex; justify-content: flex-end">
          <q-btn class="next-button" no-caps>
            Next question
            <q-icon
              name="fas fa-arrow-right"
              size="1.4em"
              color="black"
              style="margin-left: 10px"/>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: "AnswerForm",

    data() {
      return {
        quizId: this.$route.params.quizId,
        questionId: this.$route.params.questionId,
        indexes: ["A", "B", "C", "D", "E", "F"] //TODO: Should we restrict the amount of options a question can have?
      }
    },
    computed: {
      currentQuestion () {
        return this.$store.getters['quizzes/getQuestionById'](this.questionId);
      },
      answerLabel () {
        return this.$store.getters['quizzes/getAnswerLabelById'];
      },
      timer () {
        return this.currentQuestion.time !== undefined ? this.currentQuestion.time : '?'; //TODO: what to do when there is no timer? hide element?
      }
    },
    methods: {
      log(){
        console.log(this.currentQuestion);
        console.log(this.questionId);
        console.log(this.$store);
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
    /*noinspection CssUnknownTarget*/
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
    max-width: 75%;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
  }

  .right-half .answer-button {
    background: white;
    display: inline-block;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 85%;
    line-height: 65px;
    text-align: center;
    font-size: large;
  }

  .next-button {
    margin: 3% 7.5% 3% auto;
    /*margin-top: 3%;*/
    /*margin-bottom: 3%;*/
    background: white;
    border-radius: 25px;
  }

  @media screen and (max-width: 599px) {
    .right-half {
      border-right: 0;
    }

    .right-half .next-button {
      line-height: 40px;
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
