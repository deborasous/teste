## PostgreeSQL

### Migration

Cria um 'Commit' das criações e alterações feitas no banco de dados.

```
npx sequelize-cli migration:generate --name nome_da_migration

npx sequelize-cli db:migrate
```

#### Reverter a última migração aplicada ao banco de dados

```
npx sequelize-cli db:migrate:undo
```

#### Adiconar coluna a tabela

```
npx sequelize-cli migration:generate --name add_column_in_tables
```
