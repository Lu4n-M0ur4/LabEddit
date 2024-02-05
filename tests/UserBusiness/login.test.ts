import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";
import { LoginSchema } from "../../src/dtos/users/login.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testes de login da UserBusiness", () => {
  const userBusiness = new UserBusiness(
    new TokenManagerMock(),
    new UserDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock()
  );
  test("Deve retornar token ao se logar corretamente", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano123",
    });

    const output = await userBusiness.login(input);

    expect(output).toEqual({ token: "token-mock-fulano" });
  });

  test("zod retornar um erro ao se logar com parametros invalidos", async () => {
    expect.assertions(1)
    
    try {
      const input = LoginSchema.parse({
        email: "fulano@email.com",
        password: 1,
      });

    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});
