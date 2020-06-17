<template>
  <q-page>
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
      <div class="right-half col-xs-12 col-sm-6" :style="{background:currentQuiz.color}">
        <div class="counter-container">
          <h4 class="xs-hide counter">{{ timeRemaining }}</h4>
          <h5 class="xs counter">{{ timeRemaining }}</h5>
        </div>

        <q-btn
          v-for="(answerId, idx) in currentQuestion.answers"
          :key="answerId"
          @click="selectAnswer(answerId)"
          class="answer-button"
          :style="[ selectedAnswer === answerId ? {background:lighten(currentQuiz.color, 40)} : '']"
          no-caps>

          {{ indexes[idx] }}: {{ answerLabel(answerId) }}

        </q-btn>

        <div style="display: flex; justify-content: flex-end">
          <q-btn
            v-if="nextQuestionId"
            @click="goToNextPage"
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
            @click="goToNextPage"
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
  import {colors} from 'quasar'

  const {lighten} = colors;

  export default {
    name: "AnswerForm",

    data() {
      return {
        quizId: this.$route.params.quizId,
        questionId: this.$route.params.questionId,
        indexes: ["A", "B", "C", "D", "E", "F"], //TODO: Should we restrict the amount of options a question can have?
        selectedAnswer: '',
        timeRemaining: 0,
        timer: ''
      }
    },
    computed: {
      currentQuiz() {
        return this.$store.getters['quizzes/getQuizById'](this.quizId);
      },
      currentQuestion() {
        return this.$store.getters['quizzes/getQuestionById'](this.questionId);
      },
      nextQuestionId() {
        return this.$store.getters['quizzes/getNextQuestionId'](this.quizId)(this.questionId);
      },
      answerLabel() {
        return this.$store.getters['quizzes/getAnswerLabelById'];
      }
    },
    beforeRouteUpdate(to, from, next) { //router navigation guard, makes sure that the local state is in line with displayed data/url
      this.quizId = to.params.quizId;
      this.questionId = to.params.questionId;
      this.selectedAnswer = '';
      this.timeRemaining = this.currentQuestion.time;
      next();
    },
    mounted() {
      this.startTimer(this.currentQuestion.time);
    },
    methods: {
      lighten,
      selectAnswer(answerId) {
        this.selectedAnswer = answerId;
      },
      goToNextPage() {
        if (this.nextQuestionId) this.goToNextQuestion();
        else this.goToResults();
      },
      goToNextQuestion() {
        if (this.timeRemaining === 0) {
          this.$router.replace(`/quizzes/${this.quizId}/questions/${this.nextQuestionId}`);
        } else {
          if (this.selectedAnswer === '') this.triggerNotification();
          else {
            this.submitAnswer();
            this.$router.replace(`/quizzes/${this.quizId}/questions/${this.nextQuestionId}`);
          }
        }
      },
      goToResults() {
        if (this.timeRemaining === 0) {
          clearInterval(this.timer);
          this.$router.replace(`/result/respondent`);
        } else {
          if (this.selectedAnswer === '') this.triggerNotification();
          else {
            this.submitAnswer();
            clearInterval(this.timer);
            this.$router.replace(`/result/respondent`);
          }
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
      },
      startTimer(maxTime) {
        this.timeRemaining = maxTime;

        this.timer = setInterval(() => {
          if (this.timeRemaining > 0) this.timeRemaining -= 1;
          else this.goToNextPage();
        }, 1000)

      },
      submitAnswer() {

        const totalTime =  this.currentQuestion.time;
        const answer = {
          uid: this.$store.state.user.token,
          questionTitle: this.currentQuestion.title,
          isCorrect: this.$store.getters['quizzes/getAnswerById'](this.selectedAnswer).correct,
          answerLabel: this.answerLabel(this.selectedAnswer),
          time: totalTime - this.timeRemaining,
          totalTime};

        this.$store.dispatch('quizzes/submitAnswer', {quizId: this.quizId, answer});
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
