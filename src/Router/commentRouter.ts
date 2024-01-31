import express from "express";

import { TokenManager } from "../services/TokenManager";

import { IdGenerator } from "../services/IdGenerator";

import { CommentController } from "../controller/CommentController";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentsDataBase } from "../dataBase/CommentDataBase";
import { PostDataBase } from "../dataBase/PostDataBase";

export const commentRouter = express.Router();

const commentController = new CommentController(
  new CommentBusiness(
    new TokenManager(),
    new CommentsDataBase(),
    new IdGenerator(),
    new PostDataBase()
  )
);

commentRouter.get("/:id", commentController.getComments);
commentRouter.post("/:id", commentController.createComments)
commentRouter.put("/:id", commentController.likeOrDislikeComment)
