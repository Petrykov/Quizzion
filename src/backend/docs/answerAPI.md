# Answer API calls

A get request to get all answers 

### GET `/api/answer`

##### Result codes:
* 200 success
* 400 error (details included)

##### Example output

<pre>
[
    {
        "id": "55363daf15d58a32ef7e1333b95660c1",
        "label": "Answer 1-1",
        "name" : "12eqw2e",
        "correct": true
    },
    {
        "id": "63e5a4bc137a3033c5e32774869a8e16",
        "label": "Answer 1-2",
        "name" : "bu2q12v",
        "correct": true
    }
]
</pre>

### GET `/api/answer/:id`

A request to get only 1 answer according to his ID

##### Parameters:
* `:id` id of an answer

##### Result codes:
* 200 success
* 400 error (details included)

##### Example output

<pre>
{
    "id": "55363daf15d58a32ef7e1333b95660c1",
    "label": "Answer 1-1",
    "name" : "asd321",
    "correct": true
}
</pre>

### POST `/api/answer`

A post request to create new answer

##### Body of request: 

The body of request is a JSON object, which contains:
* `label` name of question
* `correct` boolean type if the answer is correct or not

##### Result codes:
* 201 created
* 400 error (details included)

##### Example output

<pre>
{
    "id": "c8cd2cbdf2da1b0126036d2b9be8f475",
    "name" : "hadsf2"
}
</pre>

### PUT `/api/answer/:id`

A request to update data of question

##### Parameters:
* `:id` id of an answer

##### Body of request: 

JSON object, containing fields which are needed to be updated:
* `label` name of answer
* `correct` boolean if answer is correct or not

##### Result codes:
* 200 success
* 400 error (details included)

##### Example output

`{}` and status code 200 OK

### DELETE `/api/answer/:id`

A request to delete an answer

##### Parameters:
* `:id` id of an answer

##### Result codes:
* 200 success
* 400 error (details included)

##### Example output

`{}` and status code 200 OK.

##
### Made by Mark Kravchuk
#### Contact me if you get problems while using my API calls
