# Bun executable compatibility report

## Summary

Status: no-go for direct release pipeline migration.

Bun `--compile` can build a single-file executable from `packages/agentplane/dist/cli.js`, but the resulting binary fails before handling CLI arguments because AgentPlane currently resolves its package root from a Node/npm filesystem layout. In the compiled executable, `import.meta.url` resolves inside Bun's embedded `$bunfs` filesystem, so the existing package-root resolver cannot find `agentplane/package.json`.

## Evidence

Commands run:

```bash
bun run build
tmp=$(mktemp -d)
bun build packages/agentplane/dist/cli.js --compile --outfile "$tmp/agentplane-bun"
"$tmp/agentplane-bun" --version
"$tmp/agentplane-bun" quickstart | head -n 8
rm -rf "$tmp"
```

Observed result:

```text
bundle 220 modules
compile /var/folders/.../agentplane-bun
error: Unable to resolve agentplane package root.
at ... /$bunfs/root/agentplane-bun
Bun v1.3.6 (macOS arm64)
```

## Root cause

`packages/agentplane/src/shared/package-paths.ts` resolves runtime paths by walking the filesystem from one of these sources:

1. `AGENTPLANE_RUNTIME_ACTIVE_BIN`
2. `import.meta.url`
3. `createRequire(entryModuleUrl).resolve("agentplane/package.json")`

That works for npm and bundled-Node archives because `package.json`, `bin/agentplane.js`, and `assets/**` exist on disk. In a Bun compiled executable, the entrypoint lives under `$bunfs/root`, not in the npm package directory, and the current release channel does not embed AgentPlane assets with Bun file imports.

## Compatibility implications

Directly replacing current standalone Node archives with Bun executable artifacts would be unsafe because these surfaces need a binary-specific runtime contract first:

1. Package metadata: `--version` and package-root discovery must not require `agentplane/package.json` on disk.
2. Assets: `assets/**` access must work from embedded files or an explicit external assets directory.
3. Repo-local handoff: framework checkout delegation assumes a Node wrapper and package layout.
4. Standalone smoke tests: current smoke expects `lib/node/**`, wrapper scripts, and `lib/agentplane/package/**`; Bun binaries need separate smoke expectations.
5. Release manifests: binary artifacts need their own `installStrategy`, entrypoint, checksum, and rollback path while current standalone archives remain available.

## Recommendation

Do not start `202605030959-33YED6` or `202605030959-M7HGSQ` as a direct replacement yet.

Next implementation should first introduce a binary runtime contract:

1. Add an explicit runtime mode for Bun executable builds.
2. Make package metadata resolvable without filesystem package root.
3. Convert required static assets to Bun-embedded file imports or ship a binary-adjacent assets directory.
4. Add a Bun-binary smoke script separate from current bundled-Node smoke.
5. Only then add release artifacts behind a migration gate.

## External reference

Bun documentation confirms that `--compile` embeds the Bun runtime and supports cross-target executables, but file/assets embedding requires explicit import-based handling. That does not match AgentPlane's current package-root filesystem assumptions.
