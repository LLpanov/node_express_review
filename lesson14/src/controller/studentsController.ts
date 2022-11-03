import { NextFunction, Request, Response } from 'express';

class StudentsController {
    public async getAll(req:Request, res:Response, next:NextFunction) {
        return res.json();
    }

    public async addNewStudent(req:Request, res:Response, next:NextFunction) {
        return res.json();
    }
}

export const studentsController = new StudentsController();
