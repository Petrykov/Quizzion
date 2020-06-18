<template>
  <q-page v-if="invitedQuiz" class="bg-image">
    <div class="bg-image row window-height items-center">
      <div class="left-side col-xs-12 col-sm-6">
        <h2 style="color: white">
          Welcome to
          Quizzion!
        </h2>
      </div>
      <div class="right-side col-xs-12 col-sm-6">

        <div>

          <q-avatar v-if="invitedQuiz.logo" size="100px" class="q-mt-md">
            <img :src="invitedQuiz.logo"/>
          </q-avatar>
          <i v-else class="far fa-paper-plane fa-5x" style="margin-top: 3%; margin-bottom: 3%"></i>
          <h5 class="text">You're invited to join </h5>
          <h5 class="text"><strong>{{ invitedQuiz.title }}</strong></h5>
          <h5 class="text">By organizer </h5>
          <h5 class="text"><strong>{{ invitedQuiz.owner }}</strong></h5>

          <h5 class="enter-text">Enter your</h5>
          <q-input
            label="Name"
            v-model="playerName"
            class="input-name"/>

          <q-btn round color="black"
                 icon="forward"
                 class="enter-button"
                 @click="toFirstQuestion"/>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
    import {QSpinnerFacebook} from 'quasar'

    export default {
        data: () => {
            return {
                playerName: '',
                quizId: ''
            };
        },
        computed: {
            invitedQuiz() {
                return this.$store.getters['quizzes/getQuizById'](this.quizId);
            }
        },
        beforeMount() {
            this.quizId = this.$route.params.quizId;

            this.$q.loading.show({message: 'Loading quiz content...'});
            this.$store.dispatch('quizzes/fetchInvitedQuiz', this.quizId).then(() => {
                this.$q.loading.hide();
            });
        },
        beforeDestroy() {
            this.$q.loading.hide()
        },
        methods: {
            toFirstQuestion() {
                console.warn('Below the details')
                console.log( {quiz_id: this.invitedQuiz.id, name: this.playerName})
                this.$socket.client.emit('connect-t', {quiz_id: this.invitedQuiz.id, name: this.playerName});
                this.$socket.client.on('start', () => {
                    this.$store.dispatch('user/join', {name: this.playerName, quizId: this.quizId}).then(() => {
                        this.$router.replace(`/quizzes/${this.invitedQuiz.id}/questions/${this.invitedQuiz.questions[0]}`);
                    });
                });
                this.showLoading();
            },
            showLoading() {
                /* This is for Codepen (using UMD) to work */
                const spinner = typeof QSpinnerFacebook !== 'undefined'
                    ? QSpinnerFacebook // Non-UMD, imported above
                    : Quasar.components.QSpinnerFacebook; // eslint-disable-line
                /* End of Codepen workaround */

                this.$q.loading.show({
                    spinner,
                    spinnerColor: 'yellow',
                    spinnerSize: 140,
                    backgroundColor: 'purple',
                    message: 'Waiting for Quiz Master to start the quiz',
                    messageColor: 'white'
                });
            }
        }
    }
</script>

<style scoped>

  .bg-image {
    background-image: url("~assets/bg_enter.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    border-bottom: 15px solid #181C30;
  }

  .left-side {
    margin-bottom: 10%;
    padding-left: 5%;
    padding-right: 5%;
  }

  .right-side {
    background: white;
    border-radius: 25px;
    margin-top: 1%;
    margin-bottom: 1%;
    border-right: 5px solid #181C30;
    text-align: center;
    height: 100%;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .input-name {
    margin-left: 20%;
    margin-right: 20%;

  }

  .text {
    margin: 2%;
    text-decoration-color: #181C30;
  }

  .enter-text {
    margin-left: 20%;
    text-decoration-color: #181C30;
    text-align: left;
    margin-bottom: 2%;
  }

  .enter-button {
    margin-top: 10%;
    margin-bottom: 2%;
  }

  @media screen and (max-width: 600px) {
    .right-side {
      border-right: 0;
    }
  }
</style>


