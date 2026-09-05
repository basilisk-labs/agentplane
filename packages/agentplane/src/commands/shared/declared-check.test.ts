import { describe, expect, it } from "vitest";

import {
  assertSupportedDeclaredTaskChecks,
  parseDeclaredTaskCheck,
  resolveDeclaredTaskCheck,
} from "./declared-check.js";

describe("declared task check contract", () => {
  it.each([
    ["bun test packages/agentplane/src/example.test.ts", "bun", ["test"]],
    ["bunx vitest run packages/agentplane/src/example.test.ts", "bun", ["x", "vitest", "run"]],
    ["npm test", "npm", ["test"]],
    ["pnpm run test:unit", "pnpm", ["run", "test:unit"]],
    ["python -m pytest tests/unit", "python", ["-m", "pytest"]],
    ["go test ./...", "go", ["test", "./..."]],
    ["cargo test --workspace", "cargo", ["test", "--workspace"]],
    ["./gradlew test", "./gradlew", ["test"]],
    ["git status --short", "git", ["status", "--short"]],
    ["bash scripts/check-contract.sh", "bash", ["scripts/check-contract.sh"]],
  ])("accepts project-native argv: %s", (command, executable, argsPrefix) => {
    const parsed = parseDeclaredTaskCheck(command);
    expect(parsed).toMatchObject({ executable });
    expect(parsed?.args.slice(0, argsPrefix.length)).toEqual(argsPrefix);
  });

  it.each([
    "bun test packages/core/src; rm -rf build",
    "bun test ../outside.test.ts",
    "node --require=/tmp/escape.cjs scripts/check.mjs",
    "bash -c 'bun test'",
    "bash -lc 'bun test'",
    "node -e 'process.exit(0)'",
    "node --eval=process.exit(0)",
    "python -c 'print(1)'",
    "bun install",
    "git reset --hard",
    "git branch scratch",
    "git -c 'alias.x=!rm tracked-file' x",
    "env rm tracked-file",
    "find . -exec rm tracked-file ;",
    "xargs rm tracked-file",
    "rm build",
  ])("rejects shell, escaping, inline-code, or mutating checks: %s", (command) => {
    expect(resolveDeclaredTaskCheck(command).ok).toBe(false);
    expect(() => assertSupportedDeclaredTaskChecks([command])).toThrow(/Unsupported --verify/u);
  });

  it("reports the exact rejected command index before persistence", () => {
    expect(() =>
      assertSupportedDeclaredTaskChecks(["npm test", "bash -c 'npm test'", "cargo test"]),
    ).toThrow(/command 2.*inline shell evaluation/u);
  });

  it.each(["agentplane doctor", "ap doctor", "agentplane task lint", "ap task lint"])(
    "resolves the supported AgentPlane read-only alias through the repository binary: %s",
    (command) => {
      const parsed = parseDeclaredTaskCheck(command);
      expect(parsed?.executable).toBe(process.execPath);
      expect(parsed?.args.slice(1)).toEqual(command.split(" ").slice(1));
    },
  );
});
