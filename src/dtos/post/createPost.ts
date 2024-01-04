import { z } from "zod";



export interface createPostInputDTO{
    token:string;
    content:string;
}

export type createPostOutputDTO = undefined

export const createPostSchema = z.object({
    token:z.string().min(1),
    content:z.string().max(300).min(1)
}).transform(data => data as createPostInputDTO)