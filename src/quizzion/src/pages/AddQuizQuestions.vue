<template>
  <q-page
    class="shadow-2 rounded-borders">

    <div class="logo">
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Delete?</div>
          </q-card-section>

          <q-card-section class="q-pt-none">Are you sure you want to delete this question?</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup @click="deleteQuestion"/>
          </q-card-actions>

        </q-card>
      </q-dialog>

      <div
        class="row q-pa-lg window-height wrapper">

        <div
          v-if="currentQuiz"
          data-aos="fade-down-right"
          data-aos-duration="2000"
          class="col q-pa-xl"
          style="text-align: center;justify-content: center; align-items: center; display: flex;">

          <div class="question-list-wrapper">
            <p
              class="q-mt-lg"
              style="font-size:3em;">{{
              'currentQuiz.title'
              }}</p>

            <div class="q-mt-xl">

              <q-scroll-area
                class="scroll-area"
                style="height: 200px; max-width: 300px;">

                <div>
                  <p
                    v-for="(questionId) in currentQuiz.questions"
                    :key="questionId">

                    <q-btn
                      class="q-mt-lg"
                      style="width:90%;"
                      :outline="questionId !== selectedQuestionId"
                      rounded
                      color="black"
                      @click="onQuestionClick(questionId)">
                      {{ questionTitle(questionId) }}
                    </q-btn>

                  </p>
                </div>
              </q-scroll-area>

              <q-icon
                name="add_circle_outline"
                color="green-7"
                style="cursor : pointer;"
                size="3em"
                class="q-mt-md"
                @click="addQuestion"/>


            </div>
          </div>

        </div>

        <div
          data-aos="fade-down-left"
          data-aos-duration="2000"
          class="col question-card-wrapper"
          :style="{background: currentQuiz.color}"
          style="border-radius: 2em; box-shadow: 10px 10px 30px rgba(0, 0.5, 0.5, 0.5);"
          v-if="question !== ' '">

          <q-page padding>

            <div style="display:flex;">

              <div
                style="width: 100%;">
                <q-input
                  style="font-size: 1.8em;"
                  dark
                  color="grey-12"
                  label="Question's title"

                  label-color="grey"/>
              </div>

              <div>
                <q-icon
                  name="delete"
                  color="white"
                  style="cursor : pointer; position: absolute; right: 0;"
                  class="q-mr-md"
                  size="3em"
                  @click="promptToDelete"/>
              </div>

            </div>

            <q-input
              dark
              filled
              autogrow
              label="Question description"
              v-model="question.description"
              class="q-mt-md"
              color="grey"/>

            <div class="answers-div-wrapper">
              <p
                class="paragraph q-mt-lg q-ml-md"
                style="color:white; font-size:2em;">
                The answers?
              </p>

              <div>
                <q-scroll-area
                  class="scroll-area scrollarea answers-wrapper"
                  style="height: 275px; max-width: 300px;">

                  <div
                    class="col q-mt-sm">

                    <div
                      v-for="(answer, index) in answersList"
                      :key="index"
                      class="row q-mt-xs">

                      <q-checkbox
                        class="q-mt-sm q-mr-xs"
                        v-model="answer.correct"
                        dark/>

                      <q-input
                        dense
                        style="color : grey;"
                        v-model="answer.label"
                        dark/>

                      <q-icon
                        name="clear"
                        color="white"
                        class="q-mt-md q-ml-sm"
                        style="cursor : pointer;"
                        size="2em"
                        @click="deleteAnswer(answer.id)"/>

                    </div>

                    <form>
                      <div
                        class="row q-mt-md q-ml-md">

                        <q-input
                          class="q-ml-lg"
                          style="color:grey;"
                          label="Add new answer"
                          v-model="newAnswer"
                          :rules="[val => !!val || 'Field is required']"
                          dark/>

                        <q-icon
                          v-if="newAnswer.length !== 0"
                          name="add_circle_outline"
                          color="white"
                          class="q-mt-md q-ml-xs"
                          style="cursor : pointer;"
                          size="2em"
                          @click="addAnswer"/>

                      </div>
                    </form>
                  </div>

                </q-scroll-area>
              </div>

            </div>

            <div class="timer-wrapper">
              <p
                class="q-mt-md"
                style="color:white; font-size:2em;">What about timer?</p>

              <q-icon
                name="timer"
                color="white"
                size="5em"
                class="q-mr-xs q-mt-md time-icon"/>

              <div
                class="timer">

                <div class="row col">
                  <div class="q-pa-md q-gutter-sm time-section">
                    <q-btn
                      v-for="(time, index) in ['5 sec', '10 sec', '15 sec', '30 sec', '1 min']"
                      v-bind:key="index"
                      :id="selectedQuestion.id + '=' + index"
                      round
                      style="border: 1px solid black; padding: 1em;"
                      color="white"
                      text-color="black"
                      class="time-button"
                      :class="{selected : (parseInt(time.split(' ')[0], 10) === question.time)}"
                      :label="time"
                      @click="onTimeClick(time, index)"/>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="q-mt-md"
              style="width: 100%; text-align: center;">

              <q-btn
                label="save"
                color="white"
                text-color="black"
                class="q-ml-md"
                style="cursor : pointer; padding: 0.2em 0.4em; border-radius: 2em;"
                size="1.2em"
                @click="updateQuestion"/>
            </div>

          </q-page>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  import {v4 as uuidv4} from 'uuid';

  export default {
    data() {

      return {

        currentQuizId: this.$route.params.quizId,

        selectedQuestionId: ' ',

        newAnswer: '',

        question: ' ',

        alert: false,

        answersList: ' '
      }
    },

    beforeMount() {
      AOS.init();
    },

    computed: {

      currentQuiz() {
        return this.$store.getters['quizzes/getQuizById'](this.currentQuizId);
      },

      selectedQuestion() {
        return this.$store.getters['quizzes/getQuestionById'](this.selectedQuestionId);
      },

      getAnswers() {
        return this.$store.getters['quizzes/getAnswers'](this.question.answers);
      },

      questionTitle() {
        return this.$store.getters['quizzes/getQuestionTitleById'];
      }
    },

    methods: {
      onQuestionClick(id) {

        console.log("Question: ");
        console.log(this.currentQuiz);

        this.selectedQuestionId = id;

        this.question = {...this.selectedQuestion};

        this.answersList = this.deepCopyFunction([...this.getAnswers]);
      },

      deepCopyFunction(inObject) {

        let outObject, value, key;

        if (typeof inObject !== "object" || inObject === null) {
          return inObject
        }

        outObject = Array.isArray(inObject) ? [] : {}

        for (key in inObject) {
          value = inObject[key]
          outObject[key] = this.deepCopyFunction(value);
        }

        return outObject
      },

      addQuestion() {

        let quizId, newQuestion;

        quizId = this.currentQuizId;

        newQuestion = {
          title: "new question",
          description: "new description",
          image: "",
          time: 30
        };

        this.$store.dispatch('quizzes/createQuestion', {quizId, newQuestion});
      },

      deleteQuestion() {

        let quizId, deletedQuestionId;

        quizId = this.currentQuizId;
        deletedQuestionId = this.selectedQuestionId;

        this.$store.dispatch('quizzes/deleteQuestion', {quizId, deletedQuestionId});
        // this.$store.commit('quizzes/deleteQuestion', {quizId, deletedQuestionId});
      },

      updateQuestion() {
        let questionId, updatedQuestion, answers;

        if (this.timeCheck() === false) {
          this.showNotification("Please select the time of the quiz", "red");
        } else {

          questionId = this.selectedQuestionId;
          answers = this.answersList;

          let answersIdList = [];

          console.log("Answers are: " + this.answersList.length);

          // this.answersList.map((answer) => {
          //   answersIdList.push(answer.id);
          // });

          console.log(this.question);

          updatedQuestion = {
            title: this.question.title,
            description: this.question.description,
            image: this.question.image,
            time: this.question.time,
            answers: answersIdList
          };

          this.$store.dispatch('quizzes/updateQuestion', {questionId, updatedQuestion});
          // this.$store.dispatch('quizzes/updateAnswers', {answers});

          this.showNotification("Question was saved", "blue");
        }
      },

      timeCheck() {

        let selectedTime;

        selectedTime = this.question.time !== undefined;

        return selectedTime;
      },

      onTimeClick(time) {
        this.question.time = parseInt(time.split(' '), 10);
      },

      addAnswer() {

        let questionId;
        questionId = this.selectedQuestionId;

        let answer = {
          label: this.newAnswer,
          correct: false
        };

        this.$store.dispatch('quizzes/createAnswer', {questionId, answer});

        this.answersList.push(answer);
        this.newAnswer = '';
      },

      deleteAnswer(answerId) {

        let questionId;
        questionId = this.selectedQuestionId;

        this.$store.dispatch('quizzes/deleteAnswer', {questionId, answerId});

        for (let i = 0; i < this.answersList.length; i++) {
          if (this.answersList[i].id === answerId) {
            this.answersList.splice(i, 1);
          }
        }
      },

      promptToDelete() {
        this.alert = true;
      },

      showNotification(message, color) {
        this.$q.notify({
          message: message,
          color: color
        })
      }
    }
  }
