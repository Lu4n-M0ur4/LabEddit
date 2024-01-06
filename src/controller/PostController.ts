import { Request, Response } from "express";

import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";

import { PostBusiness } from "../business/PostBusiness";
import { deletePostSchema } from "../dtos/post/deletePost";
import { createPostSchema } from "../dtos/post/createPost";
import { updatePostSchema } from "../dtos/post/updatePost";
import { getAllPostsSchema } from "../dtos/post/getAllPosts";
import { likeOrDislikePostSchema } from "../dtos/post/likeOrDislikePost";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = createPostSchema.parse({
        token: req.headers.authorization,
        content: req.body.content,
      });

      const output = await this.postBusiness.createPost(input);

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

  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const input = getAllPostsSchema.parse({
        token: req.headers.authorization,
      });


      const output = await this.postBusiness.getAllPosts(input);

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

  public updatePost = async (req: Request, res: Response) => {
    try {
      const input = updatePostSchema.parse({
        token: req.headers.authorization,
        idToUpdate: req.params.id,
        content:req.body.content
      });


      const output = await this.postBusiness.updatePost(input);

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

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = deletePostSchema.parse({
        token: req.headers.authorization,
        idToDelete: req.params.id,
      });


      const output = await this.postBusiness.deletePost(input);

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

  public likeOrDislikePost = async (req: Request, res: Response) => {
    try {
      const input = likeOrDislikePostSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        like:req.body.like
      });
      

      const output = await this.postBusiness.likeOrDislikePost(input);

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
