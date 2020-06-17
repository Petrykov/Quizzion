<template>
  <div class="q-pa-md">
    <q-drawer show-if-above :width="200" :breakpoint="400">
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd; color:white; background-color:teal"
      >
        <q-list padding>

          <q-item clickable v-ripple @click="toDashBoard">
            <q-item-section avatar>
              <i class="fas fa-columns"></i>
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fas fa-cog"></i>
            </q-item-section>
            <q-item-section>Settings</q-item-section>
          </q-item>

          <a href="https://parantion.com/organisatie/" style="text-decoration: none; color: white">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="fas fa-info-circle"></i>
              </q-item-section>

              <q-item-section>About us</q-item-section>
            </q-item>
          </a>

          <a href="https://parantion.com/contact/" style="text-decoration: none; color: white">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <i class="far fa-question-circle"></i>
              </q-item-section>

              <q-item-section>Support</q-item-section>
            </q-item>
          </a>

          <q-item @click="$store.dispatch('user/logout')" clickable v-ripple style="margin-top: 150px;">
            <q-item-section avatar>
              <i class="fas fa-sign-out-alt"></i>
            </q-item-section>

            <q-item-section>Sign Out</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div
        class="absolute-top"
        style="height: 150px; border-right: 1px solid #ddd; color:white; background-color:teal"
      >
        <div class="absolute-center bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <!-- // TODO get the logo -->
            <img src="~assets/boy_avatar@2x.png" />
          </q-avatar>

          <div class="text-weight-bold">{{ $store.state.user.displayName }}</div>
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      //...
    };
  },
  methods: {
    toDashBoard() {
      this.$router.push(`/`);
    }
  }
};
</script>
