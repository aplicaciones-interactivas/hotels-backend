import dockerConfiguration from './DockerConfiguration';
import Mocha from 'mocha';
import * as fs from "fs";
import * as path from 'path';

dockerConfiguration.start().then(() => {
    process.env.NODE_ENV = 'test';

    let mocha = new Mocha({
        ui: 'tdd',
        reporter: 'list'
    });

    let testFiles = recFindByExt("test", "spec.ts", null, null);

    testFiles.forEach(file => mocha.addFile(file));

    let content: string = fs.readFileSync('./app/.env.test.template', 'utf-8');

    content = content.replace('{{db_port}}', dockerConfiguration.mySqlPort.toString());
    content = content.replace('{{redis_port}}', dockerConfiguration.redisPort.toString());

    fs.writeFileSync('./app/.env.test', content);

    require("../app/provider/Application.provider").default.loadServer();
    require('../app/provider/Sequelize.provider').default.startDatabase();
    require('../app/provider/Cache.provider').default.startCache();

    mocha.run((f) => {
        dockerConfiguration.stop();
        process.exitCode = f ? 1 : 0;
    });
});


function recFindByExt(base: string, ext: string, files: string[] | null, result: string[] | null) {
    files = files || fs.readdirSync(base)
    result = result || [];

    files.forEach(
        function (file) {
            var newbase = path.join(base, file)
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