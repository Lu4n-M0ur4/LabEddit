import { CommentBusiness } from "../../src/business/CommentBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { getCommentSchema } from "../../src/dtos/comment/getComments.dto";

describe("Testando usabilidadde de postBusiness", () => {
  const commentBusiness = new CommentBusiness(
    new TokenManagerMock(),
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new PostDatabaseMock()
  );

  test("Deve criar um post ", async () => {
    const input = getCommentSchema.parse({
      token: "token-mock-fulano",
      idToPost: "id-mock",
    });

    const output = await commentBusiness.getComments(input);

    expect(output.comments[0].content).toBe("Conteudo do comment Mock");

    expect(output.comments[0].creator.creatorName).toBe("Fulano");



  });
});
