<template>
  <section
    data-aos="flip-left"
    data-aos-duration="500"
    class="column justify-between add-card-section"
    :style="{'background':themeColor}">

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Saved</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Your work has been saved successfully!</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup to="/"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="col">
      <div class="row">
        <q-input
          style="background-color: transparent"
          class="col add-name"
          dark
          borderless
          v-model="quizTitle"
          placeholder="Add Quiz's name"
        />
        <i class="far fa-save fa-2x" @click="addQuiz(true)"/>
      </div>
      <q-input
        v-model="quizDes"
        color="white"
        style="font-size: larger; background-color: transparent"
        dark
        borderless
        placeholder="add quiz's description"
      />
    </div>

    <div class="col-7">
      <div class="instruction">
        <div style="color: black; font-size: 1.3em;">Be creative! Choose a theme for your quiz</div>
        <div
          class="theme-bubble colors"
          style="margin-top: 1em;">
          <q-btn
            style="border: 2px solid white; margin: 0 auto;"
            size="large"
            class="color-btn"
            round
            v-for="(n,index) in colors"
            :key="`sm-${n}`"
            :style="{'background-color':colors[index]}"
            @click="themeColor=colors[index]"
          />
        </div>

        <div class="q-mt-lg" style="color: black; font-size: 1.3em;">Or a logo from your organization?</div>

        <div class="theme-bubble" style="padding-top: 10px">
          <q-img :src="logoUrl"
                 :width="imageShow(logoUrl)"></q-img>
          <q-file
            size="xx-large"
            round
            v-model="file"
            label-color="white"
            label="Pick one logo"
            filled
            @click="$refs.file.click()">
          </q-file>
          <q-btn  @click="uploadToFirebase">
            <i class="fas fa-upload" style="color: white"></i>
          </q-btn>
        </div>


      </div>
    </div>

    <div class="q-pa-md theme-bubble add-question">
      <q-btn
        color="white"
        icon-right="fas fa-arrow-right"
        rounded
        text-color="black"
        label="Let's add some questions!"
        @click="toAddQuestions"/>
    </div>
  </section>
</template>

<script>
  import {v4 as uuidv4} from "uuid";
  import firebase from 'firebase';

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  export default {
    data: () => {
      return {
        colors: ["#008080", "#800080", "#006600", "#ffa500", "#990000"],
        quizDes: "",
        quizTitle: null,
        alert: false,
        themeColor: "teal",
        logoUrl: null,
        file: null,
      };
    },

    methods: {
      imageShow(logoUrl){
        if(logoUrl!=null){
          return '10%'
        }
        return 0
      },
      uploadToFirebase() {
        if (this.file != null) {
          let storageRef = firebase.storage().ref(`${this.file.name}`).put(this.file);
          storageRef.on('state_changed',
            () => {
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                this.logoUrl = url;
              })
            })
        }
      },
      addQuiz: function (showAlert) {

        let newQuiz = {
          title: this.quizTitle,
          owner: this.$store.state.user.displayName,
          description: this.quizDes,
          color: this.themeColor,
          questions: [],
          logo: this.logoUrl,
          active: false
        };


        this.$store.dispatch('quizzes/createQuiz', newQuiz).then((quizId) => {

          if (!showAlert) {
            this.$router.push(`quizzes/${quizId}/questions`);
          }

        });

        // this.$store.commit("quizzes/createQuiz", newQuiz);
        // this.$store.commit("user/createQuiz", assignedId);

        this.alert = showAlert;
      },

      toAddQuestions() {
        this.addQuiz(false);
      },
    },

    beforeMount() {
      AOS.init();
    }

  };
</script>

<style lang="css" scoped>

  .add-name {
    font-size: xx-large;
  }

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

  .fa-save {
    color: white;
  }


  @media screen and (max-width: 1200px) {

    .add-card-section {
      width: 80% !important;
      margin: 0 auto;
    }

    .add-question {
      margin-top: 3em;
    }

    .colors {
      width: 85%;
      margin: 0 auto;
    }

  }

  @media screen and (max-width: 600px) {

    .add-card-section {
      /*width: 100%;*/
      /*border: 1px solid orange;*/
    }

    col {
      padding: 0 !important;
    }

    .colors {
      width: 100%;
    }

    .color-btn {
      width: 50px;
      height: 50px;
    }
  }


</style>
