import dockerConfiguration from './DockerConfiguration';
import Mocha from 'mocha';
import * as fs from "fs";
import * as path from 'path';
import {Sequelize} from "sequelize-typescript";

let cleanExit = 1;

dockerConfiguration.start().then(async () => {
    try {
        process.env.NODE_ENV = 'test';

        let mocha = new Mocha({
            timeout: 120000
        });

        let testFiles = recFindByExt("test", "spec.ts", null, null);

        testFiles.forEach(file => mocha.addFile(file));

        let content: string = fs.readFileSync('./conf/.env.test.template', 'utf-8');

        content = content.replace('{{db_port}}', dockerConfiguration.mySqlPort.toString());
        content = content.replace('{{redis_port}}', dockerConfiguration.redisPort.toString());

        fs.writeFileSync('./conf/.env.test', content);

        require("../app/provider/Application.provider").default.loadServer();
        let sequelize = require('../app/provider/Sequelize.provider').default.startDatabase();
        require('../app/provider/Cache.provider').default.startCache();

        await waitForMysql(sequelize);


        await sequelize.sync();

        let sqlFile: string = fs.readFileSync('./test/resources/data.sql', 'utf-8');

        await sequelize.query(sqlFile);

        await new Promise((resolve) => {
            mocha.run(async (unsuccessful) => {
                cleanExit = unsuccessful;
                await sequelize.close();
                resolve();
            });
        })
    } finally {
        await dockerConfiguration.stop();
        fs.unlinkSync("./conf/.env.test");
        process.exit(cleanExit ? 1 : 0);
    }

});


function recFindByExt(base: string, ext: string, files: string[] | null, result: string[] | null) {
    files = files || fs.readdirSync(base)
    result = result || [];

    files.forEach(
        function (file) {
            let newbase = path.join(base, file)
            if (fs.statSync(newbase).isDirectory()) {
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
            } else {
                if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
                    // @ts-ignore
                    result.push(newbase)
                }
            }
        }
    )
    return result
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForMysql(sequelize: Sequelize) {
    //wait for mysql ready for accept connections
    for (; ;) {
        try {
            await sequelize.authenticate();
            break;
        } catch (ex) {
            await sleep(1000);
        }
    }

}