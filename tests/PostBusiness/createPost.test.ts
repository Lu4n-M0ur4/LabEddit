import { PostBusiness } from "../../src/business/PostBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { createPostSchema } from "../../src/dtos/post/createPost.dto";
import { PostDB } from "../../src/Models/Post";

describe("Testando usabilidadde de postBusiness", () => {
  const postBusiness = new PostBusiness(
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock()
  );

  test("Deve criar um post ", async () => {
    const input = createPostSchema.parse({
      token: "token-mock-fulano",
      content: "Conteudo do post MOCK",
    });    

    const output = await postBusiness.createPost(input);
    
    expect(output).toBeUndefined()
   
  });
});
