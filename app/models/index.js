const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('config').db;
const Hotel = require('./Hotel.js');
const Amenity = require('./Amenity');
const Stream = require('streamjs');
const camelCase = require('camelcase');
let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, dbConfig);
} else {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}


const directoryPath = path.join(__dirname, '.');
const files = fs.readdirSync(directoryPath).filter(f => f !== 'index.js');
const models = {};
new Stream(files).map(f => './' + f.replace('.js', '')).map(require).forEach(obj => {
    models[camelCase(obj.name)] = obj.init(sequelize, Sequelize);
});

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

let db = {
    models,
    sequelize
};

module.exports = db;