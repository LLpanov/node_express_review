import { NextFunction, Request, Response } from 'express';
import { teacherModel } from '../models';

class TeachersController {
    public async getAll(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const teachers = await teacherModel.find({});

            console.log(teachers);
            res.json(teachers);
        } catch (e:any) {
            next(e);
        }
    }

    public async addNewTeacher(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const addTeacher = await teacherModel.create(req.body);

            res.json(addTeacher);
        } catch (e:any) {
            next(e);
        }
    }
}

export const teacherController = new TeachersController();
