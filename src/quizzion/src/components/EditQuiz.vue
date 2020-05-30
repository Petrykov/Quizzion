<template>
  <section class="column justify-between">
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete?</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Are you sure you want to delete this quiz?</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="col">
      <div class="row">
        <q-input
          color="white"
          class="col add-name"
          dark
          type="textarea"
          borderless
          v-model="quizName"
          :placeholder="selectedQuiz.title"
        ></q-input>
        <i class="far fa-trash-alt fa-2x" @click="deleteQuiz" />
      </div>
      <q-input
        color="white"
        type="textarea"
        style="font-size: larger"
        dark
        borderless
        v-model="quizDes"
        :placeholder="selectedQuiz.description"
      ></q-input>
    </div>
    <div class="col-7">
      <div class="instruction">
        <div>Be creative! Choose a theme for your quiz</div>
        <div class="q-gutter-xl theme-bubble q-pt-md">
          <q-btn
            style="border: 2px solid white"
            size="large"
            round
            v-for="(n,index) in colors"
            :key="`sm-${n}`"
            :color="colors[index]"
            @click="$emit('changeTheme',themeColor=colors[index])"
          />
        </div>
        <div class="q-pt-lg">Or a logo from your organization?</div>
        <div class="q-pa-md theme-bubble">
          <q-btn size="xx-large" round color="white" @click="$refs.file.click()">
            <i class="fas fa-upload fa-lg" style="color: black">
              <input type="file" ref="file" style="display: none" />
            </i>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="q-pa-md theme-bubble">
      <q-btn color="white" rounded text-color="black" label="Save" @click="saveQuiz" to="/"></q-btn>
    </div>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      colors: ["teal", "purple", "brand", "orange", "red"],
      quizDes: null,
      quizName: null,
      alert: false,
      themeColor: "teal"
    };
  },
  methods: {
    deleteQuiz: function() {
      this.alert = true;
    },
    saveQuiz: function() {
      this.$store.dispatch("quizzes/updateQuiz", {
        id: this.selectedQuiz.quizId,
        updatedQuiz: {
          id: this.selectedQuiz.id,
          title: this.quizName,
          description: this.quizDes,
          color: this.themeColor,
          questions: [],
        }
      });
      // this.$emit("edit", updateQuiz);
    }
  },
  computed: {
    selectedQuiz() {
      return this.currentQuiz;
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

<style lang="sass" scoped>
.right
  border-radius: 17px

.welcome
  font-size: larger

.add-name
  font-size: xx-large

.instruction
  font-size: large
  color: white

.theme-bubble
  display: flex
  justify-content: center

.them-bubble-item
  border: 1px solid white
section
  height: 100%

.fa-trash-alt
  color: white

.btn-add
  border: 2px solid black

.bg-brand
  background: #181C30
</style>