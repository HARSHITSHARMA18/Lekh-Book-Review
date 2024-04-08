import conf from '../conf/conf'
import { Client, ID, Databases,Storage,Query } from "appwrite";


export class Service{

    client = new Client()
    databases;
    bucket; // storage

    constructor(){

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)
  
        this.bucket = new Storage(this.client)
    }
 
    // Creating Article
    async createPost ( {title, slug, content, featuredImage,status,userId}){

        try {
            
         return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, // acting as document id
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
         )
        
            
        } catch (error) {
            
            console.log('Appwrite Service :: createPost :: error', error);
        }
    }

    //Updating the article 
    async updatePost(slug,{title,content, featuredImage,status}){
     
        try {


            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            
        } catch (error) {
            console.log('Appwite Service :: updatePost :: error ::',error);
        }
    }


    //Deleting the article 
    async deletePost (slug){

        try {

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true
            
        } catch (error) {
           console.log('Appwite Service :: deletePost :: error ::',error) 
           return false
        }
    }

    // Getting individual Document
    async getPost (slug){

        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            
            
        } catch (error) {
           console.log('Appwite Service :: getPost :: error ::',error) 
           
           return false
        }
    }

    // Getting all documents
    async getPosts (queries = [ Query.equal('status', 'true')]){

        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // [
                //     Query.equal('status', 'true')
                // ]
                
                queries

            )
            
        } catch (error) {
            
            console.log('Appwite Service :: getPosts :: error ::',error) 

            return false
        }
    }

    //FILE UPLOAD SERVICE

    // Uploading a file
    async uploadFile(file){
   
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            // this will return an id of file, which will be used as featuredImage ( an id)
            // to createPost
            
        } catch (error) {
            console.log('Appwite Service :: uploadFile :: error ::',error) 
            return false
        }
    } 

    //Deleting a file

    async deleteFile(fileId){
        try {
            
           await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
           );
           return true

        } catch (error) {
            console.log('Appwite Service :: deleteFile :: error ::',error) 
            return false
        }
    }

    //File preview
    getFilePreview(fileId){
        
        if (fileId) {

            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            
        } else {
            
            console.log('Appwite Service :: getFilePrview :: error') 
            return false
        }
    }

}

const service = new Service()

export default service
