import { z } from "zod";



export interface UpdatePostInputDTO{
    token:string;
    idToUpdate:string;
    content:string;
}

export type UpdatePostOutputDTO = undefined

export const updatePostSchema = z.object({
    token:z.string().min(1),
    idToUpdate:z.string().min(1),
    content:z.string().min(1)
}).transform(data => data as UpdatePostInputDTO)