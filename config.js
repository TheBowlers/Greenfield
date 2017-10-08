
const config = {
  Google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  dbUrl: process.env.MONGO_URL
};

module.exports = config;
