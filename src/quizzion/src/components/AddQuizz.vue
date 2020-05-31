<template>
  <section class="column justify-between" :style="{'background':themeColor}">
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Saved</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Your work has been saved successfully!</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup to="/" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="col">
      <div class="row">
        <q-input
          style="background-color: transparent"
          class="col add-name"
          dark
          borderless
          v-model="quizName"
          placeholder="Add Quiz's name"
        ></q-input>
        <i class="far fa-save fa-2x" @click="addQuiz" />
      </div>
      <q-input
        v-model="quizDes"
        color="white"
        style="font-size: larger; background-color: transparent"
        dark
        borderless
        placeholder="add quiz's description"
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
            :style="{'background-color':colors[index]}"
            @click="themeColor=colors[index]"
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
      <q-btn
        to="/addQuiz"
        color="white"
        icon-right="fas fa-arrow-right"
        rounded
        text-color="black"
        label="Let's add some questions!"
        @click="toAddQuestions"
      ></q-btn>
    </div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data: () => {
    return {
      colors: ["#008080", "#800080", "#006600", "#ffa500", "#990000"],
      quizDes: "",
      quizName: null,
      alert: false,
      themeColor: "teal"
    };
  },
  methods: {
    addQuiz: function() {
      let assignedId = uuidv4()
      console.log(assignedId);
      var newQuiz = {
        title: this.quizName,
        description: this.quizDes,
        color: this.themeColor,
        questions: [],
        id: assignedId,
        logo: "",
        active: false
      };
      this.$store.commit("quizzes/createQuiz", newQuiz);
      this.$store.commit("user/createQuiz", assignedId);
      this.alert = true
    },
    toAddQuestions() {
      this.addQuiz();
      // this.$router.push(`quizzes/${assignedId}/questions`);
    },
  },

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
