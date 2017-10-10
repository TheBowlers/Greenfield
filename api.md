# API

##Start up

Create a data cluster on MongoDB to store 'questions' data and 'users' data. Starting question data has been provided in the 'questions01.json' file. When your cluster is created you get a secure link by clicking "CONNECT" in the landing dashboard. In 'config.js' set the dbUrl property to this secure url. In your 'Security' tab make sure to add the appropriate IP addresses to your IP Whitelist. If your server is being tested or deployed on an IP address that is not approved it will not be able to get a response from the database.


## Users
A new data row for 'users' is generated from Google data when a new user signs in. There is no way to 'POST' a new user via API requests.

### Leaderboard GET

/users GET
Sent when leaderboard data needs to be rendered.

### Parameters

No parameters necessary. Empty request body returns all users' data as an array of objects sorted descending by score. Not all user data is sent, only less sensitive 'stat' related data.

Example:
```JSON
[
    {
        "displayName": "Zack Biernat",
        "score": 22000,
        "questionsAttempted": 10,
        "questionsCorrect": 5
    },
    {
        "displayName": "Kent Shepard",
        "score": 12000,
        "questionsAttempted": 7,
        "questionsCorrect": 2
    }
]
```

### User GET

/users/email?email=USER_EMAIL_ADDRESS
Sends user data to client for a given email address.

### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __email__ |  The user's email address | String | user@gmail.com |

#### Example response:

```JSON
{
    "_id": "59d54e71afbbf6e6860dd780",
    "displayName": "Jonathan Lewis",
    "email": "jonathandavidlewis@gmail.com",
    "score": 14000,
    "token": "Sh4n9u6EtD24TM0RmWv7jTXojqc/v6QHZOtaBb6lx6yHmKClKzYWK30",
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



### Question Answer PUT

/users PUT
Sent when user submits a response to a question. The boolean 'answeredCorrect' is determined on the client side. The variable 'timeToAnswer' is crucial to calculating score. All score calculation is done on the backend. If a question was answered prior the server will update its data. If it is the first time the user has responded the new question data is inserted to the user's data.

### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __email__ |  The user's email address | String | user@gmail.com |
| __question_id__  |  Object containing _id and respondedCorrect   | String | 59d5d9ba47f17d558312855d |
| __timeToAnswer__  |  How long the user took to answer in ms  |  Int  | 5000 |
| __answeredCorrect__  |  whether or not answered correctly  |  Boolean  | true, false |


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
    "token": "Sh4n9u6EtD24TM0RmWv7jTXojqc/v6QHZOtaBb6lx6yHmKClKzYWK30",
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

### /questions GET

`/questions`

Returns all questions

Example reponse
```json
[
    {
        "_id": "59d280d22e38d4a336f661fa",
        "questionType": "textResponse",
        "category": "Westeros geography",
        "questionText": "What is the southern-most kingdom in Westeros?",
        "answerText": "Dorne",
        "difficulty": 2,
        "time": 10000,
        "author": "Zack"
    },
    {
        "_id": "59d53d1499c01f1f98309faa",
        "category": "HTML",
        "questionText": "What is a tag which divides sections of code?",
        "answerText": "div",
        "questionType": "textResponse",
        "difficulty": "1",
        "time": "4000",
        "author": "Kent"
    }
]
```


### /questions/category?category GET

`/questions/category?category=CATEGORY_GOES HERE`

#### Parameters

| param |   description   | data type | examples |
|------------|-----------|----------|-------------|
| __category__ |  The type of question | String | 'HTML' |

#### Response
```JSON
{
   "_id": "59d280d22e38d4a336f661fa",
   "questionType": "textResponse",
   "category": "Westeros geography",
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
| __category__ |  Category to display when showing question | String | 'Function Binding' |
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
   "category": "Westeros geography",
   "questionText": "What is the southern-most kingdom in Westeros?",
   "answerText": "Dorne",
   "difficulty": 2,
   "time": 10000,
   "author": "Zack"
}

```

```JSO
//For multiple questions...
[{
   "_id": "59d280d22e38d4a336f661fa",
   "questionType": "textResponse",
   "category": "Westeros geography",
   "questionText": "What is the southern-most kingdom in Westeros?",
   "answerText": "Dorne",
   "difficulty": 2,
   "time": 10000,
   "author": "Zack"
},
{
  "questionType": "textResponse",
   "category": "Westeros geography",
   "questionText": "What is the northern-most kingdom in Westeros?",
   "answerText": "The North",
   "difficulty": 1,
   "time": 10000,
   "author": "Zack"
}]
```

