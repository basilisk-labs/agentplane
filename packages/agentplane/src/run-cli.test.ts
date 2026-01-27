import { chmod, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

function captureStdIO() {
  let stdout = "";
  let stderr = "";

  const origStdoutWrite = process.stdout.write.bind(process.stdout);
  const origStderrWrite = process.stderr.write.bind(process.stderr);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stdout.write as any) = (chunk: unknown) => {
    stdout += String(chunk);
    return true;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stderr.write as any) = (chunk: unknown) => {
    stderr += String(chunk);
    return true;
  };

  return {
    get stdout() {
      return stdout;
    },
    get stderr() {
      return stderr;
    },
    restore() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = origStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = origStderrWrite;
    },
  };
}

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  return root;
}

describe("runCli", () => {
  it("prints help on --help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--help"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Usage:");
    } finally {
      io.restore();
    }
  });

  it("prints version on --version", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--version"]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("0.0.0");
    } finally {
      io.restore();
    }
  });

  it("prints json error when --json is set", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--json", "config", "set"]);
      expect(code).toBe(2);
      expect(io.stdout).toContain('"error"');
      expect(io.stdout).toContain('"code"');
    } finally {
      io.restore();
    }
  });

  it("returns usage error on unknown command", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["nope"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Not implemented yet");
    } finally {
      io.restore();
    }
  });

  it("returns usage error when --root is missing a value", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing value for --root");
    } finally {
      io.restore();
    }
  });

  it("returns usage error when config set is missing key/value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane config set");
    } finally {
      io.restore();
    }
  });

  it("maps resolveProject errors to E_GIT", async () => {
    const notGitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-not-git-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", notGitRoot]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("maps invalid JSON config to E_VALIDATION", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Invalid JSON:");
    } finally {
      io.restore();
    }
  });

  it("maps IO errors while reading config to E_IO", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    const configPath = path.join(root, ".agentplane", "config.json");
    await writeFile(configPath, '{\n  "schema_version": 1\n}\n', "utf8");
    await chmod(configPath, 0o000);

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toMatch(/EACCES|permission denied/i);
    } finally {
      io.restore();
      await chmod(configPath, 0o600);
    }
  });

  it("config show prints default config when missing", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain('"schema_version": 1');
    } finally {
      io.restore();
    }
  });

  it("config set writes .agentplane/config.json", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set", "workflow_mode", "direct", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const configPath = path.join(root, ".agentplane", "config.json");
    const text = await readFile(configPath, "utf8");
    expect(text).toContain('"workflow_mode": "direct"');
  });

  it("mode get prints workflow mode (default)", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "get", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("direct");
    } finally {
      io.restore();
    }
  });

  it("mode set persists workflow_mode and prints the new mode", async () => {
    const root = await mkGitRepoRoot();

    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "set", "branch_pr", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("branch_pr");
    } finally {
      io.restore();
    }

    const configPath = path.join(root, ".agentplane", "config.json");
    const text = await readFile(configPath, "utf8");
    expect(text).toContain('"workflow_mode": "branch_pr"');

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["mode", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("branch_pr");
    } finally {
      io2.restore();
    }
  });

  it("mode set rejects invalid values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "set", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane mode set");
    } finally {
      io.restore();
    }
  });
});
