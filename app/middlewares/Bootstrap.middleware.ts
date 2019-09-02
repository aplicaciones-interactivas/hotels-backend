import {Application, Router} from 'express';
import corsMiddleware from './Cors.middleware';
import bodyParsersMiddleware from './BodyParsers.middleware';
import parseNumberMiddleware from './ParseNumber.middleware';
import statusMonitorMiddleware from './StatusMonitor.middleware';

class BootstrapMiddleware {
    public static init (express: Application): Application {
        parseNumberMiddleware.mount(express);
        express = corsMiddleware.mount(express);
        express = bodyParsersMiddleware.mount(express);
        express = statusMonitorMiddleware.mount(express);
        return express;
    }
}

export default BootstrapMiddleware;
