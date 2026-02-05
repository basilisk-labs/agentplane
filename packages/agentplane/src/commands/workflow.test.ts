import { describe, expect, it } from "vitest";

import {
  cmdTaskAdd,
  cmdTaskListWithFilters,
  cmdTaskNew,
  cmdTaskNext,
  dedupeStrings,
  suggestAllowPrefixes,
} from "./workflow.js";

describe("commands/workflow", () => {
  it("rejects task new with missing flags", async () => {
    await expect(
      cmdTaskNew({
        cwd: process.cwd(),
        args: [],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects task add with missing flags", async () => {
    await expect(
      cmdTaskAdd({
        cwd: process.cwd(),
        args: [],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("dedupes and trims strings", () => {
    expect(dedupeStrings([" a ", "b", "a", " ", "b "])).toEqual(["a", "b"]);
  });

  it("suggests allow prefixes for paths", () => {
    expect(suggestAllowPrefixes(["file.txt", "dir/file.txt", "/abs/path.txt", ""])).toEqual([
      "/abs",
      "dir",
      "file.txt",
    ]);
  });

  it("rejects task list with missing filter values", async () => {
    await expect(
      cmdTaskListWithFilters({
        cwd: process.cwd(),
        args: ["--status"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdTaskListWithFilters({
        cwd: process.cwd(),
        args: ["--owner"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdTaskListWithFilters({
        cwd: process.cwd(),
        args: ["--tag"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects task list with unknown flags", async () => {
    await expect(
      cmdTaskListWithFilters({
        cwd: process.cwd(),
        args: ["--nope"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects task next with invalid limit flags", async () => {
    await expect(
      cmdTaskNext({
        cwd: process.cwd(),
        args: ["--limit"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdTaskNext({
        cwd: process.cwd(),
        args: ["--limit", "nope"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
