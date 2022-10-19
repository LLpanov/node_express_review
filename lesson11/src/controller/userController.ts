import { NextFunction, Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity';
import { userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { emailService } from '../services/emailSevice';
import { EmailActionEnum } from '../constans';

class UserController {
    public async createUser(req:IRequestExtended, res:Response):Promise<Response<IUser>> {
        const { email } = req.body;
        await emailService.sendEmail(email, EmailActionEnum.REGISTER_ON_THE_PLATFORM);
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const getOneUser = await userService.getUserById(+id);
        return res.json(getOneUser);
    }

    public async getUsersByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.params;
        const userByEmail = await userService.getUserByEmail(email);
        return res.json(userByEmail);
    }

    public async getAlluser(req:Request, res:Response):Promise<Response <IUser[]>> {
        const getAllusers = await userService.getAlluser();
        return res.json(getAllusers);
    }

    public async updateUserById(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { id } = req.params;
        const { password, email } = req.body;
        const updateUser = await userService.updateByUserId(+id, password, email);
        return res.json(updateUser);
    }

    public async deleteUserById(req:Request, res:Response):Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const deleteUser = await userService.deleteByUserId(+id);
        return res.json(deleteUser);
    }

    public async getUserPagination(req:Request, res:Response, next:NextFunction) {
        try {
            const { page = 1, perPage = 25, ...other } = req.query;
            const userPagination = await userService.getUserPagination(other, +page, +perPage);
            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
