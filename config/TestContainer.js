const compose = require('docker-compose');
const path = require('path');
const fs = require('fs');
const getPort = require('get-port');

function dockerize(command, cb) {
    getPort({port: 3306}).then(port => {
        fs.readFile('./config/test-template.json', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            fs.writeFile('./config/test.json', data.replace('{{host_port}}', port), 'utf8', function (err) {
                if (err) {
                    console.log(err);
                }
                fs.readFile('./config/docker-compose-template.yml', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    fs.writeFile('./docker-compose.yml', data.replace('{{host_port}}', port), 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                        }
                        compose.upAll({cwd: path.join(__dirname), log: true})
                            .then(
                                () => {
                                    console.log('done');
                                },
                                err => {
                                    console.log('something went wrong:', err.message);
                                }
                            ).then(new Promise(resolve => setTimeout(resolve, 60000)))
                            .then(command)
                            .then(compose.stop)
                            .then(cb);
                    });
                });
            });
        });
    });
}

module.exports = dockerize;
