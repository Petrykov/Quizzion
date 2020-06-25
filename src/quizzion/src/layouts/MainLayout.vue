<template>
  <q-layout :view="view">
    <q-header class="bg-transparent"  >

      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          leftDrawerOpen = "!leftDrawerOpen" />


      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      bordered
      content-class="bg-grey-1"
      :width="200"
    >

    <SideBar/>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import SideBar from '../components/SideBar'
export default {
  name: 'MainLayout',

  components: {
    SideBar
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    view (){
      return this.leftDrawerOpen ? 'lHh Lpr lFf' : 'hHh Lpr lFf';
    }
  }
}
</script>

<style>
  .q-page-container {
    padding-left: 0px !important;
    padding-top: 0px !important;
  }
</style>
