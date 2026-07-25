import { ReviewModel } from "./reviews.model";


export class ReviewService {


  static async createReview(
    courseId: string,
    userId: string,
    rating: number,
    comment: string
  ) {

    if (rating < 1 || rating > 5) {
      throw new Error(
        "Rating must be between 1 and 5"
      );
    }


    const review =
      await ReviewModel.createReview(
        courseId,
        userId,
        rating,
        comment
      );


    return review;

  }





  static async getCourseReviews(
    courseId: string
  ) {

    const reviews =
      await ReviewModel.getCourseReviews(
        courseId
      );


    return reviews;

  }


}