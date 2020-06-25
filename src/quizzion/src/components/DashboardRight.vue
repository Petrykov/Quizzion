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
        style="color: white; font-size: 1.8em; width: fit-content;">
        {{currentQuiz.description }}
      </p>
    </div>

    <div style="display: inline-block;"
         class="questions-section">
      <div class="col-5" v-if="!currentQuiz.stored">
        <div class="row justify-between">
          <p style="color:white; font-size: 2em;" >Questions</p>

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
                  style="font-size: 1.5em; color:white; margin-bottom: 1em;">
                  {{(index+1) +") "+ $store.getters['quizzes/getQuestionTitleById'](questionId) }}
                </p>
              </li>
            </ul>
          </q-scroll-area>
        </div>
      </div>

      <UsersList v-if="currentQuiz.stored" :status="status"/>

      <div class="q-mt-md">
        <div class="q-pa-md theme-bubble">
          <q-btn
            v-if="!currentQuiz.stored"
            unelevated
            rounded
            color="white"
            text-color="black"
            label="Get link"
            @click="generateLink"
          />
        </div>

        <div class="row justify-between" v-if="currentQuiz.stored">

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
            v-if="quizStarted"
            @click="showResults"
            size="2.5em"
            style="cursor : pointer;"
            color="white">
            <q-tooltip
              content-class="bg-white"
              content-style="font-size: 1em; color: black; ">
              Quiz results
            </q-tooltip>
          </q-icon>

            <q-icon
              class="q-mr-lg"
              name="cancel_presentation"
              @click="cancelActiveQuiz"
              size="2.5em"
              style="cursor : pointer;"
              color="white">
              <q-tooltip
                content-class="bg-white"
                content-style="font-size: 1em; color: black; ">
                Cancel quiz
              </q-tooltip>
            </q-icon>

            <q-btn
              @click="startQuizMethod"
              unelevated
              rounded
              class="col-offset-2 col-2"
              color="white"
              text-color="black"
              :disable="quizStarted"
              :label="!quizStarted ? 'Start quiz' : 'Quiz started'"/>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Qrcode from './Qrcode';
import {copyToClipboard} from 'quasar';
import UsersList from './UsersList';
import config from './../config/config';

export default {
  components: {Qrcode, UsersList},
  data() {
    return {
      startQuiz: false,
      showQRcode: false,
      status: false,
      quizStarted: false,
      currentQuizBefore: {},
      users: []
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

    startQuizMethod() {
      if (!this.quizStarted) {
        this.$socket.client.emit('start');
        this.$store.dispatch('quizzes/activateQuiz', this.currentQuiz);
        this.quizStarted = true;
        this.status = true;
      }
    },

    triggerNotification() {
      this.$q.notify({
        type: 'positive',
        message: 'Copied link!',
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => {
            }
          }
        ]
      });
    },

    generateLink() {
      if (!this.currentQuiz.stored) {
        this.$store.dispatch('quizzes/startQuiz', this.currentQuiz.id);
        this.$socket.client.emit('connect-t', {quizId: this.currentQuiz.id});
      }
    },

    cancelActiveQuiz() {
      this.$socket.client.emit('stop');
      console.log('Sent via socket to STOP QUIZ');

      this.$store.dispatch('quizzes/deactivateQuiz', this.currentQuiz);

      this.quizStarted = false;
    },

    showResults() {
      this.$router.push(`result/moderator/${this.currentQuiz.id}`);
    }
  },

  computed: {
    getQuizLink() {
      return `${config.frontendPath}/quizzes/${this.currentQuiz.id}/invite`;
    }

  },

  beforeMount() {
    this.currentQuizBefore = this.currentQuiz;
    console.log('before mount ');
    console.warn(this.currentQuizBefore);
  },

  updated() {
    if (this.currentQuiz !== this.currentQuizBefore) {
      this.status = false;
      console.log('status is 0 now');
      this.currentQuizBefore = this.currentQuiz;
      this.quizStarted = false;
    }
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
