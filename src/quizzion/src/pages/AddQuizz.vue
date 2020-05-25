<template>
  <q-layout container style="" class="fullscreen shadow-2 rounded-borders">

    <div class="row q-pa-lg" style="">
      <q-page-container class="col q-pa-lg" style="">
        <p style="font-size:3em;">Quizz name</p>
        <div class="vertical-allignment" style="">

          <q-scroll-area
            class="scroll-area"
            style="height: 275px; max-width: 300px;">


            <p v-for="(btn,id) in questions" :key="id">
              <q-btn
                :outline="id!=selectedQuestion"
                rounded color="black"
                @click="onQuestionClick(id)">
                {{btn.name}}
              </q-btn>

              <q-icon
                name = "remove_circle_outline"
                color= "black"
                style = "cursor : pointer;"
                size = "2em"
                class = "q-ml-md q-mb-xs"
                @click = "deleteQuestion(id)"/>
            </p>

          </q-scroll-area>

          <q-icon
            name="add_circle_outline"
            color="green-7"
            style="cursor : pointer;"
            size="3em"
            class="q-mt-md"
            @click="addNewQuestion"/>


        </div>
      </q-page-container>

      <q-page-container
        v-if="questions.length"
        class="col q-pa-lg" style="background: #181c30; border-radius: 2em;">
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
            <div class="row" v-for="(answer, index) in questions[selectedQuestion].answers" :key="answer.id">
              <q-checkbox dark v-model="answer.isCorrect"/>
              <q-input  class="answer"
                        dense
                        style="color:grey;"
                        dark
                        v-model="answer.name">
              </q-input>

              <q-icon
                name = "clear"
                color= "red-7"
                class = "q-mt-md"
                style = "cursor : pointer;"
                size = "2em"
                @click="deleteAnswer(index)"/>

            </div>

              <form @submit.prevent>
                <div class="row insert_new">
                  <q-icon
                    name = "add_circle_outline"
                    color= "green-7"
                    style = "cursor : pointer;"
                    size = "2em"
                    class="addQuestionBtn"
                    @click="addAnswer(id)"/>
                    <q-input class="addQuestionTxt" style="color:grey;" label="Add new answer" v-model="newAnswer" dark></q-input>
                </div>
              </form>



          </div>

          <p class="paragraph" style="color:white; font-size:2em;">What about timer?</p>

          <div class="row">

            <q-icon
              name="timer"
              color="white"
              size="5em"
              class="q-mr-xs q-mt-md"/>

            <div class="row col">

              <q-btn v-for="(time, index) in ['5 sec', '10 sec', '15 sec', '30 sec', '1 min']"
                     v-bind:key="index"
                     rounded
                     dark
                     :outline="questions[selectedQuestion].time === time ? false : true"
                     :text-color="questions[selectedQuestion].time === time ? 'black' : 'white'"
                     :color="questions[selectedQuestion].time === time ? 'white' : 'none'"
                     class="col q-ml-md q-mr-md q-mt-lg q-mb-lg"
                     size="12px"
                     @click="changeTime(time)"
                     :label="time"/>

              <q-btn
                     rounded
                     dark
                     :outline="questions[selectedQuestion].time === 'infinity' ? false : true"
                     :text-color="questions[selectedQuestion].time === 'infinity' ? 'black' : 'white'"
                     :color="questions[selectedQuestion].time === 'infinity' ? 'white' : 'none'"
                     @click="changeTime('infinity')"
                     class="col q-ml-md q-mr-md q-mt-lg q-mb-lg"
                     size="12px"
                     icon="all_inclusive"/>

            </div>
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
                        time: '5 sec',
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
                        time: '',
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
                        time: '',
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
            onQuestionClick(id) {
                this.selectedQuestion = id;
            },

            changeTime(time) {
                this.questions[this.selectedQuestion].time = time;
            },

            addAnswer() {
                let q = this.questions[this.selectedQuestion].answers;
                q.push({
                    id: q[q.length - 1] + 1,
                    name: this.newAnswer,
                    isCorrect: false,
                });

                this.newAnswer = '';
            },

            addNewQuestion(){

              let questionId;

              if(this.questions.length === 0){
                questionId = 0
              }else{
                questionId = this.questions[this.selectedQuestion].answers[this.questions[this.selectedQuestion].answers.length-1]+1
              }

              this.questions.push({
                        id: questionId,
                        name: 'New question',
                        description: '',
                        time: {
                          unit: 'seconds',
                          value: 0
                        },

                        answers: []
                    })
            },

            deleteAnswer(index){
              this.questions[this.selectedQuestion].answers.splice(index, 1);
            },

            deleteQuestion(index){
              // console.log('inside: ' + index);
              this.questions.splice(index, 1);
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

  .scroll-area {
    border: 0.12em solid #d8d8d8;
    border-radius: 8px;
    margin: 0 auto;
  }

  .questionInput {
    font-size: 1.5em;
    color: white;
  }

  .paragraph {
    margin-top: 2em;
  }

  .editBtn {
    margin-top: 2em;
    margin-left: 1em;
  }

  .answer {
    margin-left: 1em;
    /* margin-top: 1em; */
  }

  .addQuestionBtn {
    margin-top: 0.5em;
    margin-left: 0.25em;
  }

  .addQuestionTxt {
    margin-left: 1.2em;
  }

  .q-checkbox__bg {
    border-radius: 10px;
  }

  .insert_new {
    margin-top: 1em;
  }

</style>
