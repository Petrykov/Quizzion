<template>
  <q-page>
    <!--    <q-btn @click="log">LOG</q-btn>-->
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
          v-for="(answerId, idx) in currentQuestion.answers"
          :key="answerId"
          @click="selectAnswer(answerId)"
          class="answer-button"
          :class="[ selectedAnswer === answerId ? 'selected' : '']"
          no-caps>

          {{ indexes[idx] }}: {{ answerLabel(answerId) }}

        </q-btn>

        <div style="display: flex; justify-content: flex-end">
          <q-btn
            v-if="nextQuestionId"
            @click="goToNext"
            class="flow-button"
            no-caps
            :class="[ selectedAnswer === '' ? 'disabled' : '']"
          >
            Next question
            <q-icon
              name="fas fa-arrow-right"
              size="1.4em"
              color="black"
              style="margin-left: 10px"/>
          </q-btn>

          <q-btn
            v-else
            @click="goToResults"
            class="flow-button"
            no-caps
            :class="[ selectedAnswer === '' ? 'disabled' : '']"
          >
            See results!
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
        indexes: ["A", "B", "C", "D", "E", "F"], //TODO: Should we restrict the amount of options a question can have?
        selectedAnswer: ''
      }
    },
    computed: {
      currentQuestion() {
        return this.$store.getters['quizzes/getQuestionById'](this.questionId);
      },
      nextQuestionId() {
        return this.$store.getters['quizzes/getNextQuestionId'](this.quizId)(this.questionId);
      },
      answerLabel() {
        return this.$store.getters['quizzes/getAnswerLabelById'];
      },
      timer() {
        return this.currentQuestion.time !== undefined ? this.currentQuestion.time : '?'; //TODO: what to do when there is no timer? hide element?
      }
    },
    beforeRouteUpdate (to, from, next) { //router navigation guard, makes sure that the local state is in line with displayed data/url
      this.quizId = to.params.quizId;
      this.questionId = to.params.questionId;
      this.selectedAnswer = '';
      next();
    },
    methods: {
      log() {
        console.log(this.nextQuestionId);
      },
      selectAnswer(answerId) {
        this.selectedAnswer = answerId;
      },
      goToNext() {
        if (this.selectedAnswer === '') this.triggerNotification();
        else {
          // this.submitAnswer();
          this.$router.push(`/quizzes/${this.quizId}/questions/${this.nextQuestionId}`);
        }
      },
      goToResults() {
        if (this.selectedAnswer === '') this.triggerNotification();
        else {
          // this.submitAnswer();
          this.$router.push(`/results`);
        }
      },
      triggerNotification() {
        this.$q.notify({
          type: 'negative',
          message: `Please select an answer.`,
          actions: [
            {
              label: 'Dismiss', color: 'white', handler: () => { /* ... */
              }
            }
          ]
        })
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

  .answer-button {
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

  /* Used dynamically to show which answer is selected */
  .selected {
    background: grey;
  }

  .flow-button {
    margin: 3% 7.5% 3% auto;
    background: white;
    border-radius: 25px;
  }

  @media screen and (max-width: 599px) {
    .right-half {
      border-right: 0;
    }

    .right-half .flow-button {
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
