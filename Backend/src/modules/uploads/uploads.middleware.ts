import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      "uploads/"
    );

  },


  filename: (
    req,
    file,
    cb
  ) => {

    const uniqueName =
      Date.now() +
      "-" +
      file.originalname;


    cb(
      null,
      uniqueName
    );

  }

});



export const upload = multer({

  storage,

  limits: {

    fileSize: 100 * 1024 * 1024

  },

  fileFilter: (
    req,
    file,
    cb
  ) => {


    const allowed = [

      "application/pdf",

      "application/zip",

      "application/x-zip-compressed",

      "video/mp4",

      "application/vnd.ms-powerpoint",

      "application/vnd.openxmlformats-officedocument.presentationml.presentation"

    ];



    if(
      allowed.includes(file.mimetype)
    ){

      cb(null,true);

    } else {

      cb(
        new Error(
          "Unsupported file type"
        )
      );

    }

  }

});