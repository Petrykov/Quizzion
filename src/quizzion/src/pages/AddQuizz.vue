<template>
    <q-layout container style="" class="fullscreen shadow-2 rounded-borders">

        <div class="row q-pa-lg" style="">
            <q-page-container class="col q-pa-lg" style="">
                <p style="font-size:3em;">Quizz name</p>
                <div class ="vertical-allignment" style = "">

                    <p v-for="(btn,id) in questionButtons" 
                    :key="id">
                        <q-btn
                        :outline="btn.active ? false : true"
                        rounded color="black"
                        @click="onQustionClick(id)"> 
                            {{btn.name}}
                        </q-btn>
                    </p>                    
                </div>
            </q-page-container>

            <q-page-container class="col q-pa-lg" style="background: #181c30; border-radius: 2em;">
                <q-page padding>
                    
                    <q-input class="questionInput" dark v-model="quesitonDetails.title" color="grey-12" label="Question's title" label-color="grey"/>

                    <q-input
                    dark
                    v-model="quesitonDetails.description"
                    filled
                    autogrow
                    label="Question description"
                    class="q-mt-md"
                    color="grey"
                    />

                    <p class="paragraph" style="color:white; font-size:2em;"> The answers?</p>

                    <div class="col">
                        <div class="row">
                            <q-checkbox dark v-model="val" rounded />
                            <p class="answer" style="color:grey;">Answer-1: </p>
                        </div>

                        <div class="row">
                            <q-checkbox dark v-model="val" rounded />
                            <p class="answer" style="color:grey;">Answer-2: </p>
                        </div>

                        <div class="row">
                            <q-checkbox dark v-model="val" rounded />
                            <p class="answer" style="color:grey;">Answer-2: </p>
                        </div>
                    </div>

                </q-page>
            </q-page-container>
        </div>
    </q-layout>
</template>

<script>
export default {
    data(){
        return{
            val: true,

            quesitonDetails:{
                title:'Question title 1',
                description: 'Description for the first question'
            },
        
            questionButtons:[
                {
                        id: 1,
                        name: 'Question title 1',
                        active: true
                },

                {
                        id: 2,
                        name: 'Question title 2',
                        active: false
                },

                {
                        id: 3,
                        name: 'Question title 3',
                        active: false
                },
            ]
        }
    },
    
    methods:{
        onQustionClick(id){
            this.quesitonDetails.title = this.questionButtons[id].name;

            this.questionButtons.map(btn => btn.active = false);
            this.questionButtons[id].active = true;
        }, 
    }
}
</script>

<style scoped>
    p{
        margin: 15px 0;
    }

    .vertical-allignment{
        text-align: center;
        position: relative;
        top: 30%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .questionInput{
        font-size: 1.5em;
        color:white;
    }

    .paragraph{
        margin-top:2em;
    }

    .answer {
        margin-top: 1em;
    }

    .q-checkbox__bg {
        border-radius: 10px;
    }

</style>
