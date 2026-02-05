import { describe, expect, it } from "vitest";

import { exitCodeForError } from "./exit-codes.js";

describe("cli contract exit codes", () => {
  it("maps error codes to documented exit codes", () => {
    expect(exitCodeForError("E_USAGE")).toBe(2);
    expect(exitCodeForError("E_VALIDATION")).toBe(3);
    expect(exitCodeForError("E_IO")).toBe(4);
    expect(exitCodeForError("E_GIT")).toBe(5);
    expect(exitCodeForError("E_BACKEND")).toBe(6);
    expect(exitCodeForError("E_NETWORK")).toBe(7);
    expect(exitCodeForError("E_INTERNAL")).toBe(1);
  });
});
