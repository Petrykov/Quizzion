<template>
  <section
    data-aos="flip-right"
    data-aos-duration="500"
    class="column justify-between edit-card"
    :style="{'background':themeColor?themecolor!=null:updatedQuiz.color}"
  >
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete?</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Are you sure you want to delete this quiz?</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup @click="deleteQuiz" to="/" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div>
      <div class="row">
        <q-input
          color="white"
          class="col"
          style="white; font-size: 2.5em;"
          dark
          v-model="updatedQuiz.title"
        />
        <i class="far fa-trash-alt fa-2x" @click="onDelete" />
      </div>

      <q-input
        color="white"
        style=" white; font-size: 1.8em; margin-top: 1em;"
        dark
        v-model="updatedQuiz.description"
      />
    </div>

    <div class="col-7">
      <div class="instruction">
        <div
          class="be-creative"
          style="color: white; font-size: 1.3em;"
        >Be creative! Choose a theme for your quiz</div>
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
        <div
          class="q-mt-lg"
          style="color: white; font-size: 1.3em;"
        >Or a logo from your organization?</div>

        <div class="theme-bubble" style="padding-top: 10px">
          <q-img
            v-if="updatedQuiz.logo"
            :src="updatedQuiz.logo"
            width="10%"
          ></q-img>
          <q-file
            size="xx-large"
            round
            v-model="file"
            label-color="white"
            label="Pick a new logo"
            filled
            @click="$refs.file.click()"
          ></q-file>
          <q-btn @click="uploadToFirebase">
            <i class="fas fa-upload" style="color: white"></i>
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
import AOS from "aos";
import "aos/dist/aos.css";
import firebase from "firebase";

export default {
  data: () => {
    return {
      colors: ["#522785", "#9A1F40", "#181C30", "#EC633E", "#3099B8"],
      alert: false,
      themeColor: null,
      updatedQuiz: undefined,
      file: null
    };
  },

  methods: {
    imageShow(logoUrl) {
      if (logoUrl != null) {
        return "10%";
      }
      return 0;
    },
    uploadToFirebase() {
      if (this.file != null) {
        let storageRef = firebase.storage().ref(`${this.file.name}`);
        storageRef.put(this.file).then(() => {
          storageRef.getDownloadURL().then((url) => {
            this.updatedQuiz.logo = url;
          })
        });
      }
    },
    onDelete: function() {
      this.alert = true;
    },
    saveQuiz: function() {
      this.$store.dispatch("quizzes/updateQuiz", this.updatedQuiz);
    },
    deleteQuiz: function() {
      this.$store.dispatch("quizzes/deleteQuiz", this.currentQuiz.id);
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
    this.updatedQuiz = { ...this.currentQuiz };
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

.upload-img {
  margin-top: 2em;
}

.colors {
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

  .be-creative {
    margin-top: 2em;
  }
}

@media screen and (max-width: 600px) {
  .colors {
    width: 100%;
  }
}
</style>
