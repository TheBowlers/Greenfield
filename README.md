> Deployed at [crammr.herokuapp.com](https://crammr.herokuapp.com/)

# Crammr

> Crammr is a gamified quizzing app that awards points for correct answers within the given time frame. Users are able to check the leaderboard to see their total score and percentage of questions they've answered correctly. The app's default question bank is populated with software questions but users are able to input their own questions and create custom lesson plans.

## Team

  - __Product Owner__: Kent Shepard
  - __Scrum Master__: Jonathan Lewis
  - __Lead Engineer__: Zack Biernat

## Table of Contents

1. [Development](#development)
    1. [Requirements](#requirements)
    1. [Credentials](#credentials)
    1. [Quick Start](#quick-start)
1. [Contributing](#contributing)

## Development

### Requirements
- Node package manager
- Node v6+
- MongoDB Shard & URL
  - https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/
- Google clientID and clientSecret for Google Login
  - https://console.developers.google.com
- see package.json for dependencies

### Credentials

Once you have acquire your Mongo Shard URL and ID and Secret from Google you will need to store them in config.js in the root directory with the follow format:

```javascript
module.exports = {
  Google: {
    clientID: 'XXXXXXXXXX-XXXXXXXXXXXXXXXXX.apps.googleusercontent.com',
    clientSecret: 'X-XXX-XXX-XXXXXXXX'
  },
  dbUrl: 'mongodb://XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
};
```

### Quick Start

From within the root directory:

`npm install`
`npm start`

If you'd like webpack to watch for any changes run `npm run watch` in a separate terminal.

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.


