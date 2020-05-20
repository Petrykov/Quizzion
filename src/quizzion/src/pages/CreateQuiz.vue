<template>
  <div q-pa-md>
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
                <div class="ex1">
                  
                </div>
              </q-btn>
            </div>
          </div>
        </section>
      </div>
      <div class="col right q-pa-md">
        <section class="column justify-between">
          <div class="col">
            <div class="row">
              <q-input
                color="white"
                class="col add-name"
                dark
                borderless
                placeholder="Add Quiz's name"
              ></q-input>
              <i class="far fa-save fa-2x" />
            </div>
            <q-input
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
              <div class="q-gutter-sm theme-bubble q-pt-md">
                <q-btn color="teal" round v-for="n in 5" :key="`sm-${n}`" />
              </div>
              <div class="q-pt-lg">Or a logo from your organization?</div>
              <div class="q-pa-md theme-bubble">
                <q-btn size="xx-large" round color="teal" icon="fas fa-upload fa-2x" />
              </div>
            </div>
          </div>
          <div class="q-pa-md theme-bubble add-btn">
            <q-btn
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

<style lang="sass" scoped>
.right
  background: #181C30
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

</style>