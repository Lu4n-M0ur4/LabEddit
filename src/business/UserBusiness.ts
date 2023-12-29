import { USER_ROLES, User, UserDB, UserModel } from "../Models/Users";
import { UserDataBase } from "../dataBase/UserDataBase";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private tokenManager: TokenManager,
    private userDataBase: UserDataBase
  ) {}

  public getUsers = async ():Promise<UserModel[]> => {
    // const { token } = input;

    // const payload = this.tokenManager.getPayload(token);

    // if (!payload || payload.role !== USER_ROLES.ADMIN) {
    //   throw new BadRequestError("Somente administradores podem acessar!!!");
    // }
    
    const usersDB = await this.userDataBase.getUsers();
    if(!usersDB){
    throw new BadRequestError("Não existe nenhum usuário na base de dados!!!")
    }

    const users = usersDB.map((userDB) => {
        const user = new User(
            userDB.id,
            userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
        );
        
      const userModel: UserModel = {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          role: user.getRole(),
          createdAt: user.getCreatedAt(),
        };
        
        return userModel;
    });
    
    
    
    const output:UserModel[] = users 
    
    

    return output
  };
}
