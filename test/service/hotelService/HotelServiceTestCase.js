const HotelService = require('../../../app/service/HotelService');
const HotelRepository = require('../../../app/repository/HotelRepository');
const sequelize = require('sequelize');
const assert = require('chai').assert;
require('chai').should();
const hotelService = new HotelService(new HotelRepository(sequelize));
module.exports = {

    buscarTodos_conCienHotelesEnLaBase_retornaListaDeHoteles(done) {
        hotelService.buscarTodos().then((hoteles) => {
            hoteles.length.should.be.eql(100);
            done();
        });
    },
    buscarTodos_conFiltrosPor3Estrellas_retorna58Hoteles(done) {
        var filtros = {estrellas: [3]};
        hotelService.buscarTodos(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(58);
            done();
        });
    },
    buscarTodos_conFiltrosPor3Y4Estrellas_retorna83Hoteles(done) {
        var filtros = {estrellas: [3, 4]};
        hotelService.buscarTodos(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(83);
            done();
        });
    },
    buscarTodos_conFiltrosPorNombre_retornaUnHotel(done) {
        var filtros = {nombre: 'Hotel Santa Cruz'};
        hotelService.buscarTodos(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(1);
            done();
        });
    },
    buscarTodos_conFiltrosPorParteDeNombre_retorna59Hoteles(done) {
        var filtros = {nombre: 'Hotel'};
        hotelService.buscarTodos(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(59);
            done();
        });
    },
    buscarTodos_conFiltrosPorNombreY3Estrellas_retornaUnHotel(done) {
        var filtros = {nombre: 'Hotel Santa Cruz', estrellas: [3]};
        hotelService.buscarTodos(filtros).then((hoteles) => {
            hoteles.length.should.be.eql(1);
            done();
        });
    },
    guardar_conHotelValido_retornaHotelConId(done) {
        var nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5
        };

        hotelService.guardar(nuevoHotel).then((hotelGuardado) => {
            hotelGuardado.id.should.not.be.undefined;
            hotelGuardado.name.should.be.equal(nuevoHotel.name);
            done();
        });
    },
    guardar_conHotelValido_conAmenities_retornaHotelConIdYAmenities(done) {
        var nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5,
            amenities: [1,3]
        };

        hotelService.guardar(nuevoHotel).then((hotelGuardado) => {
            hotelGuardado.id.should.not.be.undefined;
            hotelGuardado.name.should.be.equal(nuevoHotel.name);
            hotelGuardado.amenities.should.to.have.lengthOf(2);
            done();
        });
    },
    guardar_conHotelSinNombre_lanzaError(done) {
        var nuevoHotel = {
            stars: 5
        };
        hotelService.guardar(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    guardar_conHotelConNombreVacio_lanzaError(done) {
        var nuevoHotel = {
            name: '',
            stars: 5
        };

        hotelService.guardar(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    guardar_conHotelConNombreSoloEspacios_lanzaError(done) {
        var nuevoHotel = {
            name: '        ',
            stars: 5
        };

        hotelService.guardar(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    guardar_conHotelValido_conAmenitiesInvalidos_lanzaError(done) {
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5,
            amenities: [10000]
        };
        hotelService.guardar(nuevoHotel).catch((err) => {
            err.code.should.be.equal('400000');
            err.name.should.be.equal('EntityNotFoundError');
            err.toString().should.be.equal('Error=EntityNotFoundError code=400000 message:Alguno de los amenities indicados no existe');
            done();
        });
    },
    buscarPorId_conIdValido_retornaHotel(done) {
        let id = 249942;
        hotelBuscado = 'Hotel Stefanos';
        hotelService.buscarPorId(id).then((hotel) => {
            hotel.name.should.be.equal(hotelBuscado);
            done();
        });
    },
    buscarPorId_conIdInexistente_retornaObjetoVacio(done) {
        let id = 1249942;
        hotelService.buscarPorId(id).then((hotel) => {
            assert.isNull(hotel);
            done();
        });
    },
    buscarPorId_conIdNulo_retornaNull(done) {
        let id = null;
        hotelService.buscarPorId(id).then((hotel) => {
            assert.isNull(hotel);
            done();
        });
    },
    eliminar_conIdValido_borraHotel(done) {
        let id = 249942;
        hotelService.borrar(id).then((filasAfectadas) => {
            filasAfectadas.should.be.equal(1);
            done();
        });
    },
    eliminar_conIdNulo_lanzaError(done) {
        let id = null;
        hotelService.borrar(id).catch((err) => {
            err.descripcion.should.be.equal('Indique el id del hotel');
            done();
        });
    },
    eliminar_conIdInvalido_lanzaError(done) {
        let id = 1249942;
        hotelService.borrar(id).catch((err) => {
            err.descripcion.should.be.equal('El id a borrar no existe');
            done();
        });
    },
    actualizar_conHotelYIdValido_retornaHotelActualizado(done) {
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
        hotelService.actualizar(id, nuevoHotel).then((hotelGuardado) => {
            nuevoHotel.id = id;
            hotelGuardado.name.should.not.be.equal(hotelAntes.name);
            hotelGuardado.stars.should.not.be.equal(hotelAntes.stars);
            done();
        });
    },
    actualizar_conIdInexistente_lanzaError(done) {
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5
        };
        let id = 1619011;
        hotelService.actualizar(id, nuevoHotel).catch((err) => {
            err.codigo.should.be.equal(1);
            err.descripcion.should.be.equal('El id a borrar no existe');
            done();
        });
    },
    actualizar_conNombreNull_lanzaError(done) {
        let nuevoHotel = {
            name: null,
            stars: 5
        };
        let id = 161901;
        hotelService.actualizar(id, nuevoHotel).catch((err) => {
            err.code.should.be.equal('400001');
            err.name.should.be.equal('ValidationError');
            err.toString().should.be.equal('Error=ValidationError code=400001 message:El nombre del hotel es invalido');
            done();
        });
    },
    actualizar_conHotelConNombreVacio_lanzaError(done) {
        let nuevoHotel = {
            name: '',
            stars: 5
        };
        let id = 161901;
        hotelService.actualizar(id, nuevoHotel).catch((err) => {
            err.codigo.should.be.equal(2);
            err.descripcion.should.be.equal('Indique el nombre del hotel');
            done();
        });
    },
    actualizar_conHotelConNombreSoloEspacios_lanzaError(done) {
        let nuevoHotel = {
            name: '     ',
            stars: 5
        };
        let id = 161901;
        hotelService.actualizar(id, nuevoHotel).catch((err) => {
            err.codigo.should.be.equal(2);
            err.descripcion.should.be.equal('Indique el nombre del hotel');
            done();
        });
    },
    actualizar_conAmenities_retornaHotelActualizadoConAmenities(done) {
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

        hotelService.actualizar(id, nuevoHotel).then((hotelGuardado) => {
            nuevoHotel.id = id;
            hotelGuardado.name.should.not.be.equal(hotelAntes.name);
            hotelGuardado.stars.should.not.be.equal(hotelAntes.stars);
            hotelGuardado.amenities.should.to.have.lengthOf(2);
            done();
        });
    }
};