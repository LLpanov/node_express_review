import * as mongoose from 'mongoose';

const { Schema, model } = mongoose;

export interface ITeacher{
    firstName: string;
    lastName: string;
    status: boolean;
    lesson: string;
}

const teacherSchema = new Schema<ITeacher>({
    firstName: {
        type: String,
        trim: true,
        required: true,

    },
    lastName: {
        type: String,
        trim: true,
        unique: true,
        required: true,

    },

    lesson: {
        type: String,

    },

    status: {
        type: Boolean,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

});

teacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName} Oktenweb `;
});

export const teacherModel = model('teacher', teacherSchema);
