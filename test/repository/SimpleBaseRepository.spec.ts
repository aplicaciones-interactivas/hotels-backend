import { expect } from 'chai';
import 'mocha';
import {User} from "../../app/models/User";
import {SimpleBaseRepository} from "../../app/repository/generics/SimpleBaseRepository";
import {GenericContainer, Wait} from "testcontainers";
import {HostPortWaitStrategy} from "testcontainers/dist/wait-strategy";
import net from 'net';
import { Duration, TemporalUnit } from 'node-duration';

describe('Hello function', () => {

    const repository : SimpleBaseRepository<User, number> = new class extends SimpleBaseRepository<User, number> {};

    before(async () => {

        console.log("AAAAAAAAAAAAAAAAA")
        const redis = await new GenericContainer("redis")
            .withExposedPorts(6379)
            .withEnv("ALLOW_EMPTY_PASSWORD", "yes")
            .withWaitStrategy(Wait.forLogMessage("Ready to accept connections"))
            .start();

        const mysql =await new GenericContainer("mysql")
            .withExposedPorts(3306)
            .withEnv("MYSQL_ALLOW_EMPTY_PASSWORD", "yes")
            .start();


        console.log("BBBBBBBBBBBBBBBBBBB")
        await redis.stop();
        await mysql.stop();
        console.log("CCCCCCCCCCCCCCCCCCCC")
    });

    it('should return list of entity', () => {
        console.log("DDDDDDDDDDDDDD")
        repository.findAll().then((result) => {
            expect(result).has.length(1);
        })
    });

});
