module.exports = function findStockInList({ stock, list }) {
  return list.find(stockCandidate => {
    if (
      stock === stockCandidate.symbol.toString() ||
      stock.toLowerCase() === stockCandidate.name.toLowerCase() ||
      (stockCandidate.synonyms &&
        stockCandidate.synonyms.some(
          e => e.toLowerCase() === stock.toLowerCase()
        ))
    ) {
      return true;
    }
    return false;
  });
};
