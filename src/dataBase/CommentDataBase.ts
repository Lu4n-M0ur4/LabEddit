import {
  COMMENT_LIKE,
  CommentsDB,
  CommentsDBAndCreator,
  likeOrDislikeComment,
} from "../Models/Comment";
import { UserDB } from "../Models/User";
import { BaseDatabase } from "./BaseDatabase";
import { UserDataBase } from "./UserDataBase";

export class CommentsDataBase extends BaseDatabase {
  public static TABLE_COMMENT = "comments";
  public static TABLE_LIKE_DISLIKE = "likes_dislikes_comments";
  public static TABLE_USER = "users";

  public getAllComment = async (
    id: string
  ): Promise<CommentsDB[] | undefined> => {
    const output: CommentsDB[] | undefined = await BaseDatabase.connection(
      CommentsDataBase.TABLE_COMMENT
    ).where({ post_id: id });
    return output;
  };

  public findCommentsForCreator = async (
    id: string
  ): Promise<CommentsDBAndCreator[]> => {
    const output: CommentsDBAndCreator[] = await BaseDatabase.connection(
      CommentsDataBase.TABLE_COMMENT
    )
      .select(
        `${CommentsDataBase.TABLE_COMMENT}.id`,
        `${CommentsDataBase.TABLE_COMMENT}.creator_id`,
        `${CommentsDataBase.TABLE_COMMENT}.post_id`,
        `${CommentsDataBase.TABLE_COMMENT}.content`,
        `${CommentsDataBase.TABLE_COMMENT}.likes`,
        `${CommentsDataBase.TABLE_COMMENT}.dislikes`,
        `${CommentsDataBase.TABLE_COMMENT}.created_at`,
        `${CommentsDataBase.TABLE_COMMENT}.updated_at`,
        `${CommentsDataBase.TABLE_USER}.name as creator_name`
      )
      .join(
        `${UserDataBase.TABLE_USER}`,
        `${CommentsDataBase.TABLE_COMMENT}.creator_id`,
        "=",
        `${UserDataBase.TABLE_USER}.id`
      )
      .where({ [`${CommentsDataBase.TABLE_COMMENT}.post_id`]: id });

    return output;
  };

  public insertComment = async (newComment: CommentsDB): Promise<void> => {
    await BaseDatabase.connection(CommentsDataBase.TABLE_COMMENT).insert(
      newComment
    );
  };

  public updateComment = async (updateComment: CommentsDB): Promise<void> => {
    await BaseDatabase.connection(CommentsDataBase.TABLE_COMMENT)
      .update(updateComment)
      .where({ id: updateComment.id });
  };

  public findComment = async (
    id: string
  ): Promise<CommentsDBAndCreator | undefined> => {
    const [output] = await BaseDatabase.connection(
      CommentsDataBase.TABLE_COMMENT
    )
      .select(
        `${CommentsDataBase.TABLE_COMMENT}.id`,
        `${CommentsDataBase.TABLE_COMMENT}.creator_id`,
        `${CommentsDataBase.TABLE_COMMENT}.content`,
        `${CommentsDataBase.TABLE_COMMENT}.likes`,
        `${CommentsDataBase.TABLE_COMMENT}.dislikes`,
        `${CommentsDataBase.TABLE_COMMENT}.created_at`,
        `${CommentsDataBase.TABLE_COMMENT}.updated_at`,
        `${UserDataBase.TABLE_USER}.name as creator_name`
      )
      .join(
        `${UserDataBase.TABLE_USER}`,
        `${CommentsDataBase.TABLE_COMMENT}.creator_id`,
        "=",
        `${UserDataBase.TABLE_USER}.id`
      )
      .where({ [`${CommentsDataBase.TABLE_COMMENT}.id`]: id });

    return output;
  };

  public findCommentLikeDisliked = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<COMMENT_LIKE | undefined> => {
    const [output]:Array<likeOrDislikeComment| undefined> = await BaseDatabase.connection(
      CommentsDataBase.TABLE_LIKE_DISLIKE
    ).where({
      user_id: likeDislikeExist.user_id,
      comments_id: likeDislikeExist.comments_id,
    });

    if (output === undefined) {
      return undefined;
    } else if (output.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED;
    } else {
      return COMMENT_LIKE.ALREADY_DISLIKED;
    }

  };

  public deleteLikeOrDislikeComment = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<void> => {
    await BaseDatabase.connection(CommentsDataBase.TABLE_LIKE_DISLIKE)
      .where({
        user_id: likeDislikeExist.user_id,
        comments_id: likeDislikeExist.comments_id,
      })
      .delete();
  };

  public updateLikeOrDislikeComment = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<void> => {
    await BaseDatabase.connection(CommentsDataBase.TABLE_LIKE_DISLIKE)
      .where({
        user_id: likeDislikeExist.user_id,
        comments_id: likeDislikeExist.comments_id,
      })
      .update(likeDislikeExist);
  };

  public insertLikeDislikeComment = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<void> => {
    await BaseDatabase.connection(CommentsDataBase.TABLE_LIKE_DISLIKE).insert(
      likeDislikeExist
    );
  };
}
