import express from 'express';
import {LocalsProvider} from "./Locals.provider";
import {LoggerProvider} from './Logger.provider'
import {Logger} from "typescript-logging";
import BootstrapMiddleware from '../middlewares/Bootstrap.middleware';
import morgan from 'morgan';

class ExpressProvider {

    private logger: Logger = LoggerProvider.getLogger(ExpressProvider.name);
    public express!: express.Application;

    private mountMiddlewares (): void {
        this.express = BootstrapMiddleware.init(this.express);
    }

    private mountDotEnv(): void {
        this.express = LocalsProvider.init(this.express);
    }

    public provide(): any {
        this.logger.debug("Starting express");
        this.express = express();
        this.mountDotEnv();
        this.mountMiddlewares();
        this.express.use(morgan('dev'));
        const port = LocalsProvider.config().port;
        this.express.listen(port, () => this.logger.info("Listening at port: " + port));
    }

}

export default new ExpressProvider();
