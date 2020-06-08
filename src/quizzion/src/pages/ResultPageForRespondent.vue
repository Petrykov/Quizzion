<template>
  <q-page class="flex-center fullscreen" :style="{background:getQuizById.color}">
    <div class="flex flex-center">
      <h2 class="text-h2" style="border:  #9C27B0;color: white">{{getQuizById.title}}</h2>
    </div>
    <div class="row flex flex-center text-center">
      <table>
        <tr class="text-h4" style="border:  #9C27B0;color: white;height: 30px">{{getResultById.respondent}}</tr>
        <tr class="text-h5" style="border:  #9C27B0;color: white;height: 30px">Total score: {{getTotal}} </tr>
        <tr class="text-h5" style="border:  #9C27B0;color: white;height: 30px">Ranking: </tr>
      </table>
    </div>
    <div
      style="background-color: white;border-radius: 15px 15px 15px 15px;width:100%;margin-left: 5%;margin-right: 5%;width: 90%">
      <q-scroll-area style="height: 700px;">
        <q-list style="width:100%">
          <table width="100%">
            <tr>
              <th style="width:5%">No</th>
              <th style="width:60%;">Questions</th>
              <th style="width:20%">Answer</th>
              <th style="width:10%">Status</th>
              <th style="width:5%">Score</th>
            </tr>
            <tr v-for="guess in getResultById.guessesIds" v-bind:key="guess">
              <td style="width:5%">
                <div class=" flex flex-center">{{getGuessById(guess).number}}</div>
              </td>
              <td style="width:60%">
                <div class="row">{{getQuestion(getGuessById(guess).questionId).title}}</div>
              </td>
              <td style="width:20%">
                <div class="row flex flex-center">{{getAnswer(getGuessById(guess).answerId).label}}</div>
              </td>
              <td style="width:10%">
                <div class="flex flex-center" >
                <q-icon :name="isCorrectIcon(getAnswer(getGuessById(guess).answerId).correct)" class="flex flex-center"
                        :color="isCorrectIconColor(getAnswer(getGuessById(guess).answerId).correct)" size="20px"/>
                </div>
              </td>
              <td style="width:5%">
                <div class="flex flex-center">{{addScore(getAnswer(getGuessById(guess).answerId).correct)}}</div>
              </td>
            </tr>
          </table>
        </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
  import {getResultById} from "../store/quizzes/results/getters";

  export default {
    name: "ResultPageForRespondent",
    methods:{
      isCorrectIcon:function(isCorrect){
        if(isCorrect){
          return 'check_circle'
        }
        return 'fas fa-times-circle'
      },
      isCorrectIconColor: function (isCorrect) {
        if (!isCorrect) {
          return "red"
        }
        return "green"
      },
      addScore:function(isCorrect){
        if(isCorrect){
          return 10
        }
        return 0
      },
    },
    data() {
      return{

      }
    },
    computed: {
      getResultById(){
        let id='hisd7y'
        return this.$store.getters['quizzes/results/getResultById'](id)
      },
      getQuizById(){
        let id="kh8yi7y"
        return this.$store.getters['quizzes/getQuizById'](id)
      },
      getGuessById(){
        return this.$store.getters['quizzes/results/getGuessById']
      },
      getQuestion(){
        return this.$store.getters['quizzes/getQuestionById']
      },
      getAnswer(){
        return this.$store.getters['quizzes/getAnswerById']
      },
      getTotal(){
        let id='hisd7y'
        return this.$store.getters['quizzes/results/getTotalScore'](id)
      }
    }
  }
</script>

<style scoped>

</style>
