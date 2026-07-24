import pool from "../../../db";


export class BadgeModel {


  // Create badge
  static async createBadge(
    name: string,
    description: string,
    iconUrl: string
  ) {

    const result =
      await pool.query(
        `
        INSERT INTO badges (
          name,
          description,
          icon_url
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        [
          name,
          description,
          iconUrl
        ]
      );


    return result.rows[0];

  }




  // Get all badges
  static async getBadges() {

    const result =
      await pool.query(
        `
        SELECT *
        FROM badges
        ORDER BY id
        `
      );


    return result.rows;

  }




  // Check if user already has badge
  static async hasBadge(
    userId: string,
    badgeId: number
  ) {


    const result =
      await pool.query(
        `
        SELECT *
        FROM user_badges
        WHERE user_id = $1
        AND badge_id = $2
        `,
        [
          userId,
          badgeId
        ]
      );


    return result.rows[0];

  }





  // Award badge
  static async awardBadge(
    userId: string,
    badgeId: number
  ) {


    const result =
      await pool.query(
        `
        INSERT INTO user_badges (
          user_id,
          badge_id
        )
        VALUES ($1,$2)
        RETURNING *
        `,
        [
          userId,
          badgeId
        ]
      );


    return result.rows[0];

  }





  // Get user badges
  static async getUserBadges(
    userId:string
  ){

    const result =
      await pool.query(
        `
        SELECT
          b.id,
          b.name,
          b.description,
          b.icon_url,
          ub.earned_at
        FROM user_badges ub
        JOIN badges b
        ON b.id = ub.badge_id
        WHERE ub.user_id = $1
        `,
        [
          userId
        ]
      );


    return result.rows;

  }


}