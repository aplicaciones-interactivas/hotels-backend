import { Strategy } from 'passport-local';
import User from '../models/User';


class Local {
    public static init (_passport: any): any {
        _passport.use(new Strategy((email, password, done) => {
            // @ts-ignore
            User.findOne( {email: email}, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });

        }))

    }




}

export default Local;
