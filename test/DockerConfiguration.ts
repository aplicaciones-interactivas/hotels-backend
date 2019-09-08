import {GenericContainer, StartedTestContainer, Wait} from "testcontainers";

class DockerConfiguration {

    private _redis!: StartedTestContainer;
    private _mysql!: StartedTestContainer;


    async start() {
        this._redis = await new GenericContainer("redis")
            .withExposedPorts(6379)
            .withEnv("ALLOW_EMPTY_PASSWORD", "yes")
            .withWaitStrategy(Wait.forLogMessage("Ready to accept connections"))
            .start();
        this._mysql = await new GenericContainer("mysql")
            .withExposedPorts(3306)
            .withEnv("MYSQL_ALLOW_EMPTY_PASSWORD", "yes")
            .withEnv("MYSQL_USER", 'hotels')
            .withEnv("MYSQL_DATABASE", 'hotels')
            .withWaitStrategy(Wait.forLogMessage("mysqld: ready for connections."))
            .start()
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
}

export default new DockerConfiguration();