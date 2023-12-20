import express, { Request, Response, request } from "express"
import cors from "cors"

const app =  express()

app.use(cors())
app.use(express.json())

app.listen(3003,()=>{
    console.log(`servidor rodado na porta 3003`)
})

app.get("/ping", (req:Request, res:Response)=>{
    res.send("pong")
})
