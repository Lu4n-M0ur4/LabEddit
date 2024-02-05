import { ZodError } from "zod";
import { UserBusiness } from "../../src/business/UserBusiness";

import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { GetUserSchema } from "../../src/dtos/users/getUsers.dto";
import { USER_ROLES } from "../../src/Models/User";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("Testes de getUser da UserBusiness", () => {
  const userBusiness = new UserBusiness(
    new TokenManagerMock(),
    new UserDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock()
  );

  test("Deve retornar a lista de usuários se for um ADMIN", async () => {
    const input = GetUserSchema.parse({
      token: "token-mock-astrodev",
    });

    const output = await userBusiness.getUsers(input);

    expect(output).toHaveLength(2);
    expect(output).toContainEqual({
      id: "id-mock-astrodev",
      name: "Astrodev",
      email: "astrodev@email.com",
      createdAt: expect.any(String),
      role: USER_ROLES.ADMIN,
    });
  });

  test("Retorna um erro ao tentar buscar todos usuários não sem ser o admin", async () => {
    expect.assertions(1);

    try {
      const input = GetUserSchema.parse({
        token: undefined,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
