<template>
  <q-page class="layout ">
    <div class="row q-pa-md main-layout">
      <div class="col">

        <section class="column"
                 style="text-align: center; justify-content: center;align-items: center;display: flex;">

          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            style="display: inline-block;"
            class="q-mb-lg">

            <div class="col q-mt-lg"
                 style="text-align: center;">
              <h2>
                Hi {{ currentUser.name }}
              </h2>

              <span style="font-size: 1.5em;">
                Welcome back to the gamespace, we missed you!
              </span>
            </div>

            <div class="col-8" style="margin: 0 auto; text-align: center;">
              <h3>Quizzes</h3>
              <div class="q-pl-md q-gutter-md q-gutter-y-md q-mt-lg">

                <q-btn
                  to="/"
                  v-for="(quizId) in currentUser.quizzes"
                  :key="quizId"
                  :style="{'background-color':quizObject(quizId).color}"
                  class="quizzes button"
                  @click="selectQuiz(quizId)"
                />

                <q-btn
                  to="/AddQuiz"
                  class="add button"
                  padding="sm"
                  color="grey"
                  icon="fas fa-plus"
                  @click="themeColor='teal'"
                >
                  <div class="ex1"/>
                </q-btn>

              </div>
            </div>
          </div>
        </section>

      </div>

      <div class="col">
        <section>
          <router-view class="right" :currentQuiz="quizObject(selectedQuizId)"/>
        </section>
      </div>

    </div>
  </q-page>
</template>
<script>

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  export default {
    name: "Dashboard",

    components: {},

    data() {
      return {
        themeColor: '',
        selectedQuizId: '',
        leftDrawerOpen: false,
        copyLinkOpen: false
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
      selectQuiz(quizId) {
        this.selectedQuizId = quizId;
      }
    },

    beforeMount() {
      AOS.init();
      this.selectedQuizId = this.$store.state.user.quizzes[0];
    }
  };
</script>

<style lang="css" scoped>

  .main-layout {
    padding: 2em !important;
    height: 100%;
    position: fixed;
    width: 100%;
    background-image: url("~assets/bg_answer_screen.png");
  }

  .layout {
    overflow: hidden;
  }

  .button {
    border-radius: 10px;
    height: 50px;
    width: 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  section {
    height: 100%;
  }

  .right {
    border-radius: 2em;
    padding: 2em;
  }

  router-view {
    height: 100px;
    position: absolute;
  }


  @media screen and (max-width: 1200px) {
    .main-layout {
      display: block;
      position: inherit;
    }
  }

</style>
