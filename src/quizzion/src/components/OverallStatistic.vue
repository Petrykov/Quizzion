<template >
  <section style="background: white;
          height: 200px; max-height: 100%;
          width: 500px; max-width: 100%;
          border-radius: 15px 15px 15px 15px"
           class="row">

    <div class="col-6" style="padding-left: 5%">
      <h6 style="font-weight: bold">Overall statistic</h6>
      <table style=" padding-right: 5%" >
        <tr>
          <td>Total quizzes</td>
          <td>7</td>
        </tr>
        <tr>
          <td>Total players</td>
          <td>171</td>
        </tr>
        <tr>
          <td>Hit quiz</td>
          <td>ITSM</td>
        </tr>
      </table>
    </div>
    <div class="col-3" style="margin-top: 5%">
      <div >
        <apexchart width="250" type="donut" :options="options" :series="series" :colors="colors" :total="total.label"></apexchart>
      </div>
    </div>
  </section>
</template>
<script>
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

Vue.component('apexchart', VueApexCharts);

export default {
  data() {
    return {
      options: {
        labels: ['2020', '2019', '2018', '2017'],
        colors: ['#F2A95C', '#9A1F40', '#181C30', '#57709B']
      },
      series: [44, 55, 41, 17],
      total: {
        label: 'Active'
      }


    };
  }
};
</script>
<style>

</style>
