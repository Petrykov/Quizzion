<template>
  <section class="column justify-between" v-if="pos > -1">
    <div class="col">
      <div class="row">
        <h3 style="color: white" class="col">{{quizzes[pos].name}}</h3>
        <i @click="edit=true" class="fas fa-edit fa-2x" to="/edit" />
      </div>
      <p style="color: white">{{quizzes[pos].description}}</p>
    </div>
    <div class="col-6">
      <div class="row justify-between">
        <span style="color:white">Questions</span>
        <div to="/edit">
          <i class="fas fa-edit fa-lg"></i>
        </div>
      </div>
      <ul>
        <li v-for="question in quizzes" :key="question">
          <ul>
            <li v-for="q in question.questions" :key="q.id">
              <p class="text-right">{{q}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="q-pa-md theme-bubble">
      <q-btn to="/add" unelevated rounded color="white" text-color="black" label="Start quiz"></q-btn>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      quizzes: [
        {
          id: 0,
          name: "Pub quiz 0",
          description:
            " Description quiz 0 Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "teal"
        },
        {
          id: 1,
          name: "Pub quiz 1",
          description:
            "Description quiz 1 Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "blue"
        },
        {
          id: 2,
          name: "Pub quiz 2",
          description:
            "Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut",
          questions: ["question 1"],
          color: "green"
        }
      ],
      pos: 0
    };
  },
  methods: {
    getIndex(position) {
      console.log(position);
      return (this.pos = position);
    }
  }
};
</script>


<style scoped >
.right {
  border-radius: 17px;
}
.text-left {
  text-decoration-color: black;
  margin-left: 5%;
  margin-right: 5%;
}

.fa-edit {
  color: white;
}

.text-right {
  color: white;
  /* margin-left: 5%;
  margin-right: 5%;
  text-align: left; */
}

.theme-bubble {
  display: flex;
  justify-content: flex-end;
}
</style>