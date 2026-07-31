# TypeScript 7 migration evidence

Date: 2026-07-31  
Task: `202607311707-DRYTNK`

## Frozen benchmark basis

The migration implements the approved `202607311706-QB60J5` contract:

- TypeScript 7.0.2 cold mean: 1.210 s, 1011.3 MiB peak RSS.
- TypeScript 6.0.3 cold mean: 5.967 s, 1181.6 MiB peak RSS.
- TypeScript 7.0.2 warm mean: 1.358 s, 1034.7 MiB peak RSS.
- TypeScript 6.0.3 warm mean: 6.056 s, 1131.9 MiB peak RSS.
- Decision: use TypeScript 7 only for CLI typechecking and retain TypeScript 6 for compiler-API consumers.

## Implemented contract

- `@typescript/native` is pinned to `npm:typescript@7.0.2`.
- `typescript` is pinned to `6.0.3` for `typescript-eslint`, tsup, and repository compiler-API scripts.
- Root and workspace typecheck scripts use `scripts/checks/run-typescript-build.mjs`.
- The wrapper defaults to `@typescript/native` and accepts only the documented `typescript` fallback.
- Root `baseUrl` was removed and every path mapping is explicitly relative.
- The Docusaurus 3.10.1 config is mirrored by a checked compatibility bridge with only `baseUrl` removed.
- TypeScript 7 remains a root development dependency and is absent from runtime package dependencies.

## Local proof

- `bun install --frozen-lockfile --ignore-scripts`: pass, no changes.
- `bun run typescript:toolchain:check`: pass; typecheck 7.0.2, compiler API 6.0.3, typescript-eslint 6.0.3.
- `/usr/bin/time -lp bun run typecheck`: pass in 1.58 s with 1,006,305,280 bytes maximum RSS (about 960 MiB), below the 1536 MiB gate.
- `bun run --filter='*' typecheck`: pass for core, recipes, agentplane, testkit, and website.
- `bun run docs:site:typecheck`: pass through the TypeScript 7 wrapper.
- `AGENTPLANE_TYPESCRIPT_PACKAGE=typescript bun run typecheck`: pass with the exact rollback command.
- `bun run build`: pass; TypeScript declarations, tsup bundles, and development manifests generated successfully.
- `bun run lint:core`: pass with TypeScript 6 compiler API resolution.
- `bun run guards:check`: pass.
- `bun run logging:check`: pass.
- `bun run bench:compatibility:check`: pass.
- `bun run release:parity`: pass.

The first plain `bun install` updated the lockfile and then hit an existing local Lefthook replacement error because `pre-commit.old` already existed. The deterministic install was repeated with `--frozen-lockfile --ignore-scripts` and passed; this is worktree hook infrastructure, not package-resolution failure.

## Rollback

Immediate rollback does not mutate dependencies or generated configuration:

```sh
AGENTPLANE_TYPESCRIPT_PACKAGE=typescript bun run typecheck
```

The command resolves TypeScript 6.0.3 through the same wrapper and completed successfully after the TypeScript 7 build.
