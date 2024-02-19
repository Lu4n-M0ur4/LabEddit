import { PostBusiness } from "../../src/business/PostBusiness"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import {HashManagerMock } from "../mocks/HashManagerMock"
import {IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { GetAllPostsSchema } from "../../src/dtos/post/getAllPosts.dto"


describe("Testando usabilidadde de postBusiness", ()=>{
 const postBusiness = new PostBusiness(
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock()
 )



 test("Deve retornar um objeto do tipo PostDBAndCreator",async ()=>{

    const input = GetAllPostsSchema.parse({
        token: "token-mock-fulano"
 })

 const output = await postBusiness.getAllPosts(input)

 expect(output).toContainEqual({
    id: "id-mock",
    content: "Conteudo do post MOCK",
    likes: 0,
    dislikes: 0,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    quantityComments: 1,
    creator: {
      creatorId: "id-mock-fulano",
      creatorName:"Fulano"
    }
})

    }



 )


})