import { v4 } from "uuid"


export class IdGernator{
    public generate = ():string =>{
        return v4()
    }
}