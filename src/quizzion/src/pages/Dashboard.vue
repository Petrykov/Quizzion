<template>
  <q-page class="layout">
    <!--    <q-btn @click="log">LOG</q-btn>-->
    <div class="row q-pa-md main-layout">
      <div class="col">

        <section class="column">
          <div style="margin-bottom:auto; margin-top:20%;"
               class="q-mb-lg">

            <div class="col q-mt-lg"
                 style="margin-left: auto; margin-right: auto; text-align: center;">
              <h2>Hi {{ currentUser.name }}</h2>
              <span style="font-size: 1.5em;">Welcome back to the gamespace, we missed you!</span>
            </div>

            <div class="col-8" style="margin: 0 auto; text-align: center;">
              <h3>Quizzes</h3>
              <div class="q-pl-md q-gutter-md q-gutter-y-md q-mt-lg">

                <q-btn
                  to="/"
                  v-for="(quizId) in currentUser.quizzes"
                  :key="quizId"
                  :color="quizObject(quizId).color"
                  class="quizzes button"
                  @click="themeColor=quizObject(quizId).color, selectedQuizId = quizId"
                />
                <!--                  @click="selectedQuizId = quizId"-->
                <!--                />-->

                <q-btn
                  to="/AddQuiz"
                  class="add button"
                  padding="sm"
                  color="grey"
                  icon="fas fa-plus"
                  @click="themeColor='teal'"
                >
                  <div class="ex1"></div>
                </q-btn>

              </div>
            </div>
          </div>
        </section>

      </div>

      <div :style="{background:themeColor}" class="col right q-pa-md">
        <section>
          <router-view :currentQuiz="quizObject(selectedQuizId)"
                       @add="addQuiz"
                       @changeTheme="changeTheme"/>
        </section>
      </div>

    </div>
  </q-page>
</template>
<script>

  export default {
    name: "Dashboard",

    components: {},
    data() {
      return {
        themeColor: '',
        selectedQuizId: '',
        leftDrawerOpen: false

      };
    },
    computed: {
      currentUser() {
        return this.$store.state.user;
      },
      quizObject() {
        return this.$store.getters['quizzes/getQuizById'];
      }
    },
    methods: {
      log() {
        console.log(this.$store)
      },
      addQuiz(quiz) {
        this.quizzes.push(quiz);
      },
      changeTheme(color) {
        this.themeColor = color
      },

    }
  };
</script>

<style lang="sass" scoped>
  .main-layout
    height: 100%
    position: fixed
    width: 100%

    .layout
      overflow: hidden

    .button
      border-radius: 10px
      height: 50px
      width: 50px
      text-align: center
      text-decoration: none
      display: inline-block

    section
      height: 100%

    .chosen
      border: 2px solid black

    .right
      border-radius: 17px
      padding: 2em

    router-view
      height: 100px
      position: absolute


</style>
