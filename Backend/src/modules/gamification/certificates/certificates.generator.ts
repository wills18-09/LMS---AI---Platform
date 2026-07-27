import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export class CertificateGenerator {

  static generate(
    studentName: string,
    courseName: string,
    certificateId: string
  ): string {

    const certificatesDir = path.join(
      process.cwd(),
      "certificates"
    );

    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir);
    }

    const filePath = path.join(
      certificatesDir,
      `${certificateId}.pdf`
    );

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 40
    });

    doc.pipe(
      fs.createWriteStream(filePath)
    );

    // ==========================
    // Outer Border
    // ==========================

    doc
      .lineWidth(3)
      .rect(25, 25, 792, 545)
      .stroke();

    doc
      .lineWidth(1)
      .rect(40, 40, 762, 515)
      .stroke();

    // ==========================
    // Platform Name
    // ==========================

    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .text(
        "LMS AI PLATFORM",
        0,
        60,
        {
          align: "center"
        }
      );

    // ==========================
    // Title
    // ==========================

    doc
      .font("Helvetica-Bold")
      .fontSize(34)
      .text(
        "CERTIFICATE OF COMPLETION",
        0,
        105,
        {
          align: "center"
        }
      );

    // ==========================
    // Subtitle
    // ==========================

    doc
      .font("Helvetica")
      .fontSize(18)
      .text(
        "This certificate is proudly presented to",
        0,
        170,
        {
          align: "center"
        }
      );

    // ==========================
    // Student Name
    // ==========================

    doc
      .font("Helvetica-Bold")
      .fontSize(30)
      .text(
        studentName,
        0,
        215,
        {
          align: "center"
        }
      );

    // Decorative line

    doc
      .moveTo(240, 255)
      .lineTo(600, 255)
      .stroke();

    // ==========================
    // Completion Text
    // ==========================

    doc
      .font("Helvetica")
      .fontSize(18)
      .text(
        "for successfully completing the course",
        0,
        285,
        {
          align: "center"
        }
      );

    // ==========================
    // Course Name
    // ==========================

    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .text(
        courseName,
        0,
        325,
        {
          align: "center"
        }
      );

    // ==========================
    // Footer Left
    // ==========================

    doc
      .font("Helvetica")
      .fontSize(12)
      .text(
        `Certificate ID: ${certificateId}`,
        70,
        455
      );

    doc.text(
      `Issued: ${new Date().toDateString()}`,
      70,
      475
    );

    // ==========================
    // Signature
    // ==========================

    doc
      .moveTo(610, 470)
      .lineTo(760, 470)
      .stroke();

    doc
      .font("Helvetica")
      .fontSize(12)
      .text(
        "Authorized Signature",
        615,
        480
      );

    // ==========================
    // Bottom Note
    // ==========================

    doc
      .fontSize(11)
      .text(
        "This certificate certifies that all course requirements have been successfully completed.",
        0,
        525,
        {
          align: "center"
        }
      );

    doc.end();

    return filePath;
  }

}