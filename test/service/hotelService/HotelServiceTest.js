process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const MockBaseDeDatos = require('../../mockBaseDeDatos');


const HotelServiceTestCases = require('./HotelServiceTestCase');
describe('HotelService', () => {

    describe('buscarTodos', () => {
        before(MockBaseDeDatos.preparar);
        it('Debe retornar todos los hoteles sin filtros', HotelServiceTestCases.findAll_conCienHotelesEnLaBase_retornaListaDeHoteles);
        it('Debe retornar 58 hoteles con filtro de 3 estrellas', HotelServiceTestCases.findAll_conFiltrosPor3Estrellas_retorna58Hoteles);
        it('Debe retornar 83 hoteles con filtro de 3 y 4 estrellas', HotelServiceTestCases.findAll_conFiltrosPor3Y4Estrellas_retorna83Hoteles);
        it('Debe retornar un hotel con filtro por nombre HotelDto Santa Cruz', HotelServiceTestCases.findAll_conFiltrosPorNombre_retornaUnHotel);
        it('Debe retornar 59 hoteles con filtro por nombre que contiene HotelDto', HotelServiceTestCases.findAll_conFiltrosPorParteDeNombre_retorna59Hoteles);
        it('Debe retornar 1 hoteles con filtro por nombre HotelDto Santa Cruz y 3 estrellas', HotelServiceTestCases.findAll_conFiltrosPorNombreY3Estrellas_retornaUnHotel);
    });

    describe('guardar', () => {
        beforeEach(MockBaseDeDatos.preparar);
        it('Debe retornar nuevo hotel guardado', HotelServiceTestCases.create_conHotelValido_retornaHotelConId);
        it('Debe retornar nuevo hotel guardado con amenities ya guardadas', HotelServiceTestCases.create_conHotelValido_conAmenities_retornaHotelConIdYAmenities);
        it('Debe lanzar error con hotel sin nombre', HotelServiceTestCases.create_conHotelSinNombre_lanzaError);
        it('Debe lanzar error con hotel con nombre vacio', HotelServiceTestCases.create_conHotelConNombreVacio_lanzaError);
        it('Debe lanzar error con hotel con nombre solo espacios', HotelServiceTestCases.create_conHotelConNombreSoloEspacios_lanzaError);
        it('Debe lanzar error por amenities invalidos', HotelServiceTestCases.create_conHotelValido_conAmenitiesInvalidos_lanzaError)
    });

    describe('buscarPorId', () => {
        before(MockBaseDeDatos.preparar);
        it('Debe retornar un hotel con id: 249942', HotelServiceTestCases.findOne_conIdValido_retornaHotel);
        it('Debe retornar un hotel vacio con id: 1249942', HotelServiceTestCases.findOne_conIdInexistente_retornaObjetoVacio);
        it('Debe lanzar error con id nulo', HotelServiceTestCases.findOne_conIdNulo_retornaNull);
    });

    describe('eliminar', () => {
        before(MockBaseDeDatos.preparar);
        it('Debe eliminar hotel con id: 249942', HotelServiceTestCases.delete_conIdValido_borraHotel);
        it('Debe lanzar error con id null', HotelServiceTestCases.delete_conIdNulo_lanzaError);
        it('Debee lanzar error con id: 12499422', HotelServiceTestCases.delete_conIdInvalido_lanzaError);
    });

    describe('actualizar', () => {
        beforeEach(MockBaseDeDatos.preparar);
        it('Debe retornar hotel actualizado con id: 161901', HotelServiceTestCases.update_conHotelYIdValido_retornaHotelActualizado);
        it('Debe lanzar error con id: 1619011', HotelServiceTestCases.update_conIdInexistente_lanzaError);
        it('Debe lanzar error con id: 161901 y nombre null', HotelServiceTestCases.update_conNombreNull_lanzaError);
        it('Debe lanzar error con hotel con nombre vacio', HotelServiceTestCases.update_conHotelConNombreVacio_lanzaError);
        it('Debe lanzar error con hotel con nombre solo espacios', HotelServiceTestCases.update_conHotelConNombreSoloEspacios_lanzaError);
        it('Debe retornar hotel actualizado con amenities', HotelServiceTestCases.update_conAmenities_retornaHotelActualizadoConAmenities);
    });
});
