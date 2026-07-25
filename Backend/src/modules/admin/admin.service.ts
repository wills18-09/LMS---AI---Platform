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



  static async getOverview() {

    return await AdminModel.getOverview();

  }

}