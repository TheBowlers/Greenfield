# Project Name

> Pithy project description

## Team

  - __Product Owner__: Kent Shepard
  - __Scrum Master__: Jonathan Lewis
  - __Lead Engineer__: Zack Biernat

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


## API

### Users

#### Question Answer PUT

/users PUT
Sent when user submits a response to a question

#### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __email__ |  The user's email address | String | user@gmail.com |
| __question_id__  |  Object containing _id and respondedCorrect   | String | asfueihf375y4 |
|  __timeToAnswer__  |  How long the user took to answer in ms  |  Int  | 5000 |
| __pointsAwarded__  |  The number of points awarded (0 if incorrect)  |  Int  | 1000 |


Example:
```JSON
{
  "email": "zackbiernat@gmail.com",
  "pointsAwarded": 0,
  "question_id": "asfueihf375y4",
  "timeToAnswer": 25000
}

```
##### Example Response

```JSON
{
   "_id": "59d403fe9cfbabc8ebfce63d",
   "displayName": "Zack Biernat",
   "email": "zackbiernat@gmail.com",
   "score": 115,
   "token": "Sh4n9u6EtD24TM0RmWv7jTXojqc/bF-MSzFdiRCGppa2abn2rW-_deA",
   "image": "https://lh3.googleusercontent.com/-z0Z8/AAAAAI/AAAAIM/r49UX6Y/photo.jpg?sz=50",
   "questionsAnswered": {
     "asfueihf375y4": {
       "bestTimeToAnswer": "25000",
       "totalPointsAwarded": 3645
     }
   } 
}




```



### Questions

Client GET request for question
```JSON

{
  "questionType": "zackbiernat@gmail.com",
  "points": 0,
  "questionData": {
      "_id": "asfueihf375y4",
      "respondedCorrect": "true"
      }
}



```

/questions GET

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

questions/ POST

#### Parameters

| param |   description   | data type | examples |
|------------|-----------|----------|
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