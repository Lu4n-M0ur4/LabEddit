import express, { Request, Response, request } from "express"
import cors from "cors"
import { UserBusiness } from "./business/UserBusiness"
import { TokenManager } from "./services/TokenManager"
import { UserDataBase } from "./dataBase/UserDataBase"

const app =  express()

app.use(cors())
app.use(express.json())

app.listen(3003,()=>{
    console.log(`servidor rodado na porta 3003`)
})

app.get("/ping", async (req:Request, res:Response)=>{
    const response = new UserBusiness(new TokenManager(),new UserDataBase())
    const resp = await response.getUsers()
    res.send(resp)
})
