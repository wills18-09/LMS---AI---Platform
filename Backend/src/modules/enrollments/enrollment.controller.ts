import { Response } from "express";

import {
    AuthenticatedRequest
} from "../../middleware/authMiddleware";

import {
    EnrollmentService
} from "./enrollment.service";



// STUDENT ENROLLS IN COURSE

export const enrollCourse = async (
    req: AuthenticatedRequest<{ id: string }>,
    res: Response
) => {

    try {

        const userId = req.user!.id;

       const courseId = req.params.id;

        if (!courseId) {
            res.status(400).json({
                message: "Course ID is required"
            });
            return;
        }


        const enrollment =
            await EnrollmentService.enroll(
                userId,
                courseId
            );


        res.status(201).json({

            message: "Course enrolled successfully",

            enrollment

        });


    } catch (error: any) {


        res.status(400).json({

            message: error.message

        });

    }

};





// GET ALL COURSES ENROLLED BY STUDENT

export const getMyCourses = async (
    req: AuthenticatedRequest,
    res: Response
) => {

    try {


        const userId = req.user!.id;


        const courses =
            await EnrollmentService.getMyCourses(
                userId
            );


        res.status(200).json(courses);


    } catch (error: any) {


        res.status(500).json({

            message: error.message

        });

    }

};





// INSTRUCTOR VIEW STUDENTS OF A COURSE

export const getStudents = async (
    req: AuthenticatedRequest<{ courseId: string }>,
    res: Response
) => {
    try {


        const courseId = req.params.courseId;


        if (!courseId) {
            res.status(400).json({
                message: "Course ID is required"
            });
            return;
        }



        const students =
            await EnrollmentService.getStudents(
                courseId
            );


        res.status(200).json(students);


    } catch (error: any) {


        res.status(500).json({

            message: error.message

        });

    }

};