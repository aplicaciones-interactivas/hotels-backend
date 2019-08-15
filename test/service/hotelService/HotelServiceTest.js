process.env.NODE_ENV = 'test';
const sequelize = require('sequelize');
const chai = require('chai');

const HotelServiceTestCases = require('./HotelServiceTestCase');
const MockBaseDeDatos = require('../../mockBaseDeDatos');

describe('HotelService', () => {

    describe('buscarTodos', () => {
        before(MockBaseDeDatos.preparar);
        it('Debe retornar todos los hoteles sin filtros', HotelServiceTestCases.buscarTodos_conCienHotelesEnLaBase_retornaListaDeHoteles);
        it('Debe retornar 58 hoteles con filtro de 3 estrellas', HotelServiceTestCases.buscarTodos_conFiltrosPor3Estrellas_retorna58Hoteles);
        it('Debe retornar 83 hoteles con filtro de 3 y 4 estrellas', HotelServiceTestCases.buscarTodos_conFiltrosPor3Y4Estrellas_retorna83Hoteles);
        it('Debe retornar un hotel con filtro por nombre Hotel Santa Cruz', HotelServiceTestCases.buscarTodos_conFiltrosPorNombre_retornaUnHotel);
        it('Debe retornar 59 hoteles con filtro por nombre que contiene Hotel', HotelServiceTestCases.buscarTodos_conFiltrosPorParteDeNombre_retorna59Hoteles);
        it('Debe retornar 1 hoteles con filtro por nombre Hotel Santa Cruz y 3 estrellas', HotelServiceTestCases.buscarTodos_conFiltrosPorNombreY3Estrellas_retornaUnHotel);
    });

    describe('guardar', () => {
        beforeEach(MockBaseDeDatos.preparar);
        it('Debe retornar nuevo hotel guardado', HotelServiceTestCases.guardar_conHotelValido_retornaHotelConId);
        it('Debe lanzar error con hotel sin nombre', HotelServiceTestCases.guardar_conHotelSinNombre_lanzaError);
        it('Debe lanzar error con hotel con nombre vacio', HotelServiceTestCases.guardar_conHotelConNombreVacio_lanzaError);
        it('Debe lanzar error con hotel con nombre solo espacios', HotelServiceTestCases.guardar_conHotelConNombreSoloEspacios_lanzaError);
    });

    describe('buscarPorId', () => {
        before(MockBaseDeDatos.preparar);
        it('Debe retornar un hotel con id: 249942', HotelServiceTestCases.buscarPorId_conIdValido_retornaHotel);
        it('Debe retornar un hotel vacio con id: 1249942', HotelServiceTestCases.buscarPorId_conIdInexistente_retornaObjetoVacio);
        it('Debe lanzar error con id nulo', HotelServiceTestCases.buscarPorId_conIdNulo_retornaNull);
    });

    describe('eliminar', () => {
        before(MockBaseDeDatos.preparar);
        it('Debe eliminar hotel con id: 249942', HotelServiceTestCases.eliminar_conIdValido_borraHotel);
        it('Debe lanzar error con id null', HotelServiceTestCases.eliminar_conIdNulo_lanzaError);
        it('Debee lanzar error con id: 12499422', HotelServiceTestCases.eliminar_conIdInvalido_lanzaError);
    });

    describe('actualizar', () => {
        beforeEach(MockBaseDeDatos.preparar);
        it('Debe retornar hotel actualizado con id: 161901', HotelServiceTestCases.actualizar_conHotelYIdValido_retornaHotelActualizado);
        it('Debe lanzar error con id: 1619011', HotelServiceTestCases.actualizar_conIdInexistente_lanzaError);
        it('Debe lanzar error con id: 161901 y nombre null', HotelServiceTestCases.actualizar_conNombreNull_lanzaError);
        it('Debe lanzar error con hotel con nombre vacio', HotelServiceTestCases.actualizar_conHotelConNombreVacio_lanzaError);
        it('Debe lanzar error con hotel con nombre solo espacios', HotelServiceTestCases.actualizar_conHotelConNombreSoloEspacios_lanzaError);
    });
});
