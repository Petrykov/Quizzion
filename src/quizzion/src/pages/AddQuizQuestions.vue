<template>
  <q-page 
    container 
    class="shadow-2 rounded-borders">

    <div class="row q-pa-lg" >

      <q-page-container 
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
            class="q-mt-md"/>


        </div>
      </q-page-container>

      <q-page-container
        class="col q-pa-lg" 
        style="background: #181c30; border-radius: 2em;"
        v-if="selectedQuestion">

        <q-page padding>

          <q-input 
            style="font-size: 1.8em;"
            class="questionInput" 
            dark 
            color="grey-12" 
            label="Question's title"
            v-model="selectedQuestion.title"
            label-color="grey"/>

          <q-input
            dark
            filled
            autogrow
            label="Question description"
            v-model="selectedQuestion.description"
            class="q-mt-md"
            color="grey"/>

          <p 
            class="paragraph q-mt-lg q-ml-md" 
            style="color:white; font-size:2em;">
            The answers?
          </p>

          <div 
            class="col q-mt-sm">

            <div  
              v-for="(answer) in answers"
              :key="answer.id"
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
                size = "2em"/>

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
                    size = "2em"/>
                  

                </div>
              </form>

          </div>

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

              <q-btn 
                v-for="(time, index) in ['5 sec', '10 sec', '15 sec', '30 sec', '1 min']"
                v-bind:key="index"
                rounded
                dark
                style = "border: 1px solid white;"
                color = "wheat"
                class = "col q-ml-md q-mr-md q-mt-lg q-mb-lg"
                size = "12px"
                :label="time"/>

              <q-btn
                rounded
                dark
                class="col q-ml-md q-mr-md q-mt-lg q-mb-lg"
                size="12px"
                icon="all_inclusive"/>

            </div>
          </div>

        </q-page>
      </q-page-container>
    </div>
  </q-page>
</template>

<script>
    export default {
        data() {
            return {

                val: true,

                selectedQuestionId: ' ',

                currentQuizId: this.$route.params.quizzId,

                newAnswer: '',

                questions: [
                    {
                        id: 1,
                        name: 'Question title 1',
                        description: 'Description for the first question',
                        time: '5 sec',
                        answers: [
                            {
                                id: 1,
                                name: "Answer 1",
                                isCorrect: false,
                            },
                            {
                                id: 2,
                                name: "Answer 2",
                                isCorrect: true,
                            },
                            {
                                id: 3,
                                name: "Answer 3",
                                isCorrect: false,
                            }
                        ]
                    }, {
                        id: 2,
                        name: 'Question title 2',
                        description: 'Description for the second question',
                        time: '',
                        answers: [
                            {
                                id: 1,
                                name: "Answer 1-2",
                                isCorrect: false,
                            },
                            {
                                id: 2,
                                name: "Answer 2-2",
                                isCorrect: false,
                            },
                            {
                                id: 3,
                                name: "Answer 3-2",
                                isCorrect: true,
                            }
                        ]
                    }, {
                        id: 3,
                        name: 'Question title 3',
                        description: 'Description for third question',
                        time: '',
                        answers: [
                            {
                                id: 1,
                                name: "Answer 1-3",
                                isCorrect: true,
                            },
                            {
                                id: 2,
                                name: "Answer 2-3",
                                isCorrect: false,
                            },
                            {
                                id: 3,
                                name: "Answer 3-3",
                                isCorrect: false,
                            }
                        ]
                    }
                ]
            }
        },

        mounted(){
          this.$store.dispatch('user/login');

          console.log('selected question: ');
          console.log(selectedQuestion);
        },

        computed: {
            
          currentQuiz(){
            return this.$store.getters['quizzes/getQuizById'](this.currentQuizId);
          },

          selectedQuestion(){
            return this.$store.getters['quizzes/getQuestionById'](this.selectedQuestionId);
          },

          answers(){
            return this.$store.getters['quizzes/getAnswers'](this.selectedQuestion.answers);  
          },

          questionTitle(){
            return this.$store.getters['quizzes/getQuestionTitleById'];
          }
        },

        methods: {
            onQuestionClick(id) {
                this.selectedQuestionId = id;
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

</style>
