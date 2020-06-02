<template>
  <q-page
     class="shadow-2 rounded-borders">

    <div class="row q-pa-lg logo window-height">

      <q-page-container
        v-if="currentQuiz"
        class="col q-pa-xl"
        style="text-align: center;">

        <p
          class="q-mt-lg"
          style="font-size:3em;">{{ currentQuiz.title }}</p>

        <div class="q-mt-xl vertical-allignment">

          <q-scroll-area
            class="scroll-area"
            style="height: 275px; max-width: 300px;">

            <div>

              <p
                v-for="(questionId) in currentQuiz.questions"
                :key="questionId">

                  <q-btn
                    class="q-mt-lg"
                    style="width:90%;"
                    :outline="questionId != selectedQuestionId"
                    rounded
                    color="black"
                    @click = "onQuestionClick(questionId)">
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
      </q-page-container>

      <q-page-container
        class="col q-pa-lg"
        :style="{background: currentQuiz.color}"
        style="border-radius: 2em;"
        v-if="question !== ' '">

        <q-page padding>

          <q-input
            style="font-size: 1.8em;"
            dark
            color="grey-12"
            label="Question's title"
            v-model="question.title"
            label-color="grey"/>

          <q-input
            dark
            filled
            autogrow
            label="Question description"
            v-model="question.description"
            class="q-mt-md"
            color="grey"/>

          <p
            class="paragraph q-mt-lg q-ml-md"
            style="color:white; font-sizfe:2em;">
            The answers?
          </p> 

           <q-scroll-area
            class="scroll-area scrollarea"
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
                    name = "clear"
                    color= "red-7"
                    class = "q-mt-md q-ml-sm"
                    style = "cursor : pointer;"
                    size = "2em"
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
                        v-if = "newAnswer.length !== 0"
                        name = "add_circle_outline"
                        color = "green-7"
                        class = "q-mt-md q-ml-xs"
                        style = "cursor : pointer;"
                        size = "2em"
                        @click="addAnswer"/>

                    </div>
                  </form>
              </div>

           </q-scroll-area>

          <p
            class="q-mt-md"
            style="color:white; font-size:2em;">What about timer?</p>

          <div
            class="row">

            <q-icon
              name="timer"
              color="white"
              size="5em"
              class="q-mr-xs q-mt-md"/>

            <div class="row col">
              <div class="q-pa-md q-gutter-sm">
                <q-btn
                  v-for="(time, index) in ['5 sec', '10 sec', '15 sec', '30 sec', '1 min']"
                  v-bind:key="index"
                  :id="selectedQuestion.id + '=' + index"
                  round
                  style = "border: 1px solid black; padding: 1em;"
                  color = "white"
                  text-color="black"
                  class = "timer"
                  :class="{selected : (parseInt(time.split(' ')[0], 10) === question.time)}"
                  :label="time"
                  @click="onTimeClick(time, index)" />
              </div>      
              
            </div>
          </div> 

          <div
            class="q-mt-md"
            style="width: 100%; text-align: center;">
            <q-icon
              name="delete"
              color="red-6"
              style="cursor : pointer;"
              class="q-mr-md"
              size="4em"
              @click="deleteQuestion"/>

            <q-icon
              name="save"
              color="orange-6"
              class="q-ml-md"
              style="cursor : pointer;"
              size="4em"
              @click="updateQuestion"/>
          </div>

        </q-page>
      </q-page-container>
    </div>
  </q-page>
</template>

<script>

  import { v4 as uuidv4 } from 'uuid';

    export default {
        data() {
            return {
                
                currentQuizId: this.$route.params.quizId,

                selectedQuestionId: ' ',
                
                newAnswer: '',

                question: ' ',

                answersList: ' '
            }
        },

        mounted(){
            this.$store.dispatch('user/login');
        },

        computed: {

          currentQuiz(){
            return this.$store.getters['quizzes/getQuizById'](this.currentQuizId);
          },

          selectedQuestion(){
            return this.$store.getters['quizzes/getQuestionById'](this.selectedQuestionId);
          },

          getAnswers(){
            return this.$store.getters['quizzes/getAnswers'](this.question.answers);
          },

          questionTitle(){
            return this.$store.getters['quizzes/getQuestionTitleById'];
          }
        },

        methods: {
            onQuestionClick(id) {
              this.selectedQuestionId = id;
              
              this.question = {...this.selectedQuestion};

              this.answersList = {...this.getAnswers};

              console.log(this.answersList);
            },

            addQuestion(){

              let quizId, questionId, newQuestion;

              quizId = this.currentQuizId;

              questionId = uuidv4();

              newQuestion = {
                id: questionId,
                title: 'new question',
                description: 'sample description',
                image: '',
                time: 50,
                answers: []
              };

              this.$store.commit('quizzes/createQuestion', {newQuestion, quizId});
            },

            deleteQuestion(){

                let quizId, deletedQuestionId;

                quizId = this.currentQuizId;
                deletedQuestionId = this.selectedQuestionId;

                this.question = ' ';
                this.$store.commit('quizzes/deleteQuestion', {quizId, deletedQuestionId});                
            },

            updateQuestion(){
                let quizId, questionId, updatedQuestion;

                quizId = this.currentQuizId;
                questionId = this.selectedQuestionId;

                updatedQuestion = this.question;

                this.$store.commit('quizzes/updateQuestion', {updatedQuestion, questionId, quizId});
            },

            onTimeClick(time, index){
              this.question.time = parseInt(time.split(' '), 10);
            },

            addAnswer(){

                let questionId;
                questionId = this.selectedQuestionId;

                let answer = {
                  id: uuidv4(),
                  label: this.newAnswer,
                  correct: false
                };

                this.$store.commit('quizzes/addAnswer', {questionId, answer});

                this.newAnswer = '';
            },

            deleteAnswer(answerId){

              let questionId;
              questionId = this.selectedQuestionId;

              this.$store.commit('quizzes/deleteAnswer', {questionId, answerId});
            }
        }
    }
</script>

<style scoped>

  .vertical-allignment {
    text-align: center;
    position: relative;
    top: 30%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .scroll-area {
    border: 0.12em solid #d8d8d8;
    border-radius: 8px;
    margin: 0 auto;
  }

  .logo{
    display: flex;
    background-image: url("~assets/bg_answer_screen.png");
    border: 1px solid black;
    height: 100%;
    width: 100%;
  }

  .rounded-borders{
    display: contents;
  }

  .scrollarea{
    border: none;
    margin-left: 0;
    margin-right: 0;
  }

  .selected{
    background: orange !important;
    border: 1px solid black !important;
    color:black !important;
  }

</style>
