import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const compilers = {
  typescript6: path.join(root, "node_modules", "typescript", "bin", "tsc"),
  typescript7: path.join(root, "node_modules", "@typescript", "native", "bin", "tsc"),
};
const checks = [
  { args: ["-b", "--force", "--pretty", "false"], config: "tsconfig.json" },
  { args: ["-p", "tsconfig.eslint.json", "--noEmit", "--pretty", "false"], config: "tsconfig.eslint.json" },
  {
    args: ["-p", "website/tsconfig.json", "--noEmit", "--pretty", "false"],
    config: "website/tsconfig.json",
  },
  {
    args: ["-p", "website/tsconfig.eslint.json", "--noEmit", "--pretty", "false"],
    config: "website/tsconfig.eslint.json",
  },
  {
    args: ["-p", "packages/agentplane/tsconfig.tsup.json", "--noEmit", "--pretty", "false"],
    config: "packages/agentplane/tsconfig.tsup.json",
  },
  {
    args: ["-p", "packages/core/tsconfig.tsup.json", "--noEmit", "--pretty", "false"],
    config: "packages/core/tsconfig.tsup.json",
  },
  {
    args: ["-p", "packages/recipes/tsconfig.tsup.json", "--noEmit", "--pretty", "false"],
    config: "packages/recipes/tsconfig.tsup.json",
  },
];

function run(binary, args) {
  const result = spawnSync(binary, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  const diagnostics = [...output.matchAll(/^(.+?)\((\d+),(\d+)\): error (TS\d+):/gm)].map(
    ([, file, line, column, code]) => `${file}:${line}:${column}:${code}`,
  );
  const codeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(diagnostics, (diagnostic) => diagnostic.split(":").at(-1))).map(
      ([code, entries]) => [code, entries.length],
    ),
  );
  return {
    codeCounts,
    diagnostics: [...new Set(diagnostics)].sort(),
    exitCode: result.status ?? 1,
  };
}

const report = checks.map(({ args, config }) => {
  const typescript6 = run(compilers.typescript6, args);
  const typescript7 = run(compilers.typescript7, args);
  const typescript6Set = new Set(typescript6.diagnostics);
  const typescript7Set = new Set(typescript7.diagnostics);
  const typescript6Locations = new Set(
    typescript6.diagnostics.map((diagnostic) => diagnostic.slice(0, diagnostic.lastIndexOf(":"))),
  );
  const typescript7Locations = new Set(
    typescript7.diagnostics.map((diagnostic) => diagnostic.slice(0, diagnostic.lastIndexOf(":"))),
  );
  const typescript6Only = typescript6.diagnostics.filter(
    (diagnostic) => !typescript7Set.has(diagnostic),
  );
  const typescript7Only = typescript7.diagnostics.filter(
    (diagnostic) => !typescript6Set.has(diagnostic),
  );
  const typescript6OnlyLocations = [...typescript6Locations]
    .filter((location) => !typescript7Locations.has(location))
    .sort();
  const typescript7OnlyLocations = [...typescript7Locations]
    .filter((location) => !typescript6Locations.has(location))
    .sort();
  return {
    config,
    typescript6: {
      codeCounts: typescript6.codeCounts,
      diagnosticCount: typescript6.diagnostics.length,
      exitCode: typescript6.exitCode,
    },
    typescript7: {
      codeCounts: typescript7.codeCounts,
      diagnosticCount: typescript7.diagnostics.length,
      exitCode: typescript7.exitCode,
    },
    locationAndCodeDrift: {
      typescript6OnlyCount: typescript6Only.length,
      typescript6OnlySample: typescript6Only.slice(0, 20),
      typescript7OnlyCount: typescript7Only.length,
      typescript7OnlySample: typescript7Only.slice(0, 20),
    },
    locationDrift: {
      typescript6OnlyCount: typescript6OnlyLocations.length,
      typescript6OnlySample: typescript6OnlyLocations.slice(0, 20),
      typescript7OnlyCount: typescript7OnlyLocations.length,
      typescript7OnlySample: typescript7OnlyLocations.slice(0, 20),
    },
  };
});

console.log(JSON.stringify(report, null, 2));
