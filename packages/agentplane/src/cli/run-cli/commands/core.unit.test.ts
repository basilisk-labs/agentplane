import { beforeEach, describe, expect, it, vi } from "vitest";

const mockResolveProject =
  vi.fn<
    (opts: { cwd: string; rootOverride: string | null }) => Promise<{ agentplaneDir: string }>
  >();
const mockFileExists = vi.fn<(p: string) => Promise<boolean>>();
const mockReaddir = vi.fn<(dir: string) => Promise<string[]>>();
const mockReadFile = vi.fn<(p: string, enc: string) => Promise<string>>();

const mockRenderQuickstart = vi.fn<() => string>();
const mockRenderRole = vi.fn<(role: string) => string | null>();
const mockListRoles = vi.fn<() => string[]>();

vi.mock("@agentplaneorg/core", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return { ...actual, resolveProject: mockResolveProject };
});
vi.mock("../../fs-utils.js", () => ({ fileExists: mockFileExists }));
vi.mock("node:fs/promises", () => ({ readdir: mockReaddir, readFile: mockReadFile }));
vi.mock("../../command-guide.js", () => ({
  listRoles: mockListRoles,
  renderQuickstart: mockRenderQuickstart,
  renderRole: mockRenderRole,
}));

describe("core commands (unit)", () => {
  const ctx = { cwd: "/repo", rootOverride: undefined as string | undefined };

  beforeEach(() => {
    mockResolveProject.mockReset();
    mockFileExists.mockReset();
    mockReaddir.mockReset();
    mockReadFile.mockReset();
    mockRenderQuickstart.mockReset();
    mockRenderRole.mockReset();
    mockListRoles.mockReset();
  });

  it("role: rejects missing role and unknown role; prints guide for valid role", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(((chunk: unknown) => {
      writes.push(String(chunk));
      return true;
    }) as unknown as typeof process.stdout.write);

    const { runRole } = await import("./core.js");

    try {
      await runRole(ctx, { role: "   " });
      expect.unreachable();
    } catch (e) {
      expect(e).toHaveProperty("code", "E_USAGE");
      expect(String((e as { message?: unknown }).message)).toContain("Missing required argument");
    }

    mockRenderRole.mockReturnValue(null);
    mockListRoles.mockReturnValue(["CODER", "TESTER"]);
    try {
      await runRole(ctx, { role: "NOPE" });
      expect.unreachable();
    } catch (e) {
      expect(e).toHaveProperty("code", "E_USAGE");
      expect(String((e as { message?: unknown }).message)).toContain("Unknown role: NOPE");
      expect(String((e as { message?: unknown }).message)).toContain("Available roles:");
    }

    mockRenderRole.mockReturnValue("GUIDE");
    const rc = await runRole(ctx, { role: "CODER" });
    expect(rc).toBe(0);
    expect(writes.join("")).toContain("GUIDE");

    writeSpy.mockRestore();
  });

  it("role: renders JSON agent profile when built-in guide is missing", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(((chunk: unknown) => {
      writes.push(String(chunk));
      return true;
    }) as unknown as typeof process.stdout.write);

    mockResolveProject.mockResolvedValue({ agentplaneDir: "/repo/.agentplane" });
    mockFileExists.mockResolvedValue(true);
    mockReaddir.mockResolvedValue(["UPGRADER.json"]);
    mockReadFile.mockResolvedValue(
      JSON.stringify({
        id: "UPGRADER",
        role: "Semantic merge",
        description: "Reconcile policy after upgrade",
        inputs: ["run dir"],
        outputs: ["reconciled files"],
      }),
    );
    mockRenderRole.mockReturnValue(null);

    const { runRole } = await import("./core.js");
    const rc = await runRole(ctx, { role: "UPGRADER" });
    expect(rc).toBe(0);
    const out = writes.join("");
    expect(out).toContain("### UPGRADER");
    expect(out).toContain("Role: Semantic merge");
    expect(out).toContain("Inputs:");
    expect(out).toContain("Source: .agentplane/agents/UPGRADER.json");

    writeSpy.mockRestore();
  });

  it("role: unknown role message includes discovered JSON roles when in a project", async () => {
    mockResolveProject.mockResolvedValue({ agentplaneDir: "/repo/.agentplane" });
    mockFileExists.mockResolvedValue(true);
    mockReaddir.mockResolvedValue(["UPGRADER.json", "CODER.json"]);
    mockRenderRole.mockReturnValue(null);
    mockListRoles.mockReturnValue(["ORCHESTRATOR"]);

    const { runRole } = await import("./core.js");
    try {
      await runRole(ctx, { role: "NOPE" });
      expect.unreachable();
    } catch (e) {
      expect(String((e as { message?: unknown }).message)).toContain("Available roles:");
      expect(String((e as { message?: unknown }).message)).toContain("ORCHESTRATOR");
      expect(String((e as { message?: unknown }).message)).toContain("UPGRADER");
    }
  });

  it("agents: rejects missing agents dir, rejects empty list, and rejects duplicate ids", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(((chunk: unknown) => {
      writes.push(String(chunk));
      return true;
    }) as unknown as typeof process.stdout.write);

    mockResolveProject.mockResolvedValue({ agentplaneDir: "/repo/.agentplane" });

    const { runAgents } = await import("./core.js");

    mockFileExists.mockResolvedValue(false);
    await expect(runAgents(ctx, {})).rejects.toMatchObject({ code: "E_USAGE" });

    mockFileExists.mockResolvedValue(true);
    mockReaddir.mockResolvedValue(["README.md", "a.txt"]);
    await expect(runAgents(ctx, {})).rejects.toMatchObject({ code: "E_USAGE" });

    mockReaddir.mockResolvedValue(["a.json", "b.json"]);
    mockReadFile.mockImplementation((p) =>
      Promise.resolve(
        p.endsWith("a.json")
          ? JSON.stringify({ id: "dup", role: "CODER" })
          : JSON.stringify({ id: "dup", role: "TESTER" }),
      ),
    );
    await expect(runAgents(ctx, {})).rejects.toMatchObject({ code: "E_USAGE" });
    expect(writes.join("")).toContain("dup");

    writeSpy.mockRestore();
  });

  it("agents: prints a table and returns 0 when agents are valid", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(((chunk: unknown) => {
      writes.push(String(chunk));
      return true;
    }) as unknown as typeof process.stdout.write);

    mockResolveProject.mockResolvedValue({ agentplaneDir: "/repo/.agentplane" });
    mockFileExists.mockResolvedValue(true);
    mockReaddir.mockResolvedValue(["a.json", "b.json"]);
    mockReadFile.mockImplementation((p) =>
      Promise.resolve(
        p.endsWith("a.json")
          ? JSON.stringify({ id: "a", role: "CODER" })
          : JSON.stringify({ id: "b", role: "TESTER" }),
      ),
    );

    const { runAgents } = await import("./core.js");
    const rc = await runAgents(ctx, {});
    expect(rc).toBe(0);
    const out = writes.join("");
    expect(out).toContain("ID");
    expect(out).toContain("ROLE");
    expect(out).toContain("a.json");
    expect(out).toContain("b.json");

    writeSpy.mockRestore();
  });
});
