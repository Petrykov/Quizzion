<template>
  <q-page 
     class="shadow-2 rounded-borders">

    <div class="row q-pa-lg logo" >

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
                style = "border: 1px solid wheat;"
                :class="{'selected' : (parseInt(time.split(' ')[0], 10) === selectedQuestion.time) }"
                color = "wheat"
                class = "col q-ml-md q-mr-md q-mt-md q-mb-sm timer"
                size = "12px"
                :label="time"
                @click="onTimeClick(time, index)"/>

              <q-btn
                rounded
                dark
                class="col q-ml-md q-mr-md q-mt-lg q-mb-lg"
                style = "border: 1px solid wheat;"
                color = "wheat"
                size="12px"
                icon="all_inclusive"/>

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

                selectedQuestionId: ' ',

                currentQuizId: this.$route.params.quizzId,

                newAnswer: '',

                quizTime: 0
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
                answers: ['ihy6', '65ry5', 'k98nn']
              }

              this.$store.commit('quizzes/createQuestion', {newQuestion, quizId});
            },

            deleteQuestion(){

                let quizId, questionId;
                
                quizId = this.currentQuizId;
                questionId = this.selectedQuestionId;

                this.$store.commit('quizzes/deleteQuestion', {quizId, questionId});
            },

            updateQuestion(){
                let quizId, questionId, updatedQuestion;

                quizId = this.currentQuizId;
                questionId = this.selectedQuestionId;

                updatedQuestion = {
                  id: questionId,
                  title: this.selectedQuestion.title,
                  description: this.selectedQuestion.description,
                  image: '',
                  time: this.quizTime[0],
                  answers: ['k98nn']
                }

                this.$store.commit('quizzes/updateQuestion', {updatedQuestion, questionId, quizId});
            },

             onTimeClick(time, index){


              // console.log(parseInt(time.split(' ')[0], 10) +" | "+ this.selectedQuestion.time)

              // if(parseInt(time.split(' ')[0], 10) === this.selectedQuestion.time){
              //   console.log(true)
              // }else{
              //   console.log(false)
              // }

              let timerIcons;

              // console.log('time: ' + this.selectedQuestion.time)

              this.quizTime = time.split(' ');
              timerIcons = document.getElementsByClassName('timer');
              
              // console.log(parseInt(this.quizTime[0],10) + " | " + this.selectedQuestion.time);

              // if(this.selectedQuestion.time !== 0){
              //   if(parseInt(this.quizTime[0], 10) === this.selectedQuestion.time){
              //       console.log('yaya')
              //       timerIcons[index].setAttribute('style','background: grey; border: 1px solid wheat;');
              //   }else{
              //     console.log('yaya2')
              //   }
              // }

              for(let i = 0; i < timerIcons.length; i++){    
   
                if(timerIcons[i] === timerIcons[index]){
                  // timerIcons[index].setAttribute('style','background: grey; border: 1px solid wheat;');
                }else{
                  timerIcons[i].setAttribute('style','background: none; border: 1px solid wheat; font-size:12px;');
                }
              }
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
    /* position: fixed; */
    display: flex;
    background-image: url("~assets/bg_answer_screen.png");
    border: 1px solid black;
    height: 100%;
    width: 100%;
  }

  .rounded-borders{
    display: contents;
  }

  .selected{
    background: white !important;
    border: 1px solid red;
  }


</style>
