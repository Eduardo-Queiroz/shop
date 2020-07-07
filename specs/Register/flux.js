import {
  goToRegister,
  registerEmail,
  registerPassword,
  registerBirth,
  registerName,
} from "./feature";

export default function(spec) {
  spec.describe("Register Flux", () => {
    spec.it("it should register with success", async () => {
      await goToRegister(spec);
      await registerName(spec);
      await registerEmail(spec);
      await registerBirth(spec);
      await registerPassword(spec);
    });

    spec.it(
      "it should failed register because the email already exists",
      async () => {
        await goToRegister(spec);
        await registerName(spec);
        await registerEmail(spec, { email: "e@e.com", route: "RegisterBirth" });
        await registerBirth(spec);
        await registerPassword(spec, {
          password: "teste123",
          globalError: "Este email ja esta em uso",
          route: "RegisterPassword",
        });
      }
    );

    spec.it(
      "it should failed register because the name is invalid",
      async () => {
        await goToRegister(spec);
        await registerName(spec, {
          name: "",
          nameError: "Nome é obrigatorio",
          route: "RegisterName",
        });
      }
    );

    spec.it(
      "it should failed register because the email is invalid",
      async () => {
        await goToRegister(spec);
        await registerName(spec);
        await registerEmail(spec, {
          email: "",
          emailError: "Email é obrigatorio",
          route: "RegisterEmail",
        });
        await registerEmail(spec, {
          email: "e",
          emailError: "Você precisa digitar seu e-mail para logar",
          route: "RegisterEmail",
        });
      }
    );

    spec.it(
      "it should failed register because the birth is invalid",
      async () => {
        await goToRegister(spec);
        await registerName(spec);
        await registerEmail(spec);
        await registerBirth(spec, {
          birth: "",
          birthError: "Data de nascimento é obrigatorio",
          route: "RegisterBirth",
        });
        await registerBirth(spec, {
          birth: "00/00/0000",
          birthError: "Data incorreta",
          route: "RegisterBirth",
        });
        await registerBirth(spec, {
          birth: "00",
          birthError: "Data incorreta",
          route: "RegisterBirth",
        });
      }
    );

    spec.it(
      "it should failed register because the password is invalid",
      async () => {
        await goToRegister(spec);
        await registerName(spec);
        await registerEmail(spec);
        await registerBirth(spec);
        await registerPassword(spec, {
          password: "",
          passwordError: "Senha é obrigatoria",
          route: "RegisterPassword",
        });
      }
    );
  });
}
