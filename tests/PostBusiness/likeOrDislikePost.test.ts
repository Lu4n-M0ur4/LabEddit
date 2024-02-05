import { PostBusiness } from "../../src/business/PostBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { likeOrDislikePostSchema } from "../../src/dtos/post/likeOrDislikePost.dto";

describe("Testando usabilidadde de postBusiness", () => {
  const postBusiness = new PostBusiness(
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock()
  );

  test("Deve criar retornar undefined se com sucesso inserir um like na tabela de likes_dislikes ", async () => {
    const input = likeOrDislikePostSchema.parse({
      token:"token-mock-astrodev",
      postId:"id-mock",
      like:true
      
    });    

    const output = await postBusiness.likeOrDislikePost(input);
    
    expect(output).toBeUndefined()
   
  });
});
