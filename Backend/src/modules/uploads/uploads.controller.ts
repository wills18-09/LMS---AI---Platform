import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";


export class UploadController {


  static async uploadFile(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {


      if (!req.file) {

        return res.status(400).json({

          message: "No file uploaded"

        });

      }



      const fileUrl =
        `/uploads/${req.file.filename}`;



      return res.status(200).json({

        message:
        "File uploaded successfully",

        file_url: fileUrl,

        file: {

          original_name:
          req.file.originalname,


          filename:
          req.file.filename,


          size:
          req.file.size,


          type:
          req.file.mimetype

        }

      });



    } catch(error) {


      console.error(
        "UPLOAD ERROR:",
        error
      );


      return res.status(500).json({

        message:
        "Server error while uploading file"

      });


    }

  }


}