import { CertificateModel } from "./certificates.model";
import { CertificateGenerator } from "./certificates.generator";
import pool from "../../../db";


export class CertificateService {


  static async generateCertificate(
    userId: string,
    courseId: string
  ) {


    // Check if certificate already exists
    const existing =
      await CertificateModel.findByUserAndCourse(
        userId,
        courseId
      );


    if (existing) {
      return existing;
    }



    // Check lecture completion
    const progress =
      await pool.query(
        `
        SELECT
          COUNT(*) FILTER(
            WHERE lp.completed = true
          ) AS completed,
          COUNT(*) AS total
        FROM lectures l
        LEFT JOIN lecture_progress lp
        ON lp.lecture_id = l.id
        AND lp.enrollment_id IN (
          SELECT id
          FROM enrollments
          WHERE user_id = $1
          AND course_id = $2
        )
        WHERE l.module_id IN (
          SELECT id
          FROM modules
          WHERE course_id = $2
        )
        `,
        [
          userId,
          courseId
        ]
      );



    const completed =
      Number(progress.rows[0].completed);


    const total =
      Number(progress.rows[0].total);



    if (
      total === 0 ||
      completed !== total
    ) {

      throw new Error(
        "Course not completed"
      );

    }





    // Check quiz score
    const quiz =
      await pool.query(
        `
        SELECT
          MAX(qa.score) AS score
        FROM quiz_attempts qa
        JOIN quizzes q
        ON q.id = qa.quiz_id
        JOIN modules m
        ON m.id = q.module_id
        WHERE qa.user_id = $1
        AND m.course_id = $2
        `,
        [
          userId,
          courseId
        ]
      );



    const score =
      Number(
        quiz.rows[0].score || 0
      );



    if(score < 0.7) {

      throw new Error(
        "Minimum quiz score not reached"
      );

    }





    // Generate actual PDF file
    CertificateGenerator.generate(
      "Student User",
      "Node.js Masterclass Pro",
      `${userId}-${courseId}`
    );



    // Save public URL
    const certificateUrl =
      `/certificates/${userId}-${courseId}.pdf`;




    // Create certificate record
    const certificate =
      await CertificateModel.createCertificate(
        userId,
        courseId,
        certificateUrl
      );



    return certificate;

  }





  static async getCertificates(
    userId: string
  ) {


    return await CertificateModel.getUserCertificates(
      userId
    );


  }


}