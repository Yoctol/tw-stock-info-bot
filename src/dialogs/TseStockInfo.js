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
    marketPrice = null,
    yesterdayClosePrice = null,
    todayOpenPrice = null,
    todayHighestPrice = null,
    todayLowestPrice = null,
  } = await getTseMarketInfo(symbol);

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
                text: `市價：${Number(marketPrice).toFixed(2)} (${sign}${(
                  ((marketPrice - yesterdayClosePrice) / yesterdayClosePrice) *
                  100
                ).toFixed(2)}%)`,
                align: 'center',
                size: 'md',
                weight: 'bold',
                color:
                  marketPrice - yesterdayClosePrice > 0 ? '#FF3C20' : '#33C02B',
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
                    text: `昨收：${Number(yesterdayClosePrice).toFixed(2)}`,
                  },
                  {
                    type: 'text',
                    text: `今開：${Number(todayOpenPrice).toFixed(2)}`,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `今高：${Number(todayHighestPrice).toFixed(2)}`,
                  },
                  {
                    type: 'text',
                    text: `今低：${Number(todayLowestPrice).toFixed(2)}`,
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
                  label: '鉅亨網',
                  uri: `https://invest.cnyes.com/twstock/TWS/${symbol}/overview`,
                },
              },
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
                  label: 'MoneyDJ',
                  uri: `https://www.moneydj.com/KMDJ/Common/ListNewArticles.aspx?svc=WK&a=TW.${symbol}`,
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: '產業鏈',
                  uri: `https://ic.tpex.org.tw/company_chain.php?stk_code=${symbol}`,
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
