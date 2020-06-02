<template>
  <section v-if="currentQuiz" class="column justify-between" :style="{background:currentQuiz.color}">
    <q-dialog v-model="showQrcode">
      <q-card>
        <q-card-section>
          <div class="text-h6">Let's play</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Scan our QR-code</q-card-section>
        <Qrcode :link="getQuizLink"></Qrcode>
      </q-card>
    </q-dialog>

    <div class="col">
      <div class="row">
        <h3 style="color: black" class="col">{{ currentQuiz.title }}</h3>

        <q-icon @click="editQuiz" name="edit" size="2em" style="cursor : pointer;" color="white" />
      </div>
      <p style="color: white; font-size: 1.5em;">{{ currentQuiz.description }}</p>
    </div>

    <div class="col-5">
      <div class="row justify-between">
        <span style="color:black; font-size: 2em;">Questions</span>

        <div to="/edit">
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

      <ul
        style="list-style-type: none;"
        v-for="questionId in currentQuiz.questions"
        :key="questionId"
      >
        <li>
          <p
            style="font-size: 1.5em; color:white;"
          >{{ $store.getters['quizzes/getQuestionTitleById'](questionId) }}</p>
        </li>
      </ul>
    </div>

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
    <div class="q-pa-md theme-bubble" v-if="currentQuiz.active">
      <q-btn
        unelevated
        rounded
        color="white"
        text-color="black"
        :label="getQuizLink"
        @click="copyLink"
      ></q-btn>
    </div>
    <div v-if="currentQuiz.active" class="q-pa-md theme-bubble">
      <q-btn unelevated rounded color="white" text-color="black" label="Start quiz" />
    </div>
  </section>
</template>

<script>
import Qrcode from "./Qrcode";

var baseUrl = "http://mark-developer.com:555/#"

export default {
  components: { Qrcode },
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
      required : false
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
