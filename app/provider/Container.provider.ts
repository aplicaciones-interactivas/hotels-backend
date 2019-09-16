import {container} from "tsyringe";
import {LFService, LoggerFactory, LoggerFactoryOptions, LogGroupRule, LogLevel} from "typescript-logging";
import {LocalsProvider} from "./Locals.provider";

export class ContainerProvider {

    constructor() {
        container.register<LoggerFactory>("LoggerFactory", {useValue: LFService.createNamedLoggerFactory('SubLoggerFactory', new LoggerFactoryOptions().addLogGroupRule(new LogGroupRule(new RegExp(""), LogLevel.fromString("Debug"))))})
    }

}