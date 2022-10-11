import { userService } from './userService';
import { IUser } from '../entity';
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces';

class AuthService {
    public async registration(body:IUser):Promise<ITokenData> {
        const { email } = body;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email:${email} already exists `);
        }
        const createUser = await userService.createUser(body);
        return this._getTokenData(createUser);
    }

    private async _getTokenData(userData:IUser):Promise<ITokenData> {
        const { id, email } = userData;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokenPair.refreshToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,

        };
    }
}

export const authService = new AuthService();
