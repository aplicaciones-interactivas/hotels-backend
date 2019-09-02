import {Application} from "express";
import {LocalsProvider} from "../provider/Locals.provider";
import cors from 'cors';
import {Logger} from "typescript-logging";
import {LoggerProvider} from "../provider/Logger.provider";

class CorsMiddleware {

    private logger: Logger = LoggerProvider.getLogger(CorsMiddleware.name);

    public mount(_express: Application): Application {
        this.logger.debug("Mounting Cors into Express");
        const options = {
            origin: LocalsProvider.config().url
        };
        _express.use(cors(options));
        return _express;
    }
}

export default new CorsMiddleware();
