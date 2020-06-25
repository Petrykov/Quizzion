<template>
  <q-page class="flex-center fullscreen" :style="{background:getQuizById.color}">
    <div class="flex flex-center q-mr-md q-ml-md">
      <h2 class="text-h2" style="border:  #9C27B0;color: white">{{getQuizById.title}}</h2>
    </div>
    <div class="row flex flex-center text-center">
      <table>
        <tr class="text-h4" style="border:  #9C27B0;color: white;height: 30px">{{$store.state.user.displayName}}</tr>
        <tr class="text-h5" style="border:  #9C27B0;color: white;height: 30px">Total score: {{getTotal}}</tr>
        <tr class="text-h5" style="border:  #9C27B0;color: white;height: 30px">Ranking:</tr>
      </table>
    </div>
    <div
      style="background-color: white;border-radius: 15px 15px 15px 15px;width:100%;margin-left: 5%;margin-right: 5%;width: 90%">
      <q-scroll-area class="q-mt-md q-pt-sm" style="height: 450px;">
        <q-list style="width:100%">
          <table style="border-spacing: 10px; width: 100%" >
            <tr>
              <th style="width:5%">No</th>
              <th style="width:70%;">Questions</th>
              <th style="width:20%">Answer</th>
              <th style="width:10%">Status</th>
              <th style="width:5%">Score</th>
            </tr>

            <tr v-for="(result,index) in results" v-bind:key="index">
              <td style="width:5%">
                <div class=" flex flex-center">{{index+1}}</div>
              </td>
              <td style="width:70%">
                <div class="row">{{result.questionTitle}}</div>
              </td>
              <td style="width:20%">
                <div class="row flex flex-center">{{result.answerLabel}}</div>
              </td>
              <td style="width:10%">
                <div class="flex flex-center">
                  <q-icon :name="isCorrectIcon(result.correct)" class="flex flex-center"
                          :color="isCorrectIconColor(result.correct)" size="20px"/>
                </div>
              </td>
              <td style="width:5%">
                <div class="flex flex-center">{{result.score}}</div>
              </td>
            </tr>
          </table>
        </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'ResultPageForRespondent',
  methods: {
    isCorrectIcon: function(isCorrect) {
      if (isCorrect) {
        return 'check_circle';
      }
      return 'fas fa-times-circle';
    },
    isCorrectIconColor: function(isCorrect) {
      if (!isCorrect) {
        return 'red';
      }
      return 'green';
    }
  },
  data() {
    return {
      quizId: this.$store.state.quizzes.quizzes[0].id
    };
  },
  computed: {
    results() {
      return this.$store.state.quizzes.results.results;
    },
    getQuizById() {
      return this.$store.getters['quizzes/getQuizById'](this.quizId);
    },
    getTotal() {
      return this.$store.getters['quizzes/results/getTotalScore'];
    }
  },
  created() {
    this.$store.dispatch('quizzes/results/getRespondentResults', {
      id: this.$store.state.user.token,
      quizId: this.quizId
    });
  },
  mounted() {
    this.$socket.client.emit('quiz-done', {quiz_id: this.quizId});
  }
};
</script>

<style scoped>

  td {
    margin: 1%;
  }

</style>
