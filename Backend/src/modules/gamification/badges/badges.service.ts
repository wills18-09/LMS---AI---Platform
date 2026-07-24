import { BadgeModel } from "./badges.model";


export class BadgeService {


  // Create a new badge
  static async createBadge(
    name: string,
    description: string,
    iconUrl: string
  ) {

    return await BadgeModel.createBadge(
      name,
      description,
      iconUrl
    );

  }





  // Get all available badges
  static async getBadges() {

    return await BadgeModel.getBadges();

  }





  // Award badge to user
  static async awardBadge(
    userId: string,
    badgeId: number
  ) {


    const existing =
      await BadgeModel.hasBadge(
        userId,
        badgeId
      );



    if(existing) {

      return existing;

    }




    return await BadgeModel.awardBadge(
      userId,
      badgeId
    );


  }





  // Get user's earned badges
  static async getUserBadges(
    userId:string
  ) {

    return await BadgeModel.getUserBadges(
      userId
    );

  }


}