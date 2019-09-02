import {ParseNumberUtils} from "../utils/ParseNumber.utils";
import {Application} from "express";
import {LoggerProvider} from "../provider/Logger.provider";
import {Logger} from "typescript-logging";
class ParseNumberMiddleware {

    private logger: Logger = LoggerProvider.getLogger(ParseNumberMiddleware.name);

    public mount(express: Application): Application {
        this.logger.debug("Mounting ParseNumber into Express");
        return express.use(this.parse());
    }


    private parse(): any {
        return (req: any, res: any, next: any) => {
            req.query = ParseNumberUtils.parseNums(req.query, {
                parser: Number
            });
            next();
        };
    }
}

export default new ParseNumberMiddleware();
