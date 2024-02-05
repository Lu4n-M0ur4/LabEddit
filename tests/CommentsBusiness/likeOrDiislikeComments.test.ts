import { CommentBusiness } from "../../src/business/CommentBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { LikeOrDislikeCommentSchema } from "../../src/dtos/comment/likeOrDislikeComments.dto";

describe("Testando usabilidadde de postBusiness", () => {
  const commentBusiness = new CommentBusiness(
    new TokenManagerMock(),
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new PostDatabaseMock()
  );

  test("Deve inserir corretament um like na tabela de likes_dislikes de comments", async () => {
    const input = LikeOrDislikeCommentSchema.parse({
      token: "token-mock-astrodev",
      idToComment: "id-mock",
      like:true
    });

    const output = await commentBusiness.likeOrDislikeComment(input);

    expect(output).toBeUndefined()


  });
});
