const HotelService = require('../../../app/service/HotelService');
const HotelRepository = require('../../../app/repository/HotelRepository');
const sequelize = require('sequelize');
const assert = require('chai').assert;
require('chai').should();
const hotelService = new HotelService(new HotelRepository(sequelize));
module.exports = {

    findAll_conCienHotelesEnLaBase_retornaListaDeHoteles(done) {
        hotelService.findAll().then((hoteles) => {
            hoteles.length.should.be.eql(100);
            done();
        });
    },
    findAll_conFiltrosPor3Estrellas_retorna58Hoteles(done) {
        var filtros = {estrellas: [3]};
        hotelService.findAll(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(58);
            done();
        });
    },
    findAll_conFiltrosPor3Y4Estrellas_retorna83Hoteles(done) {
        var filtros = {estrellas: [3, 4]};
        hotelService.findAll(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(83);
            done();
        });
    },
    findAll_conFiltrosPorNombre_retornaUnHotel(done) {
        var filtros = {nombre: 'Hotel Santa Cruz'};
        hotelService.findAll(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(1);
            done();
        });
    },
    findAll_conFiltrosPorParteDeNombre_retorna59Hoteles(done) {
        var filtros = {nombre: 'Hotel'};
        hotelService.findAll(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(59);
            done();
        });
    },
    findAll_conFiltrosPorNombreY3Estrellas_retornaUnHotel(done) {
        var filtros = {nombre: 'Hotel Santa Cruz', estrellas: [3]};
        hotelService.findAll(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(1);
            done();
        });
    },
    create_conHotelValido_retornaHotelConId(done) {
        var nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5
        };

        hotelService.create(nuevoHotel).then((hotelGuardado) => {
            hotelGuardado.id.should.not.be.undefined;
            hotelGuardado.name.should.be.equal(nuevoHotel.name);
            done();
        });
    },
    create_conHotelValido_conAmenities_retornaHotelConIdYAmenities(done) {
        var nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5,
            amenities: [1,3]
        };

        hotelService.create(nuevoHotel).then((hotelGuardado) => {
            hotelGuardado.id.should.not.be.undefined;
            hotelGuardado.name.should.be.equal(nuevoHotel.name);
            hotelGuardado.amenities.should.to.have.lengthOf(2);
            done();
        });
    },
    create_conHotelSinNombre_lanzaError(done) {
        var nuevoHotel = {
            stars: 5
        };
        hotelService.create(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    create_conHotelConNombreVacio_lanzaError(done) {
        var nuevoHotel = {
            name: '',
            stars: 5
        };

        hotelService.create(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    create_conHotelConNombreSoloEspacios_lanzaError(done) {
        var nuevoHotel = {
            name: '        ',
            stars: 5
        };

        hotelService.create(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    create_conHotelValido_conAmenitiesInvalidos_lanzaError(done) {
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5,
            amenities: [10000]
        };
        hotelService.create(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400000');
            err.name.should.be.equal('EntityNotFoundError');
            err.toString().should.be.equal('Error=EntityNotFoundError code=400000 message:Alguno de los amenities indicados no existe');
            done();
        });
    },
    findOne_conIdValido_retornaHotel(done) {
        let id = 249942;
        let hotelBuscado = 'Hotel Stefanos';
        hotelService.findOne(id).then((hotel) => {
            hotel.name.should.be.equal(hotelBuscado);
            done();
        });
    },
    findOne_conIdInexistente_retornaObjetoVacio(done) {
        let id = 1249942;
        hotelService.findOne(id).then((hotel) => {
            assert.isNull(hotel);
            done();
        });
    },
    findOne_conIdNulo_retornaNull(done) {
        let id = null;
        hotelService.findOne(id).then((hotel) => {
            assert.isNull(hotel);
            done();
        });
    },
    delete_conIdValido_borraHotel(done) {
        let id = 249942;
        hotelService.delete(id).then((filasAfectadas) => {
            filasAfectadas.should.be.equal(1);
            done();
        });
    },
    delete_conIdNulo_lanzaError(done) {
        let id = null;
        hotelService.delete(id).catch((err) => {
            err.descripcion.should.be.equal('Indique el id del hotel');
            done();
        });
    },
    delete_conIdInvalido_lanzaError(done) {
        let id = 1249942;
        hotelService.delete(id).catch((err) => {
            err.descripcion.should.be.equal('El id a borrar no existe');
            done();
        });
    },
    update_conHotelYIdValido_retornaHotelActualizado(done) {
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5
        };
        let hotelAntes = {
            'id': 161901,
            'name': 'Hotel Santa Cruz',
            'stars': 3
        };
        let id = 161901;
        hotelService.update(id, nuevoHotel).then((hotelGuardado) => {
            nuevoHotel.id = id;
            hotelGuardado.name.should.not.be.equal(hotelAntes.name);
            hotelGuardado.stars.should.not.be.equal(hotelAntes.stars);
            done();
        });
    },
    update_conIdInexistente_lanzaError(done) {
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5
        };
        let id = 1619011;
        hotelService.update(id, nuevoHotel).catch((err) => {
            err.code.should.be.equal('400000');
            err.name.should.be.equal('EntityNotFoundError');
            err.toString().should.be.equal('Error=EntityNotFoundError code=400000 message:El hotel indicado no se encontro');
            done();
        });
    },
    update_conNombreNull_lanzaError(done) {
        let nuevoHotel = {
            name: null,
            stars: 5
        };
        let id = 161901;
        hotelService.update(id, nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    update_conHotelConNombreVacio_lanzaError(done) {
        let nuevoHotel = {
            name: '',
            stars: 5
        };
        let id = 161901;
        hotelService.update(id, nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    update_conHotelConNombreSoloEspacios_lanzaError(done) {
        let nuevoHotel = {
            name: '     ',
            stars: 5
        };
        let id = 161901;
        hotelService.update(id, nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    update_conAmenities_retornaHotelActualizadoConAmenities(done) {
        let id = 161901;
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5,
            amenities: [1,3]
        };
        let hotelAntes = {
            'id': id,
            'name': 'Hotel Santa Cruz',
            'stars': 3
        };

        hotelService.update(id, nuevoHotel).then((hotelGuardado) => {
            nuevoHotel.id = id;
            hotelGuardado.name.should.not.be.equal(hotelAntes.name);
            hotelGuardado.stars.should.not.be.equal(hotelAntes.stars);
            hotelGuardado.amenities.should.to.have.lengthOf(2);
            done();
        });
    }
};