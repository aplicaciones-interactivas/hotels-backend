import {ExpirationStrategy, RedisStorage, MemoryStorage} from "node-ts-cache";
import {LocalsProvider} from "./Locals.provider";

export class CacheProvider {

    strategy?: ExpirationStrategy;

    public startCache() {
        const locals = LocalsProvider.getConfig();
        if (locals.redis.redisPort || locals.redis.redisHost || locals.redis.redisUsername || locals.redis.redisPassword) {
            this.strategy = new ExpirationStrategy(new RedisStorage({
                url: "redis://" + locals.redis.redisUsername + ":" + locals.redis.redisPassword + "@" + locals.redis.redisHost + ":" + locals.redis.redisPort
            }));
        } else {
            this.strategy = new ExpirationStrategy(new MemoryStorage());
        }

    }

    public getStategy() {
        return this.strategy;
    }
}

export default new CacheProvider()