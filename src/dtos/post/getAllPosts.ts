import { z } from "zod";
import { PostModel } from "../../Models/Posts";

export interface GetAllPostsInputDTO {
  token: string;
}

export type GetAllPostsOutputDTO = PostModel[];

export const getAllPostsSchema = z
  .object({
    token: z.string().min(1),
 
  })
  .transform((data) => data as GetAllPostsInputDTO);
