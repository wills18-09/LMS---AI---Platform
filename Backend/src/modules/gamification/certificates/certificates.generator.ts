import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";


export class CertificateGenerator {


  static generate(
    studentName: string,
    courseName: string,
    certificateId: string
  ): string {


    const certificatesDir =
      path.join(
        process.cwd(),
        "certificates"
      );


    // create folder if it does not exist
    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir);
    }


    const filePath =
      path.join(
        certificatesDir,
        `${certificateId}.pdf`
      );


    const doc =
      new PDFDocument({
        size: "A4",
        layout: "landscape"
      });


    const stream =
      fs.createWriteStream(
        filePath
      );


    doc.pipe(stream);



    doc
      .fontSize(35)
      .text(
        "Certificate of Completion",
        {
          align: "center"
        }
      );



    doc.moveDown(2);



    doc
      .fontSize(20)
      .text(
        "This certificate is proudly presented to",
        {
          align: "center"
        }
      );



    doc.moveDown();



    doc
      .fontSize(30)
      .text(
        studentName,
        {
          align: "center"
        }
      );



    doc.moveDown();



    doc
      .fontSize(20)
      .text(
        `For successfully completing ${courseName}`,
        {
          align: "center"
        }
      );



    doc.moveDown(2);



    doc
      .fontSize(14)
      .text(
        `Issued on: ${new Date().toDateString()}`,
        {
          align: "center"
        }
      );



    doc.end();



    return filePath;

  }


}