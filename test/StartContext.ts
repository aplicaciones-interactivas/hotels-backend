import dockerConfiguration from './DockerConfiguration';
import Mocha from 'mocha';
import * as fs from "fs";
import * as path from 'path';
import {seeder} from './seeders/MySql.seeder';

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
        require('../app/provider/Cache.provider').default.startCache();
        let connection: any = await require('../app/provider/TypeORM.provider').default.startDatabase();

        await connection.synchronize(true);

        await seeder(connection);

        await new Promise((resolve) => {
            mocha.run(async (unsuccessful) => {
                cleanExit = unsuccessful;
                resolve();
            });
        })
    } finally {
        await dockerConfiguration.stop();
        fs.unlinkSync("./conf/.env.test");
        process.exit(cleanExit);
    }

}).catch(err => {
    console.log(err);
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
    );
    return result
}