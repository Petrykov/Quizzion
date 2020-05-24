<template>
  <q-layout view="lHh Lpr lFf">
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
        />

       
      </q-toolbar>
    </q-header>
      
      
      <Left/>

         

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
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

import Left from 'components/Left'
import SideBar from 'components/SideBar'
export default {
  name: 'MainLayout',

  components: {
    
    Left, 
    SideBar
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
