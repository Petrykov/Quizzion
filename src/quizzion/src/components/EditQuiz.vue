<template>
  <section class="column justify-between">
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Saved</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Your work has been saved sucessfully!</q-card-section>
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
        <i class="far fa-save fa-2x" @click="saveQuiz" />
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
    <div class="col-8">
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
    saveQuiz: function() {
      var quizId = this.currentQuiz.id;
      var updateQuiz = {
        name: this.quizName,
        description: this.quizDes,
        color: this.themeColor,
        questions: [],
        id: quizId
      };
      this.$emit("edit", updateQuiz);
      this.alert = true;
    }
  },
  computed: {
    selectedQuiz() {
      return this.currentQuiz;
    }
  },
    props: {
    currentQuiz: {
      type: String,
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

.fa-save
    color: white

.btn-add
    border: 2px solid black

.bg-brand
    background: #181C30
</style>