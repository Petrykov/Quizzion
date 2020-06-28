<template>
  <div class="body">
    <div class="podium">
      <div class="colums">
        <div class="second-place-wrapper">
          <div
            data-aos-duration="1500"
            data-aos="fade-down"
            class="second-place-icon">
            <div class="second-place-trophy-wrapper">
              <div class="second-place-trophy"><p style="text-align:center; vertical-align: middle; display: table-cell;font-size: 20px;color: white">{{results[1].name}}</p></div>
            </div>
          </div>
          <div class="flex flex-center">
            <q-img src="../assets/sports.png" style="width: 50%"></q-img>
          </div>
          <div class="flex flex-center" style="height:30px">
          </div>
          <div
            data-aos-duration="1500"
            data-aos="zoom-in"
            class="second-place-column">
            <div style="width: 100%; height: 100%; display: flex;">
              <div style="width: 50%; height: 100%; background: #cad3d8;"/>
              <div style="width: 50%; height: 100%; background: grey"/>
            </div>
          </div>
        </div>
        <div class="first-place-wrapper">
          <div
            data-aos-duration="3000"
            data-aos="fade-down"
            class="first-place-icon">
            <div class="first-place-trophy-wrapper">
              <div class="first-place-trophy">
                <p style="text-align:center; vertical-align: middle; display: table-cell;font-size: 20px;color: white">{{results[0].name}}</p>
              </div>
            </div>
          </div>
          <div>
            <q-img src="../assets/cup.png"></q-img>
          </div>
          <div
            data-aos-duration="3000"
            data-aos="zoom-in"
            class="first-place-column">
            <div style="width: 100%; height: 100%; display: flex;">
              <div style="width: 50%; height: 100%; background: #fdc932;"></div>
              <div style="width: 50%; height: 100%; background: #ecb000"/>
            </div>
          </div>
        </div>
        <div class="third-place-wrapper">
          <div
            data-aos-duration="1000"
            data-aos="fade-down"
            class="third-place-icon">
            <div class="third-place-trophy-wrapper">
              <div class="third-place-trophy text">
                <p style="text-align:center; vertical-align: middle; display: table-cell;font-size: 20px;color: white">{{results[2].name}}</p>
              </div>
            </div>
          </div>
          <div class="flex flex-center">
            <q-img src="../assets/sports2.png" style="width: 50%"></q-img>
          </div>
          <div class="flex flex-center" style="height:30px">
          </div>
          <div
            data-aos-duration="1000"
            data-aos="zoom-in"
            class="third-place-column">

            <div style="width: 100%; height: 100%; display: flex;">

              <div style="width: 50%; height: 100%; background: #cd8254;"/>

              <div style="width: 50%; height: 100%; background: #c9632f"/>

            </div>

          </div>


        </div>


      </div>


      <div class="stairs">

        <div class="top"/>

        <div class="bottom">

          <div style="width: 30%; height: 100%; background: #464646;"/>

          <div style="width: 40%; height: 100%; background: #3c3c3c;"/>

          <div style="width: 30%; height: 100%; background: #212121;"/>

        </div>

      </div>


    </div>


  </div>
</template>

<script>
import AOS from 'aos';

import 'aos/dist/aos.css';


export default {
  name: 'PodiumPage',
  beforeMount() {
    AOS.init();
  },
  data() {
    return {
      results: this.getWinners()
    };
  },
  methods: {
    getWinners() {
      const allResult = this.$store.state.quizzes.results.results;
      let sortResult = [];
      for (let i = 0; i < allResult.length; i++) {
        sortResult.push(this.getTotalForOneResult(allResult[i]));
      }
      sortResult = sortResult.sort(function(a, b) {
        return b.total - a.total;
      });
      return sortResult;
    },
    getTotalForOneResult(result) {
      const eachResult = {name: result[0].displayName, total: 0};

      for (let i = 0; i < result.length; i++) {
        eachResult.total += result[i].score;
      }

      return eachResult;
    }
  }
};
</script>

<style lang="css" scoped>
  .body {

    position: absolute;

    width: 100%;

    height: 100%;

  }


  .podium {

    width: 100%;

    height: 100%;

    background-image: url("~assets/podium_bg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;

  }
  .stairs {

    width: 50%;

    margin: 0 auto;

    height: 50px;

    position: absolute;

    bottom: 0;

    left: 0;

    right: 0;

  }


  .top {

    width: 80%;

    height: 50%;

    margin: 0 auto;

    background: #5d5d5d;

  }


  .bottom {

    display: flex;

    width: 100%;

    height: 50%;

  }


  .colums {

    width: 40%;

    height: 100%;

    display: table-cell;

    vertical-align: bottom;

    margin: 0 auto;

    position: absolute;

    bottom: 0;

    left: 0;

    right: 0;

  }


  .second-place-wrapper {

    display: inline-block;

    width: 25%;

    height: 100%;

    margin-left: 10%;

  }


  .second-place-trophy-wrapper {

    width: 90px;

    height: 90px;

    border-radius: 50%;

    padding: 0.25em;

    border: 0.2em dotted grey;

    margin-top: 70%;

  }


  .second-place-trophy {

    width: 100%;

    height: 100%;

    border-radius: 80%;

    background: grey;
    display: table;

  }


  .second-place-icon {

    height: 50%;

    width: 100%;

    text-align: center;

    justify-content: center;

    align-items: center;

    display: flex;

  }


  .second-place-column {

    width: 100%;

    height: 50%;

  }


  .first-place-wrapper {

    display: inline-block;

    width: 30%;

    height: 100%;

  }


  .first-place-trophy-wrapper {

    width: 90px;

    height: 90px;

    border-radius: 50%;

    padding: 0.25em;

    border: 0.2em dotted yellow;

  }


  .first-place-trophy {

    width: 100%;

    height: 100%;

    border-radius: 50%;
    background: #ecb000;
    display: table;

  }


  .first-place-icon {

    height: 30%;

    width: 100%;

    text-align: center;

    justify-content: center;

    align-items: center;

    display: flex;

  }


  .first-place-column {

    width: 100%;

    height: 70%;

  }


  .third-place-wrapper {

    margin-right: 10%;

    display: inline-block;

    width: 25%;

    height: 100%;

  }


  .third-place-trophy-wrapper {

    width: 90px;

    height: 90px;

    border-radius: 50%;

    padding: 0.25em;

    border: 0.2em dotted red;

    margin-top: 110%;

  }


  .third-place-trophy {

    width: 100%;

    height: 100%;

    border-radius: 50%;

    background: #c9632f;
    display: table;

  }


  .third-place-icon {

    height: 60%;

    width: 100%;

    text-align: center;

    justify-content: center;

    align-items: center;

    display: flex;

  }


  .third-place-column {

    width: 100%;

    height: 40%;

  }
</style>
