import { USER_ROLES, UserDB } from "../../src/Models/User";
import { BaseDatabase } from "../../src/dataBase/BaseDatabase";

const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano", // senha = "fulano123"
    created_at: new Date().toISOString(),
    role: USER_ROLES.NORMAL,
  },
  {
    id: "id-mock-astrodev",
    name: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev", // senha = "astrodev99"
    created_at: new Date().toISOString(),
    role: USER_ROLES.ADMIN,
  },
];

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public getUsers = async (): Promise<UserDB[]> => {
    const output: UserDB[] = usersMock;
    return output;
  };

  public findUserByEmail = async (
    email: string
  ): Promise<UserDB | undefined> => {
    return usersMock.filter((userMock) => userMock.email === email)[0];
  };

  public insertUser = async (newUser: UserDB): Promise<void> => {};
}
