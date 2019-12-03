const { Line } = require('messaging-api-line');

const getTseMarketInfo = require('../utils/getTseMarketInfo');
const findStockInList = require('../utils/findStockInList');
const tseStockList = require('../utils/tseStockList');

module.exports = async function TseStockInfo(context) {
  const stock = findStockInList({
    stock: context.event.text,
    list: tseStockList,
  });

  const symbol = stock.symbol.toString();
  const name = stock.name;

  const {
    marketPrice,
    yesterdayClosePrice,
    todayOpenPrice,
    todayHighestPrice,
    todayLowestPrice,
  } = await getTseMarketInfo(symbol);

  const sign = marketPrice - yesterdayClosePrice > 0 ? '+' : '';

  await context.reply([
    Line.createText(
      `${symbol}\n${name}\n\n市價：${marketPrice}\n漲幅：${sign}${(
        ((marketPrice - yesterdayClosePrice) / yesterdayClosePrice) *
        100
      ).toFixed(
        2
      )}%\n\n今日開盤：${todayOpenPrice}\n昨日收盤：${yesterdayClosePrice}\n今日最高：${todayHighestPrice}\n今日最低：${todayLowestPrice}`
    ),
    Line.createCarouselTemplate(`${symbol} ${name}`, [
      {
        title: '分析網站',
        text: '資訊都在這',
        actions: [
          {
            type: 'uri',
            label: '玩股網',
            uri: `https://m.wantgoo.com/stock/${symbol}`,
          },
          {
            type: 'uri',
            label: 'Goodinfo',
            uri: `https://goodinfo.tw/StockInfo/StockDetail.asp?STOCK_ID=${symbol}`,
          },
          {
            type: 'uri',
            label: 'CMoney',
            uri: `https://www.cmoney.tw/finance/f00025.aspx?s=${symbol}`,
          },
        ],
      },
      {
        title: '分析網站',
        text: '資訊都在這',
        actions: [
          {
            type: 'uri',
            label: '財報狗',
            uri: `https://statementdog.com/analysis/tpe/${symbol}`,
          },
          {
            type: 'uri',
            label: 'Fugle',
            uri: `https://www.fugle.tw/ai/${symbol}`,
          },
          {
            type: 'uri',
            label: 'PTT',
            uri: `https://www.ptt.cc/bbs/Stock/search?q=${symbol}`,
          },
        ],
      },
    ]),
  ]);
};
