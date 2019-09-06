import {LFService, LoggerFactory, LoggerFactoryOptions, LogGroupRule, LogLevel} from "typescript-logging";
import {LocalsProvider} from "./Locals.provider";

export class LoggerProvider {

    static options = new LoggerFactoryOptions().addLogGroupRule(new LogGroupRule(new RegExp(""), LogLevel.fromString(LocalsProvider.getConfig().logLevel)));
    static factory: LoggerFactory = LFService.createNamedLoggerFactory('LoggerFactory', LoggerProvider.options);

    public static getLogger(instanceName: string) {
        return LoggerProvider.factory.getLogger(instanceName);
    }
}

