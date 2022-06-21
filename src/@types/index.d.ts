import { Knex } from "knex";
import { User } from "../interfaces/user";

declare module "knex/types/tables" {
  interface Tables {
    users: User;
  }
}
