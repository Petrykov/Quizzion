<template>
  <q-page class="flex-center fullscreen" :style="{background:getQuizById.color}">
    <div class="row flex flex-center">
      <h2 class="text-h2" style="border:  #9C27B0;color: white">{{getQuizById.title}}</h2>
    </div>
    <div class="row flex flex-center text-center">
      <table>
        <tr class="text-h5" style="border:  #9C27B0;color: white">Participants: {{getTotalPlayer}}</tr>
        <tr class="text-h5" style="border:  #9C27B0;color: white">Result</tr>
      </table>
    </div>
    <div
      style="background-color: white;border-radius: 15px 15px 15px 15px;width:100%;margin-left: 5%;margin-right: 5%;width: 90%">
      <table style="width: 100%">
        <tr>
          <th style="width:5%">No</th>
          <th style="width:90%;">Player</th>
          <th style="width:20%">Score</th>
        </tr>
      </table>
      <q-scroll-area style="height: 700px;">
        <q-list style="width:100%">
          <table width="100%">
            <tr v-for="(result,index) in getResults" v-bind:key="result.id">
              <td style="width:5%">
                <div class=" flex flex-center">{{index+1}}</div>
              </td>
              <td style="width:90%">
                <q-expansion-item switch-toggle-side
                                  expand-separator
                                  :label="result.respondent">
                  <div class="row" style="background-color:beige">
                    <div class="flex flex-center text-weight-bold" label="questions" style="align-items: center;margin-left: 1em">
                      Questions

                    </div>
                    <ul class="text-center" v-for="(response,index) in result.responses" v-bind:key="response">
                      <div class="col-1" style="width:20px;">
                        <div class="flex flex-center">
                          <a class="text-weight-20" style="size: 30px">{{index+1}}</a>
                        </div>
                         <q-icon :name="isCorrectIcon(getResponse(response).correct)" class="flex flex-center"
                                :color="isCorrectIconColor(getResponse(response).correct)" size="20px"/>
                        <div class="flex flex-center" >{{addScore(getResponse(response).correct)}}</div>
                      </div>
                    </ul>
                  </div>
                </q-expansion-item>
              </td>
              <td style="width:20%">
                <div class=" flex flex-center">{{getTotal(result.id)}}</div>
              </td>
            </tr>
          </table>
        </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'


  export default {
    name: "ResultPageForModerator",
    methods: {
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
      return {
        quizId:this.$route.params.quizId
      }
    },

    computed: {
      getResults(){
        return this.$store.getters['quizzes/results/getResultsOfQuiz'](this.quizId)
      },
      getQuizById(){
        return this.$store.getters['quizzes/getQuizById'](this.quizId)
      },
      getTotalPlayer(){
        return this.$store.getters['quizzes/results/getTotalParticipantsOfQuiz'](this.quizId)
      },
      getResponse(){
        return this.$store.getters['quizzes/getAnswerById']
      },
      getTotal(){
        return this.$store.getters['quizzes/results/getTotalScore']
      }
    }
  }

</script>
