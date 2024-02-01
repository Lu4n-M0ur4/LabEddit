import {UserBusiness} from "../../src/business/UserBusiness"
import {HashManagerMock} from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"


describe("Testes de login da UserBusiness",()=>{
  const userBusiness = new UserBussines(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )
    test("deve retornar token ao se logar corretamente",()=>{

    })
})