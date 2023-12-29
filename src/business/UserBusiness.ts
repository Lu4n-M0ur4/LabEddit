import { USER_ROLES, User, UserDB, UserModel } from "../Models/Users";
import { UserDataBase } from "../dataBase/UserDataBase";
import { GetUserSchema, GetUsersInputDto, GetUsersOutputDto } from "../dtos/users/getUsers";
import { SignupInputDto, SignupOutputDto } from "../dtos/users/signup";
import { BadRequestError } from "../errors/BadRequestError";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private tokenManager: TokenManager,
    private userDataBase: UserDataBase,
    private hashManager: HashManager,
    private idGenerator:IdGenerator,
  ) {}

  public getUsers = async (input:GetUsersInputDto):Promise<GetUsersOutputDto> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload || payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("Somente administradores podem acessar!!!");
    }
    
    const usersDB = await this.userDataBase.getUsers();

    if(!usersDB)
    {
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
    
    
    
    const output:GetUsersOutputDto = users 
    
    

    return output
  };

  public signup= async(input:SignupInputDto):Promise<SignupOutputDto> =>{
    const {name, email, password} = input;

    const userDBExist = await this.userDataBase.findUserByEmail(email);

    if(userDBExist?.length){
      throw new BadRequestError('Este e-mail já existe em nossa base de dados')
    }

    const hashedPassword = await this.hashManager.hash(password)

    const id = this.idGenerator.generate()

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString(),
    )
    
    const newUserDB:UserDB = {
      id: newUser.getId(),
      name:newUser.getName(),
      email:newUser.getEmail(),
      password:newUser.getPassword(),
      role:newUser.getRole(),
      created_at:newUser.getCreatedAt()


    }

    await this.userDataBase.insertUser(newUserDB)

    const tokenPayload:TokenPayload ={
      id:newUser.getId(),
      name:newUser.getName(),
      role:newUser.getRole()}  
    
      const token = this.tokenManager.createToken(tokenPayload)
    
    
      
    const output:SignupOutputDto = {token}
    
    return output


  }
}
