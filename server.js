const { initializeServer } = require('bottender');
const minimist = require('minimist');
const { MongoClient } = require('mongodb');

const argv = minimist(process.argv.slice(2));

const isConsole = argv.console;

if (isConsole) {
  initializeServer({ isConsole });
} else {
  const server = initializeServer();

  server.get('/healthz', (req, res) => {
    (async () => {
      try {
        const client = await MongoClient.connect(
          process.env.MONGO_URL || 'mongodb://localhost:27017/twstock-info-bot',
          {
            useUnifiedTopology: true,
          }
        );

        const db = client.db('twstock-info-bot');
        const adminDb = db.admin();
        const pingStatus = await adminDb.ping();
        client.close();

        if (pingStatus.ok !== 1) {
          throw new Error('Mongodb ping not ok');
        }
        res.json({
          status: 'ok',
        });
      } catch (error) {
        res.sendStatus(503);
      }
    })();
  });

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`server is listening on ${port} port...`);
  });
}
