import { describe, expect, it } from "vitest";

import type { CliError } from "../../shared/errors.js";
import { cmdPrNote } from "./note.js";
import { cmdPrOpen } from "./open.js";

describe("pr command input validation", () => {
  it("pr open rejects blank author", async () => {
    await expect(
      cmdPrOpen({
        cwd: process.cwd(),
        taskId: "202602111631-V8XQ1F",
        author: "   ",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
      message: "Invalid value for --author.",
    });
  });

  it("pr note rejects blank author", async () => {
    await expect(
      cmdPrNote({
        cwd: process.cwd(),
        taskId: "202602111631-V8XQ1F",
        author: "   ",
        body: "handoff",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
      message: "Invalid value for --author.",
    });
  });

  it("pr note rejects blank body", async () => {
    await expect(
      cmdPrNote({
        cwd: process.cwd(),
        taskId: "202602111631-V8XQ1F",
        author: "CODER",
        body: "   ",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
      message: "Invalid value for --body.",
    });
  });
});
