import { UserDB } from "../Models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDataBase extends BaseDatabase{ 
        public static TABLE_USER = "users"


    public getUsers = async ():Promise<UserDB[]> =>{
        const output:UserDB[] = await BaseDatabase.connection(
            UserDataBase.TABLE_USER).select()
            
        return output
    }
}