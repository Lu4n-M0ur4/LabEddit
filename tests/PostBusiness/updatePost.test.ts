import { PostBusiness } from "../../src/business/PostBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { updatePostSchema } from "../../src/dtos/post/updatePost.dto";

describe("Testando usabilidadde de postBusiness", () => {
  const postBusiness = new PostBusiness(
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock()
  );

  test("Deve atualizar um post ", async () => {
    const input = updatePostSchema.parse({
      token: "token-mock-fulano",
      content:"Conteudo do post MOCADO",
      idToUpdate: "Conteudo do post MOCK",
    });    

    const output = await postBusiness.updatePost(input);
    
    expect(output).toBeUndefined()
   
  });
});
