import {LFService, LoggerFactory, LoggerFactoryOptions, LogGroupRule, LogLevel} from "typescript-logging";
import {LocalsProvider} from "./Locals.provider";
import {injectable} from "tsyringe";

@injectable()
export class LoggerProvider {

    factory: LoggerFactory;

    constructor(loggerFactory: LoggerFactory) {
        this.factory = loggerFactory;
    }

    public getLogger(instanceName: string) {
        return this.factory.getLogger(instanceName);
    }
}

