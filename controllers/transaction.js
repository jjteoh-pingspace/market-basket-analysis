import knex from "../database/knex";
import * as TransactionService from "../services/transactions";

export const seedData = async (req, res) => {
  return await knex.transaction(async (trx) => {
    await TransactionService.truncateTable(trx);

    let trans = TransactionService.generateData(2000, 1, 10, 5);
    await TransactionService.saveData(trans, trx);

    trans = TransactionService.generateData(1000, 1, 10, 3);
    await TransactionService.saveData(trans, trx);

    trans = TransactionService.generateData(700, 1, 20, 6);
    await TransactionService.saveData(trans, trx);

    trans = TransactionService.generateData(1000, 10, 20, 10);
    await TransactionService.saveData(trans, trx);

    // trans = TransactionService.generateData(300, 1, 20, 10);
    // await TransactionService.saveData(trans);

    trans = TransactionService.generateData(300, 1, 30, 20);
    await TransactionService.saveData(trans, trx);

    return res.json({ msg: "completed" });
  });

  // trans = TransactionService.generateData(500, 1, 31, 21);
  // await TransactionService.saveData(trans);

  // trans = TransactionService.generateData(1000, 20);
  // await TransactionService.saveData(trans);
};
