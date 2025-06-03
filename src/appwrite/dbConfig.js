import { conf } from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({ content, slug, title, imageId, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          imageId,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite : createPost error", error);
    }
  }

  async updatePost(slug, { content, title, image, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite : updatePost error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite : deletePost error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite : createAccount error", error)
      return false;
    }
  }

  async allPost() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status" , "active")]
      );
    } catch (error) {
        console.log("appwrite : allPost error", error)
        return false
    }
  }

  //file upload functions
  async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite : uploadFile error", error)
            return false
        }
  }

  async deleteFile(uniqueId){
    try {
        return await this.storage.deleteFile(
            conf.appwriteBucketId,
            uniqueId
        )
    } catch (error) {
        console.log("appwrite : deleteFile error", error)
        return false
    }
  }

  previewFile(uniqueId){
   try {
     return this.storage.getFilePreview(
         conf.appwriteBucketId,
         uniqueId
     )
   } catch (error) {
        console.log("appwrite : previewFile error", error)
            return false
        
   }
  } 
}

export const service = new Service();
