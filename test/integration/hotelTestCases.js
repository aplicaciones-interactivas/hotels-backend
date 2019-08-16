let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let hotelesUri = '/hoteles';
chai.use(chaiHttp);

module.exports = {

    getHoteles_conHotelesCargados_retornaTodosLosHotelesYStatus200: (done) => {
        chai.request(server)
                .get(hotelesUri)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(100);
                    done();
                });

    },
    getHoteles_conHotelesCargadosYFiltrosPorTresEstrellas_retorna58HotelesYStatus200: (done) => {
        chai.request(server)
                .get(hotelesUri + '?estrellas=3')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(58);
                    done();
                });

    },
    getHoteles_conHotelesCargadosYFiltrosPorNombre_retornaUnHotelYStatus200: (done) => {
        chai.request(server)
                .get(hotelesUri + '?nombre=Hotel Santa Cruz&estrellas=3')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });

    },
    getHoteles_conHotelesCargadosYFiltrosPorNombreYEstrellas_retornaStatus404: (done) => {
        chai.request(server)
                .get(hotelesUri + '?nombre=Hotel Santa Cruz&estrellas=2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(0);
                    done();
                });
    },
    getHoteles_conHotelesCargadosYFiltrosPorVariasEstrellas_retorna83HotelesYStatus200: (done) => {
        chai.request(server)
                .get(hotelesUri + '?estrellas=3&estrellas=4')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(83);
                    done();
                });
    },
    getHotel_conIdValido_retornaHotelYStatus200: (done) => {
        let id = 249942;
        hotelBuscado = 'Hotel Stefanos';
        chai.request(server)
                .get(hotelesUri + '/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.name.should.be.equal(hotelBuscado);
                    res.body.id.should.be.equal(id);
                    done();
                });
    },
    getHotel_conIdInexistente_retornaStatus404: (done) => {
        let id = 12499421;
        hotelBuscado = 'Hotel Stefanos';
        chai.request(server)
                .get(hotelesUri + '/' + id)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
    },
    postHotel_conHotelValido_retornaNuevoHotelYStatus201: (done) => {
        let hotel = {
            name: 'Hotel Santa Cruz',
            stars: 3,
            amenities: [
                'nightclub',
                'business-center',
                'bathtub',
                'newspaper',
                'restaurant'
            ]
        };
        chai.request(server)
                .post(hotelesUri)
                .send(hotel)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.name.should.be.equal(hotel.name);
                    res.body.id.should.be.not.null;
                    done();
                });
    },
    postHotel_conHotelInvalido_retornaStatus400: (done) => {
        let hotel = {
            name: '',
            stars: 3,
            amenities: [
                'nightclub',
                'business-center',
                'bathtub',
                'newspaper',
                'restaurant'
            ]
        };
        chai.request(server)
                .post(hotelesUri)
                .send(hotel)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
    },
    deleteHotel_conIdValido_retornaStatus204: (done) => {
        let id = 249942;
        chai.request(server)
                .delete(hotelesUri + '/' + id)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });

    },
    deleteHotel_conIdInvalido_retornaStatus404: (done) => {
        let id = 2499421;
        chai.request(server)
                .delete(hotelesUri + '/' + id)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });

    },
    putHotel_conHotelValido_retornaHotelActualizadoYStatus200(done) {
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5,
            amenities: [
                'safety-box',
                'nightclub',
                'deep-soaking-bathtub',
                'beach',
                'business-center'
            ]
        };
        nombreAntes = 'Hotel Santa Cruz';
        let id = 161901;
        chai.request(server)
                .put(hotelesUri + '/' + id)
                .send(nuevoHotel)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.id.should.be.equal(id);
                    res.body.name.should.be.not.equal(nombreAntes);
                    done();
                });
    },
    putHotel_conHotelInvalido_retornaStatus400(done) {
        let nuevoHotel = {
            name: '     ',
            stars: 5,
            amenities: [
                'safety-box',
                'nightclub',
                'deep-soaking-bathtub',
                'beach',
                'business-center'
            ]
        };
        nombreAntes = 'Hotel Santa Cruz';
        let id = 161901;
        chai.request(server)
                .put(hotelesUri + '/' + id)
                .send(nuevoHotel)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
    },
    putHotel_conIdInexistente_retornaStatus404(done) {
        let id = 1619011;
        let nuevoHotel = {
            name: 'Hotel Stefanos',
            stars: 5,
            amenities: [
                'safety-box',
                'nightclub',
                'deep-soaking-bathtub',
                'beach',
                'business-center'
            ]
        };
        chai.request(server)
                .put(hotelesUri + '/' + id)
                .send(nuevoHotel)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });

    }
};
