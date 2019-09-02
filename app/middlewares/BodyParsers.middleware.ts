import {Application} from "express";
import bodyParser from "body-parser";
import {LoggerProvider} from "../provider/Logger.provider";
import {Logger} from "typescript-logging";

class BodyParsersMiddleware {

    private logger: Logger = LoggerProvider.getLogger(BodyParsersMiddleware.name);

    public mount(express: Application): Application {
        this.logger.debug("Mounting BodyParser into Express");
        express.use(bodyParser.urlencoded({extended: true}));
        express.use(bodyParser.text());
        express.use(bodyParser.json({type: 'application/json'}));
        return express;
    }
}

/*

module.exports = function(options) {
  options = options || {
    parser: Number
  };

  return function(req, res, next) {
    req.query = parseNums(req.query, options);
    next();
  };
};

 */

export default new BodyParsersMiddleware();
