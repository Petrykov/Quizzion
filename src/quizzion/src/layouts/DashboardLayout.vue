<template>
  <q-layout class="layout">
    <div class="row q-pa-md main-layout">
      <div class="col">
        <section class="column justify-center q-pl-sm">
          <div class="col">
            <h2>Hi Quiz Master</h2>
            <span class="welcome">Welcome back to the gamespace, we missed you!</span>
          </div>
          <div class="col-8">
            <h6>Quizzes</h6>
            <div class="q-pl-md q-gutter-md q-gutter-y-md">
              <q-btn
                to="/"
                v-for="(quiz, index) in quizzes"
                :key="quiz.id"
                :color="quizzes[index].color"
                class="quizzes button"
                @click="themeColor=quizzes[index].color"
              ></q-btn>
              <q-btn
                to="/AddQuiz"
                class="add button"
                padding="sm"
                color="grey"
                v-for="n in 1"
                icon="fas fa-plus"
                :key="n"
                @click="themeColor='teal'"
              >
                <div class="ex1"></div>
              </q-btn>
            </div>
          </div>
        </section>
      </div>
      <div :style="{background:themeColor}" class="col right q-pa-md">
        <section>
          <router-view/>
        </section>
      </div>
    </div>
  </q-layout>
</template>
<script>
export default {
  name: "CustomziedLayout",

  components: {
    // EssentialLink
  },
  data() {
    return {
      themeColor: "teal",
      quizzes: [
        {
          id: 0,
          name: "Pub quiz 0",
          description:
            " Description quiz 0 Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "teal"
        },
        {
          id: 1,
          name: "Pub quiz 1",
          description:
            "Description quiz 1 Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "blue"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        }
      ],
      pos: 0
    };
  },
  methods: {
    getIndex(position) {
      console.log(position);
      return (this.pos = position);
    }
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

router-view
  height: 100px
  position: absolute
</style>