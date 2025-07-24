import * as bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import { UserService } from '../../../services/user.service'
import { UnauthorizedError } from '../../httpErrors'
const service = new UserService()



export const localStrategy = new Strategy(({
    usernameField: 'email',
    passwordField: 'password'
}), async (email, password, done) => {
    try {
        const user = await service.findByEmail(email)
        const isMatch = await bcrypt.compare(password, user.userPassword);
        if(!isMatch) {
            done(new UnauthorizedError('Contraseña o correo incorrecta'), false)
        }
        done(null, user)
    } catch (error) {
        done(error, false);
    }
})
