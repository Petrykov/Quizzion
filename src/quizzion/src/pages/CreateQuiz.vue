<template>
  <!-- <q-page class="flex flex-center"> -->
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <div class="container">
          <h2>Hi Quiz Master</h2>
          <span>Welcome back to the gamespace,we missed you!</span>
          <h6>Quizzes</h6>
          <q-btn class="custom-button" icon="fas fa-plus"></q-btn>
        </div>
      </div>
      <div class="col right" style="border-radius:25px">
        <section>
          <h4>Add quiz's name</h4>
          <i class="far fa-save fa-2x" />
          <span class="quiz-des">add quiz's description</span>
        </section>
        <section class="quiz-instruction">
          <div>
            <span>Be creative! Choose a theme for your question</span>
          </div>
          <div style="margin-top: 20px">
            <q-btn class="theme-bubble"></q-btn>
            <q-btn class="theme-bubble"></q-btn>
            <q-btn class="theme-bubble"></q-btn>
            <q-btn class="theme-bubble"></q-btn>
            <q-btn class="theme-bubble"></q-btn>
          </div>
          <div style="margin-top: 20px">
            <span>Or a logo from your company?</span>
            <br />
            <q-btn class="upload-logo">
              <i class="fas fa-upload fa-2x" style="color: black"></i>
            </q-btn>
            <div class="btn-add-question">
              <q-btn
                color="white"
                icon-right="fas fa-arrow-right"
                rounded
                text-color="black"
                label="Let's add some questions!"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateQuizPage"
};
</script>
<style lang="sass" scoped>
.row
  height: 95%
  position: fixed
  width: 100%

.row > div
  padding: 10px 15px
  width: 50%

.right
  background: #181C30
  margin-right: 3%

.custom-button
  background: rgba(105, 104, 104, 0.3)
  width: 50px
  height: 50px

.row + .row
  margin-top: 1rem

.fa-save
  color: white
  position: absolute
  right: 4%
  top: 4%

.quiz-des
  color: rgba(255, 255, 255, 0.45)

.quiz-instruction
  color: white
  font-size: larger
  display: block

.theme-bubble
  border-radius: 50%
  background: green
  height: 50px
  width: 50px
  margin-left: 6%

section
  margin-top: 20px

.upload-logo
  border-radius: 50%
  background: white
  height: 80px
  width: 80px
  margin-top: 5%
  left: 40%

.btn-add-question
  position: absolute
  bottom: 10%
  align: center
  right: 15%
h4
  color: rgba(255, 255, 255, 0.45)
</style>