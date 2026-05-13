import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

const pkg = readJson("packages/agentplane/package.json");
const acr = readJson("packages/spec/examples/acr.json");

const expected = pkg.version;
const observed = acr.producer?.version;
const toolchainVersion = acr.agent?.toolchain?.find((tool) => tool.name === "agentplane")?.version;

const failures = [];
if (observed !== expected) {
  failures.push(`producer.version=${observed ?? "<missing>"} expected ${expected}`);
}
if (toolchainVersion !== expected) {
  failures.push(
    `agent.toolchain[agentplane].version=${toolchainVersion ?? "<missing>"} expected ${expected}`,
  );
}

if (failures.length > 0) {
  throw new Error(`ACR example version drift:\n- ${failures.join("\n- ")}`);
}

process.stdout.write(`ACR example version OK (${expected})\n`);
