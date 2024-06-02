import fs from 'fs'
import path from 'path'
import { DataTypes, Sequelize } from 'sequelize'

let db: any = null

/**
 * In a standard project the configuration is a commited file. But here
 * you can specify it if needed. So we have to expose a getter that caches
 * the models.
 *
 * It must be noted that NJ does not support changing the models configuration
 * once the models are fetched.
 */
function initDb({dbConfig, sequelizeInstance}: any) {
  const basename = path.basename(module.filename)
  db = {}

  if (
    typeof dbConfig.use_env_variable !== 'undefined' &&
    dbConfig.use_env_variable && 
    !sequelizeInstance
  ) {
    sequelizeInstance = new Sequelize()
  } else if(!sequelizeInstance) {
    const connexion =
      process.env.NODE_ENV &&
      typeof dbConfig[process.env.NODE_ENV] !== 'undefined'
        ? dbConfig[process.env.NODE_ENV]
        : dbConfig
    sequelizeInstance = new Sequelize(connexion)
  }

  fs.readdirSync(__dirname)
    .filter(function (file) {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      )
    })
    .forEach(function (file) {
      const model = require(path.join(__dirname, file)).default(
        sequelizeInstance,
        DataTypes
      )
      db[model.name] = model
    })

  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelizeInstance
  db.Sequelize = Sequelize
}

export default function getModels({dbConfig, sequelizeConnection} : any) {
  if (!db) {
    initDb({dbConfig, sequelizeConnection})
  }
  return db
}
