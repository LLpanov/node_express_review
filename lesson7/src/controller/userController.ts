import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response <IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getAlluser(req:Request, res:Response):Promise<Response <IUser[]>> {
        const getAllusers = await userService.getAlluser();
        return res.json(getAllusers);
    }

    public async getUserById(req:{params:{id:number}}, res:Response):Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const getOneUser = await userService.getUserById(id);
        return res.json(getOneUser);
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

    public async getUsersByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.params;
        const userByEmail = await userService.getUserByEmail(email);
        return res.json(userByEmail);
    }
}

export const userController = new UserController();
