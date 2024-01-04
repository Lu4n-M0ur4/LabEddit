
import { PostDB } from "../Models/Posts";
import { BaseDatabase } from "./BaseDatabase";

export class PostDataBase extends BaseDatabase {
  public static TABLE_USER = "posts";


  public insertPost = async (newPost: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_USER).insert(newPost);
  };

}
