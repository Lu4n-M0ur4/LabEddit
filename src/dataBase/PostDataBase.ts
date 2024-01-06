import { POST_LIKE, PostDB, likeOrDislike } from "../Models/Posts";
import { BaseDatabase } from "./BaseDatabase";

export class PostDataBase extends BaseDatabase {
  public static TABLE_USER = "posts";
  public static TABLE_LIKE_DISLIKE = "likes_dislikes_posts";

  public getAllPosts = async (): Promise<PostDB[] | undefined> => {
    const output: PostDB[] | undefined = await BaseDatabase.connection(
      PostDataBase.TABLE_USER
    );

    return output;
  };

  public insertPost = async (newPost: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_USER).insert(newPost);
  };

  public updatePost = async (newPost: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_USER)
      .where({ id: newPost.id })
      .update(newPost);
  };

  public findPost = async (id: string): Promise<PostDB | undefined> => {
    const [output] = await BaseDatabase.connection(
      PostDataBase.TABLE_USER
    ).where({ id });

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
    await BaseDatabase.connection(PostDataBase.TABLE_USER)
      .where({ id })
      .delete();
  };
}
