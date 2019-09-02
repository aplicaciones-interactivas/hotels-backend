import { Application } from 'express';
import corsMiddleware from './Cors.middleware';
import bodyParsersMiddleware from './BodyParsers.middleware';
import parseNumberMiddleware from "./ParseNumber.middleware";
class BootstrapMiddleware {
    public static init (express: Application): Application {
        express = corsMiddleware.mount(express);
        bodyParsersMiddleware.mount(express);
        parseNumberMiddleware.mount(express);
        return express;
    }
}

export default BootstrapMiddleware;
