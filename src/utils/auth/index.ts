import passport from "passport";
import { localStrategy } from "./strategies/localstrategy";



passport.use(localStrategy);