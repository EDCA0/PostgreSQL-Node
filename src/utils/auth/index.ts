import passport from 'passport';
import { localStrategy } from './strategies/localstrategy';
import { joseStrategy } from './strategies/jtwstrategy';

passport.use(localStrategy);
passport.use(joseStrategy);
