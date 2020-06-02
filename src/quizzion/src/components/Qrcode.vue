<template>
  <div>
    <qrcode-vue :value="link" :size="size" level="H"></qrcode-vue>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'

  export default {
    data() {
      return {
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    },
    props:['link']
  }
</script>
