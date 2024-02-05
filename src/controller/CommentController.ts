import { Request, Response } from "express";

import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CommentBusiness } from "../business/CommentBusiness";
import { GetCommentSchema } from "../dtos/comment/getComments.dto";
import { CreateCommentSchema } from "../dtos/comment/createComments.dto";
import { LikeOrDislikeCommentSchema } from "../dtos/comment/likeOrDislikeComments.dto";

export class CommentController {
  constructor(private commentBusiness: CommentBusiness) {}

  public getComments = async (req: Request, res: Response) => {
    try {
      const input = GetCommentSchema.parse({
        token: req.headers.authorization,
        idToPost: req.params.id,
      });

      const output = await this.commentBusiness.getComments(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(404).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public createComments = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        token: req.headers.authorization,
        idToPost: req.params.id,
        content: req.body.content,
      });

      const output = await this.commentBusiness.createComment(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(404).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public likeOrDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        token: req.headers.authorization,
        idToComment: req.params.id,
        like: req.body.like,
      });

      const output = await this.commentBusiness.likeOrDislikeComment(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(404).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
