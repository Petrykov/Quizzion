<template>
  <q-layout container style="" class="fullscreen shadow-2 rounded-borders">

    <div class="row q-pa-lg" style="">
      <q-page-container class="col q-pa-lg" style="">
        <p style="font-size:3em;">Quizz name</p>
        <div class="vertical-allignment" style="">

          <p v-for="(btn,id) in questions"
             :key="id">
            <q-btn
              :outline="id == selectedQuestion ? false : true"
              rounded color="black"
              @click="onQustionClick(id)">
              {{btn.name}}
            </q-btn>
          </p>
        </div>
      </q-page-container>

      <q-page-container class="col q-pa-lg" style="background: #181c30; border-radius: 2em;">
        <q-page padding>

          <q-input class="questionInput" dark v-model="questions[selectedQuestion].name" color="grey-12" label="Question's title"
                   label-color="grey"/>

          <q-input
            dark
            v-model="questions[selectedQuestion].description"
            filled
            autogrow
            label="Question description"
            class="q-mt-md"
            color="grey"
          />

          <p class="paragraph" style="color:white; font-size:2em;">The answers?</p>

          <div class="col">
            <div class="row" v-for="answer in questions[selectedQuestion].answers" :key="answer.id">
              <q-checkbox dark v-model="answer.isCorrect"/>
              <p class="answer" style="color:grey;">{{answer.name}}</p>
            </div>

            <div class="row">
              <q-icon 
                name = "add_circle_outline"
                color= "green-7"
                style = "cursor : pointer;"
                size = "2em"
                class="addQuestionBtn"/>

                <p class="addQuestionTxt" style="color:grey;">add answer</p>
            </div>
          </div>

          <p class="paragraph" style="color:white; font-size:2em;">What about timer?</p>

          <q-icon 
              name = "timer"
              color= "white"
              style = "cursor : pointer;"
              size = "5em"
              class="q-mr-xs"/>

        </q-page>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
    export default {
        data() {
            return {
                val: true,

                selectedQuestion: 0,

                questions: [
                    {
                        id: 1,
                        name: 'Question title 1',
                        description: 'Description for the first question',
                        active: true,
                        answers: [
                            {
                                id: 1,
                                name: "Answer 1",
                                isCorrect: false,
                            },
                            {
                                id: 2,
                                name: "Answer 2",
                                isCorrect: true,
                            },
                            {
                                id: 3,
                                name: "Answer 3",
                                isCorrect: false,
                            }
                        ]
                    }, {
                        id: 2,
                        name: 'Question title 2',
                        description: 'Description for the second question',
                        active: false,
                        answers: [
                            {
                                id: 1,
                                name: "Answer 1-2",
                                isCorrect: false,
                            },
                            {
                                id: 2,
                                name: "Answer 2-2",
                                isCorrect: false,
                            },
                            {
                                id: 3,
                                name: "Answer 3-2",
                                isCorrect: true,
                            }
                        ]
                    }, {
                        id: 3,
                        name: 'Question title 3',
                        description: 'Description for third question',
                        active: false,
                        answers: [
                            {
                                id: 1,
                                name: "Answer 1-3",
                                isCorrect: true,
                            },
                            {
                                id: 2,
                                name: "Answer 2-3",
                                isCorrect: false,
                            },
                            {
                                id: 3,
                                name: "Answer 3-3",
                                isCorrect: false,
                            }
                        ]
                    }
                ]
            }
        },

        methods: {
            onQustionClick(id) {

                this.selectedQuestion = id;

                // this.quesitonDetails.title = this.questionButtons[id].name;

                // this.questionButtons.map(btn => btn.active = false);
                // this.questionButtons[id].active = true;
            },
        }
    }
</script>

<style scoped>
  p {
    margin: 15px 0;
  }

  .vertical-allignment {
    text-align: center;
    position: relative;
    top: 30%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .questionInput {
    font-size: 1.5em;
    color: white;
  }

  .paragraph {
    margin-top: 2em;
  }

  .addQuestionBtn{
    margin-top: 0.5em;
    margin-left: 0.25em;
  }

  .addQuestionTxt{
    margin-left: 0.7em;
  }

  .answer {
    margin-top: 1em;
  }

  .q-checkbox__bg {
    border-radius: 10px;
  }

</style>
