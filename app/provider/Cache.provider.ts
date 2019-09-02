import {ExpirationStrategy, RedisStorage} from "node-ts-cache";
import {LocalsProvider} from "./Locals.provider";

class CacheProvider {

    strategy?: ExpirationStrategy;

    public startCache() {
        const locals = LocalsProvider.config();
        this.strategy = new ExpirationStrategy(new RedisStorage({
            url: "redis://" + locals.redis.redisUsername + ":" + locals.redis.redisPassword + "@" + locals.redis.redisHost + ":" + locals.redis.redisPort
        }));
    }

    public getStategy() {
        return this.strategy;
    }
}

export default new CacheProvider();
