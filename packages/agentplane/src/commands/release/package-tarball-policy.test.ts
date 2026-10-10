import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const paths = [
  "dist/recipe-api.js",
  "dist/recipe-api.d.ts",
  "dist/recipe-api-extra.js",
  "dist/unreviewed.js",
  "src/recipe-api.ts",
  "dist/recipe-api.test.js",
  "dist/recipe-api.js.map",
];
const policy = JSON.parse(
  execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `import { isAllowedTarballPath, isDeniedTarballPath, REQUIRED_AGENTPLANE_TARBALL_FILES } from './scripts/lib/package-tarball-policy.mjs';
       console.log(JSON.stringify({required: REQUIRED_AGENTPLANE_TARBALL_FILES,
         paths: ${JSON.stringify(paths)}.map(path => ({path,
           allowed: isAllowedTarballPath(path, 'agentplane'), denied: isDeniedTarballPath(path)}))}));`,
    ],
    { encoding: "utf8", timeout: 60_000 },
  ),
) as { required: string[]; paths: { path: string; allowed: boolean; denied: boolean }[] };

describe("Recipe API tarball policy", () => {
  it.each(paths.slice(0, 2))("allows and requires the exported file %s", (file) => {
    expect(policy.paths.find((entry) => entry.path === file)).toEqual({
      path: file,
      allowed: true,
      denied: false,
    });
    expect(policy.required).toContain(file);
  });

  it.each(paths.slice(2))("rejects the unreviewed file %s", (file) => {
    const entry = policy.paths.find((candidate) => candidate.path === file);
    expect(entry?.allowed && !entry.denied).toBe(false);
  });
});

const checkerPath = path.resolve("scripts/release/check-package-tarball.mjs");
describe("packed Recipe API required-file enforcement", () => {
  it.each([null, "dist/recipe-api.js", "dist/recipe-api.d.ts"])(
    "checks actual packed inventory with omitted file %s",
    (missing) => {
      const root = mkdtempSync(path.join(os.tmpdir(), "recipe-tarball-policy-"));
      try {
        for (const [dir, name] of [
          ["core", "@agentplaneorg/core"],
          ["recipes", "@agentplaneorg/recipes"],
          ["agentplane", "agentplane"],
        ]) {
          const packageRoot = path.join(root, "packages", dir);
          const files = [
            "README.md",
            "LICENSE",
            "dist/.build-manifest.json",
            ...(dir === "agentplane" ? policy.required : []),
          ];
          mkdirSync(packageRoot, { recursive: true });
          writeFileSync(
            path.join(packageRoot, "package.json"),
            JSON.stringify({
              name,
              version: "1.0.0",
              files: ["dist", "assets", "README.md", "LICENSE"],
            }),
          );
          for (const file of files) {
            if (file === missing) continue;
            const target = path.join(packageRoot, file);
            mkdirSync(path.dirname(target), { recursive: true });
            writeFileSync(
              target,
              file === "dist/.build-manifest.json"
                ? JSON.stringify({
                    manifest_kind: "package",
                    package_name: name,
                    package_version: "1.0.0",
                  })
                : "fixture\n",
            );
          }
        }
        if (missing === null) {
          expect(() =>
            execFileSync(process.execPath, [checkerPath], {
              cwd: root,
              encoding: "utf8",
              timeout: 60_000,
              stdio: "pipe",
            }),
          ).not.toThrow();
        } else {
          let output = "";
          try {
            execFileSync(process.execPath, [checkerPath], {
              cwd: root,
              encoding: "utf8",
              timeout: 60_000,
              stdio: "pipe",
            });
          } catch (error) {
            const failure = error as { stdout?: string; stderr?: string; status?: number };
            expect(failure.status).not.toBe(0);
            output = `${failure.stdout ?? ""}${failure.stderr ?? ""}`;
          }
          expect(output).toContain("missing required files:");
          expect(output).toContain(missing);
        }
      } finally {
        rmSync(root, { recursive: true, force: true });
      }
    },
    60_000,
  );
});
