# Question API calls

### GET `/api/question`

Get a list of all questions related to quizmaster user

Result codes:
* 200 success
* 400 error (details included)

Example of response: 

<pre>
[
    {
        "id": "cdbe427b426b957512b7554041adcf11",
        "title": "Question title",
        "description": "some description",
        "image": "image for question",
        "time": 212,
        "name": "asad32e1",
        "quiz_id" : "myquiz1",
        "answers": [
            "55363daf15d58a32ef7e1333b95660c1",
            "sample_id_2",
            "sample_id_3"
        ]
    }
]
</pre>

### GET `/api/question/:id`

A request to get all data about 1 question

##### Parameters:
* `:id` question id to receive

##### Result codes:
* 200 success
* 400 error (details included)

##### Example output

<pre>
{
    "id": "cdbe427b426b957512b7554041adcf11",
    "title": "next level x4",
    "description": "some description x44",
    "image": "image 222",
    "quiz_id" : "my_quiz1",
    "name": "asad32e1",
    "time": 212,
    "answers": [
        "55363daf15d58a32ef7e1333b95660c1",
        "sample_id_2",
        "sample_id_3"
    ]
}
</pre>

### GET `/api/quizzes/:id/question`

A request to get list of questions only for 1 quiz

##### Parameters:
* `:id` id of quiz

##### Result codes:
* 200 success
* 400 error (details included)

##### Example output 

Exactly the same as for **GET `/api/question`**

### POST `/api/quizzes/:id/question`

A request to store on the server newly created question

##### Parameters:

* `:id` id of a quiz. Is important because later question can be retrieved in **GET `/api/quizzes/:id/question`** request

Also after this request, an id of question is stored in quiz object itself

##### Body of request: 

JSON object of question, which contains fields:

* `title` string value
* `description` string value
* `image` string value
* `time` integer / string value
* `quiz_id` id of quiz where question appears

Optional: 

* `questions` array of string with id`s of answers

Example: 

<pre>
{
	"title" : "Question title",
	"description" : "some description",
	"image" : "some link to the image",
	"time" : 15,
	"answers": ["answer_id_1","answer_id_1"]
	"quiz_id" : 
}
</pre>

##### Result codes:
* 201 created
* 400 error (details included)

##### Example output

<pre>
{
    id: "id_of_created_question",
    name: "auto_generated_name"
}
</pre>
 and status code **201 Created**

### PUT `/api/question/:id`

A request to update values of question

##### Parameters

* `:id` id of a question

##### Body of request: 

JSON object with the fields which need to be changed:

* `title` string value
* `description` string value
* `image` string value
* `time` integer / string value
* `questions` array of string with id`s of answers
* `quiz_id` id of quiz where question is assigned to

Example: 

<pre>
{
	"description" : "some description",
	"time" : 15,
	"answers": ["answer_id_1","answer_id_1"]
}
</pre>

##### Result codes:
* 200 success
* 400 error (details included)

##### Example output

`{}` and status code 200 OK

### DELETE `/api/quetsion/:id`

A request to delete the question item

##### Parameters

* `:id` id of a question

##### Result codes
* 200 OK
* 400 error (details included)

##### Example output 

`{ "message" : "deleted"}` and status code **200 OK**

### PUT `/api/question/:id/add/:id2`

A request to add a new answer to a question through separate API call.
Is handy, just pass new id of answer to add, and API will do it.

##### Parameters
* `:id` question id
* `:id2` answer id to be added to question

##### Result codes
* 200 OK
* 400 error (details included)

##### Example output 

`{}` and status code 200 OK

### DELETE `/api/question/:id/remove/:id2`

A request to remove an answer from a question through separate API call.

##### Parameters
* `:id` question id
* `:id2` answer id to be added to question

##### Result codes
* 200 OK
* 400 error (details included)

##### Example output 

`{}` and status code 200 OK

##
### Made by Mark Kravchuk
#### Contact me if you get problems while using my API calls
