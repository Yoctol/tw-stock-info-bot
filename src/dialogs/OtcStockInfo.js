const { Line } = require('messaging-api-line');

const getOtcMarketInfo = require('../utils/getOtcMarketInfo');
const findStockInList = require('../utils/findStockInList');
const otcStockList = require('../utils/otcStockList');

module.exports = async function TseStockInfo(context) {
  const stock = findStockInList({
    stock: context.event.text,
    list: otcStockList,
  });

  const symbol = stock.symbol.toString();
  const name = stock.name;

  const {
    marketPrice,
    yesterdayClosePrice,
    todayOpenPrice,
    todayHighestPrice,
    todayLowestPrice,
  } = await getOtcMarketInfo(symbol);

  const sign = marketPrice - yesterdayClosePrice > 0 ? '+' : '';

  await context.reply([
    Line.createFlex(`${symbol} ${name}`, {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${symbol} ${name}`,
            weight: 'bold',
            size: 'xl',
            align: 'center',
            position: 'relative',
          },
          {
            type: 'separator',
            margin: 'lg',
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: `市價：${marketPrice} (${sign}${(
                  ((marketPrice - yesterdayClosePrice) / yesterdayClosePrice) *
                  100
                ).toFixed(2)}%)`,
                align: 'center',
                size: 'md',
                weight: 'bold',
                color:
                  marketPrice - yesterdayClosePrice > 0 ? '#FF0000' : '#00FF00',
              },
            ],
            margin: 'lg',
          },
          {
            type: 'separator',
            margin: 'lg',
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `昨日收盤：${yesterdayClosePrice}`,
                  },
                  {
                    type: 'text',
                    text: `今日開盤：${todayOpenPrice}`,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `今日最高：${todayHighestPrice}`,
                  },
                  {
                    type: 'text',
                    text: `今日最低：${todayLowestPrice}`,
                  },
                ],
              },
            ],
            margin: 'lg',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'horizontal',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: '玩股網',
                  uri: `https://m.wantgoo.com/stock/${symbol}`,
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'Goodinfo',
                  uri: `https://goodinfo.tw/StockInfo/StockDetail.asp?STOCK_ID=${symbol}`,
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'CMoney',
                  uri: `https://www.cmoney.tw/finance/f00025.aspx?s=${symbol}`,
                },
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: '財報狗',
                  uri: `https://statementdog.com/analysis/tpe/${symbol}`,
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'Fugle',
                  uri: `https://www.fugle.tw/ai/${symbol}`,
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'PTT',
                  uri: `https://www.ptt.cc/bbs/Stock/search?q=${symbol}`,
                },
              },
            ],
          },
          {
            type: 'spacer',
            size: 'sm',
          },
        ],
        flex: 0,
      },
    }),
  ]);
};
