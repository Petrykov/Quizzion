<template>
  <div class="column items-center">
    <img class="logo" alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
    <h4 class="text-h4">Welcome back</h4>
    <div class="row">
      <q-form>
        <q-input square bordered class="q-pa-lg shadow-1" v-model="email" label="Your email" />
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
        <q-btn class="login" label="Login" text-color="white" no-caps />
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm"
};
</script>

<style>
.space {
  height: 30px;
}
.q-btn.login {
  width: 100%;
  background-color: #050152;
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