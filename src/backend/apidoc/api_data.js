define({ "api": [
  {
    "type": "delete",
    "url": "/answer/:answer_id",
    "title": "Delete answer by id",
    "group": "Answers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "answer_id",
            "description": "<p>Id of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>empty message from parantion's backend</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/answers.js",
    "groupTitle": "Answers",
    "name": "DeleteAnswerAnswer_id"
  },
  {
    "type": "delete",
    "url": "/question/:question_id/remove/:answer_id",
    "title": "Remove an answer from a question",
    "group": "Answers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "question_id",
            "description": "<p>Id of the question</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "answer_id",
            "description": "<p>Id of the answer</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "message",
            "description": "<p>Message from Parantion's backend</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Answers for does not exist</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/questions.js",
    "groupTitle": "Answers",
    "name": "DeleteQuestionQuestion_idRemoveAnswer_id"
  },
  {
    "type": "get",
    "url": "/answer",
    "title": "Get all answers",
    "group": "Answers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "answers",
            "description": "<p>Answers list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.id",
            "description": "<p>Id of the answer.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.label",
            "description": "<p>Label of the answer.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.name",
            "description": "<p>Name of the answer.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.correct",
            "description": "<p>Answer isCorrect value.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/answers.js",
    "groupTitle": "Answers",
    "name": "GetAnswer"
  },
  {
    "type": "get",
    "url": "/answer/:answer_id",
    "title": "Get answer by id",
    "group": "Answers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "answer_id",
            "description": "<p>Id of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "answer",
            "description": "<p>The Answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.id",
            "description": "<p>Id of the answer.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.label",
            "description": "<p>Label of the answer.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.name",
            "description": "<p>Name of the answer.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "answers.correct",
            "description": "<p>Answer isCorrect value.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/answers.js",
    "groupTitle": "Answers",
    "name": "GetAnswerAnswer_id"
  },
  {
    "type": "post",
    "url": "/answer",
    "title": "Create a new answer",
    "group": "Answers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "request",
            "description": "<p>Request body</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.label",
            "description": "<p>Label of the answer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.correct",
            "description": "<p>Answer isCorrect value.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.questionId",
            "description": "<p>Id of the question containing this answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "response.id",
            "description": "<p>New answer's id</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "response.name",
            "description": "<p>New answer's name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/answers.js",
    "groupTitle": "Answers",
    "name": "PostAnswer"
  },
  {
    "type": "put",
    "url": "/answer/:answer_id",
    "title": "Update an answer",
    "group": "Answers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "answer_id",
            "description": "<p>Id of the answer</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "request",
            "description": "<p>Request body</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.label",
            "description": "<p>Label of the answer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.correct",
            "description": "<p>Answer isCorrect value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "message",
            "description": "<p>Message from Parantion's backend</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/answers.js",
    "groupTitle": "Answers",
    "name": "PutAnswerAnswer_id"
  },
  {
    "type": "delete",
    "url": "/question/:question_id/question",
    "title": "Remove a question using id",
    "group": "Questions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "question_id",
            "description": "<p>Id of the question</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/questions.js",
    "groupTitle": "Questions",
    "name": "DeleteQuestionQuestion_idQuestion"
  },
  {
    "type": "get",
    "url": "/question",
    "title": "Get all quiz master's questions",
    "group": "Questions",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>List of questions.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.id",
            "description": "<p>Id of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.title",
            "description": "<p>Title of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.description",
            "description": "<p>Description of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.image",
            "description": "<p>Image of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "questions.time",
            "description": "<p>Time of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.name",
            "description": "<p>Name of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.quiz_id",
            "description": "<p>Quiz id of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "questions.answers",
            "description": "<p>Answers of the question.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/questions.js",
    "groupTitle": "Questions",
    "name": "GetQuestion"
  },
  {
    "type": "get",
    "url": "/question/:question_id",
    "title": "Get a question by id",
    "group": "Questions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Question",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>A question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.id",
            "description": "<p>Id of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>Title of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.description",
            "description": "<p>Description of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.image",
            "description": "<p>Image of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "question.time",
            "description": "<p>Time of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.name",
            "description": "<p>Name of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "question.quiz_id",
            "description": "<p>Quiz id of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "question.answers",
            "description": "<p>Answers of the question.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/questions.js",
    "groupTitle": "Questions",
    "name": "GetQuestionQuestion_id"
  },
  {
    "type": "get",
    "url": "/quizzes/:quiz_id/question",
    "title": "Get questions from 1 quiz",
    "group": "Questions",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quiz_id",
            "description": "<p>Id of the quiz</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "questions",
            "description": "<p>List of questions.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.id",
            "description": "<p>Id of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.title",
            "description": "<p>Title of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.description",
            "description": "<p>Description of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.image",
            "description": "<p>Image of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "questions.time",
            "description": "<p>Time of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.name",
            "description": "<p>Name of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "questions.quiz_id",
            "description": "<p>Quiz id of the question.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "questions.answers",
            "description": "<p>Answers of the question.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/questions.js",
    "groupTitle": "Questions",
    "name": "GetQuizzesQuiz_idQuestion"
  },
  {
    "type": "post",
    "url": "/quizzes/:quiz_id/question",
    "title": "Create new question",
    "group": "Questions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "quiz_id",
            "description": "<p>Id of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>The question object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>Title of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question.description",
            "description": "<p>Description of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question.image",
            "description": "<p>Image of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "question.time",
            "description": "<p>Time of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "question.answers",
            "description": "<p>Answers of the question.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the newly created question.</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the newly created question.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/questions.js",
    "groupTitle": "Questions",
    "name": "PostQuizzesQuiz_idQuestion"
  },
  {
    "type": "put",
    "url": "/question/:question_id",
    "title": "Update a question",
    "group": "Questions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "question_id",
            "description": "<p>Id of the question</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "question",
            "description": "<p>The question object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question.title",
            "description": "<p>Title of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question.description",
            "description": "<p>Description of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question.image",
            "description": "<p>Image of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "question.time",
            "description": "<p>Time of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "question.answers",
            "description": "<p>Array of string with id`s of answers</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "message",
            "description": "<p>Empty message from Parantion's backend</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/questions.js",
    "groupTitle": "Questions",
    "name": "PutQuestionQuestion_id"
  },
  {
    "type": "delete",
    "url": "/quizzes/:quizId",
    "title": "Delete quiz by id",
    "group": "Quizzes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Quiz unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "message",
            "description": "<p>Empty Message.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/quizzes.js",
    "groupTitle": "Quizzes",
    "name": "DeleteQuizzesQuizid"
  },
  {
    "type": "get",
    "url": "/quizzes/",
    "title": "Get all quizzes' basic info",
    "group": "Quizzes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "quizzes",
            "description": "<p>List of quizzes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.id",
            "description": "<p>Id of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.color",
            "description": "<p>Color of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.description",
            "description": "<p>Description of the quiz.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/quizzes.js",
    "groupTitle": "Quizzes",
    "name": "GetQuizzes"
  },
  {
    "type": "get",
    "url": "/quizzes/all",
    "title": "Get all quizzes' information",
    "group": "Quizzes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "quizzes",
            "description": "<p>List of quizzes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.id",
            "description": "<p>Id of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.color",
            "description": "<p>Color of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.description",
            "description": "<p>Description of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.owner",
            "description": "<p>Owner of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.title",
            "description": "<p>Title of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quizzes.logo",
            "description": "<p>Logo of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "quizzes.questions",
            "description": "<p>Questions of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "quizzes.active",
            "description": "<p>Status of the quiz.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/quizzes.js",
    "groupTitle": "Quizzes",
    "name": "GetQuizzesAll"
  },
  {
    "type": "get",
    "url": "/quizzes/:quizId",
    "title": "Get a quiz by id",
    "group": "Quizzes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Quiz unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "quiz",
            "description": "<p>Quiz Object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.id",
            "description": "<p>Id of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.color",
            "description": "<p>Color of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.description",
            "description": "<p>Description of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.owner",
            "description": "<p>Owner of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.title",
            "description": "<p>Title of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.logo",
            "description": "<p>Logo of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "quiz.questions",
            "description": "<p>Questions of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "quiz.active",
            "description": "<p>Status of the quiz.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/quizzes.js",
    "groupTitle": "Quizzes",
    "name": "GetQuizzesQuizid"
  },
  {
    "type": "get",
    "url": "/quizzes/:quizId/content",
    "title": "Get a quiz's content by id",
    "group": "Quizzes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Quiz unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "quiz",
            "description": "<p>Quiz Object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.owner",
            "description": "<p>Owner of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.title",
            "description": "<p>Title of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.logo",
            "description": "<p>Logo of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "quiz.questions",
            "description": "<p>Questions of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "quiz.active",
            "description": "<p>Status of the quiz.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/quizzes.js",
    "groupTitle": "Quizzes",
    "name": "GetQuizzesQuizidContent"
  },
  {
    "type": "post",
    "url": "/quizzes",
    "title": "Create new quiz",
    "group": "Quizzes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "quiz",
            "description": "<p>Quiz Object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quiz.id",
            "description": "<p>Id of the quiz.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "quiz.message",
            "description": "<p>Message from Parantion's backend.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/quizzes.js",
    "groupTitle": "Quizzes",
    "name": "PostQuizzes"
  },
  {
    "type": "post",
    "url": "/quizzes/:quizId/start",
    "title": "Start the quiz",
    "group": "Quizzes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Id of the Invited quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "request",
            "description": "<p>Request.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "request.quiz",
            "description": "<p>Quiz information</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "request.questions",
            "description": "<p>Questions of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "request.answers",
            "description": "<p>Answers of the quiz</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "quizList",
            "description": "<p>temporary quiz list</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Errors occured!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/respondent.js",
    "groupTitle": "Quizzes",
    "name": "PostQuizzesQuizidStart"
  },
  {
    "type": "put",
    "url": "/quizzes/:quizId/edit",
    "title": "Update a quiz by id",
    "group": "Quizzes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Moderator's token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Quiz unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "quiz",
            "description": "<p>Quiz Object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quiz.label",
            "description": "<p>Color of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quiz.description",
            "description": "<p>Description of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quiz.owner",
            "description": "<p>Owner of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quiz.title",
            "description": "<p>Title of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quiz.logo",
            "description": "<p>Logo of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "quiz.questions",
            "description": "<p>Questions of the quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "quiz.active",
            "description": "<p>Status of the quiz.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "message",
            "description": "<p>Message from Parantion's backend.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/quizzes.js",
    "groupTitle": "Quizzes",
    "name": "PutQuizzesQuizidEdit"
  },
  {
    "type": "post",
    "url": "/respondent/join/:quizId",
    "title": "Join a quiz as a respondent",
    "group": "Respondents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Id of the Invited quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the respondent.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "respondent",
            "description": "<p>Respondent</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique id for respondent</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Errors occured!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/respondent.js",
    "groupTitle": "Respondents",
    "name": "PostRespondentJoinQuizid"
  },
  {
    "type": "post",
    "url": "/respondent/:quizId/answer",
    "title": "Start the quiz",
    "group": "Respondents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Id of the Invited quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "request",
            "description": "<p>Request.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.uid",
            "description": "<p>Quiz information</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.answerLabel",
            "description": "<p>Questions of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.isCorrect",
            "description": "<p>Answers of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.questionTitle",
            "description": "<p>Answers of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.time",
            "description": "<p>Answers of the quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "request.totalTime",
            "description": "<p>Answers of the quiz</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Successfully added!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Errors occured!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/respondent.js",
    "groupTitle": "Respondents",
    "name": "PostRespondentQuizidAnswer"
  },
  {
    "type": "get",
    "url": "/:quizId/result/respondent/:id",
    "title": "Get respondent's result",
    "group": "Results",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Id of the Invited quiz.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Respondent</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>Respondent's result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.questionTitle",
            "description": "<p>Respondent's result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.answerLabel",
            "description": "<p>Respondent's result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.correct",
            "description": "<p>Respondent's result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.score",
            "description": "<p>Respondent's result</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Errors occured!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/respondent.js",
    "groupTitle": "Results",
    "name": "GetQuizidResultRespondentId"
  },
  {
    "type": "get",
    "url": "/results/:quizId",
    "title": "Get Quiz's result",
    "group": "Results",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Id of the Invited quiz.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>respondents' result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.uid",
            "description": "<p>Respondents id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "result.uid.result",
            "description": "<p>Respondent's result</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.uid.result.object",
            "description": "<p>Respondent's result</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.uid.result.object.displayName",
            "description": "<p>Respondent's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.uid.result.object.correct",
            "description": "<p>Respondent's isCorrect</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.uid.result.object.score",
            "description": "<p>Respondent's score</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Errors occured!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/respondent.js",
    "groupTitle": "Results",
    "name": "GetResultsQuizid"
  },
  {
    "type": "delete",
    "url": "/user/logout",
    "title": "Logout for quiz master",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Quiz master's token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Log out successfully!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User",
    "name": "DeleteUserLogout"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "Login for quiz master",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password hash of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Authenticated User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.uh",
            "description": "<p>User hash of authenticated User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username of authenticated User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Email of authenticated User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.middlename",
            "description": "<p>Middle name of authenticated User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastname",
            "description": "<p>Last name of authenticated User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.token",
            "description": "<p>Token of authenticated User</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "Bad",
            "description": "<p>request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User",
    "name": "PostUserLogin"
  }
] });
