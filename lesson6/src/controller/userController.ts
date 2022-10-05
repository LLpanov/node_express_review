import { Request, Response } from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response <IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }
}

export const userController = new UserController();
