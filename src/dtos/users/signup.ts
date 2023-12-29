import { z } from "zod";
import { UserModel } from "../../Models/Users";


export interface SignupInputDto{
    name: string;
    email:string;
    password:string;
}

export interface SignupOutputDto {token: string}

export const SignupSchema = z.object({
    name:z.string().min(2),
    email:z.string().email(),
    password:z.string().min(3)
}).transform(data => data as SignupInputDto)