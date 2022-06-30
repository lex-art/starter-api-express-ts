import { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('token_emails', (table) => {
    table
      .string('user_email')
      .notNullable()
      .references('email')
      .inTable('users')
      .primary()
    table.string('token')
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('token_emails')
}

