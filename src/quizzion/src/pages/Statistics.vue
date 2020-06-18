<template>
  <q-page class="flex-center fullscreen" style="background-color:#E1EFFF; overflow: auto">
    <div style="float: left">
      <div style="margin-left: 25%; margin-top: 50%">
          <q-avatar size="100px" class="q-mb-sm" >
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
      </div>


      <table style="width:100%; margin-top: 10%; text-decoration-color: darkblue" >
        <tr>
          <th>Name</th>
          <th>Quiz Master</th>
        </tr>
        <tr>
          <td>Username</td>
          <td>quizzer_user2</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>quizmaster@gmail.com</td>
        </tr>
        <tr>
          <td>Language</td>
          <td>English</td>
        </tr>
      </table>
    </div>
<!--    <div style="background-color: white; border-radius: 15px 15px 15px 15px;">-->
          <div class="q-pa-md overlap" style="margin-top: 1%;  display: block; float: right; margin-right: 15%">
            <OverallStatistic ></OverallStatistic>
          </div>
          <div class="q-pa-md" style="width: 75%;  display: block; float:right; margin-right: 1%; ">
            <q-table
              style="height: 400px"
              title=" "
              :data="data"
              :columns="columns"
              row-key="index"
              virtual-scroll
              :pagination.sync="pagination"
              :rows-per-page-options="[0]"
            />
          </div>
<!--    </div>-->
  </q-page>
</template>
<script>

  import OverallStatistic from '../components/OverallStatistic';

  const seed = [
    {
      quiz: "Bloopers",
      questions: 10,
      created_date: "12/02/2020",
      participants: 30,
      live_time: 2
    },
    {
      quiz: "Cat mems",
      questions: 20,
      created_date: "04/10/2019",
      participants: 35,
      live_time: 3
    },
    {
      quiz: "It & Law",
      questions: 10,
      created_date: "26/01/2020",
      participants: 10,
      live_time: 5
    },
    {
      quiz: "HBO -  Corp",
      questions: 10,
      created_date: "12/02/2020",
      participants: 15,
      live_time: 3
    },
    {
      quiz: "ITSM",
      questions: 15,
      created_date: "12/12/2019",
      participants: 30,
      live_time: 2
    },
    {
      quiz: "Pubquiz_01",
      questions: 10,
      created_date: "28/02/2019",
      participants: 5,
      live_time: 2
    },{
      quiz: "Bloopers",
      questions: 20,
      created_date: "10/01/2020",
      participants: 30,
      live_time: 2
    },
    {
      quiz: "Bloopers",
      questions: 10,
      created_date: "14/07/2019",
      participants: 50,
      live_time: 1
    }
  ]

  let data = []
  for (let i = 0; i < seed.length; i++) {
    data = data.concat(seed.slice(0).map(r => ({ ...r })))
  }
  data.forEach((row, index) => {
    row.index = index
  })

  Object.freeze(data)

  export default {

    name: "Statistics",

    components: {OverallStatistic},
    data () {
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
          { name: 'Quiz', align: 'center', label: 'Quiz', field: 'quiz', sortable: true },
          { name: 'Questions', label: 'Questions', field: 'questions', sortable: true },
          { name: 'Create Date', label: 'Create Date', field: 'created_date' },
          { name: 'Participates', label: 'Participates', field: 'participants' },
          { name: 'Live Times', label: 'Live Time', field: 'live_time' },
        ]
      }
    }
  }
</script>

<style>
  th, td {
    padding: 15px;
    text-align: left;
  }
  .overlap{
    top: 20px;
    position: relative;
  }
</style>
