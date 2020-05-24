<template>
  <div q-pa-md>
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
    <div class="row main-layout q-pa-md">
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
                class="btn-add"
                padding="sm"
                color="grey"
                v-for="n in 1"
                icon="fas fa-plus"
                :key="n"
              >
                <div class="ex1"></div>
              </q-btn>
            </div>
          </div>
        </section>
      </div>
      <div class="col right q-pa-md" :style="{background:themeColor}">
        <section class="column justify-between">
          <div class="col">
            <div class="row">
              <q-input
                color="white"
                class="col add-name"
                dark
                borderless
                v-model="quizName"
                placeholder="Add Quiz's name"
              ></q-input>
              <i @click="alert=true" class="far fa-save fa-2x" />
            </div>
            <q-input
              v-model="quizDes"
              color="white"
              style="font-size: larger"
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
                  :color="colors[index]"
                  @click="themeColor=colors[index]"
                />
              </div>
              <div class="q-pt-lg">Or a logo from your organization?</div>
              <div class="q-pa-md theme-bubble" @click="$refs.file.click()">
                <q-btn size="xx-large" round color="white">
                  <i class="fas fa-upload fa-lg" style="color: black"></i>
                </q-btn>
              </div>
            </div>
          </div>
          <input type="file" ref="file" style="display: none" />
          <div class="q-pa-md theme-bubble">
            <q-btn
              to="/AddQuestions"
              color="white"
              icon-right="fas fa-arrow-right"
              rounded
              text-color="black"
              label="Let's add some questions!"
            ></q-btn>
          </div>
        </section>
      </div>
    </div>
  </div>
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
  method: {
    addQuiz: ()=>{
      console.out(this.quizName)
      console.out(this.quizDes)
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

.main-layout
  height: 100%
  position: fixed
  width: 100%

.fa-save
  color: white

.btn-add
  border: 2px solid black

.bg-brand
  background: #181C30
</style>
