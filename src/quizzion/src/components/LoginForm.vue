<template>
  <div class="column items-center">
    <img class="logo" alt="Quasar logo" src="~assets/logo_2x.png"/>
    <h4 class="text-h4">Welcome back</h4>
    <div class="row">
      <q-form>
        <q-input square bordered class="q-pa-lg shadow-1" v-model="username" label="Username"/>
        <div class="space"></div>
        <q-input
          square
          bordered
          class="q-pa-lg shadow-1"
          v-model="password"
          type="password"
          label="Password"
        />
        <div class="space"></div>
        <div align="right">
          <a href>forgot password?</a>
        </div>
        <div class="space"></div>
        <q-btn @click="login" class="login" label="Login" text-color="white" no-caps/>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$q.loading.show({message: 'Logging in...'});
      this.$store.dispatch('user/login', {username: this.username, password: this.password})
        .then(() => {
          this.$q.loading.show({message: 'Fetching data...'});
          this.$store.dispatch('quizzes/initialiseAll')
            .then(() => {
              this.$q.loading.hide();
              this.$router.push('/');
            }).catch(() => {
              this.$q.loading.hide();
              this.triggerNotification('Could not reach the server. Contact 0570-parantion123');
            });
        }).catch(e => {
          this.$q.loading.hide();
          this.triggerNotification('Login failed, make sure you use the right credentials!');
        });
    },
    triggerNotification(text) {
      this.$q.notify({
        type: 'negative',
        message: text,
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => { /*... */
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
  .space {
    height: 30px;
  }

  .q-btn.login {
    width: 100%;
    background-color: #181C30;
  }

  .img.logo {
    width: 20px;
    height: 20px;
  }

  .q-input {
    width: 400px;
    background-color: white;
  }

  .q-form {
    width: 100%;
  }
</style>
