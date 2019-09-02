import {ParseNumberUtils} from "../utils/ParseNumber.utils";
import {Application} from "express";

class ParseNumberMiddleware {
    public mount(express: Application): Application {
        return express.use(this.parse);
    }

    private parse(options: any): any {
        options = options || {
            parser: Number
        };

        return (req: any, res: any, next: any) => {
            req.query = ParseNumberUtils.parseNums(req.query, options);
            next();
        };
    }
}

export default new ParseNumberMiddleware();
