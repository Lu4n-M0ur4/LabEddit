import { CommentBusiness } from "../../src/business/CommentBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { GetCommentSchema } from "../../src/dtos/comment/getComments.dto";

describe("Testando usabilidadde de postBusiness", () => {
  const commentBusiness = new CommentBusiness(
    new TokenManagerMock(),
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new PostDatabaseMock()
  );

  test("Deve retornar uma lista de comentários sobre um post ", async () => {
    const input = GetCommentSchema.parse({
      token: "token-mock-fulano",
      idToPost: "id-mock",
    });

    const output = await commentBusiness.getComments(input);

    expect(output.comments[0].content).toBe("Conteudo do comment Mock");

    expect(output.comments[0].creator.creatorName).toBe("Fulano");



  });
});
