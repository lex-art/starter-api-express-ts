import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.string("user_name");
        table.string("first_name").notNullable();
        table.string("last_name");
        table.string("password").notNullable();
        table.string("email").notNullable().primary();
        table.string("su", 30);
        table.boolean("is_active").defaultTo(true);
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

