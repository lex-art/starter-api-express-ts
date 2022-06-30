import { User, TokensEmail } from '../interfaces/tables_db'

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    token_emails: TokensEmail
  }
}