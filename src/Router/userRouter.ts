import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { TokenManager } from '../services/TokenManager'
import { UserDataBase } from '../dataBase/UserDataBase'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'



export const userRouter = express.Router()

const userController= new UserController(new UserBusiness(new TokenManager(), new UserDataBase(), new HashManager(), new IdGenerator()))

userRouter.get("/",userController.getUsers)
userRouter.post("/signup",userController.signup)
userRouter.post("/login",userController.login)