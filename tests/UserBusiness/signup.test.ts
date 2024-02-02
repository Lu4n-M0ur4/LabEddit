import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";

import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { SignupSchema } from "../../src/dtos/users/signup.dto";

describe("Testes de login da UserBusiness", () => {
  const userBusiness = new UserBusiness(
    new TokenManagerMock(),
    new UserDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock()
  );
  test("deve retornar token ao se cadastrar corretamente", async () => {
    const input = SignupSchema.parse({
      name:"Luan",
      email: "Luan@email.com",
      password: "Luan123",
    });

    const output = await userBusiness.signup(input);

    expect(output).toEqual({ token: "token-mock" });
  });

  test("zod retornar um erro ao se cadastrar com parametros invalidos", async () => {
    expect.assertions(1)
    
    try {
      const input = SignupSchema.parse({
        name:"L",
        email: "fulano@email.com",
        password: undefined,
      });

    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});
