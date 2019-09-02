import {LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel} from "typescript-logging";

export class LoggerProvider {

    static factory: LoggerFactory = LFService.createNamedLoggerFactory('LoggerFactory');

    public static getLogger(instanceName: string) {
        return LoggerProvider.factory.getLogger(instanceName);
    }
}

