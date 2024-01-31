import { z } from "zod";


export interface LikeOrDislikeCommentInputDTO {
  token: string;
  idToComment:string;
  like:boolean;
}

export type LikeOrDislikeCommentOutputDTO = undefined;

export const likeOrDislikeCommentSchema = z
  .object({
    token: z.string().min(1),
    idToComment:z.string().min(2),
    like:z.boolean()
  })
  .transform((data) => data as LikeOrDislikeCommentInputDTO);
