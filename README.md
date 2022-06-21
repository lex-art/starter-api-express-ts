## Correr migaciones
> Tener instalado knex globalmente solo para esta parte

- Crear una migración nueva
  `npm run knex:migrate:make tamble_name -x ts --env development || production`
- Correr migraciones (cuando corras migraciones en local, settea las variables directamente, porque no reconocera las variables de entorno)
  `npm run knex:migrate:latest --env development || production`
- Correr una migración en especifico (settea primero tus variables)
  `npm run knex:migrate:up name_file.ts --env development || production` 
- Crear un seed
  `npm run knex:seed:make name_seed -x ts --env development || production`
- Correr seeds (cuando corras seeds en local, settea las variables directamente, porque no reconocera las variables de entorno)
  `npm run knex:seed:run --env development || production`
- Correr un seed en especifico (settea primero tus variables)
  `npm run knex:seed:run --specific=file_name.ts  --env development || production`