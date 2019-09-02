import { Application } from 'express';
import corsMiddleware from './Cors.middleware';

class KernelMiddleware {
    public static init (express: Application): Application {
        express = corsMiddleware.mount(express);
        return express;
    }
}

export default KernelMiddleware;
