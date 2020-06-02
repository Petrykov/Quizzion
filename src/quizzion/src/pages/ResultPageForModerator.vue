<template>
  <q-page class="flex-center fullscreen" :style="quiz">
    <div class="row flex flex-center">
      <h2 class="text-h2" style="border:  #9C27B0;color: white">{{quiz.name}}</h2>
    </div>
    <div class="row flex flex-center text-center">
      <table>
        <tr class="text-h5" style="border:  #9C27B0;color: white">Participants: {{quiz.participants}}</tr>
        <tr class="text-h5" style="border:  #9C27B0;color: white">Result</tr>
      </table>
    </div>
    <div  style="background-color: white;border-radius: 15px 15px 15px 15px;width:100%;margin-left: 5%;margin-right: 5%;width: 90%">
      <table style="width: 100%">
        <tr>
          <th style="width:5%">No</th>
          <th style="width:90%;">Player</th>
          <th style="width:20%">Score</th>
        </tr></table>
      <q-scroll-area style="height: 700px;">
                  <q-list style="width:100%">
                    <table width="100%">
                      <tr v-for="user in quiz.users" v-bind:key="user.number">
                        <td style="width:5%">
                          <div class=" flex flex-center">{{user.number}}</div>
                        </td>
                        <td style="width:90%">
                          <q-expansion-item switch-toggle-side
                                            expand-separator
                                            :label="user.username">
                            <div class="row" style="background-color:beige">
                              <div class="flex flex-center text-weight-bold" label="questions" style="align-items: center">Questions

                              </div>
                              <ul class="text-center" v-for="item in user.result" v-bind:key="item.question_number">
                                <div class="col-1" style="width:20px;">
                                  <div class="flex flex-center">
                                    <a class="text-weight-20" style="size: 30px">{{item.question_number}}</a>
                                  </div>
                                  <q-icon  name="check_circle" class="flex flex-center" v-model="item.isCorrect" :color="isCorrectIconColor(item.isCorrect)" size="20px"/>
                                  <div class="flex flex-center">{{item.score}}</div>
                                </div>
                              </ul>
                            </div>
                          </q-expansion-item>
                        </td>
                        <td style="width:20%">
                          <div class=" flex flex-center">{{user.totalScore}}</div>
                        </td>
                      </tr>
                    </table>
                  </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: "ResultPageForModerator",
    methods: {
      isCorrectIcon:function(isCorrect){
        if(!isCorrect){
          return ""
        }
        return "check_circle"
      },
      isCorrectIconColor: function (isCorrect) {
        if (!isCorrect) {
          return "red"
        }
        return "green"
      }
    },
    data() {
      return {
        quiz: {
          name: "Pub quiz",
          participants: 2,
          backgroundColor: "#9C27B0",
          users: [
            {
              number: 1,
              username: "Victor",
              totalScore: 100,
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 5,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 6,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 7,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
            {
              number: 2,
              username: "Vlad",
              result: [
                {
                  question_number: 1,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 2,
                  isCorrect: false,
                  score: 0
                },
                {
                  question_number: 3,
                  isCorrect: true,
                  score: 10
                },
                {
                  question_number: 4,
                  isCorrect: true,
                  score: 10
                }
              ]
            },
          ]
        },
      }}}
</script>
