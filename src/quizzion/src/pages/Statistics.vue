<template>
  <q-page class="full-width full-height" style="background-color:#E1EFFF; overflow: auto; position: absolute">
    <div style="float: left; margin-left: 2%">
      <div style="margin-left: 25%; margin-top: 50%">
            <img src="../assets/logo_2x.png"  style="width: 100px; height: 100px" />
      </div>
      <table style="width:80%; margin-top: 10%; text-decoration-color: darkblue" >
        <tr>
          <th>Name</th>
          <th>{{$store.state.user.name}}</th>
        </tr>
        <tr>
          <td>Username</td>
          <td>{{$store.state.user.displayName}}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{$store.state.user.email}}</td>
        </tr>
        <tr>
          <td>Language</td>
          <td>English</td>
<!--          <td>{{$store.state.user.language}}</td>-->
        </tr>
      </table>
    </div>

          <div class="q-pa-md overlap" style="margin-top: 1%;  display: block; float: right; margin-right: 15%;
                    box-shadow: 5px 5px 5px rgba(0, 0.5, 0.5, 0.5);
                     border-radius: 15px 15px 15px 15px">
            <OverallStatistic ></OverallStatistic>
          </div>
          <div class="q-pa-md" style="width: 75%;  display: block; float:right;
              background-color: white; border-radius: 50px 0px 0px 0px">

            <br>
            <br>
            <br>
            <q-table

              class="q-pa-md"
              style="height: 400px;
                    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0);"
              title=" "
              :data="data"
              :columns="columns"
              row-key="index"
              virtual-scroll
              :pagination.sync="pagination"
              :rows-per-page-options="[0]"
            />
          </div>

  </q-page>
</template>
<script>

import OverallStatistic from '../components/OverallStatistic';

const quizzes = [
  {
    quiz: 'Bloopers',
    questions: 10,
    createdDate: '12/02/2020',
    participants: 30,
    liveTime: 2
  },
  {
    quiz: 'Cat mems',
    questions: 20,
    createdDate: '04/10/2019',
    participants: 35,
    liveTime: 3
  },
  {
    quiz: 'It & Law',
    questions: 10,
    createdDate: '26/01/2020',
    participants: 10,
    liveTime: 5
  },
  {
    quiz: 'HBO -  Corp',
    questions: 10,
    createdDate: '12/02/2020',
    participants: 15,
    liveTime: 3
  },
  {
    quiz: 'ITSM',
    questions: 15,
    createdDate: '12/12/2019',
    participants: 30,
    liveTime: 2
  },
  {
    quiz: 'Pubquiz_01',
    questions: 10,
    createdDate: '28/02/2019',
    participants: 5,
    liveTime: 2
  }, {
    quiz: 'Bloopers',
    questions: 20,
    createdDate: '10/01/2020',
    participants: 30,
    liveTime: 2
  },
  {
    quiz: 'Bloopers',
    questions: 10,
    createdDate: '14/07/2019',
    participants: 50,
    liveTime: 1
  }
];

let data = [];
for (let i = 0; i < quizzes.length; i++) {
  data = data.concat(quizzes.slice(0).map(r => ({...r})));
}
data.forEach((row, index) => {
  row.index = index;
});

Object.freeze(data);

export default {

  name: 'Statistics',
  components: {OverallStatistic},
  data() {
    return {
      data,

      pagination: {
        rowsPerPage: 0
      },

      columns: [
        {
          name: 'index',
          label: '#',
          field: 'index'
        },
        {name: 'Quiz', align: 'center', label: 'Quiz', field: 'quiz'},
        {name: 'Questions', label: 'Questions', field: 'questions'},
        {name: 'Create Date', label: 'Create Date', field: 'createdDate'},
        {name: 'Participates', label: 'Participates', field: 'participants'},
        {name: 'Live Times', label: 'Live Time', field: 'liveTime'}
      ]
    };
  }
};
</script>

<style>
  th, td {
    padding: 15px;
    text-align: left;
  }
  .overlap{
    top: 50px;
    position: relative;
  }
</style>
