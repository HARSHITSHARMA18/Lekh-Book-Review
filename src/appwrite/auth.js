import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";



export class AuthService {

    client = new Client()
    account;

    // creating client and account when a object is created
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    // Creating custom function to prevent vender lockin
    async createAccount({email,password,name}){

        try {

            // Using unique id as the first argument according to documentation 
            const userAccount = await this.account.create(ID.unique(),email,password,name);
       
            
            if(userAccount){
                // Call another function to login directly
                console.log('Account created sucessfully')
                return this.login({email,password})

                // return userAccount
            }
            else {
                console.log("Account creation failed!");
                return userAccount
            }
 



        } catch (error) {
            // throw error

            console.log('Appwrite services :: createAccount :: error ::', error);
        }
    }


    // Custom login fucntion 
    async login({email,password}){

        try {
            
         const loginSession = await this.account.createEmailPasswordSession(email,password);
        
          return loginSession  

        } catch (error) {
            console.log('Appwrite services :: login :: error ::', error)
        }
    }

    //Function to get user details 
    async getCurrentUser(){

        try {
            
          const currentUser = await this.account.get();

          console.log('Current User',currentUser)

          return currentUser

        } catch (error) {
            console.log(`Appwrite service :: getCurrentUser :: error ${error}`);
        }

        return null
    }


    // Function to logout
    async logout(){
      
        try {

           // Delete all the instances on all browsers
           await this.account.deleteSessions(); 
           console.log("Logout Successfully"); 
            
        } catch (error) {
            
            console.log('Appwrite service :: logout :: error:: ', error);
        }
    }
}

//Object of Services Class
const authService  = new AuthService()

export default authService

