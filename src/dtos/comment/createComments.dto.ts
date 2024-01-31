import { z } from "zod";


export interface CreateCommentInputDTO {
  token: string;
  idToPost:string;
  content:string;
}

export type CreateCommentOutputDTO = undefined;

export const createCommentSchema = z
  .object({
    token: z.string().min(1),
    idToPost:z.string().min(2),
    content:z.string()
  })
  .transform((data) => data as CreateCommentInputDTO);
