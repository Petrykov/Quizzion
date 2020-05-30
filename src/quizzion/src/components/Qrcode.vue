<template>
  <div>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'

  export default {
    data() {
      return {
        value: this.link,
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    },
    props:['link']
  }
</script>
