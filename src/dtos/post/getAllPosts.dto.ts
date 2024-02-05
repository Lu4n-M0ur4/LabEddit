import { z } from "zod";
import { PostModelForCratorName } from "../../Models/Post";

export interface GetAllPostsInputDTO {
  token: string;
}


export type GetAllPostsOutputDTO = PostModelForCratorName[];

export const GetAllPostsSchema = z
  .object({
    token: z.string().min(1),
 
  })
  .transform((data) => data as GetAllPostsInputDTO);
