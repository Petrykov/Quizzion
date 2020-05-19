<template>
  <q-page>
    <div class="row window-height items-center">
      <div class="left-half col-xs-12 col-sm-6">
        <h3>{{ currentQuestion.title}}</h3>
          <h5> {{currentQuestion.description}} </h5>
          <img
            alt="Quasar logo"
            src="~assets/quasar-logo-full.svg"
          >
      </div>
        <div class="right-half col-xs-12 col-sm-6">
          <p>A: Quasar</p>
          <p>B: JavaScript</p>
          <p>C: VueJS</p>
          <p>D: C++</p>
        </div>
      </div>
  </q-page>
</template>

<script>
  export default {
    name: "AnswerForm",

    data() {
      return {
        currentQuestion: {
          title: 'What is this framework\'s name?',
          description: 'Hint: its in the pic'
        }
      }
    }
  }
</script>

<style scoped>
  * { padding: 0; margin: 0; }

  .left-half{

  }

  .right-half {
    padding-top: 10%;
    padding-bottom: 10%;
    background: #522785;
    border-radius: 15px;
    text-align: center;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    padding: 3%;
    background: white;
    width: 85%;
    display: inline-table;
    margin: 2%;
    border-radius: 5px;
    /*text-align: left;*/
  }
</style>
