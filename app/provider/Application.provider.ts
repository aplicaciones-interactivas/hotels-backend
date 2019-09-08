import expressProvider from './Express.provider';
import {LocalsProvider} from './Locals.provider';
class ApplicationProvider {

    public loadServer (): void {
        LocalsProvider.config();
        expressProvider.provide();
    }
}

export default new ApplicationProvider();
