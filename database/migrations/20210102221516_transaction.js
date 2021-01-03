export function up(knex) {
  return knex.schema.createTable("transactions", (t) => {
    t.increments("id");
    t.jsonb("basket");
    t.integer("elem_count");
    t.timestamp("transaction_dt");
    t.timestamps();
    t.timestamp("deleted_at").defaultTo(null);
  });
}

export function down(knex) {
  return knex.schema.dropTable("transactions");
}
