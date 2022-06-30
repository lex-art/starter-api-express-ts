import Knex from 'knex'
import { config } from './db/knexfile'

export default Knex( config.development)


