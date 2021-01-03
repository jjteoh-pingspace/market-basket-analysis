import Transaction from "../database/models/transaction";

export const truncateTable = async (trx) => {
  await Transaction.query(trx).truncate();
};

export const generateData = (counter, min, max, bias) => {
  let i = 0;
  let transactions = [];

  while (i < counter) {
    let maxInTran = i < 300 ? 3 : 5,
      minInTran = 1,
      itemCountInTran = _getItemCountInTran(maxInTran, minInTran),
      itemsInTran = _getItemsInTran(itemCountInTran, min, max, bias);
    transactions.push(itemsInTran);
    i++;
  }
  return transactions;
};

export const saveData = async (trans, trx) => {
  let startDate = new Date(2020, 0, 1);
  let endDate = new Date(2020, 3, 30);

  await Transaction.query(trx).insert(
    trans.map((t) => {
      return {
        basket: { items: t },
        elem_count: t.length,
        transaction_dt: _randomDate(startDate, endDate),
      };
    })
  );
};

const _getItemCountInTran = (max, min) => {
  return Math.floor(Math.random() * (max - min) + 1) + 1;
};

const _randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const _getItemsInTran = (count, min, max, bias) => {
  let arr = [];
  // let max = 31;
  // let min = 1;

  while (arr.length < count) {
    let influence = Math.random() * 1;
    let num = Math.floor(Math.random() * (max - min) + 1);
    num = Math.floor(num * (1 - influence) + bias * influence);
    if (!arr.includes(num)) arr.push(num);
  }
  return arr;
};
