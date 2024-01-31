import { z } from "zod";
import { CommentModelByPost } from "../../Models/Comment";

export interface GetCommentInputDTO {
  token: string;
  idToPost:string;
}

export type GetCommentOutputDTO = CommentModelByPost;

export const getCommentSchema = z
  .object({
    token: z.string().min(1),
    idToPost:z.string().min(2)
  })
  .transform((data) => data as GetCommentInputDTO);
