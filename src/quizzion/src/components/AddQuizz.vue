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
        <div style="color: white; font-size: 1.3em;">Be creative! Choose a theme for your quiz</div>
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

        <div class="q-mt-lg" style="color: white; font-size: 1.3em;">Or a logo from your organization?</div>

        <div class="theme-bubble" style="padding-top: 10px">
          <q-img v-if="logoUrl" :src="logoUrl"
                 width="10%"></q-img>
          <q-file
            size="xx-large"
            round
            v-model="file"
            label-color="white"
            label="Pick one logo"
            filled
            @click="$refs.file.click()">
          </q-file>
          <q-btn @click="uploadToFirebase">
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
  import firebase from 'firebase';

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  export default {
    data: () => {
      return {
        colors: ["#522785", "#9A1F40", "#181C30", "#EC633E", "#3099B8"],
        quizDes: "",
        quizTitle: null,
        alert: false,
        themeColor: "#522785",
        logoUrl: null,
        file: null,
      };
    },

    methods: {
      uploadToFirebase() {
        if (this.file != null) {
          let storageRef = firebase.storage().ref(`${this.file.name}`);
          storageRef.put(this.file).then(() => {
            storageRef.getDownloadURL().then((url) => {
              this.logoUrl = url;
            })
          });
        }
      },
      addQuiz: function (showAlert) {

        let newQuiz = {
          title: this.quizTitle,
          owner: this.$store.state.user.displayName,
          description: this.quizDes,
          label: this.themeColor,
          questions: [],
          logo: this.logoUrl,
          active: false
        };


        this.$store.dispatch('quizzes/createQuiz', newQuiz).then((quizId) => {

          if (!showAlert) {
            this.$router.push(`quizzes/${quizId}/questions`);
          } else this.$emit('selectQuiz', quizId);


        }).catch(() => {
          this.showNotification('Something went wrong...', 'negative');
        });

        this.alert = showAlert;
      },

      toAddQuestions() {
        this.addQuiz(false);
      },
      showNotification(message, type) {
        this.$q.notify({
          type: type,
          message: message,
          actions: [
            {
              label: 'Dismiss', color: 'white', handler: () => { /* ... */
              }
            }
          ]
        })
      }
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
