# API

## Users

### Leaderboard GET

/users GET
Sent when leaderboard data needs to be rendered

### Parameters

No parameters necessary. Empty request body returns all users' data as an array of objects.

Example:
```JSON
[
    {
        "displayName": "Zack Biernat",
        "score": 22000,
        "questionsAttempted": 10,
        "questionsCorrect": 5
    }
]
```

### Question Answer PUT

/users PUT
Sent when user submits a response to a question

### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __email__ |  The user's email address | String | user@gmail.com |
| __question_id__  |  Object containing _id and respondedCorrect   | String | asfueihf375y4 |
| __timeToAnswer__  |  How long the user took to answer in ms  |  Int  | 5000 |
| __isCorrect__  |  whether or not answered correctly  |  Boolean  | true, false |


Example:
```JSON
{
  "email": "jonathandavidlewis@gmail.com",
  "question_id": "59d5d9ba47f17d558312855d",
  "timeToAnswer": 5000,
  "answeredCorrect": true
}

```
#### Example Response

```JSON
{
    "_id": "59d54e71afbbf6e6860dd780",
    "displayName": "Jonathan Lewis",
    "email": "jonathandavidlewis@gmail.com",
    "score": 14000,
    "token": "\"Sh4n9u6EtD24TM0RmWv7jTXojqc/v6QHZOtaBb6lx6yHmKClKzYWK30\"",
    "image": "https://lh3.googleusercontent.com/-rYHI9wtK9Cc/AAAAAAAAAAI/AAAAAAAAFcs/HL8ghRxkbSk/photo.jpg?sz=50",
    "questionsAnswered": [
        "59d5d9ba47f17d558312855d": {
            "id": "59d5d9ba47f17d558312855d",
            "bestTimeToAnswer": 5000,
            "pointsAwarded": 1400,
            "respondedCorrect": true,
            "lastPoints": 1400
        }
    ],
    "qustionsAttempted": 1,
    "questionsCorrect": 1
}
```



## Questions

### Client GET request for question
```JSON

{
  "questionType": "textResponse",
  "points": 0,
  "questionData": {
      "_id": "asfueihf375y4",
      "respondedCorrect": "true"
      }
}



```

### /questions GET

`/questions`

Returns all questions

Example reponse
```json
{
        "_id": "59d53ce599c01f1f98309fa9",
        "title": "asdf",
        "questionText": "sadf",
        "answerText": "asdf",
        "questionType": "textResponse",
        "difficulty": "1",
        "time": "5",
        "author": "admin"
    },
    {
        "_id": "59d53d1499c01f1f98309faa",
        "title": "asdf",
        "questionText": "asdf",
        "answerText": "asdf",
        "questionType": "textResponse",
        "difficulty": "1",
        "time": "4",
        "author": "admin"
    },
```


### /questions?questionType GET

`/questions?questionType=textResponse`

#### Parameters

| param |   description   | data type | examples |
|------------|-----------|----------|-------------|
| __questionType__ |  The type of question | String | 'textResponse' |

#### Response
```JSON
{
   "_id": "59d280d22e38d4a336f661fa",
   "questionType": "textResponse",
   "title": "Westeros geography",
   "questionText": "What is the southern-most kingdom in Westeros?",
   "answerText": "Dorne",
   "difficulty": 2,
   "time": 10000,
   "author": "Zack"
}

```

### questions/ POST

#### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __questionType__ |  The type of question | String |'textResponse' |
| __title__ |  Title to display when showing question | String | 'Function Binding' |
| __questionText__ |  The question text displayed to the user | String | 'What Array method removes and returns the last element in an array?' |
| __answerText__ |  The text of the correct answer | String | 'pop' |
| __difficulty__ |  Difficult of answering the question, 1-5 |Int | 1, 2, 3, 4, 5 |
| __time__ |  time to answer for full points in milliseconds | Int | 3000 |
| __author__ |  Username of the author | String | 'Zack' |

#### Response
```JSON
{
   "_id": "59d280d22e38d4a336f661fa",
   "questionType": "textResponse",
   "title": "Westeros geography",
   "questionText": "What is the southern-most kingdom in Westeros?",
   "answerText": "Dorne",
   "difficulty": 2,
   "time": 10000,
   "author": "Zack"
}

```
