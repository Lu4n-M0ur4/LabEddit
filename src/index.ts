import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

dotenv.config()

import { userRouter } from "./Router/userRouter"

const app =  express()

app.use(cors())
app.use(express.json())

app.listen(3003,()=>{
    console.log(`servidor rodado na porta ${process.env.PORT}`)
})

app.use("/users", userRouter)
app.use("/signup", userRouter)