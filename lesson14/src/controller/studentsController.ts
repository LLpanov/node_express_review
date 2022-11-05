import { NextFunction, Request, Response } from 'express';
import { studentModel } from '../models';

class StudentsController {
    public async getAll(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const students = await studentModel.find({});

            console.log(students);
            res.json(students);
        } catch (e:any) {
            next(e);
        }
    }

    public async addNewStudent(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const addStudent = await studentModel.create(req.body);

            res.json(addStudent);
        } catch (e:any) {
            next(e);
        }
    }

    public async setTeacher(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            console.log(req.params)
            const setTeacher = await studentModel.findByIdAndUpdate(req.params.student_id,{teacher:"63657ed647b713e38623a7ff"},{new:true});

            res.json(setTeacher);
        } catch (e:any) {
            next(e);
        }
    }

}

export const studentsController = new StudentsController();
