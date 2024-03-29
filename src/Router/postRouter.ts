import express from "express";

import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDataBase } from "../dataBase/PostDataBase";

export const postRouter = express.Router();

const postController = new PostController(
  new PostBusiness(
    new TokenManager(),
    new PostDataBase(),
    new HashManager(),
    new IdGenerator()
  )
);

postRouter.get("/", postController.getAllPosts);
postRouter.post("/", postController.createPost);
postRouter.delete("/:id", postController.deletePost);
postRouter.put("/:id", postController.updatePost);
postRouter.put("/:id/like", postController.likeOrDislikePost);
