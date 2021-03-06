import { Model } from "objection";
import knex from "../../database/knex";
import softDelete from "objection-soft-delete";

Model.knex(knex);

class AprioriFrequentSet extends softDelete({
  columnName: `deleted_at`,
  deletedValue: knex.fn.now(),
  notDeletedValue: null,
})(Model) {
  static get tableName() {
    return "apriori_frequent_set";
  }
  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        deleted: { type: "boolean" },
      },
    };
  }
}

export default AprioriFrequentSet;
