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
          data-aos="fade-down-right"
          data-aos-duration="2000"
          class="col q-pa-xl"
          style="text-align: center;justify-content: center; align-items: center; display: flex;">

          <div
            class="question-list-wrapper">

            <p
              class="q-mt-lg"
              style="font-size:3em;">{{currentQuiz.title }}</p>

            <p
              style="font-size:2em;"
              v-if="currentQuiz.questions.length === 0"
            >Let's add some questions!</p>

            <div
              class="q-mt-xl">

              <q-scroll-area
                v-if="currentQuiz.questions.length !== 0"
                class="scroll-area"
                style="height: 200px; width: 300px;">

                <div>
                  <p
                    v-for="(question) in currentQuiz.questions"
                    :key="question">

                    <q-btn
                      class="q-mt-lg"
                      style="width:90%;"
                      :outline="question !== selectedQuestionId"
                      rounded
                      color="black"
                      @click="onQuestionClick(question)">
                      {{ questionTitle(question) }}
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
          v-if="question !== undefined">

          <q-page padding>

            <div style="display:flex;">

              <div
                style="width: 95%;">
                <q-input
                  style="font-size: 1.8em; padding-top: 15px;"
                  dark
                  color="grey-12"
                  label="Question's title"
                  v-model="question.title"
                  label-color="grey"/>
              </div>

              <div
                style="width: 5%; display: table; margin: auto;"
              >
                <q-icon
                  name="delete"
                  color="white"
                  style="cursor : pointer;"
                  class="q-mr-md"
                  size="2.5em"
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


            <div style="display: flex;justify-content: center;padding-top: 10px">
              <q-img v-if="imageUrl" :src="imageUrl"
                     width="10%"></q-img>
              <q-file
                style="margin-top: 1px;"
                size="xx-large"
                round
                v-model="file"
                label-color="white"
                label="Pick one image"
                filled
                color="white"
                @click="$refs.file.click()">
              </q-file>
              <q-btn @click="uploadToFirebase">
                <i class="fas fa-upload" style="color: white"></i>
              </q-btn>
            </div>
            <div class="answers-div-wrapper">
              <p
                class="paragraph q-mt-md q-ml-xs"
                style="color:white; font-size:1.5em;">
                The answers?
              </p>

              <div class="col">
                <q-scroll-area
                  class="scroll-area cust-scroll-area answers-wrapper"
                  style="height: 250px; max-width: 300px;">

                  <div
                    v-if="answersList"
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

              <div style="display: flex" class="row items-center">

                <q-icon
                  name="timer"
                  color="white"
                  size="4em"
                  class="col-2 q-mt-xs time-icon"/>

                <p
                  class="col-auto q-mt-xs"
                  style="color:white; font-size:1.5em;">What about the timer?</p>

              </div>

              <div
                class="timer">

                <div
                  v-if="selectedQuestion"
                  class="row col">
                  <div class="q-pa-md q-gutter-sm time-section">
                    <q-btn
                      v-for="(time, index) in ['5 sec', '10 sec', '15 sec', '30 sec', '60 sec']"
                      v-bind:key="index"
                      :id="selectedQuestion.id + '=' + index"
                      style="border-radius: 50px; border: 1px solid white; padding: .6em;"
                      text-color="white"
                      class="time-button"
                      :style="[ (parseInt(time.split(' ')[0], 10) === question.time) ? {background:lighten(currentQuiz.color, 40)} : '']"
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
                size="1em"
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
  import firebase from 'firebase';
  import {colors} from 'quasar'

  const {lighten} = colors;


  export default {
    data() {

      return {

        currentQuizId: this.$route.params.quizId,

        selectedQuestionId: ' ',

        newAnswer: '',

        question: undefined,

        alert: false,

        answersList: ' ',

        file: null,

        imageUrl: null
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
        return this.$store.getters['quizzes/getAnswers'](this.selectedQuestion.answers);
      },

      questionTitle() {
        return this.$store.getters['quizzes/getQuestionTitleById'];
      }
    },

    methods: {
      lighten,
      uploadToFirebase() {
        if (this.file != null) {
          let storageRef = firebase.storage().ref(`${this.file.name}`);
          storageRef.put(this.file).then(() => {
            storageRef.getDownloadURL().then((url) => {
              this.imageUrl = url;
            })
          });
        }
      },
      onQuestionClick(id) {

        this.selectedQuestionId = id;

        this.question = {...this.selectedQuestion};

        this.answersList = this.deepCopyFunction([...this.getAnswers]);

        this.imageUrl = this.question.image;

        this.file = null;
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
          time: 30,
          answers: []
        };

        this.$store.dispatch('quizzes/createQuestion', {quizId, newQuestion});
      },

      deleteQuestion() {

        let quizId, deletedQuestionId;

        quizId = this.currentQuizId;
        deletedQuestionId = this.selectedQuestionId;

        this.$store.dispatch('quizzes/deleteQuestion', {quizId, deletedQuestionId});

        this.question = undefined;
      },

      async updateQuestion() {
        let quizId, questionId, updatedQuestion, answers, image;

        if (this.timeCheck() === false) {
          this.showNotification("Please select the time of the quiz", 'negative');
        } else {

          questionId = this.selectedQuestionId;

          updatedQuestion = this.question;

          updatedQuestion.image = this.imageUrl;
          answers = this.answersList;

          let answersIdList = [];

          this.answersList.map((answer) => {
            answersIdList.push(answer.id);
          });

          updatedQuestion = {
            title: this.question.title,
            description: this.question.description,
            image: this.question.image,
            time: this.question.time,
            answers: answersIdList
          };

          Promise.allSettled([
            this.$store.dispatch('quizzes/updateAnswers', {answers}),
            this.$store.dispatch('quizzes/updateQuestion', {questionId, updatedQuestion})
          ]).then(() => {
            this.showNotification("Question was saved!", "positive");
          }).catch(() => {
            this.showNotification("Something went wrong...", "negative");
          });
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

      showNotification(message, type) {
        this.$q.notify({
          type: type,
          message: message,
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

  .cust-scroll-area {
    border: none;
    margin-left: 0;
    margin-right: 0;
  }

  .timer {
    display: flex;
  }

  .time-section {
    width: 100%;
    margin: 0 !important;
  }

  .question-list-wrapper {
    width: auto;
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
