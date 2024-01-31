import { z } from "zod";
import { UserModel } from "../../Models/User";


export interface GetUsersInputDto{
    token: string;
}

export type GetUsersOutputDto = UserModel[]

export const GetUserSchema = z.object({
    token:z.string().min(1)
}).transform(data => data as GetUsersInputDto)