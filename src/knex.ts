import Knex from "knex";
import { config } from './db/knexfile';
const enviroment =  process.env.NODE_ENV || 'development';

export default Knex(config[enviroment]);


