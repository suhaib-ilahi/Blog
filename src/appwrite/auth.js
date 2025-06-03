import { Client, Account, ID } from "appwrite";
import { conf } from "../conf/config";

class AuthService {
  client = new Client()
  account
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (error) {
      console.log("appwrite : createAccount error", error)
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.log("appwrite : login error", error)
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      console.log("appwrite : getCurrentUser error", error)
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions()
    } catch (error) {
      console.log("appwrite : logout error", error)
    }
  }
}

export const authService = new AuthService()
