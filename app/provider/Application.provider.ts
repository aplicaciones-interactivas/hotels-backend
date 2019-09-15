import expressProvider from './Express.provider';
import {LocalsProvider} from './Locals.provider';
import {injectable} from "inversify";

@injectable()
export class ApplicationProvider {
    public loadServer (): void {
        LocalsProvider.config();
        expressProvider.provide();
    }
}