import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function parseArgs(argv) {
  const out = {
    dir: "",
    tag: "latest",
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = String(argv[i] ?? "");
    if (arg === "--dir") {
      out.dir = String(argv[i + 1] ?? "").trim();
      i += 1;
      continue;
    }
    if (arg === "--tag") {
      out.tag = String(argv[i + 1] ?? "").trim() || "latest";
      i += 1;
      continue;
    }
  }
  if (!out.dir) throw new Error("Missing required argument: --dir <package-directory>");
  return out;
}

async function readPackageMeta(pkgDir) {
  const pkgPath = path.join(pkgDir, "package.json");
  const raw = JSON.parse(await readFile(pkgPath, "utf8"));
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  if (!name) throw new Error(`Missing package name in ${pkgPath}`);
  if (!version) throw new Error(`Missing package version in ${pkgPath}`);
  return { name, version };
}

async function isPublished(name, version, cwd) {
  try {
    const { stdout } = await execFileAsync("npm", ["view", `${name}@${version}`, "version"], {
      cwd,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    });
    return String(stdout ?? "").trim() === version;
  } catch (error) {
    const err = error;
    const text = `${String(err?.stdout ?? "")}\n${String(err?.stderr ?? "")}\n${String(err?.message ?? "")}`;
    if (/E404|404 Not Found|No match found for version|not in this registry/i.test(text)) {
      return false;
    }
    throw error;
  }
}

async function runPublish(pkgDir, tag) {
  try {
    const { stdout, stderr } = await execFileAsync(
      "npm",
      ["publish", "--provenance", "--access", "public", "--tag", tag],
      {
        cwd: pkgDir,
        env: process.env,
        maxBuffer: 50 * 1024 * 1024,
      },
    );
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
  } catch (error) {
    const err = error;
    const stdout = String(err?.stdout ?? "");
    const stderr = String(err?.stderr ?? "");
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    const combined = `${stdout}\n${stderr}\n${String(err?.message ?? "")}`;
    throw new Error(combined.trim());
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = process.cwd();
  const pkgDir = path.resolve(root, args.dir);
  const { name, version } = await readPackageMeta(pkgDir);

  if (await isPublished(name, version, root)) {
    process.stdout.write(`skip: already published ${name}@${version}\n`);
    return;
  }

  try {
    await runPublish(pkgDir, args.tag);
    process.stdout.write(`published: ${name}@${version}\n`);
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const publishRace =
      /E403|Cannot publish over previously published version|cannot publish over the previously published versions/i.test(
        message,
      ) && (await isPublished(name, version, root));
    if (publishRace) {
      process.stdout.write(`skip-after-race: already published ${name}@${version}\n`);
      return;
    }
    throw error;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
