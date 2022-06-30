import { Knex } from 'knex'
import { encrypt } from '../../../helper/handleBcrypt'


export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      user_name: 'lex-art',
      first_name: 'Oscar',
      last_name: 'Chanax',
      email: 't642199@gmail.com',
      su: 'admin',
      password: await encrypt('123456')
    }
  ])
}
