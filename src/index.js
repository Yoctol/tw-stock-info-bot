const { router, route } = require('bottender/router');

const findStockInList = require('./utils/findStockInList');
const otcStockList = require('./utils/otcStockList');
const tseStockList = require('./utils/tseStockList');

const Greeting = require('./dialogs/Greeting');
const TseStockInfo = require('./dialogs/TseStockInfo');
const OtcStockInfo = require('./dialogs/OtcStockInfo');

module.exports = async function App() {
  return router([
    route(context => context.event.isFollow || context.event.isJoin, Greeting),
    route(
      context =>
        context.event.isText &&
        !!findStockInList({ stock: context.event.text, list: tseStockList }),
      TseStockInfo
    ),
    route(
      context =>
        context.event.isText &&
        !!findStockInList({ stock: context.event.text, list: otcStockList }),
      OtcStockInfo
    ),
  ]);
};
