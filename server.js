const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const port = config.port || 8080;
const HotelesRouter = require('./app/routes/HotelRouter');
const queryParser = require('express-query-int');
const models = require('./app/models');
const path = require('path');
const sequelize = require('sequelize');

const HotelController = require('./app/controller/HotelController');
const HotelService = require('./app/service/HotelService');
const HotelRepository = require('./app/repository/HotelRepository');

models.sequelize.sync().then(function () {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(queryParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.text());
    app.use(bodyParser.json({type: 'application/json'}));
    app.use('/hoteles', new HotelesRouter(new HotelController(new HotelService(new HotelRepository(sequelize)))));
    app.use(express.static(path.join(__dirname, 'static')));
    app.listen(port);
    console.log('Levantado en el puerto ' + port);

});
module.exports = app; // for testing

