import {
  goToProfile,
  profileEmail,
  profilePassword,
  profileNewPassword,
  profileBirth,
  profileName,
} from "./feature";

export default function(spec) {
  spec.describe("Profile Flux", () => {
    spec.it("it should profile with success", async () => {
      await goToProfile(spec);
      await profileName(spec);
      await profileEmail(spec);
      await profileBirth(spec);
      await profileNewPassword(spec);
      await profilePassword(spec);
    });

    spec.it(
      "it should failed profile because the email already exists",
      async () => {
        await goToProfile(spec);
        await profileName(spec);
        await profileEmail(spec, {
          email: "alternative@e.com",
          route: "ProfileBirth",
        });
        await profileBirth(spec);
        await profileNewPassword(spec);
        await profilePassword(spec, {
          password: "teste123",
          globalError: "Este email ja esta em uso",
          route: "ProfilePassword",
        });
      }
    );

    spec.it(
      "it should failed profile because the name is invalid",
      async () => {
        await goToProfile(spec);
        await profileName(spec, {
          name: "",
          nameError: "Nome é obrigatorio",
          route: "ProfileName",
        });
      }
    );

    spec.it(
      "it should failed profile because the birth is invalid",
      async () => {
        await goToProfile(spec);
        await profileName(spec);
        await profileEmail(spec);
        await profileBirth(spec, {
          birth: "",
          birthError: "Data de nascimento é obrigatorio",
          route: "ProfileBirth",
        });
        await profileBirth(spec, {
          birth: "00/00/0000",
          birthError: "Data incorreta",
          route: "ProfileBirth",
        });
        await profileBirth(spec, {
          birth: "00",
          birthError: "Data incorreta",
          route: "ProfileBirth",
        });
      }
    );

    spec.it(
      "it should failed profile because the password is invalid",
      async () => {
        await goToProfile(spec);
        await profileName(spec);
        await profileEmail(spec);
        await profileBirth(spec);
        await profilePassword(spec, {
          password: "",
          passwordError: "Senha é obrigatoria",
          route: "ProfilePassword",
        });
      }
    );
  });
}
