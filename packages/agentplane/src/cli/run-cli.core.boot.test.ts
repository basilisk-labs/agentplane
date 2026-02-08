import { describe, expect, it, vi } from "vitest";

vi.mock("@agentplaneorg/core", async () => {
  const actualUnknown = await vi.importActual("@agentplaneorg/core");
  if (!actualUnknown || typeof actualUnknown !== "object") {
    throw new Error("importActual(@agentplaneorg/core) did not return an object");
  }
  const actual = actualUnknown as Record<string, unknown>;
  return {
    ...actual,
    resolveProject: vi.fn(() => {
      throw new Error("resolveProject should not be called");
    }),
    loadConfig: vi.fn(() => {
      throw new Error("loadConfig should not be called");
    }),
  };
});

describe("runCli bootstrapping metadata", () => {
  it("quickstart does not require project resolution or config load", async () => {
    const { runCli } = await import("./run-cli.js");

    const origStdoutWrite = process.stdout.write.bind(process.stdout);
    const origStderrWrite = process.stderr.write.bind(process.stderr);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout.write as any) = () => true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stderr.write as any) = () => true;

    try {
      const code = await runCli(["quickstart"]);
      expect(code).toBe(0);
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = origStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = origStderrWrite;
    }
  });

  it("role does not require project resolution or config load", async () => {
    const { runCli } = await import("./run-cli.js");

    const origStdoutWrite = process.stdout.write.bind(process.stdout);
    const origStderrWrite = process.stderr.write.bind(process.stderr);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout.write as any) = () => true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stderr.write as any) = () => true;

    try {
      const code = await runCli(["role", "ORCHESTRATOR"]);
      expect(code).toBe(0);
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = origStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = origStderrWrite;
    }
  });
});
