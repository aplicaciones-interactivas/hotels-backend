import expressProvider from './Express.provider';

class ApplicationProvider {

    public loadServer (): void {
        expressProvider.provide();
    }
}

export default new ApplicationProvider();
