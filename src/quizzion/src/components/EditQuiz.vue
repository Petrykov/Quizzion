<template>
  <section
    data-aos="flip-right"
    data-aos-duration="500"
    class="column justify-between edit-card"
    :style="{'background':themeColor?themecolor!=null:updatedQuiz.color}">
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete?</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Are you sure you want to delete this quiz?</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup @click="deleteQuiz" to="/"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div>
      <div class="row">
        <q-input
          color="white"
          class="col"
          style="text-decoration:underline white; font-size: 2.5em;"
          dark
          borderless
          v-model="updatedQuiz.title"
        />
        <i class="far fa-trash-alt fa-2x" @click="onDelete"/>
      </div>

      <q-input
        color="white"
        style="text-decoration:underline white; font-size: 1.8em; margin-top: 1em;"
        dark
        borderless
        v-model="updatedQuiz.description"
      />
    </div>

    <div class="col-7">
      <div class="instruction">
        <div class="be-creative" style="color: black; font-size: 1.3em;">Be creative! Choose a theme for your quiz</div>
        <div class="colors">
          <q-btn
            style="border: 2px solid white; margin: 0 auto;"
            size="large"
            round
            v-for="n in colors"
            :key="`sm-${n}`"
            :style="{'background-color':n}"
            @click="updatedQuiz.color=n"
          />
        </div>
        <div class="q-mt-lg" style="color: black; font-size: 1.3em;">Or a logo from your organization?</div>

        <div class="q-pa-md theme-bubble upload-img">
          <q-btn size="xx-large" round color="white" @click="$refs.file.click()">
            <i class="fas fa-upload fa-lg" style="color: black">
              <input type="file" ref="file" style="display: none"/>
            </i>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="q-pa-md theme-bubble save-btn">
      <q-btn color="white" rounded text-color="black" label="Save" @click="saveQuiz" to="/"></q-btn>
    </div>
  </section>
</template>

<script>

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  export default {
    data: () => {
      return {
        colors: ["#008080", "#800080", "#006600", "#ffa500", "#990000"],
        alert: false,
        themeColor: null,
        updatedQuiz: undefined
      };
    },

    methods: {
      onDelete: function () {
        this.alert = true;
      },
      saveQuiz: function () {
        this.$store.commit("quizzes/updateQuiz", {
          id: this.currentQuiz.id,
          updatedQuiz: this.updatedQuiz
        });
        // this.$emit("edit", updateQuiz);
      },
      deleteQuiz: function () {
        this.$store.commit("user/deleteQuizFromUser", this.currentQuiz.id); //there should be a better way
        this.$store.commit("quizzes/deleteQuiz", this.currentQuiz.id);
        console.log(this.currentQuiz.id + " is deleted");
        // emit: change current quiz to the id near by
      }
    },
    computed: {
      selectedQuiz() {
        return this.currentQuiz;
      },
      selectedColor() {
        if (themeColor == null) {
          return this.currentQuiz.color;
        } else {
          return themeColor;
        }
      }
    },
    props: {
      currentQuiz: {
        type: Object,
        required: true
      }
    },
    beforeMount() {
      AOS.init();
      this.updatedQuiz = {...this.currentQuiz};
    }
  };
</script>

<style lang="css" scoped>

  .instruction {
    font-size: large;
    color: white;
  }

  .theme-bubble {
    display: flex;
    justify-content: center;
  }

  section {
    height: 100%;
  }

  .fa-trash-alt {
    color: white;
  }

  .upload-img{
    margin-top: 2em;
  }

  .colors{
    display: flex;
    margin-top: 2em;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  @media screen and (max-width: 1200px) {
    .edit-card {
      width: 80% !important;
      margin: 0 auto;
    }

    .save-btn {
      margin-top: 2em;
    }

    .be-creative{
      margin-top: 2em;
    }
  }

  @media screen and (max-width: 600px) {
    .colors{
      width: 100%;
    }
  }

</style>
