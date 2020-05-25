<template>
  <section class="column justify-between">
    <div class="col">
      <div class="row">
        <h3 style="color: white" class="col">{{currentQuiz.name}}</h3>
        <i @click="edit=true" class="fas fa-edit fa-2x" to="/edit" />
      </div>
      <p style="color: white">{{currentQuiz.description}}</p>
    </div>
    <div class="col-6">
      <div class="row justify-between">
        <span style="color:white">Questions</span>
        <div to="/edit">
          <i class="fas fa-edit fa-lg"></i>
        </div>
      </div>
      <ul v-for="q in currentQuiz.questions" :key="q">
        <li>
          <p class="text-right">{{q}}</p>
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
      pos: 0
    };
  },
  methods: {
    getIndex(position) {
      console.log(position);
      return (this.pos = position);
    }
  },
  props: ["currentQuiz"]
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