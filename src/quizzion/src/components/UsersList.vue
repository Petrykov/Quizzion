<template>
  <div class="col-5">
    <div class="row justify-between">
      <p style="color:white; font-size: 2em;">{{!status ? "Connected users:" : "Users finished quiz:"}}</p>
    </div>

    <div class="row">

      <div
        style="margin-top: 1em; " class="col">
        <q-scroll-area
          class="questions-scroll-area">
          <ul class="questions-ul" style="list-style-type: none;">
            <li class="list-item" v-for="(user, index) in users"
                :key="index">
              <p v-if="index % 2 !== 1"
                style="font-size: 1.5em; color:white; margin-bottom: 1em;" >
                {{++index + ") " + user}}
              </p>
            </li>
          </ul>
        </q-scroll-area>
      </div>

      <div
        style="margin-top: 1em;" class="col">
        <q-scroll-area
          class="questions-scroll-area">
          <ul class="questions-ul" style="list-style-type: none;">
            <li class="list-item" v-for="(user, index) in users"
                :key="index">
              <p v-if="index % 2 !== 0"
                 style="font-size: 1.5em; color:white; margin-bottom: 1em;" >
                {{++index + ") " + user}}
              </p>
            </li>
          </ul>
        </q-scroll-area>
      </div>


    </div>
  </div>
</template>

<script>

    export default {
        data() {
            return {
                users: [],
                usersFinished: false,
                usersCleaned: false
            }
        },
        props: {
            status: {
                type: Boolean,
                required: true
            }
        },
        mounted() {
            this.$socket.client.on('user-connected', (data) => {
                console.log(data);
                console.log("Respondent above");
                this.users.push(data.name);
                console.log(this.users);
            });
            this.$socket.client.on('user-done-quiz', (data) => {
                console.log(data);
                console.log('User is done above');
                this.users.push(data.name);
            })
        },
        beforeUpdate() {
            console.log('Triggered update');
            if (this.status) this.usersFinished = true;

            if (this.usersFinished && !this.usersCleaned) {
                console.log("Cleaning the users");
                this.users.splice(0,this.users.length);
                this.usersFinished = false;
                this.usersCleaned = true;
            }
        },
        beforeDestroy() {
            this.$socket.client.off('user-connected');
        }
    }

</script>

<style scoped>

  .theme-bubble {
    display: flex;
    justify-content: flex-end;
  }

  .reduce {
    margin-bottom: 0.5em !important;
  }

  .questions-scroll-area {
    width: 100%;
    height: 400px;
  }

  @media screen and (max-width: 1200px) {
    .question-section {
      width: 80%;
      margin: 0 auto;
    }

    .reduce {
      font-size: 3em;
    }

    .question-description {
      font-size: 1.5em;
    }

    .questions-section {
      margin-top: 3em;
    }

    .questions-ul {
      padding-left: 20px !important;
    }

  }

  @media screen and (max-width: 600px) {
    .question-section {
      width: 100%;
    }

    .questions-scroll-area {
      height: 200px;
    }
  }
</style>
