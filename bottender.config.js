require('dotenv').config();

module.exports = {
  session: {
    driver: process.env.NODE_ENV === 'production' ? 'mongo' : 'memory',
    stores: {
      memory: {
        maxSize: 500,
      },
      mongo: {
        url:
          process.env.MONGODB_URI ||
          'mongodb://localhost:27017/tw-stock-info-bot',
        collectionName: 'sessions',
      },
    },
  },
  initialState: {},
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken:
        process.env.NODE_ENV === 'production'
          ? process.env.LINE_ACCESS_TOKEN
          : process.env.LINE_ACCESS_TOKEN_DEV,
      channelSecret:
        process.env.NODE_ENV === 'production'
          ? process.env.LINE_CHANNEL_SECRET
          : process.env.LINE_CHANNEL_SECRET_DEV,
    },
  },
};
