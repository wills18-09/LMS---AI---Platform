import { AdminModel } from "./admin.model";



export class AdminService {



  static async getUsers() {

    return await AdminModel.getUsers();

  }





  static async updateUserRole(
    userId: string,
    roleName: string
  ) {

    return await AdminModel.updateUserRole(
      userId,
      roleName
    );

  }





  static async suspendUser(
    userId: string
  ) {

    return await AdminModel.suspendUser(
      userId
    );

  }





  // Get courses waiting for admin approval
  static async getPendingCourses() {

    return await AdminModel.getPendingCourses();

  }





  // Approve course
  static async approveCourse(
    courseId: string
  ) {

    return await AdminModel.approveCourse(
      courseId
    );

  }





  // Reject course
  static async rejectCourse(
    courseId: string
  ) {

    return await AdminModel.rejectCourse(
      courseId
    );

  }





  static async getOverview() {

    return await AdminModel.getOverview();

  }

    static async getDetailedAnalytics() {

    return await AdminModel.getDetailedAnalytics();

  }



}