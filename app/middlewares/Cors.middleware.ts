import {Application} from "express";
import {LocalsProvider} from "../provider/Locals.provider";
import cors from 'cors';

class CorsMiddleware {
    public mount(_express: Application): Application {

        const options = {
            origin: LocalsProvider.config().url
        };

        _express.use(cors(options));

        return _express;
    }
}

export default new CorsMiddleware();
