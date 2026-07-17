import { Request, Response } from "express";
import { EnrollmentService } from "./enrollment.service";


// POST /courses/:id/enroll
export const enrollCourse = async (
    req: Request,
    res: Response
) => {

    try {

        const userId = req.user!.id;

        const courseId = req.params.id as string;


        if (!courseId) {
            res.status(400).json({
                message: "Course ID is required"
            });
            return;
        }


        const enrollment = await EnrollmentService.enroll(
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



// GET /enrollments/me
export const getMyEnrollments = async (
    req: Request,
    res: Response
) => {

    try {

        const userId = req.user!.id;


        const courses = await EnrollmentService.getMyCourses(
            userId
        );


        res.status(200).json(courses);


    } catch (error: any) {

        res.status(500).json({
            message: error.message
        });

    }

};



// GET students enrolled in course
export const getStudents = async (
    req: Request,
    res: Response
) => {

    try {

        const courseId = req.params.courseId as string;


        if (!courseId) {
            res.status(400).json({
                message: "Course ID is required"
            });
            return;
        }


        const students = await EnrollmentService.getStudents(
            courseId
        );


        res.status(200).json(students);


    } catch (error: any) {

        res.status(500).json({
            message: error.message
        });

    }

};