import Local from '../authenticationStrategies/Local'
import * as passport from 'passport';


class Passport {
    public exec(): void {
        try {
            Local.init(passport);
        } catch (_err) {
            //Instanciar ErrorHandler
            console.log(_err.stack);
        }
    }

}

export default new Passport;
