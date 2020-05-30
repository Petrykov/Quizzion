<template>
  <section class="column justify-between">
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
        v-if="!startQuiz"
        unelevated
        rounded
        color="white"
        text-color="black"
        label="Get link"
        @click="startQuiz=true"

      />
    </div>
    <div class="q-pa-md theme-bubble" v-if="startQuiz && currentQuiz.active">
      <q-btn
        unelevated
        rounded
        color="white"
        text-color="black"
        :label="getQuizLink"
        @click="copyLink"
      />
    </div>
    <div class="q-pa-md theme-bubble">
      <q-btn
        v-if="startQuiz"
        unelevated
        rounded
        color="white"
        text-color="black"
        label="Start quiz"
        @click="currentQuiz.active = true"
      />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quizLink: "Get link",
      startQuiz: false,
      showLink: false

    };
  },
  methods: {
    goToEdit() {
      this.$router.push(`questions/${this.currentQuiz.id}`);
    },
    editQuiz() {
      this.$router.push(`quizzes/${this.currentQuiz.id}`);
    },
    copyLink() {

    }
  },
  beforeCreate() {
    startQuiz = false;
  },
  computed: {
    getQuizLink() {
      return `http://localhost:8080/${this.currentQuiz.id}/answer`;
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
</style>
