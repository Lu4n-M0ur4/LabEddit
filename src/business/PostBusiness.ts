import { Post, PostDB } from "../Models/Posts";
import { PostDataBase } from "../dataBase/PostDataBase";
import { createPostInputDTO, createPostOutputDTO } from "../dtos/post/createPost";
import { BadRequestError } from "../errors/BadRequestError";

import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private tokenManager: TokenManager,
    private postDataBase: PostDataBase,
    private hashManager: HashManager,
    private idGenerator: IdGenerator
  ) {}

  public createPost = async (
    input: createPostInputDTO
  ): Promise<createPostOutputDTO> => {
    const { token, content } = input;

    const payload = this.tokenManager.getPayload(token)

    if(!payload){
      throw new BadRequestError(
        "Faça loguin novamente!!!"
      );
    }

    const id =this.idGenerator.generate()

    const post = new Post(
      id,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
    )

    const newPostDB:PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt()
    }

    await this.postDataBase.insertPost(newPostDB)



    const output: createPostOutputDTO = undefined;

    return output;
  };
}
