import {
  POST_LIKE,
  Post,
  PostDB,
  PostModel,
  likeOrDislike,
} from "../Models/Posts";
import { USER_ROLES } from "../Models/Users";
import { PostDataBase } from "../dataBase/PostDataBase";
import {
  createPostInputDTO,
  createPostOutputDTO,
} from "../dtos/post/createPost";
import {
  deletePostInputDTO,
  deletePostOutputDTO,
} from "../dtos/post/deletePost";
import {
  GetAllPostsInputDTO,
  GetAllPostsOutputDTO,
} from "../dtos/post/getAllPosts";
import {
  LikeOrDislikePostInputDTO,
  LikeOrDislikePostOutputDTO,
} from "../dtos/post/likeOrDislikePost";
import {
  UpdatePostInputDTO,
  UpdatePostOutputDTO,
} from "../dtos/post/updatePost";

import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

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

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin novamente!!!");
    }

    const id = this.idGenerator.generate();

    const post = new Post(
      id,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostDB: PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };

    await this.postDataBase.insertPost(newPostDB);

    const output: createPostOutputDTO = undefined;

    return output;
  };

  public deletePost = async (
    input: deletePostInputDTO
  ): Promise<deletePostOutputDTO> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin!!!");
    }

    const postToDelete = await this.postDataBase.findPost(idToDelete);

    if (!postToDelete) {
      throw new BadRequestError("Este post não existe!!!");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (postToDelete.creator_id !== payload.id) {
        throw new BadRequestError(
          "Somente quem criou este post pode excluí-lo!!!"
        );
      }
    }

    await this.postDataBase.deletePost(idToDelete);

    const output: deletePostOutputDTO = undefined;

    return output;
  };

  public updatePost = async (
    input: UpdatePostInputDTO
  ): Promise<UpdatePostOutputDTO> => {
    const { token, content, idToUpdate } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin novamente!!!");
    }

    const postDB = await this.postDataBase.findPost(idToUpdate);

    if (!postDB) {
      throw new BadRequestError("Post não existe em nossa base de dados!!!");
    }

    if (postDB.creator_id !== payload.id) {
      throw new BadRequestError(
        "Somente o criador deste post pode alterá-lo!!"
      );
    }

    const post = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      0,
      0,
      postDB.created_at,
      new Date().toISOString()
    );

    post.setContent(content);

    const newPostDB: PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };

    await this.postDataBase.updatePost(newPostDB);

    const output: createPostOutputDTO = undefined;

    return output;
  };

  public getAllPosts = async (
    input: GetAllPostsInputDTO
  ): Promise<GetAllPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin novamente!!!");
    }

    const postsDB = await this.postDataBase.getAllPosts();

    if (!postsDB) {
      throw new NotFoundError("Ainda não possuimos nenhum post!!!");
    }

    const postModel = postsDB.map((p) => {
      const post = new Post(
        p.id,
        p.creator_id,
        p.content,
        p.likes,
        p.dislikes,
        p.created_at,
        p.updated_at
      );

      const results: PostModel = {
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
      };

      return results;
    });

    const output: GetAllPostsOutputDTO = postModel;

    return output;
  };

  public likeOrDislikePost = async (
    input: LikeOrDislikePostInputDTO
  ): Promise<LikeOrDislikePostOutputDTO> => {
    const { token, postId, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin novamente!!!");
    }

    const postDB = await this.postDataBase.findPost(postId);

    if (!postDB) {
      throw new BadRequestError("Post não existe em nossa base de dados!!!");
    }

    if (postDB.creator_id === payload.id) {
      throw new BadRequestError("Você criou este post, não pode curti-lo!!!");
    }

    const postModel = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    );

    const likeSqlLite = like ? 1 : 0;

    const likeOrDislikeDB: likeOrDislike = {
      user_id: payload.id,
      post_id: postId,
      like: likeSqlLite,
    };

    const likeDislikeExist = await this.postDataBase.findPostLikedDisliked(
      likeOrDislikeDB
    );

    console.log(likeDislikeExist);

    if (likeDislikeExist === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDataBase.findPostLikedDisliked(likeOrDislikeDB);
        await this.postDataBase.deleteLikeOrDislike(likeOrDislikeDB);
        postModel.setLikes(0);
      } else {
        await this.postDataBase.findPostLikedDisliked(likeOrDislikeDB);
        await this.postDataBase.updateLikeOrDislike(likeOrDislikeDB);
        postModel.setLikes(0);
        postModel.setDislikes(1);
      }
    } else if (likeDislikeExist === POST_LIKE.ALREADY_DISLIKED) {
      if (!like) {
        await this.postDataBase.findPostLikedDisliked(likeOrDislikeDB);
        await this.postDataBase.deleteLikeOrDislike(likeOrDislikeDB);
        postModel.setDislikes(0);
      } else {
        await this.postDataBase.findPostLikedDisliked(likeOrDislikeDB);
        await this.postDataBase.updateLikeOrDislike(likeOrDislikeDB);
        postModel.setDislikes(0);
        postModel.setLikes(1);
      }
    } else {
      await this.postDataBase.findPostLikedDisliked(likeOrDislikeDB);
      await this.postDataBase.insertLikeOrDislike(likeOrDislikeDB);
      like ? postModel.setLikes(1) : postModel.setDislikes(1);
    }


    const newPostDBLikedOrDisliked: PostDB = {
      id: postModel.getId(),
      creator_id: postModel.getCreatorId(),
      content: postModel.getContent(),
      likes: postModel.getLikes(),
      dislikes: postModel.getDislikes(),
      created_at: postModel.getCreatedAt(),
      updated_at: postModel.getUpdatedAt(),
    };

    await this.postDataBase.updatePost(newPostDBLikedOrDisliked);

    const output: LikeOrDislikePostOutputDTO = undefined;

    return output;
  };
}
