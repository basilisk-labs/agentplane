import { describe, expect, it } from "vitest";

import {
  assertSupportedDeclaredTaskChecks,
  parseDeclaredTaskCheck,
  parseDeclaredTaskCheckSequence,
  resolveDeclaredTaskCheck,
} from "./declared-check.js";

describe("declared task check contract", () => {
  it.each([
    ["bun test packages/agentplane/src/example.test.ts", "bun", ["test"]],
    ["bunx vitest run packages/agentplane/src/example.test.ts", "bun", ["x", "vitest", "run"]],
    ["npm test", "npm", ["test"]],
    ["pnpm run test:unit", "pnpm", ["run", "test:unit"]],
    ["python -m pytest tests/unit", "python", ["-m", "pytest"]],
    ["python3 -B -m unittest -v", "python3", ["-B", "-m", "unittest"]],
    ["python3 -m pytest", "python3", ["-m", "pytest"]],
    [
      "python3 -BWignore::DeprecationWarning -m unittest",
      "python3",
      ["-BWignore::DeprecationWarning", "-m"],
    ],
    ["python3 -BXcheck -m unittest", "python3", ["-BXcheck", "-m"]],
    ["python3 -Bmcompileall", "python3", ["-Bmcompileall"]],
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
    "python3 -c 'print(1)'",
    "python3 -Bc 'print(1)'",
    "python -IBcprint(1)",
    "python3 -BBc=print(1)",
    "python3 -m unittest; echo unsafe",
    "python3 ../outside.py",
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

  it.each([
    "agentplane doctor",
    "ap doctor",
    "agentplane task lint",
    "ap task lint",
    "ap config show",
    "agentplane config show",
  ])(
    "resolves the supported AgentPlane read-only alias through the repository binary: %s",
    (command) => {
      const parsed = parseDeclaredTaskCheck(command);
      expect(parsed?.executable).toBe(process.execPath);
      expect(parsed?.args.slice(1)).toEqual(command.split(" ").slice(1));
    },
  );
});

describe("bounded verification heap environment", () => {
  it.each([256, 4096, 8192])("admits heap size %i without changing argv", (size) => {
    expect(
      parseDeclaredTaskCheck(
        `NODE_OPTIONS=--max-old-space-size=${String(size)} bunx --no-install eslint file.ts`,
      ),
    ).toEqual({
      executable: "bun",
      args: ["x", "--no-install", "eslint", "file.ts"],
      script: null,
      env: { NODE_OPTIONS: `--max-old-space-size=${String(size)}` },
    });
  });
  it.each([
    "NODE_OPTIONS=--max-old-space-size=255 node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=8193 node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=-4096 node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=4096.5 node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=Infinity node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=4096",
    "NODE_OPTIONS='--max-old-space-size=4096 --require=evil.cjs' node check.mjs",
    "NODE_OPTIONS=--import=evil.mjs node check.mjs",
    "NODE_OPTIONS=--eval=evil node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=4096 NODE_OPTIONS=--max-old-space-size=512 node check.mjs",
    "OTHER=value node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=4096 env node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=$(echo 4096) node check.mjs",
    "NODE_OPTIONS=--max-old-space-size=4096 node check.mjs > out",
    "NODE_OPTIONS=--max-old-space-size=4096 git reset --hard",
    "NODE_OPTIONS=--max-old-space-size=4096 bun install",
    "NODE_OPTIONS=--max-old-space-size=4096 ap config set foo bar",
    "ap config show --root elsewhere",
    "agentplane config show extra",
    "ap task advance task-id",
  ])("rejects unsafe check %s", (check) => {
    expect(parseDeclaredTaskCheck(check)).toBeNull();
  });
  it("keeps heap overrides on their own sequence segment", () => {
    const parsed = parseDeclaredTaskCheckSequence(
      "NODE_OPTIONS=--max-old-space-size=4096 node first.mjs && node second.mjs",
    );
    expect(parsed?.[0]?.env).toEqual({ NODE_OPTIONS: "--max-old-space-size=4096" });
    expect(parsed?.[1]?.env).toBeUndefined();
  });
});
