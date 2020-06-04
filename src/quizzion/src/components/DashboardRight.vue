<template>
  <section v-if="currentQuiz"
           class="column justify-between"
           style="box-shadow: 10px 10px 10px rgba(0, 0.5, 0.5, 0.5);"
           :style="{background:currentQuiz.color}">
    <q-dialog v-model="showQrcode">
      <q-card>
        <q-card-section>
          <div class="text-h6">Let's play</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Scan our QR-code</q-card-section>
        <Qrcode :link="getQuizLink"></Qrcode>
      </q-card>
    </q-dialog>

    <div style="height: fit-content;">
      <div class="row">
        <h3 style="color: white; border-bottom: 1px solid black; width: fit-content;" class="col">{{ currentQuiz.title }}</h3>
        <q-icon @click="editQuiz" name="edit" size="2em" style="cursor : pointer;" color="white"/>
      </div>
      <p style="color: black; font-size: 1.5em; border-bottom: 1px solid white; width: fit-content;">{{ currentQuiz.description }}</p>
    </div>

    <div class="col-5">
      <div class="row justify-between">
        <p style="color:white; font-size: 2em;">Questions</p>

        <div>
          <q-btn
            unelevated
            dark
            dense
            style="background: transparent;"
            text-color="white"
            size="16px"
            @click="goToEdit"
            icon="edit"
          />
        </div>
      </div>

      <div
        style="margin-top: 1em;">
        <q-scroll-area
          style="width: 100%; height: 400px;">
          <ul style="list-style-type: none;">
            <li class="list-item">
              <p
                v-for="questionId in currentQuiz.questions"
                :key="questionId"
                style="font-size: 1.5em; color:black; margin-bottom: 1em;">
                {{ $store.getters['quizzes/getQuestionTitleById'](questionId) }}
              </p>
            </li>
          </ul>
        </q-scroll-area>
      </div>


    </div>

    <div class="theme-bubble q-mr-lg q-mb-md">
      <q-btn
        v-if="!currentQuiz.active"
        unelevated
        rounded
        color="white"
        style="padding: 0.4em;"
        text-color="black"
        label="Get link"
        @click="$store.commit('quizzes/activateQuiz', currentQuiz.id)"
      />
    </div>

    <div class="q-mt-lg" v-if="currentQuiz.active" style="display:flex;">

      <div style="display:inline-grid; width: 100%;">
        <q-btn
          class="col"
          unelevated
          rounded
          color="white"
          style="width: fit-content"
          text-color="black"
          :label="getQuizLink"
          @click="copyLink"/>

        <q-icon v-if="currentQuiz.active" @click="copyUrl" name="far fa-copy" class="q-mt-md " size="2em"
                style="cursor : pointer;" color="white"/>
      </div>

      <div
        class="theme-bubble q-mr-lg q-mb-md">

        <q-btn
          v-if="currentQuiz.active"
          unelevated
          rounded
          color="white"
          style="padding: 0.3em;"
          text-color="black"
          label="Start quiz"/>
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
        showQrcode: false,
      };
    },
    methods: {
      goToEdit() {
        this.$router.push(`quizzes/${this.currentQuiz.id}/questions`);
      },
      editQuiz() {
        this.$router.push(`quizzes/${this.currentQuiz.id}`);
      },
      copyLink() {
        this.showQrcode = true;
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
              label: 'Dismiss', color: 'white', handler: () => { /* ... */
              }
            }
          ]
        })
      }
    },

    computed: {
      getQuizLink() {
        return `${baseUrl}/quizzes/${this.currentQuiz.id}/invite`;
      }
    },
    props: {
      currentQuiz: {
        type: Object,
        required: false
      }
    }
  };
</script>


<style scoped>

  .theme-bubble {
    display: flex;
    justify-content: flex-end;
  }

</style>
