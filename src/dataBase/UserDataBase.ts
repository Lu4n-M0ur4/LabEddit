import { User, UserDB } from "../Models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDataBase extends BaseDatabase {
  public static TABLE_USER = "users";

  public getUsers = async (): Promise<UserDB[]> => {
    const output: UserDB[] = await BaseDatabase.connection(
      UserDataBase.TABLE_USER
    ).select();

    return output;
  };

  public findUserByEmail = async (
    email: string
  ): Promise<UserDB | undefined> => {
    const [output]: UserDB[] | undefined = await BaseDatabase.connection(
      UserDataBase.TABLE_USER
    ).where({ email });

    return output;
  };

  public insertUser = async (newUser: UserDB): Promise<void> => {
    await BaseDatabase.connection(UserDataBase.TABLE_USER).insert(newUser);
  };
}
