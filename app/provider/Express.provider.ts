import express from 'express';
import {LocalsProvider} from "./Locals.provider";
import {LoggerProvider} from './Logger.provider'
import {Logger} from "typescript-logging";
import KernelMiddleware from '../middlewares/Kernel.middleware';

class ExpressProvider {

    logger: Logger = LoggerProvider.getLogger(ExpressProvider.name);
    public express: express.Application;

    constructor() {
        this.express = express();
        this.mountDotEnv();
        this.mountMiddlewares();

        /*
                this.mountMiddlewares();
                this.mountRoutes();*/
    }

    private mountMiddlewares (): void {
        this.express = KernelMiddleware.init(this.express);
    }

    private mountDotEnv(): void {
        this.express = LocalsProvider.init(this.express);
    }

    public init(): any {
        this.logger.debug("Starting express");
        const port = LocalsProvider.config().port;
        this.express.listen(port, () => this.logger.info("Listening at port: " + port));
    }

}

export default new ExpressProvider();
