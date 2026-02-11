import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function parseArgs(argv) {
  const out = { version: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i] ?? "";
    if (arg === "--version") {
      out.version = String(argv[i + 1] ?? "").trim();
      i += 1;
    }
  }
  return out;
}

async function readVersion(pkgPath) {
  const raw = JSON.parse(await readFile(pkgPath, "utf8"));
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  if (!version) {
    throw new Error(`Missing version in ${pkgPath}`);
  }
  return version;
}

async function assertVersionAvailable(pkgName, version, cwd) {
  try {
    const { stdout } = await execFileAsync("npm", ["view", `${pkgName}@${version}`, "version"], {
      cwd,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    });
    const published = String(stdout ?? "").trim();
    if (published === version) {
      throw new Error(`Version already published: ${pkgName}@${version}`);
    }
    if (published.length > 0) {
      throw new Error(
        `Unexpected npm view output for ${pkgName}@${version}: ${JSON.stringify(published)}`,
      );
    }
  } catch (error) {
    const err = error;
    const text = `${String(err?.stdout ?? "")}\n${String(err?.stderr ?? "")}\n${String(err?.message ?? "")}`;
    if (/E404|404 Not Found|No match found for version|not in this registry/i.test(text)) {
      return;
    }
    throw error;
  }
}

async function main() {
  const root = process.cwd();
  const args = parseArgs(process.argv.slice(2));
  const corePkg = path.join(root, "packages", "core", "package.json");
  const cliPkg = path.join(root, "packages", "agentplane", "package.json");
  const [coreVersion, cliVersion] = await Promise.all([readVersion(corePkg), readVersion(cliPkg)]);

  if (coreVersion !== cliVersion) {
    throw new Error(
      `Package versions must match before publish checks. core=${coreVersion} agentplane=${cliVersion}`,
    );
  }

  const version = args.version || coreVersion;
  const pkgs = ["@agentplaneorg/core", "agentplane"];

  for (const name of pkgs) {
    await assertVersionAvailable(name, version, root);
  }

  process.stdout.write(`npm version availability check passed for ${version}\n`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
