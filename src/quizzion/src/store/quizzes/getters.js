/*
* supply an id to retrieve the full objects out of a collection
*
* usage: $store.getters['quizzes/getQuizById'](id)
*
* */


export function getQuizById( state ) {
    return function (id) {
        return state.quizzes.find(quiz => quiz.id === id);
    }
}

export function getQuestionById( state ) {
    return function (id) {
        return state.questions.find(question => question.id === id);
    }
}

export function getAnswerById( state ) {
    return function (id) {
        return state.answers.find(answer => answer.id === id);
    }
}

export function getQestions( state ) {
    return state.questions;
}

export function getAnswers( state ) {
    return function (idList){
        let listToReturn = [];
        for(let i = 0; i < state.answers.length; i++){
            for(let j = 0; j < idList.length; j++){
                if(state.answers[i].id === idList[j]){
                    listToReturn.push(state.answers[i]);
            }
        }
            // console.log(state.answers[i].id + ' | ' + idList[i]);

            // if(state.answers[i].id === idList[i]){
                
                // console.log('inside [ ' + idList[i] + ' ]');
                // listToReturn.push(state.answers[i]);
            // }
        }

        return listToReturn;   
    }
}

// export function getAnswers( state ) {
//     return function (idList){
//         let listToReturn = [];
//         for(let i = 0; i < state.answers.length; i++){

//             console.log(state.answers[i].id + ' | ' + idList[i]);

//             if(state.answers[i].id === idList[i]){
//                 // console.log('inside [ ' + idList[i] + ' ]');
//                 listToReturn.push(state.answers[i]);
//             }
//         }

//         return listToReturn;   
//     }
// }
