import {
  COMMENT_LIKE,
  Comment,
  CommentModel,
  CommentModelByPost,
  CommentsDB,
  likeOrDislikeComment,
} from "../Models/Comment";
import { CommentsDataBase } from "../dataBase/CommentDataBase";
import { PostDataBase } from "../dataBase/PostDataBase";

import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Post, PostModelForCratorName } from "../Models/Post";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/comment/createComments.dto";
import {
  GetCommentInputDTO,
  GetCommentOutputDTO,
} from "../dtos/comment/getComments.dto";
import {
  LikeOrDislikeCommentInputDTO,
  LikeOrDislikeCommentOutputDTO,
} from "../dtos/comment/likeOrDislikeComments.dto";

export class CommentBusiness {
  constructor(
    private tokenManager: TokenManager,
    private commentDataBase: CommentsDataBase,
    private idGenerator: IdGenerator,
    private postDataBase: PostDataBase
  ) {}

  public getComments = async (
    input: GetCommentInputDTO
  ): Promise<GetCommentOutputDTO> => {
    const { token, idToPost } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin novamente!!!");
    }

    const commentsDB = await this.commentDataBase.getAllComment(idToPost);

    if (!commentsDB) {
      throw new NotFoundError(
        "Ainda não possuimos nenhum comentário neste post!!!"
      );
    }

    const postById = await this.postDataBase.findPost(idToPost);

  
    if (!postById) {
      throw new NotFoundError("Ainda não possuimos nenhum post!!!");
    }

    const postDB = new Post(
      postById.id,
      postById.creator_id,
      postById.content,
      postById.likes,
      postById.dislikes,
      postById.created_at,
      postById.updated_at,
      postById.creator_name
    );

    const postModel: PostModelForCratorName = {
      id: postDB.getId(),
      content: postDB.getContent(),
      likes: postDB.getLikes(),
      dislikes: postDB.getDislikes(),
      createdAt: postDB.getCreatedAt(),
      updatedAt: postDB.getUpdatedAt(),
      creator: {
        creatorId: postDB.getCreatorId(),
        creatorName: postDB.getCreatorName(),
      },
    };

    const CommentsDBAndCreator =
      await this.commentDataBase.findCommentsForCreator(idToPost);

    const commentModel = CommentsDBAndCreator.map((c) => {
      const comment = new Comment(
        c.id,
        c.creator_id,
        c.post_id,
        c.content,
        c.likes,
        c.dislikes,
        c.created_at,
        c.updated_at,
        c.creator_name
      );

      const results: CommentModel = {
        id: comment.getId(),
        postId: comment.getPostId(),
        content: comment.getContent(),
        likes: comment.getLikes(),
        dislikes: comment.getDislikes(),
        createdAt: comment.getCreatedAt(),
        updatedAt: comment.getUpdatedAt(),
        creator: {
          idCreator: comment.getCreatorId(),
          creatorName: comment.getCreatorName(),
        },
      };

      return results;
    });

    const output: CommentModelByPost = {
      post: postModel,
      comments: commentModel,
    };

    return output;
  };

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {
    const { token, idToPost, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin novamente!!!");
    }

    const id = this.idGenerator.generate();

    const comment = new Comment(
      id,
      payload.id,
      idToPost,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.name
    );

    const newCommentDB: CommentsDB = {
      id: comment.getId(),
      creator_id: comment.getCreatorId(),
      post_id: comment.getPostId(),
      content: comment.getContent(),
      likes: comment.getLikes(),
      dislikes: comment.getDislikes(),
      created_at: comment.getCreatedAt(),
      updated_at: comment.getUpdatedAt(),
    };

    await this.commentDataBase.insertComment(newCommentDB);

    const output: CreateCommentOutputDTO = undefined;

    return output;
  };

  public likeOrDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<LikeOrDislikeCommentOutputDTO> => {
    const { token, idToComment, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Faça loguin novamente!!!");
    }

    const commentDB = await this.commentDataBase.findComment(idToComment);

    if (!commentDB) {
      throw new BadRequestError(
        "Este comentario não existe em nossa base de dados!!!"
      );
    }

    if (commentDB.creator_id === payload.id) {
      throw new BadRequestError("Você criou este post, não pode curti-lo!!!");
    }


    const commentModel = new Comment(
      commentDB.id,
      commentDB.creator_id,
      commentDB.post_id,
      commentDB.content,
      commentDB.likes,
      commentDB.dislikes,
      commentDB.created_at,
      commentDB.updated_at,
      commentDB.creator_name
    );

    const likeSqlLite = like ? 1 : 0;

    const likeOrDislikeDB: likeOrDislikeComment = {
      user_id: payload.id,
      comments_id: idToComment,
      like: likeSqlLite,
    };

    const likeDislikeExist = await this.commentDataBase.findCommentLikeDisliked(
      likeOrDislikeDB
    );

  
   

    if (likeDislikeExist === COMMENT_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.commentDataBase.deleteLikeOrDislikeComment(likeOrDislikeDB);
        commentModel.removeLike();
      } else {
        await this.commentDataBase.updateLikeOrDislikeComment(likeOrDislikeDB);
        commentModel.removeLike();
        commentModel.addDislike();
      }
    } else if (likeDislikeExist === COMMENT_LIKE.ALREADY_DISLIKED) {
      if (!like) {
        await this.commentDataBase.deleteLikeOrDislikeComment(likeOrDislikeDB);
        commentModel.removeDislike()
      } else {
        await this.commentDataBase.updateLikeOrDislikeComment(likeOrDislikeDB);
        commentModel.removeDislike()
        commentModel.addLike()
      }
    } else {
      await this.commentDataBase.insertLikeDislikeComment(likeOrDislikeDB);
      like ? commentModel.addLike() : commentModel.addDislike();
    }

    const newCommentDBLikeDislike: CommentsDB = {
      id: commentModel.getId(),
      creator_id: commentModel.getCreatorId(),
      post_id: commentModel.getPostId(),
      content: commentModel.getContent(),
      likes: commentModel.getLikes(),
      dislikes: commentModel.getDislikes(),
      created_at: commentModel.getCreatedAt(),
      updated_at: new Date().toISOString(),
    };

    await this.commentDataBase.updateComment(newCommentDBLikeDislike);

    const output: LikeOrDislikeCommentOutputDTO = undefined;

    return output;
  };
}
