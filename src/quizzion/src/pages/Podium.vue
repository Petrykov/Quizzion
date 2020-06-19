<template>
  <q-page>
    <div class="fullscreen bg-image">
      <table style="height: 100%;width: 100%;">
        <td style="width: 27%"></td>
        <td style="width: 13%">
          <div class="row" style="height: 29%"></div>
          <div class="row flex-center" >
            <h5 class="text-h5">{{results[1].name}}</h5>
          </div>
        </td>
        <td style="width: 20%;height: 100%">
          <h4 class=" row flex-center text-h4">{{results[0].name}}</h4>
        </td>
        <td style="width: 13%">
          <div class="row" style="height: 38%"></div>
          <div class="row flex-center" >
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
        results:this.getWinners()
      }
    },
    computed:{
    },
    methods:{
      getWinners(){
        let result=this.$store.state.quizzes.results.results.sort(function(a,b){
          return b.score-a.score;
        });
        return result
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
