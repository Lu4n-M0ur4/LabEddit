import { POST_LIKE, PostDB, PostDBAndCreator, PostModelForCratorName, likeOrDislike } from "../Models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDataBase } from "./UserDataBase";

export class PostDataBase extends BaseDatabase {
  public static TABLE_POST = "posts";
  public static TABLE_LIKE_DISLIKE = "likes_dislikes_posts";

  public getAllPosts = async (): Promise<PostDBAndCreator[] | undefined> => {
    const output = await BaseDatabase.connection(
      PostDataBase.TABLE_POST
    )
    .select(
      `${PostDataBase.TABLE_POST}.id`,
      `${PostDataBase.TABLE_POST}.creator_id`,
      `${PostDataBase.TABLE_POST}.content`,
      `${PostDataBase.TABLE_POST}.likes`,
      `${PostDataBase.TABLE_POST}.dislikes`,
      `${PostDataBase.TABLE_POST}.created_at`,
      `${PostDataBase.TABLE_POST}.updated_at`,
      `${UserDataBase.TABLE_USER}.name as creator_name`,
    )
    .join(
      `${UserDataBase.TABLE_USER}`,
      `${PostDataBase.TABLE_POST}.creator_id`,
      "=",
      `${UserDataBase.TABLE_USER}.id`,
    )

    return output;
  };

  public insertPost = async (newPost: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_POST).insert(newPost);
  };

  public updatePost = async (newPost: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_POST)
      .where({ id: newPost.id })
      .update(newPost);
  };

  public findPost = async (id: string): Promise<PostDBAndCreator | undefined> => {
    const [output] = await BaseDatabase.connection(
      PostDataBase.TABLE_POST
    )
    .select(
      `${PostDataBase.TABLE_POST}.id`,
      `${PostDataBase.TABLE_POST}.creator_id`,
      `${PostDataBase.TABLE_POST}.content`,
      `${PostDataBase.TABLE_POST}.likes`,
      `${PostDataBase.TABLE_POST}.dislikes`,
      `${PostDataBase.TABLE_POST}.created_at`,
      `${PostDataBase.TABLE_POST}.updated_at`,
      `${UserDataBase.TABLE_USER}.name as creator_name`,
    )
    .join(
      `${UserDataBase.TABLE_USER}`,
      `${PostDataBase.TABLE_POST}.creator_id`,
      "=",
      `${UserDataBase.TABLE_USER}.id`,
    )
    .where({[`${PostDataBase.TABLE_POST}.id`]:id });


    return output;

    
  };


  public findPostLikedDisliked = async (
    likeDislikeExist: likeOrDislike
  ): Promise<POST_LIKE | undefined> => {
    const [res]:likeOrDislike[] | undefined = await BaseDatabase.connection(
      PostDataBase.TABLE_LIKE_DISLIKE
    ).where({
      user_id: likeDislikeExist.user_id,
      post_id: likeDislikeExist.post_id,
    });

    

    if (res === undefined) { 
      return undefined;
    } else if (res.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }


    
  };

  public insertLikeOrDislike = async (
    likeDislikeExist: likeOrDislike
  ): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_LIKE_DISLIKE).insert(
      likeDislikeExist
    );
  };

  public updateLikeOrDislike = async (
    likeDislikeExist: likeOrDislike
  ): Promise<void> => {
    const res = await BaseDatabase.connection(PostDataBase.TABLE_LIKE_DISLIKE)
      .where({
        user_id: likeDislikeExist.user_id,
        post_id: likeDislikeExist.post_id,
      })
      .update(likeDislikeExist);
  };

  public deleteLikeOrDislike = async (
    likeDislikeExist: likeOrDislike
  ): Promise<void> => {
    const res = await BaseDatabase.connection(PostDataBase.TABLE_LIKE_DISLIKE)
      .where({
        user_id: likeDislikeExist.user_id,
        post_id: likeDislikeExist.post_id,
      })
      .delete();
  };


  public deletePost = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_POST)
      .where({ id })
      .delete();
  };


}