</script>

<style scoped>

  .scroll-area {
    border: 0.12em solid #d8d8d8;
    border-radius: 8px;
    margin: 0 auto;
  }

  .logo {
    background-image: url("~assets/bg_answer_screen.png");
    border: 1px solid black;
    height: 100%;
    width: 100%;
  }

  .rounded-borders {
    display: contents;
  }

  .scrollarea {
    border: none;
    margin-left: 0;
    margin-right: 0;
  }

  .selected {
    background: #5dbcd2 !important;
    border: 1px solid black !important;
    color: black !important;
  }

  .timer {
    display: flex;
  }

  .time-section {
    width: 100%;
    margin: 0 !important;
  }

  .question-list-wrapper {
    display: inline-block;
  }

  .timer-wrapper {
    text-align: center;
  }

  @media screen and (max-width: 1200px) {

    .timer {
      display: inline-block;
      width: 100%;
      text-align: center;
    }

    .time-section {
      margin: 0 auto;
    }

    .wrapper {
      display: inline-block;
      width: 100%;
    }

    .question-card-wrapper {
      width: 70%;
      margin: 0 auto;
    }

    .timer-wrapper {
      text-align: center;
    }
  }

  @media screen and (max-width: 600px) {
    .question-card-wrapper {
      width: 90%;
    }

    .timer-wrapper {
      display: grid;
      text-align: center;
    }

    .timer {
      width: 80%;
      margin: 0 auto;
    }

    .time-icon {
      margin: 0 auto;
    }

    .wrapper {
      height: 50%;
      padding: 0 !important;
      margin: 0 !important;
    }
  }

</style>
