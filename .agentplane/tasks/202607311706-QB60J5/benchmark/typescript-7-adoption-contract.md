# TypeScript 7 adoption contract

Date: 2026-07-31  
Task: `202607311706-QB60J5`  
Decision: **GO for the bounded `202607311707-DRYTNK` migration; NO-GO for replacing the TypeScript 6 compiler API package.**

## Frozen toolchain contract

- Typecheck compiler: `@typescript/native: npm:typescript@7.0.2`.
- Compiler API compatibility package: `typescript: 6.0.3`.
- Root and workspace `tsc` entrypoints must resolve TypeScript 7.0.2.
- `typescript-eslint` and every repository script importing `typescript` must resolve TypeScript 6.0.3.
- The root typecheck wrapper must accept `AGENTPLANE_TYPESCRIPT_PACKAGE=typescript` as the immediate rollback override. The exact rollback command is `AGENTPLANE_TYPESCRIPT_PACKAGE=typescript bun run typecheck`.
- Keep TypeScript 7 project concurrency at its default automatic setting. Single samples with `--builders 1`, `2`, and `4` were 1.24 s, 1.40 s, and 1.39 s respectively; an explicit limit provided no measured benefit for this four-project graph.
- Hosted jobs need at least 4 GiB memory. The migration gate is peak RSS at or below 1536 MiB for the root forced build and completion within 120 seconds on each supported hosted runner.
- TypeScript 7 remains a development/CI dependency only. No TypeScript 7 API import may enter runtime packages.

TypeScript 7 is the native Go compiler announced by the TypeScript team. Its 7.0 release intentionally does not provide the old programmatic compiler API, so the packages must remain side-by-side. Sources: [TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) and [native compiler repository](https://github.com/microsoft/typescript-go).

## Benchmark environment

- Base commit: `54c1d90ac8cd30ea28d165c8e41fcdc1542e740c`
- CPU: Apple M4, 10 logical CPUs
- Memory: 24 GiB
- Node.js: 26.5.0
- Bun: 1.3.6
- Baseline: TypeScript 6.0.3
- Candidate: TypeScript 7.0.2 installed as `@typescript/native`
- Diagnostic count for every root benchmark run: 0

Cold runs clean project-reference outputs before the measured build. Warm runs use `--force` with the filesystem cache already populated. Each measurement is a new compiler process.

```text
TypeScript 6 cold:
node scripts/checks/run-typescript-build.mjs --clean && /usr/bin/time -lp node scripts/checks/run-typescript-build.mjs

TypeScript 6 warm:
/usr/bin/time -lp node scripts/checks/run-typescript-build.mjs --force

TypeScript 7 cold:
./node_modules/@typescript/native/bin/tsc -b --clean && /usr/bin/time -lp ./node_modules/@typescript/native/bin/tsc -b

TypeScript 7 warm:
/usr/bin/time -lp ./node_modules/@typescript/native/bin/tsc -b --force
```

## Results

| Compiler | Shape | Wall times, seconds | Mean wall | Mean peak RSS | Relative result |
| --- | --- | --- | ---: | ---: | --- |
| TypeScript 6.0.3 | cold | 5.90, 6.05, 5.95 | 5.967 s | 1181.6 MiB | baseline |
| TypeScript 7.0.2 | cold | 1.21, 1.25, 1.17 | 1.210 s | 1011.3 MiB | 4.93x faster, 14.4% less RSS |
| TypeScript 6.0.3 | warm | 6.03, 6.03, 6.10, 6.04, 6.08 | 6.056 s | 1131.9 MiB | baseline |
| TypeScript 7.0.2 | warm | 1.33, 1.42, 1.32, 1.43, 1.29 | 1.358 s | 1034.7 MiB | 4.46x faster, 8.6% less RSS |

The repository is large enough for the native compiler to produce a material local and CI-relevant improvement. Memory does not regress.

## Compatibility findings

### Configuration

The current configuration is not a drop-in TypeScript 7 input:

1. `tsconfig.base.json` uses the removed `baseUrl` option. Removing it and making every `paths` target explicitly relative allows both TypeScript 6 and 7 to build the four root project references with zero diagnostics.
2. `website/tsconfig.json` extends Docusaurus 3.10.1, whose published config also uses `baseUrl`. A local TypeScript 7-compatible Docusaurus bridge config is required unless Docusaurus publishes a compatible config before `DRYTNK` lands.
3. The supported root project graph and website typecheck pass under both compilers after those candidate adjustments.

`tsconfig.eslint.json` is not a green compiler gate today: TypeScript 6 reports 717 existing diagnostics and TypeScript 7 reports 719. The two additional TypeScript 7 diagnostics are secondary errors on lines already rejected in the new conflict-rework tests; 63 existing locations change diagnostic category. This does not affect the actual ESLint gate, which passes, but the config must not be represented as a green standalone typecheck.

Two other direct config invocations have identical pre-existing failures in both compilers: `website/tsconfig.eslint.json` has one `TS7016`, and `packages/agentplane/tsconfig.tsup.json --noEmit` has one `TS6304`. The normal website, tsup, ESLint, and root build commands remain the acceptance surface.

### Emit parity

Both compilers emit the same 3622-file set. There are no added, removed, JavaScript, or JavaScript-map differences.

- 137 declaration maps differ because TypeScript 7 reorders generated declaration members.
- 29 declarations differ. For 28, the lexical token multiset is identical and only order changes. The remaining declaration differs only by one added pair of parentheses.
- No public symbol or lexical token is added or removed.

The migration must record this deterministic declaration-order drift and ensure no release check treats compiler-specific ordering as a semantic API change.

### TypeScript 6 API consumers

With the alias installed, `node_modules/.bin/tsc` and `bunx tsc` resolve TypeScript 7.0.2, while `require("typescript")` resolves 6.0.3. Resolution from `@typescript-eslint/parser` also returns TypeScript 6.0.3.

The following gates passed with the side-by-side installation:

- `bun run lint:core`
- `bun run logging:check`
- `bun run trust:ratchet:check`
- `bun run bench:compatibility:check`

This covers the ESLint parser plus the repository AST, trust-boundary, no-console, and compatibility-contract consumers that import the TypeScript compiler API.

## Implementation handoff: DRYTNK

`202607311707-DRYTNK` must:

1. Pin the two exact packages above and update the lockfile.
2. Make the root wrapper select `@typescript/native` by default and `typescript` only when `AGENTPLANE_TYPESCRIPT_PACKAGE=typescript` is set.
3. Remove root `baseUrl`, make root path mappings relative, and add the bounded website compatibility bridge.
4. Add probes proving root/workspace `tsc` is 7.0.2 while compiler-API consumers are 6.0.3.
5. Run root and workspace builds, ESLint, trust/compatibility gates, declaration classification, critical/unit tests, installed-package checks, and Linux/macOS/Windows hosted checks.
6. Demonstrate the exact rollback command and prove it produces a clean TypeScript 6 build without generated-artifact drift.

## Residual risks and stop rules

- Stop if any supported build gains a TypeScript 7-only diagnostic.
- Stop if a declaration difference changes its lexical token multiset beyond the reviewed parenthesis-only case.
- Stop if Bun, npm packaging, or Windows resolves the TypeScript 7 native optional package differently from the lockfile contract.
- Stop if any runtime package imports `@typescript/native` or if an API consumer resolves TypeScript 7.
- Stop if hosted peak RSS exceeds 1536 MiB or the compiler exits by signal on the smallest supported runner.
- TypeScript 7 and 6 use different non-zero exit codes for some invalid configs. Automation must treat any non-zero exit as failure and must not key behavior to the exact numeric code.
