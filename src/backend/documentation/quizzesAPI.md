# API 

# Quizzes


## GET requests

1. Get all the quizzes with all the possible informations

`quizzes/all`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request

#### Response
```sh
  {
        "id": "b2mh4t9jr",
        "color": "#008080",
        "description": "Random things you should know!",
        "owner": "WandaE",
        "title": "Pubquiz - Quarantine edition",
        "logo": "looogo",
        "questions": "dt6r",
        "active": "false"
    },
    {
        "id": "e34bbcwdg",
        "color": "#ffa500",
        "description": "mock quiz for demo",
        "owner": "WandaE",
        "title": "General knowledge",
        "logo": "looogo",
        "questions": "dr5rty",
        "active": "false"
    }, ...
```
2. Get all the data about one quiz

`quizzes/:quizId`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request

`quizId` - string

#### Response
```sh
 {
        "id": "b2mh4t9jr",
        "color": "#008080",
        "description": "Random things you should know!",
        "owner": "WandaE",
        "title": "Pubquiz - Quarantine edition",
        "logo": "looogo",
        "questions": "dt6r",
        "active": "false"
    },
```

3. Get all quizzes basic information (id, color, description) - for the left side of the dashboard.

`quizzes/`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request



#### Response
```sh
  {
        "id": "b2mh4t9jr",
        "color": "#008080",
        "description": "Random things you should know!"
    },
    {
        "id": "e34bbcwdg",
        "color": "#ffa500",
        "description": "mock quiz for demo"
    }, ...
```

4. Get details about particular quiz

`quizzes/:quizId/content`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request
`quizId` - string


#### Response
```sh
  {"owner":"WandaE",
  "title":"Pubquiz - Quarantine edition",
  "logo":"looogo",
  "questions":"dt6r",
  "active":"false"}
```


## DELETE request

Delete a quiz by id

`quizzes/:quizId/`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request
`quizId` - string


#### Response
```sh
  {
        "message": []
    }
```

## POST requests

Create a new quiz

`quizzes/`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request
```sh
{
     "label":"#008080",
     "description": "Random things you should know!",
     "owner": "WandaE",
     "title": "Pubquiz - Quarantine edition",
     "logo": "looogo",
     "questions": "dt6r",
     "active": "false"  
    
}
```

#### Response

`tn` - id of a quiz

```sh
  
    {
        "message": [],
        "tn": "evxzmj4mm"
    }
```

## PUT requests

1. Update template - color and description

`quizzes/:quizId`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request
```sh
quizId as params
```


```sh
{
     "label":"#008080",
     "description": "Random things you should know!",
    
}
```

#### Response


```sh
  
    {
        "message": [],
    }
```

2. Update content of a quiz 

`quizzes/:quizId/content`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request
```sh
quizId as params
```


```sh
{
     "owner": "WandaE",
     "title": "Pubquiz - Quarantine edition",
     "logo": "looogo",
     "questions": "dt6r",
     "active": "false"  
    
}
```

#### Response



```sh
  
    {
        "message": [],
    }
```

# Form

## GET request

1. Get all the forms.

`quizzes/start`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request


#### Response

```sh
   {
              "fh": "2ea7708e7229e8ddb2e179882388d13c",
              "frm_label": "Mark form label",
              "parent": "2f112dbfb07e0820d2dfd602fa6085dc",
              "uh": "b42050a333bd7ad0befd7dfbb9dc4879",
              "tn": "",
              "vgn": "",
              "type": "survey",
              "frm_status": 1,
              "gn": "",
              "tih": "",
              "update": 1
          },
```
2. Get particular form by id

`quizzes/start/:formId`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request

`formId` as params

#### Response
```sh
{
    "message": [],
    "form": [
        {
            "fh": "2ea7708e7229e8ddb2e179882388d13c",
            "frm_label": "Mark form label",
            "parent": "2f112dbfb07e0820d2dfd602fa6085dc",
            "uh": "b42050a333bd7ad0befd7dfbb9dc4879",
            "tn": "",
            "vgn": "",
            "type": "survey",
            "frm_status": 1,
            "gn": "",
            "tih": "",
            "update": 1,
            "field": {
                "frm_date_created": "2020-05-30T16:12:03+0200",
                "frm_label": "Mark form label",
                "frm_status": 1,
                "frm_nonamed_users_used": 124
            }
        }
    ]
}
```
## POST request

`quizzes/start`

#### Headers

```sh
'X-CSRFToken': token,
'X-Database': 'lab',
'Content-Type': 'application/json'
  ```

#### Request


```sh
{
     "uh": "", // user hash
     "tn": "", //template id
       
}
```

#### Response

```sh
    {
        "message": [],
        "form": [
            "ed34d05d83bb394c6cd1c6e2c7a23fef"
        ]
    }
```

