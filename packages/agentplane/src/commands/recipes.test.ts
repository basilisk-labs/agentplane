import { describe, expect, it } from "vitest";

import { cmdRecipes, cmdScenario } from "./recipes.js";
import { CliError } from "../errors.js";

describe("commands/recipes", () => {
  it("rejects missing recipes subcommand", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("rejects invalid recipes install usage", async () => {
    await expect(
      cmdRecipes({
        cwd: process.cwd(),
        args: [],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects missing scenario subcommand", async () => {
    await expect(
      cmdScenario({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects scenario list with extra args", async () => {
    await expect(
      cmdScenario({
        cwd: process.cwd(),
        args: ["extra"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
