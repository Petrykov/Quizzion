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
        "message": [],
    }
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
     "uh": "", 
     "tn": "",
       
}
```

#### Response

```sh
    {
        "message": [],
    }
```

