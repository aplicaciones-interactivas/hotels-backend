import expressProvider from './Express.provider';

class ApplicationProvider {

    public loadServer (): void {
        expressProvider.init();
    }
}

export default new ApplicationProvider();
