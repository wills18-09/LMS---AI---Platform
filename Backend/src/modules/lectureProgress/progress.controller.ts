import { Request, Response } from "express";
import { ProgressService } from "./progress.service";

export const updateLectureProgress = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user!.id;

    const lectureId = req.params.id as string;

    if (!lectureId) {
      res.status(400).json({
        message: "Lecture ID is required"
      });
      return;
    }

    const {
      watched_seconds,
      completed
    } = req.body;

    if (
      watched_seconds === undefined ||
      completed === undefined
    ) {
      res.status(400).json({
        message: "watched_seconds and completed are required"
      });
      return;
    }

    const progress =
      await ProgressService.updateProgress(
        userId,
        lectureId,
        watched_seconds,
        completed
      );

    res.status(200).json({
      message: "Lecture progress updated successfully",
      progress
    });

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    });

  }

};