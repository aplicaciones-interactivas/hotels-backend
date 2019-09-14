import Local from '../authenticationStrategies/Local'
import * as passport from 'passport';


class Passport {
    public initAuth(): void {
        try {
            Local.init(passport);
        } catch (err) {
            //Instanciar ErrorHandler
            console.log(err.stack);
        }
    }

}

export default new Passport;
