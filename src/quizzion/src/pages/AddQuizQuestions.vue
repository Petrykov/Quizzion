l<template>
  <q-page container style class="shadow-2 rounded-borders">
    <div class="row q-pa-lg" style>
      <q-page-container class="col q-pa-lg" style="text-align: center;">
        <p class="q-mt-md" style="font-size:3em;">{{ currentQuiz.title }}</p>
        <div class="vertical-allignment" style>
          <q-scroll-area class="scroll-area" style="height: 275px; max-width: 300px;">
            <div>
              <p
                v-for="(questionId) in currentQuiz.questions"
                :key="questionId"
                style="margin-top: 2em"
              >
                <q-btn
                  :outline="questionId != selectedQuestionId"
                  rounded
                  color="black"
                  @click="onQuestionClick(questionId)"
                >{{ questionTitle(questionId) }}</q-btn>

                <q-icon
                  name="remove_circle_outline"
                  color="black"
                  style="cursor : pointer;"
                  size="2em"
                  class="q-ml-md q-mb-xs"
                />
              </p>
            </div>
          </q-scroll-area>

          <q-icon
            name="add_circle_outline"
            color="green-7"
            style="cursor : pointer;"
            size="3em"
            class="q-mt-md"
          />
        </div>
      </q-page-container>

      <q-page-container
        class="col q-pa-lg"
        style="background: #181c30; border-radius: 2em;"
        v-if="selectedQuestion"
      >
        <q-page padding>
          <q-input
            class="questionInput"
            dark
            color="grey-12"
            label="Question's title"
            v-model="selectedQuestion.title"
            label-color="grey"
          />

          <q-input dark filled autogrow label="Question description" class="q-mt-md" color="grey" />

          <p class="paragraph" style="color:white; font-size:2em;">The answers?</p>

          <div class="col">
            <div v-for="(answer) in answers" :key="answer.id" class="row">
              <q-checkbox v-model="answer.correct" dark />

              <q-input class="answer" dense style="color:grey;" v-model="answer.label" dark />

              <q-icon
                name="clear"
                color="red-7"
                class="q-mt-md"
                style="cursor : pointer;"
                size="2em"
              />
            </div>

            <form>
              <div class="row insert_new">
                <q-icon
                  name="add_circle_outline"
                  color="green-7"
                  style="cursor : pointer;"
                  size="2em"
                  class="addQuestionBtn"
                />

                <q-input class="addQuestionTxt" style="color:grey;" label="Add new answer" dark />
              </div>
            </form>
          </div>

          <p class="paragraph" style="color:white; font-size:2em;">What about timer?</p>

          <div class="row">
            <q-icon name="timer" color="white" size="5em" class="q-mr-xs q-mt-md" />

            <div class="row col">
              <q-btn
                v-for="(time, index) in ['5 sec', '10 sec', '15 sec', '30 sec', '1 min']"
                v-bind:key="index"
                rounded
                dark
                class="col q-ml-md q-mr-md q-mt-lg q-mb-lg"
                size="12px"
                @click="changeTime(time)"
                :label="time"
              />

              <q-btn
                rounded
                dark
                @click="changeTime('infinity')"
                class="col q-ml-md q-mr-md q-mt-lg q-mb-lg"
                size="12px"
                icon="all_inclusive"
              />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      val: true,

      selectedQuestionId: " ",

      currentQuizId: this.$route.params.quizzId,

      newAnswer: "",

      questions: [
        {
          id: 1,
          name: "Question title 1",
          description: "Description for the first question",
          time: "5 sec",
          answers: [
            {
              id: 1,
              name: "Answer 1",
              isCorrect: false
            },
            {
              id: 2,
              name: "Answer 2",
              isCorrect: true
            },
            {
              id: 3,
              name: "Answer 3",
              isCorrect: false
            }
          ]
        },
        {
          id: 2,
          name: "Question title 2",
          description: "Description for the second question",
          time: "",
          answers: [
            {
              id: 1,
              name: "Answer 1-2",
              isCorrect: false
            },
            {
              id: 2,
              name: "Answer 2-2",
              isCorrect: false
            },
            {
              id: 3,
              name: "Answer 3-2",
              isCorrect: true
            }
          ]
        },
        {
          id: 3,
          name: "Question title 3",
          description: "Description for third question",
          time: "",
          answers: [
            {
              id: 1,
              name: "Answer 1-3",
              isCorrect: true
            },
            {
              id: 2,
              name: "Answer 2-3",
              isCorrect: false
            },
            {
              id: 3,
              name: "Answer 3-3",
              isCorrect: false
            }
          ]
        }
      ]
    };
  },

  mounted() {
    this.$store.dispatch("user/login");

    console.log(this.$route.params.quizzId);
    console.log("id is: " + this.selectedQuestionId);
  },

  computed: {
    currentQuiz() {
      return this.$store.getters["quizzes/getQuizById"](this.currentQuizId);
    },

    selectedQuestion() {
      return this.$store.getters["quizzes/getQuestionById"](
        this.selectedQuestionId
      );
    },

    answers() {
      return this.$store.getters["quizzes/getAnswers"](
        this.selectedQuestion.answers
      );
    },

    questionTitle() {
      return this.$store.getters["quizzes/getQuestionTitleById"];
    }
  },

  methods: {
    onQuestionClick(id) {
      this.selectedQuestionId = id;
    },

    changeTime(time) {
      this.questions[this.selectedQuestion].time = time;
    },

    addAnswer() {
      let q = this.questions[this.selectedQuestion].answers;
      q.push({
        id: q[q.length - 1] + 1,
        name: this.newAnswer,
        isCorrect: false
      });

      this.newAnswer = "";
    },

    addNewQuestion() {
      let questionId;

      if (this.questions.length === 0) {
        questionId = 0;
      } else {
        questionId =
          this.questions[this.selectedQuestion].answers[
            this.questions[this.selectedQuestion].answers.length - 1
          ] + 1;
      }

      this.questions.push({
        id: questionId,
        name: "New question",
        description: "",
        time: {
          unit: "seconds",
          value: 0
        },

        answers: []
      });
    },

    deleteAnswer(index) {
      this.questions[this.selectedQuestion].answers.splice(index, 1);
    },

    deleteQuestion(index) {
      if (index === this.selectedQuestion) this.selectedQuestion = 0;
      this.questions.splice(index, 1);
    }
  }
};
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
}

.addQuestionBtn {
  margin-top: 0.5em;
  margin-left: 0.25em;
}

.addQuestionTxt {
  margin-left: 1.2em;
}

.insert_new {
  margin-top: 1em;
}
</style>
