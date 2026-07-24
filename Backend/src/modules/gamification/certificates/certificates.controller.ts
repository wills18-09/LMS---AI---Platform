import { Request, Response } from "express";
import { CertificateService } from "./certificates.service";


export class CertificateController {


  // Generate certificate
  static async generateCertificate(
    req: Request,
    res: Response
  ) {

    try {


      const userId =
        req.user!.id;


      const courseId =
        req.params.courseId as string;



      const certificate =
        await CertificateService.generateCertificate(
          userId,
          courseId
        );



      res.status(201).json({

        message:
          "Certificate generated successfully",

        certificate

      });



    } catch(error:any) {


      console.error(
        "CERTIFICATE GENERATION ERROR:",
        error
      );



      res.status(400).json({

        message:
          error.message ||
          "Failed to generate certificate"

      });


    }

  }





  // Get logged-in user's certificates
  static async getMyCertificates(
    req: Request,
    res: Response
  ) {

    try {


      const userId =
        req.user!.id;



      const certificates =
        await CertificateService.getCertificates(
          userId
        );



      res.status(200).json({

        certificates

      });



    } catch(error:any) {


      console.error(
        "GET CERTIFICATES ERROR:",
        error
      );



      res.status(500).json({

        message:
          error.message ||
          "Failed to fetch certificates"

      });


    }

  }


}