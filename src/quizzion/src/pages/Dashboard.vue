
<template>
    <div>
             <div class="split left">
                <h3 class="text-left" > Hi Quiz Master </h3>
                <h5 class="text-left"> Welcome back to the gamespace, we missed you! </h5>
                <h5 class="text-left" > Quizzes </h5>

                <q-btn  v-for="(quiz, index) in quizzes" :key="quiz.id" class="quizzes button"
                       :color = quizzes[index].color
                       @click="getIndex(index)"
                ></q-btn>
               
                <q-btn class="new quiz button"
                 icon="fas fa-plus"
                 color="grey"
                   to="/add" clickable
                ></q-btn>

        </div>
        
        <div v-if="pos > -1"  class="split right" 
        v-bind:style="{ backgroundColor: quizzes[pos].color}">

            <i class="fas fa-edit" to="/edit" clickable ></i>
          
            <h3 class="text-right">{{quizzes[pos].name}}</h3>

            <p class="text-right" >  {{quizzes[pos].description}}  </p> 

            <span style="margin-left: 5%">
                 <tr>
                     <th>
                         <p class="text-right" style="font-size: 15px, margin-left: 140px" >Questions </p>   
                     </th>
                     <th>
                         <div to="/edit" clickable>
                          <i class="fas fa-edit" style="font-size: 15px "></i>
                         </div>
                     </th> 
                 </tr>
            </span>

            <hr class="text-right">

                   <!-- //TODO loop for all questions in quiz -->

                   <ul>
                    <li v-for="question in quizzes" :key="question">
                    <ul>
                    <li v-for="q in question.questions" :key="q.id">
                        <p class="text-right" style="padding-top: 10px">   {{ q }} </p>
                      
                     </li>
                    </ul>
                    </li>
                </ul>
            
                <div >
                     <q-btn to="/add" clickable id="start_quiz_button" unelevated rounded color="white" text-color="black" label="Start quiz"  />
                </div>

             </div>
    </div>
    
</template>

<script>
export default {
    data (){
        return {
            quizzes: [
                {
                    id: 0,
                    name: 'Pub quiz 0',
                    description: ' Description quiz 0 Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut',
                    questions: [ 'question 1'],
                    color: 'red'
                },
                 {
                     id: 1,
                    name: 'Pub quiz 1',
                    description: 'Description quiz 1 Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut',
                     questions: ['question 1'],
                    color: 'blue'
                },
                 {  
                     id: 2,
                    name: 'Pub quiz 2',
                    description: 'Description quiz 2 zzzzz Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Nunc rutrum auctor neque ut',
                     questions: ['question 1'],
                    color: 'green'
                }
            ],
            pos: 0
        }
    },
    methods: {
        getIndex(position) {
            console.log(position);
            return this.pos=position;
        }
    } 
    
}
</script>

<style>


.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1; 
  top: 0;
  padding-top: 20px;
  
}

.right {
  right: 0;
  margin: 1%;
  border-radius: 25px;
}
.text-left{
    text-decoration-color: black;
    margin-left: 5%;
    margin-right: 5%; 
}

.button {
  border-radius: 10px;
  height:  50px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 7%;
 
}

#start_quiz_button{ 
    position: absolute;
    right: 7%; 
    margin-top: 5%;

}

.fa-edit{
    color: white;
    position: absolute;
    right: 7%; 
   font-size: 20px;
}

.text-right{
    color: white;
    margin-left: 5%;
    margin-right: 5%;
    text-align: left;
}

</style>
