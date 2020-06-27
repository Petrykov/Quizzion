<template>
  <q-page
    class="flex-center fullscreen" :style="{background : getQuizById.color}">
    <div class="row flex flex-center">
      <h2 class="text-h2" style="border:  #9C27B0;color: white">{{getQuizById.title}}</h2>
    </div>

    <div class="row flex flex-center text-center">
      <table>
        <tr
          v-if="participants !== ' '"
          class="text-h5" style="border:  #9C27B0;color: white">Participants: {{participants}}
        <tr class="text-h5" style="border:  #9C27B0;color: white">
          <div style="margin: 1em 0">
            <q-btn color="teal" @click="$router.push(`/podium`);">
              <q-icon left size="3em" name="fas fa-trophy"  style="margin: 0.2em 0;"/>
              <div class="q-ml-md">Winners</div>
            </q-btn>
          </div>
      </tr>
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
      <q-scroll-area style="height: 50vh;">
        <q-list style="width:100%">
          <table
            width="100%">
            <tr
              v-for="(result,index) in getResults()"
              :key="index">
              <td style="width:5%">
                <div class=" flex flex-center">{{index+1}}</div>
              </td>
              <td style="width:90%">
                <q-expansion-item switch-toggle-side
                                  expand-separator
                                  :label="result[0].displayName">
                  <div class="row" style="background-color:beige">
                    <div class="flex flex-center text-weight-bold" label="questions"
                         style="align-items: center;margin-left: 1em">
                      Questions

                    </div>
                    <ul class="text-center" v-for="(response,index) in result" v-bind:key="index">
                      <div class="col-1" style="width:20px;">
                        <div class="flex flex-center">
                          <a class="text-weight-20" style="size: 30px">{{index+1}}</a>
                        </div>
                        <q-icon :name="isCorrectIcon(response.correct)" class="flex flex-center"
                                :color="isCorrectIconColor(response.correct)" size="20px"/>
                        <div class="flex flex-center">{{response.score}}</div>
                      </div>
                    </ul>
                  </div>
                </q-expansion-item>
              </td>
              <td
                style="width:20%">
                <div
                  class=" flex flex-center">{{getTotal(result)}}</div>
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
  name: 'ResultPageForModerator',
  methods: {

    isCorrectIcon(isCorrect) {
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
    },

    getTotalPlayer() {
      return this.$store.state.quizzes.results.results.length;
    },

    getTotal(arrayOfResults) {
      let totalScoreForOneRespondent = 0;

      for (let i = 0; i < arrayOfResults.length; i++) {
        totalScoreForOneRespondent += arrayOfResults[i].score;
      }

      return totalScoreForOneRespondent;
    },

    getResults() {
      return this.$store.state.quizzes.results.results;
    }

  },

  data() {
    return {
      quizId: this.$route.params.quizId,
      participants: ' '
    };
  },

  mounted() {
    this.$store.dispatch('quizzes/results/fetchResultsForQuiz', {quizId: this.$route.params.quizId}).then(() => {
      this.participants = this.getTotalPlayer();
      this.getResults();
      this.getTotal();
    });
  },

  computed: {
    getQuizById() {
      return this.$store.getters['quizzes/getQuizById'](this.quizId);
    }
  }
};

</script>

