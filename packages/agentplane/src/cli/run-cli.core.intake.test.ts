import { mkdir, readFile, writeFile } from "node:fs/promises";

import {
  captureStdIO,
  expect,
  it,
  mkGitRepoRoot,
  path,
  runCli,
  useRunCliIntegrationHarness,
} from "@agentplane/testkit/cli-core-tasks-query";
import { describe } from "vitest";

import { writeTaskIntakeManifest } from "../commands/intake/intake-report.js";

useRunCliIntegrationHarness();

describe("runCli intake", () => {
  it("builds a deterministic JSON envelope with explicit file context and constraints", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "intake",
        "Fix packages/agentplane/src/parser.ts; must preserve public API and verify with bun test",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        schema?: string;
        quality?: {
          has_explicit_files?: boolean;
          has_acceptance_criteria?: boolean;
          has_constraints?: boolean;
        };
        files?: { path?: string; source?: string; confidence?: string }[];
        constraints?: string[];
        warnings?: { code?: string }[];
      };
      expect(payload.schema).toBe("agentplane.intake.report.v1");
      expect(payload.quality).toMatchObject({
        has_explicit_files: true,
        has_acceptance_criteria: true,
        has_constraints: true,
      });
      expect(payload.files).toContainEqual({
        path: "packages/agentplane/src/parser.ts",
        source: "explicit",
        confidence: "high",
        reason: "path-like token in request",
      });
      expect(payload.constraints?.join("\n")).toContain("Do not edit generated/vendor files");
      expect(payload.warnings?.some((warning) => warning.code === "missing_file_context")).toBe(
        false,
      );
    } finally {
      io.restore();
    }
  });

  it("detects hash file references and Russian acceptance/constraint phrases", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "intake",
        "Исправь #file:packages/agentplane/src/parser.ts. Критерии приемки: проверка проходит. Не использовать новые зависимости.",
        "--json",
        "--no-git",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        quality?: {
          has_explicit_files?: boolean;
          has_acceptance_criteria?: boolean;
          has_constraints?: boolean;
        };
        files?: { path?: string; source?: string; confidence?: string; reason?: string }[];
      };
      expect(payload.quality).toMatchObject({
        has_explicit_files: true,
        has_acceptance_criteria: true,
        has_constraints: true,
      });
      expect(payload.files).toContainEqual({
        path: "packages/agentplane/src/parser.ts",
        source: "explicit",
        confidence: "high",
        reason: "hash file reference in request",
      });
    } finally {
      io.restore();
    }
  });

  it("writes a task-local file manifest for an existing task", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "packages", "agentplane", "src"), { recursive: true });
    await writeFile(path.join(root, "packages", "agentplane", "src", "parser.ts"), "// parser\n");

    const createIo = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Intake manifest task",
        "--description",
        "Task for intake manifest",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "bun test",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "intake",
        "Fix packages/agentplane/src/parser.ts; expected result is passing parser tests",
        "--task",
        taskId,
        "--write-manifest",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as { manifest_path?: string };
      expect(payload.manifest_path).toBe(`.agentplane/tasks/${taskId}/context/file-manifest.json`);
      const manifest = JSON.parse(
        await readFile(path.join(root, payload.manifest_path ?? ""), "utf8"),
      ) as { request?: { raw?: string }; files?: { path?: string }[] };
      expect(manifest.request?.raw).toBe("[redacted]");
      expect(manifest.files).toContainEqual(
        expect.objectContaining({ path: "packages/agentplane/src/parser.ts" }),
      );
    } finally {
      io.restore();
    }
  });

  it("rejects path-like or non-existent task ids before writing a manifest", async () => {
    const root = await mkGitRepoRoot();

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "intake",
          "Implement approved scope",
          "--task",
          "../../../tmp/foo",
          "--write-manifest",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Invalid value for --task");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "intake",
          "Implement approved scope",
          "--task",
          "202606080633-NOTASK",
          "--write-manifest",
          "--root",
          root,
        ]);
        expect(code).not.toBe(0);
        expect(
          await readFile(
            path.join(
              root,
              ".agentplane",
              "tasks",
              "202606080633-NOTASK",
              "context",
              "file-manifest.json",
            ),
            "utf8",
          ).catch(() => null),
        ).toBeNull();
      } finally {
        io.restore();
      }
    }

    await expect(
      writeTaskIntakeManifest({
        root,
        workflowDir: ".agentplane/tasks",
        taskId: "../../../tmp/foo",
        report: {
          schema: "agentplane.intake.report.v1",
          generated_at: "2026-06-08T00:00:00.000Z",
          request: { chars: 1, words: 1, raw: "x" },
          quality: {
            has_explicit_files: false,
            has_acceptance_criteria: false,
            has_constraints: false,
            likely_broad_scope: false,
          },
          files: [],
          constraints: [],
          warnings: [],
        },
      }),
    ).rejects.toThrow(/Invalid task id/u);
  });

  it("surfaces intake manifest coverage in insights report", async () => {
    const root = await mkGitRepoRoot();
    const createIo = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Insights intake task",
        "--description",
        "Task for insights intake metrics",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "bun test",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }

    const intakeIo = captureStdIO();
    try {
      expect(
        await runCli([
          "intake",
          "Improve quality diagnostics; must keep report local-only",
          "--task",
          taskId,
          "--write-manifest",
          "--root",
          root,
        ]),
      ).toBe(0);
    } finally {
      intakeIo.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["insights", "report", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("quality_intake_manifest:");
      expect(io.stdout).toContain("present=1");
      expect(io.stdout).toContain("quality_verify_steps:");
    } finally {
      io.restore();
    }
  });
});
