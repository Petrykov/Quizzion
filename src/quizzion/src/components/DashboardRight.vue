<template>
  <section class="column justify-between">
    <div class="col">

      <div class="row">
        <h3
          style="color: black"
          class="col">{{currentQuiz.name}}
        </h3>

        <q-icon
          @click="edit=true"
          name="edit"
          size="2em"
          style="cursor : pointer;"
          color="white"/>

      </div>

      <p style="color: white; font-size: 1.5em;">{{currentQuiz.description}}</p>
    </div>

    <div class="col-6">
      <div class="row justify-between">
        <span style="color:black; font-size: 2em;">Questions</span>

        <div to="/edit">
          <q-btn 
            unelevated
            dark
            dense
            style="background: transparent;"
            text-color="white"
            size="16px"
            @click="goToEdit"
            icon="edit"/>
        </div>

      </div>

      <ul style="list-style-type: none;" v-for="q in currentQuiz.questions" :key="q">
        <li>
          <p style="font-size: 1.5em; color:white;">{{q}}</p>
        </li>
      </ul>

    </div>

    <div class="q-pa-md theme-bubble">
      <q-btn to="/add" unelevated rounded color="white" text-color="black" label="Start quiz"/>
    </div>

  </section>
</template>

<script>
    export default {
        data() {
            return {
                pos: 0,
            };
        },
        methods: {
            getIndex(position) {
                console.log('index: ' + position);
                return (this.pos = position);
            },

            goToEdit(){
              this.$router.push(`questions/${this.currentQuiz.id}`);
            }
        },
        props: ["currentQuiz"]
    };
</script>


<style scoped>

  .theme-bubble {
    display: flex;
    justify-content: flex-end;
  }

</style>
