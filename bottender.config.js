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
          'mongodb://localhost:27017/twstock-info-bot',
        collectionName: 'sessions',
      },
    },
  },
  initialState: {},
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken: process.env.LINE_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
    },
  },
};
