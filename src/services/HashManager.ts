import dotenv from "dotenv";
import bcrypt from "bcryptjs"
dotenv.config()


export class HashManager{


 public hash = async(plaintext:string):Promise<string> =>{
    const rounds =  Number(process.env.BCRYPT_COST)
    const salts = await bcrypt.genSalt(rounds)
    const hash = await bcrypt.hash(plaintext,salts)


    return hash
};

 public compare = async(plaintext:string, hash:string):Promise<boolean> =>{
    return bcrypt.compare(plaintext, hash)   

 }

}