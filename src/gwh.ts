#!/usr/bin/env node

import program from 'commander'
import migrate from './migrate'
import getModels from './models'

program
  .command('migrate <configPath>')
  .description(
    'Migrate the database with the last schema of graphql-web-hook. We advise to provide a separated schema.'
  )
  .action(async function (configPath) {
    let dbConfig = null
    try {
      dbConfig = require(configPath)
    } catch (e: any) {
      throw new Error('Could not load the given config.' + e.message)
    }
    const models = getModels({dbConfig})
    await migrate(models)
    await models.sequelize.close()
  })

program.command('help', 'Display the help')

program.parse(process.argv)
