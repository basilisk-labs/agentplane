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
- `dependency-cruiser` uses an isolated config without compiler-only project references or workspace path aliases, so clean package builds cannot change the architecture graph.
- Its subprocess preloads root TypeScript 6.0.3 resolution and fails closed if the compiler API is unavailable, avoiding Bun isolated-linker differences between macOS and Linux.
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
- `bun run bench:agent-efficiency:replay:check`: pass; the historical 50-run/70-outcome RF-04 baseline remains unchanged.
- `bun run release:parity`: pass.
- `bun run test:critical`: pass, 12/12 routed chunks. The RF-04 exact-anchor runtime accepts only the frozen additive TypeScript 7 lock delta and still rejects any version or package-set drift as `ANCHOR_LOCK_MISMATCH`.
- Isolated retry of every file that timed out during the overloaded full local Vitest run: pass, 7/7 files and 80/80 tests with one worker.
- `bun run arch:check`: pass, zero dependency violations.
- A fresh checkout reproduced the hosted failure after frozen install and all four package builds. After the fix, the same post-build `agentplane` dist shape (1127 files) and the full `bun run arch:check` passed with zero violations.
- Linux container reproduction (Node 24.16.0, Bun 1.3.6): dependency-cruiser initially reported TypeScript unavailable and reproduced all 11 hosted false-positive cycles; with the guarded preload it resolved `typescript@6.0.3` and the complete architecture graph passed with zero violations.
- `bun run knip:check`: pass, baseline 545/545.
- `bun run package:tarball:check`: pass for core, recipes, and agentplane.
- `bun run package:install-smoke`: pass for locally packed packages.
- `bun run docs:site:build:check`: pass, including the optimized Docusaurus production build.
- `node scripts/checks/check-critical-test-route.mjs`: pass.

The first plain `bun install` updated the lockfile and then hit an existing local Lefthook replacement error because `pre-commit.old` already existed. The deterministic install was repeated with `--frozen-lockfile --ignore-scripts` and passed; this is worktree hook infrastructure, not package-resolution failure.

A full local `test:fast` attempt oversubscribed the machine and produced 18 observed wall-clock timeouts, all at the common 30-second limit in process/concurrency integration tests; no TypeScript diagnostic or assertion mismatch was observed. The run was stopped after the timing pattern was established. Every affected file was then rerun sequentially and passed 80/80 tests.

## Hosted proof and rework

- First hosted run: Windows, unit, critical CLI, workflow, contract, coverage, package-runtime, docs, dependency review, and CodeQL checks passed.
- The first `verify-static` run exposed build-order-dependent dependency-cruiser resolution after root `baseUrl` removal. The clean sequence was reproduced locally.
- Resolution: architecture analysis now uses `tsconfig.depcruise.json` without following compiler project references or workspace source aliases. The main TypeScript 7 graph remains free of `baseUrl`, and no architecture rule was weakened.
- The second hosted run and a Linux container reproduction showed that Bun's isolated linker did not expose optional TypeScript to dependency-cruiser on Linux. The architecture runner now injects the pinned root TypeScript 6.0.3 module and verifies it before cruising.
- Fresh hosted `verify-static`, aggregate PR verification, and all required checks remain mandatory on the rework commit.

## Rollback

Immediate rollback does not mutate dependencies or generated configuration:

```sh
AGENTPLANE_TYPESCRIPT_PACKAGE=typescript bun run typecheck
```

The command resolves TypeScript 6.0.3 through the same wrapper and completed successfully after the TypeScript 7 build.

## RF-04 anchor isolation

The RF-04 subject remains the exact pre-0.7 commit and still builds with TypeScript 6.0.3. Its lock gate now projects away only the approved root `@typescript/native` alias, the exact 7.0.2 platform package set, and the semver-range-to-pin changes that keep the same TypeScript 6.0.3 API package. The comparison remains fail-closed for any other lockfile difference. This avoids falsely treating an unused development-only compiler as a semantic change to the historical benchmark while preserving the original anchor and evidence.
