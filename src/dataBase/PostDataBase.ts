import { PostDB } from "../Models/Posts";
import { BaseDatabase } from "./BaseDatabase";

export class PostDataBase extends BaseDatabase {
  public static TABLE_USER = "posts";

  public getAllPosts = async (): Promise<PostDB[] | undefined> => {
    const output: PostDB[] | undefined = await BaseDatabase.connection(
      PostDataBase.TABLE_USER
    );

    return output
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

  public deletePost = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_USER)
      .where({ id })
      .delete();
  };
}
