import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const packageRoot = path.resolve(process.argv[2] ?? process.cwd());
const catalogPath = path.join(packageRoot, "dist", "command-catalog.js");
const outputPath = path.join(packageRoot, "dist", "command-help.json");
const catalog = await import(`${pathToFileURL(catalogPath).href}?generated=${Date.now()}`);

if (!Array.isArray(catalog.COMMANDS)) {
  throw new TypeError(`command catalog did not export COMMANDS: ${catalogPath}`);
}

const entries = catalog.COMMANDS.map((entry) => ({
  helpGroup: entry.helpGroup,
  invocation: entry.invocation,
  spec: entry.spec,
  surface: entry.surface,
}));

await writeFile(outputPath, `${JSON.stringify({ schema_version: 1, entries })}\n`, "utf8");
process.stdout.write(
  `generated ${path.relative(packageRoot, outputPath)} (${entries.length} commands)\n`,
);
