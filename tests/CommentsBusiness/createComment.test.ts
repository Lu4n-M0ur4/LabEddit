import { CommentBusiness } from "../../src/business/CommentBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";

import { CreateCommentSchema } from "../../src/dtos/comment/createComments.dto";

describe("Testando usabilidadde de postBusiness", () => {
  const commentBusiness = new CommentBusiness(
    new TokenManagerMock(),
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new PostDatabaseMock()
  );

  test("Deve criar um comentário ", async () => {
    const input = CreateCommentSchema.parse({
      token: "token-mock-fulano",
      idToPost: "id-mock",
      content:"Conteudo do commment mock"
    });

    const output = await commentBusiness.createComment(input);

    expect(output).toBeUndefined();


  });
});
