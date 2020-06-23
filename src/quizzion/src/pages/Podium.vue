<template>
  <q-page>
    <div class="fullscreen bg-image">
      <table style="height: 100%;width: 100%;">
        <td style="width: 27%"></td>
        <td style="width: 13%">
          <div class="row" style="height: 28%"></div>
          <div class="row flex-center">
            <h5 class="text-h5">{{results[1].name}}</h5>
          </div>
        </td>
        <td style="width: 20%;height: 100%">
          <h4 class=" row flex-center text-h4">{{results[0].name}}</h4>
        </td>
        <td style="width: 13%">
          <div class="row" style="height: 38%"></div>
          <div class="row flex-center">
            <h5 class="text-h5">{{results[2].name}}</h5>
          </div>
        </td>
        <td style="width: 27%"></td>
      </table>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: "Podium.vue",
    data() {
      return {
        results: this.getWinners()
      }
    },
    computed: {},
    methods: {
      getWinners() {
        let allResult=this.$store.state.quizzes.results.results;
        let sortResult=[];
        for (let i = 0; i <allResult.length ; i++) {
          sortResult.push(this.getTotalForOneResult(allResult[i]))
        }
        sortResult=sortResult.sort(function (a, b) {
          return b.total - a.total;
        });
        return sortResult;
      },
      getTotalForOneResult(result){
        let eachResult={name:result[0].displayName,total:0};

        for (let i = 0; i <result.length ; i++) {

          eachResult.total += result[i].score;
        }

        return eachResult;
      }
    }
  }
</script>

<style scoped>
  .bg-image {
    background: url(../assets/podium_page.png) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
