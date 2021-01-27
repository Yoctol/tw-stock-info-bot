const axios = require('axios');

module.exports = async function getTseMarketInfo(symbol) {
  try {
    const t0 = await axios.get('http://mis.twse.com.tw/stock/index.jsp');
    const t1 = await axios.get(
      `http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${symbol}.tw&json=1&delay=0&_=${Date.now()}`,
      {
        headers: {
          Cookie: t0.headers['set-cookie'][0],
        },
      }
    );
    const {
      z: marketPrice,
      y: yesterdayClosePrice,
      o: todayOpenPrice,
      h: todayHighestPrice,
      l: todayLowestPrice,
    } = t1.data.msgArray[0] || {};

    return {
      marketPrice,
      yesterdayClosePrice,
      todayOpenPrice,
      todayHighestPrice,
      todayLowestPrice,
    };
  } catch (error) {
    console.log(error);
  }
};
