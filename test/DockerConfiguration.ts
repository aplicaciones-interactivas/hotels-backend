import {GenericContainer, StartedTestContainer, Wait} from "testcontainers";
import {LoggerProvider} from "../app/provider/Logger.provider";
import {Logger} from "typescript-logging";

class DockerConfiguration {

    private _redis!: StartedTestContainer;
    private _mysql!: StartedTestContainer;

    private logger: Logger = LoggerProvider.getLogger(DockerConfiguration.name);

    async start() {

        this.logger.debug("Starting Redis...");
        this._redis = await new GenericContainer("redis")
            .withExposedPorts(6379)
            .withEnv("ALLOW_EMPTY_PASSWORD", "yes")
            .withWaitStrategy(Wait.forLogMessage("Ready to accept connections"))
            .start();
        this.logger.debug("Redis started listening port: " + this._redis.getMappedPort(6379));
        this.logger.debug("Starting MySql...");
        this._mysql = await new GenericContainer("mysql")
            .withExposedPorts(3306)
            .withEnv("MYSQL_ALLOW_EMPTY_PASSWORD", "yes")
            .withEnv("MYSQL_USER", 'hotels')
            .withEnv("MYSQL_DATABASE", 'hotels')
            .withWaitStrategy(Wait.forLogMessage("mysqld: ready for connections."))
            .start();
        this.logger.debug("MySql started listening port: " + this._mysql.getMappedPort(3306));
    }

    async stop() {
        if (this._mysql)
            await this._mysql.stop();
        if (this._redis)
            await this._redis.stop();
    }

    get redisPort(): number {
        return this._redis.getMappedPort(6379);
    }

    get mySqlPort(): number {
        return this._mysql.getMappedPort(3306);
    }


    get redis(): StartedTestContainer {
        return this._redis;
    }

    get mysql(): StartedTestContainer {
        return this._mysql;
    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default new DockerConfiguration();