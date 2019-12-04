module.exports = async function Greeting(context) {
  await context.sendText(
    '我是台股資訊小幫手，輸入股票代號或名稱，即時資訊報你知！\n\n也歡迎把我加入群組喔～'
  );
};
