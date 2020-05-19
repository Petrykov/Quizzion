<template>
    <div>
             <div class="split left">
                <h3 class="text-left" > Hi Quiz Master </h3>
                <h5 class="text-left"> Welcome back to the gamespace, we missed you! </h5>
                <h5 class="text-left" > Quizzes </h5>

                <q-btn class="quizzes button"
                         color="red" 
                         
                > </q-btn>

                <q-btn class="new quiz button"
                 icon="fas fa-plus"
                 color="grey"
                
                ></q-btn>

        </div>
        <div class="split right" >
            <i class="fas fa-edit"></i>
            <h3 class="text-right">Quiz name</h3>
            <p class="text-right" >  Quiz description: Lorem ipsum dolor sit amet, 
                consectetur  adipiscing elit. Nunc rutrum auctor neque ut  </p> 
            <span style="margin-left: 5%">
                 <tr>
                     <th>
                         <p class="text-right" style="font-size: 15px, margin-left: 140px" >Questions </p>   
                     </th>
                     <th>
                          <i class="fas fa-edit" style="font-size: 15px "></i>
                     </th> 
                 </tr>
            </span>
                 
                <hr class="text-right">

                <p class="text-right" style="padding-top: 20px"> question title 1 </p>
                <p class="text-right" style="padding-top: 20px"> question title 1 </p>
              <q-btn id="start_quiz_button" unelevated rounded color="white" text-color="black" label="Start quiz" />
               

             </div>
    </div>
    
</template>

<script>
export default {
    data (){
        return {
            
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
  background-color: blueviolet;
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
