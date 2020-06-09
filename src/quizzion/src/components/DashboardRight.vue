<template>
  <section v-if="currentQuiz"
           data-aos="zoom-in"
           data-aos-duration="1500"
           class="column justify-between question-section"
           style="box-shadow: 10px 10px 30px rgba(0, 0.5, 0.5, 0.5);"
           :style="{background:currentQuiz.color}">

    <q-dialog v-model="showQRcode">
      <q-card>
        <q-card-section>
          <div class="text-h6">Let's play</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Scan our QR-code</q-card-section>
        <Qrcode :link="getQuizLink"></Qrcode>
      </q-card>
    </q-dialog>

    <div
      style="height: fit-content;">

      <div
        class="row">

        <h3 style="color: white; width: fit-content;"
            class="col reduce">{{ currentQuiz.title }}
        </h3>

        <q-icon
          @click="editQuiz"
          name="edit"
          size="2em"
          style="cursor : pointer;"
          color="white"/>
      </div>

      <p
        class="question-description"
        style="color: black; font-size: 1.8em; width: fit-content;">
        {{currentQuiz.description }}
      </p>
    </div>

    <div style="display: inline-block;"
         class="questions-section">
      <div class="col-5">
        <div class="row justify-between">
          <p style="color:white; font-size: 2em;">Questions</p>

          <div>
            <q-icon
              name="edit" size="2em" style="cursor : pointer;" color="white"
              @click="goToEdit"
            />
          </div>
        </div>

        <div
          style="margin-top: 1em;">
          <q-scroll-area
            class="questions-scroll-area">
            <ul class="questions-ul" style="list-style-type: none;">
              <li class="list-item">
                <p
                  v-for="(questionId, index) in currentQuiz.questions"
                  :key="questionId"
                  style="font-size: 1.5em; color:black; margin-bottom: 1em;">
                  {{(index+1) +") "+ $store.getters['quizzes/getQuestionTitleById'](questionId) }}
                </p>
              </li>
            </ul>
          </q-scroll-area>
        </div>
      </div>

      <div class="q-mt-md">
        <div class="q-pa-md theme-bubble">
          <q-btn
            v-if="!currentQuiz.active"
            unelevated
            rounded
            color="white"
            text-color="black"
            label="Get link"
            @click="$store.commit('quizzes/activateQuiz', currentQuiz.id)"
          />
        </div>

        <div class="row justify-between" v-if="currentQuiz.active">

          <div>
            <q-icon
              @click="showQRcode=true"
              name="fas fa-qrcode"
              size="2.5em"
              style="cursor : pointer;"
              color="white">
              <q-tooltip
                content-class="bg-white"
                content-style="font-size: 1em; color: black; ">
                show QR
              </q-tooltip>
            </q-icon>

            <q-icon
              class="q-ml-lg"
              @click="copyUrl"
              name="far fa-copy"
              size="2.5em"
              style="cursor : pointer;"
              color="white">
              <q-tooltip
                content-class="bg-white"
                content-style="font-size: 1em; color: black; ">
                Copy link
              </q-tooltip>
            </q-icon>

          </div>

          <div>
            <q-icon
              class="q-mr-lg"
              name="fas fa-trophy"
              @click="$router.push(`result/moderator/${currentQuiz.id}`)"
              size="2.5em"
              style="cursor : pointer;"
              color="white">
              <q-tooltip
                content-class="bg-white"
                content-style="font-size: 1em; color: black; ">
                Quiz results
              </q-tooltip>
            </q-icon>

            <q-btn
              unelevated
              rounded
              class="col-offset-2 col-2"
              color="white"
              text-color="black"
              label="Start quiz"/>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import Qrcode from "./Qrcode";
  import {copyToClipboard} from 'quasar';

  // var baseUrl = "http://mark-developer.com:555/#"
  var baseUrl = "http://localhost:8080/#";

  export default {
    components: {Qrcode},
    data() {
      return {
        startQuiz: false,
        showQRcode: false,
      };
    },

    methods: {
      goToEdit() {
        this.$router.push(`quizzes/${this.currentQuiz.id}/questions`);
      },
      editQuiz() {
        this.$router.push(`quizzes/${this.currentQuiz.id}`);
      },


      copyUrl() {
        copyToClipboard(this.getQuizLink);
        this.triggerNotification();
      },

      triggerNotification() {
        this.$q.notify({
          type: 'positive',
          message: `Copied link!`,
          actions: [
            {
              label: 'Dismiss', color: 'white', handler: () => {
              }
            }
          ]
        })
      }
    },

    computed: {
      getQuizLink() {
        return `${baseUrl}/quizzes/${this.currentQuiz.id}/invite`;
      },

    },

    props: {
      currentQuiz: {
        type: Object,
        required: true
      }
    }
  };
</script>


<style scoped>

  .theme-bubble {
    display: flex;
    justify-content: flex-end;
  }

  .reduce {
    margin-bottom: 0.5em !important;
  }

  .questions-scroll-area {
    width: 100%;
    height: 400px;
  }

  @media screen and (max-width: 1200px) {
    .question-section {
      width: 80%;
      margin: 0 auto;
    }

    .reduce {
      font-size: 3em;
    }

    .question-description {
      font-size: 1.5em;
    }

    .questions-section {
      margin-top: 3em;
    }

    .questions-ul {
      padding-left: 20px !important;
    }

  }

  @media screen and (max-width: 600px) {
    .question-section {
      width: 100%;
    }

    .questions-scroll-area {
      height: 200px;
    }
  }

</style>
