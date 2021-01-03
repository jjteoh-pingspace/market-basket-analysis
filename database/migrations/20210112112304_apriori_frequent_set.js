export function up(knex) {
  return knex.schema.createTable("apriori_frequent_set", (t) => {
    t.increments("id");
    t.string("itemset");
    t.integer("sup_count");
    t.timestamps();
    t.timestamp("deleted_at").defaultTo(null);
  });
}

export function down(knex) {
  return knex.schema.dropTable("apriori_frequent_set");
}
