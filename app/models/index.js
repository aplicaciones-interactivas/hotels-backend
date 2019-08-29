const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('config').db;
const Hotel = require('./Hotel');
const Amenity = require('./Amenity');

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, dbConfig);
} else {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}
const models = {
    hotel: Hotel.init(sequelize, Sequelize),
    amenity: Amenity.init(sequelize, Sequelize)
};

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

let db = {
    models,
    sequelize
};

module.exports = db;