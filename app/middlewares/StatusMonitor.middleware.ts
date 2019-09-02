import { Application } from 'express';
const statusMonitor = require('express-status-monitor');

import {LoggerProvider} from "../provider/Logger.provider";
import {Logger} from "typescript-logging";
import {LocalsProvider} from '../provider/Locals.provider';

class StatusMonitorMiddleware {
    private logger: Logger = LoggerProvider.getLogger(StatusMonitorMiddleware.name);

    public mount (_express: Application): Application {
        this.logger.debug('Booting StatusMonitorMiddleware.');

        const api: string = LocalsProvider.config().apiPrefix;

        // Define your status monitor config
        const monitorOptions: object = {
            title: 'Hotels Api',
            path: '/status-monitor',
            spans: [
                {
                    interval: 1, 		// Every second
                    retention: 60		// Keep 60 data-points in memory
                },
                {
                    interval: 5,
                    retention: 60
                },
                {
                    interval: 15,
                    retention: 60
                }
            ],
            chartVisibility: {
                mem: true,
                rps: true,
                cpu: true,
                load: true,
                statusCodes: true,
                responseTime: true
            }
        };
        _express.use(statusMonitor(monitorOptions));

        this.logger.debug('Finishing boot of StatusMonitorMiddleware.');
        return _express;
    }

}

export default new StatusMonitorMiddleware();