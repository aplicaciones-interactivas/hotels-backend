import {Application} from "express";
import bodyParser from "body-parser";

class BodyParsersMiddleware {
    public mount(express: Application): Application {
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
