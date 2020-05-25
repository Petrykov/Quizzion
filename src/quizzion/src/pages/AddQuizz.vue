<template>
  <q-layout container style="" class="fullscreen shadow-2 rounded-borders">

    <div class="row q-pa-lg" style="">
      <q-page-container class="col q-pa-lg" style="">
        <p style="font-size:3em;">Quizz name</p>
        <div class="vertical-allignment" style="">

          <q-scroll-area
                class ="scroll-area"
                :thumb-style="thumbStyle"
                :content-style="contentStyle"
                :content-active-style="contentActiveStyle"
                style="height: 200px; max-width: 300px;">

            <p v-for="(btn,id) in questions" :key="id">
              <q-btn
                :outline="id == selectedQuestion ? false : true"
                rounded color="black"
                @click="onQustionClick(id)">
                  {{btn.name}}
              </q-btn>
            </p>

          </q-scroll-area>
          
          <q-icon 
                name = "add_circle_outline"
                color= "green-7"
                style = "cursor : pointer;"
                size = "3em"
                class = "q-mt-md"
                @click = "addNewQuestion"/>
              

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
              <q-input  class="answer" 
                        dense
                        style="color:grey;"   
                        dark 
                        v-model="answer.name">

              </q-input>
            </div>

            <div class="row insert_new">
              <q-icon 
                name = "add_circle_outline"
                color= "green-7"
                style = "cursor : pointer;"
                size = "2em"
                class="addQuestionBtn"
                @click="addAnswer"/>

                <q-input class="addQuestionTxt" style="color:grey;" dense label="Add new answer" v-model="newAnswer" dark></q-input>
            </div>
          </div>

          <p class="paragraph" style="color:white; font-size:2em;">What about timer?</p>

        <div class="row"> 
          <q-icon 
              name = "timer"
              color= "white"
              style = "cursor : pointer;"
              size = "5em"
              class="q-mr-xs"/>

              <q-input dark class="q-ml-lg" v-model="questions[selectedQuestion].time.value" label="Set a time for a question">

              </q-input>

              <q-btn-dropdown size="10px" style="padding-left: 0.5em; font-size: 15px;" dense class="q-ml-lg" color="primary" :label="questions[selectedQuestion].time.unit">
                <q-list>
                  <q-item clickable v-close-popup
                  @click="changeUnit('Minutes')">
                    <q-item-section>
                      <q-item-label>Minutes</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup
                  @click="changeUnit('Seconds')">
                    <q-item-section>
                      <q-item-label>Seconds</q-item-label>
                    </q-item-section>
                  </q-item>

                </q-list>
              </q-btn-dropdown>
          </div>

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

                newAnswer: '',

                questions: [
                    {
                        id: 1,
                        name: 'Question title 1',
                        description: 'Description for the first question',
                        active: true,
                        time: {
                          unit: 'minutes',
                          value: 0
                        },

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
                        time: {
                          unit: 'minutes',
                          value: 0
                        },

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
                        time: {
                          unit: 'minutes',
                          value: 0
                        },

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
            },

            addAnswer(){
              let q = this.questions[this.selectedQuestion].answers;
                q.push({
                                id: q[q.length - 1] + 1,
                                name: this.newAnswer,
                                isCorrect: false,
                            });

                            this.newAnswer = '';
            },

            changeUnit(type){
                console.log('inside');
                this.questions[this.selectedQuestion].time.unit = type;
            },

            addNewQuestion(){
              this.questions.push({
                        id: this.questions[this.selectedQuestion].answers[this.questions[this.selectedQuestion].answers.length-1]+1,
                        name: 'New question',
                        description: '',
                        active: false,
                        time: {
                          unit: 'seconds',
                          value: 0
                        },

                        answers: [
                            
                        ]
                    })
            }
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

  .scroll-area{
    border: 1px solid black;
    border-radius: 5px;
    background: #d1d1e0;
    margin: 0 auto;
  }

  .questionInput {
    font-size: 1.5em;
    color: white;
  }

  .paragraph {
    margin-top: 2em;
  }

  .editBtn{
    margin-top: 2em;
    margin-left: 1em;
  }

  .answer{
    margin-left: 1em;
    /* margin-top: 1em; */
  }

  .addQuestionBtn{
    margin-top: 0.5em;
    margin-left: 0.25em;
  }

  .addQuestionTxt{
    margin-left: 1.2em;
  }

  .q-checkbox__bg {
    border-radius: 10px;
  }

  .insert_new{
    margin-top: 1em;
  }

</style>
