import * as passport from 'passport';
import {UserService} from "../services/User.service";
import {Strategy, ExtractJwt} from "passport-jwt";
import {LocalsProvider} from "./Locals.provider";
import {Express, Handler} from "express";
import {BCryptUtils} from "../utils/BCrypt.utils";
import moment from "moment";
import * as jwt from "jwt-simple";
import UserResponse from "../api/response/User.response";
import {AuthenticationError} from "../error/Authentication.error";
import {Logger} from "typescript-logging";
import {LoggerProvider} from "./Logger.provider";
import {inject} from "inversify";

export class PassportProvider {
    private logger: Logger = LoggerProvider.getLogger(PassportProvider.name);
    userService: UserService;
    express: Express;

    constructor(@inject("UserService") userService: UserService, @inject("Express") express: Express) {
        this.userService = userService;
        this.express = express;
    }

    opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: LocalsProvider.getConfig().jwtsecret || ''
    }

    public init(): Handler {
        this.logger.debug("Starting passport");
        passport.use(new Strategy(this.opts, (jwt_payload, done) => {
            this.userService.findByUsernameOrEmail(jwt_payload.username).then(user => done(null, user))
                .catch((err: any) => done(err, false));
        }));
        return passport.initialize();
    }

    public authenticate(callback: any) {
        passport.authenticate("jwt", {session: false, failWithError: true}, callback);
    }

    async login(req: any, res: any) {
        try {
            req.checkBody("username", "Username must not be empty").notEmpty();
            req.checkBody("password", "Password must not be empty").notEmpty();

            let errors = req.validationErrors();
            if (errors) throw new AuthenticationError();

            let user = await this.userService.findByUsernameOrEmail(req.body.username);

            let success = BCryptUtils.compare(req.body.password, user.password);
            if (success === false) throw new AuthenticationError();
            res.status(200).json(this.genToken(user));
        } catch (err) {
            res.status(401).json({"message": "Invalid credentials", "errors": err});
        }
    }

    private genToken = (user: UserResponse): Object => {
        let expires = moment().utc().add({days: 7}).unix();
        let token = jwt.encode({
            exp: expires,
            username: user.username
        }, LocalsProvider.getConfig().jwtsecret || '');

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user.id
        };
    }

}
