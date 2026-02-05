# Plan for Fixes, Improvements, and Optimization of AgentPlane

## 0) Context and Target Model

### Framework Goal (to fix for the team)

AgentPlane is a **policy-driven workflow tool**: “workarounds and guardrails” on top of a coding agent that provide:

- strict execution boundaries (guardrails),
- step traceability (who/what/when changed),
- reproducibility (snapshot/export/logs),
- extensibility via **recipes plugins** (agents/tools/narrowly specialized scenarios).

### Key Constraints/Principles

- **Offline-first**: network only where explicitly allowed; exception is update-check **once per day** (cache).
- Recipes come from a **centralized public repository**; the URL is currently **hardcoded**, with human moderation.
- Backends: local default + Redmine (currently “via recipe”, planned for core integration).

---

## 1) Priorities and Execution Order

### P0 (must do in the next cycle)

1. CLI contract: exit codes, classification of network/backend errors.
2. Safe archive extraction (upgrade/recipes) — close zip-slip/path traversal.
3. Update-check once per day with cache (offline-first without constant network).
4. Decompose `run-cli.ts` (10,714 lines) — lower regression risk and speed up development.

### P1 (next cycle)

5. Converge `spec` (JSON schema) and runtime validation to a single source of truth.
6. Remove duplication of “task doc/markdown” logic and unify task id generation.
7. Task cache/index to speed up `list/search` and git hooks.
8. Backend architecture: make Redmine first-class + prepare plugin mechanics.

### P2 (after stabilization)

9. Strengthen supply-chain trust for recipes index (signature/pinning), audit reports for scenario runs.
10. Normalize env vars and versioning, improve observability (structured events/logs).

---

## 2) Epics and Tasks (sequential)

Notation:

- **ID**: AP-xxx
- **Problem** → **Solution** → **Steps** → **Acceptance Criteria** → **Where to edit/test**

---

# Epic A: CLI Contract and Error Stability (P0)

Status: DONE (2026-02-05, task 202602050527-K3YMDY)

## AP-001 — Align exit codes for network/backend per CLI contract

Status: DONE (2026-02-05, task 202602050527-2VHF3R)

**Problem**
`docs/developer/cli-contract.mdx` defines:

- 6 = Backend error
- 7 = Network error
  But in implementation `E_NETWORK` often exits with `exitCode: 6` (e.g., `fetchJson()`, `downloadToFile()`, upgrade paths, and `mapBackendError()` always sets 6).

**Solution**
Single mapping `ErrorCode → exitCode`, strictly per contract:

- `E_NETWORK → 7`
- `E_BACKEND → 6`
- everything else — as in the contract table.

**Steps**

1. Extract a single mapping table into `src/cli/exit-codes.ts` (or similar).
2. Rewire:
   - `fetchJson()`, `downloadToFile()` → `exitCode = 7`
   - `cmdUpgrade()` network errors → 7
   - `mapBackendError()`:
     - if `BackendError.code === "E_NETWORK"` → 7
     - else → 6

3. Add contract tests:
   - “network errors return 7”
   - “backend errors return 6”
   - “usage/validation/io/git — as in doc”

**Acceptance Criteria**

- Any error with `code: "E_NETWORK"` returns `process.exitCode = 7`.
- Doc and implementation match.

**Where**

- `packages/agentplane/src/cli/run-cli.ts` (network utilities, `mapBackendError`)
- `packages/agentplane/src/backends/task-backend.ts` (error types if needed)
- Tests: `run-cli.*.test.ts`, add a separate `cli-contract.test.ts`

---

## AP-002 — Fix stable JSON error format (`--json`) and update doc/code

Status: DONE (2026-02-05, task 202602050527-T58547)

**Problem**
`formatJsonError()` currently adds `exit_code`, `hint`. The contract describes only `code/message/context`. If the contract is “frozen”, the mismatch must be removed (or document the extension as part of the contract).

**Solution**
Choose one strategy (recommended #2):

1. **Strict**: align JSON to the described format exactly (no extra fields).
2. **Pragmatic**: update the contract to explicitly allow additional fields and fix their semantics.

**Steps**

1. Decide whether extensions are allowed.
2. If extensions are allowed, update `cli-contract.mdx` (section `--json error format`) and mark `exit_code` and `hint` as optional.
3. Add a “json error schema” test (snapshot/strict key check).

**Acceptance Criteria**

- Doc and actual JSON match and are locked by tests.

**Where**

- `packages/agentplane/src/shared/errors.ts`
- `docs/developer/cli-contract.mdx`
- `packages/agentplane/src/errors.test.ts`

---

# Epic B: Offline-first + daily update-check (P0)

Status: DONE (2026-02-05, task 202602050554-PW3TCT)

## AP-010 — Update-check once per day with cache (no network on every run)

Status: DONE (2026-02-05, tasks 202602050554-8DBHJY, 202602050554-Q59FCK, 202602050554-49X946)

**Problem**
`maybeWarnOnUpdate()` hits npm on almost every CLI run (unless disabled by env/flag). This violates offline-first and creates hidden network usage.

**Solution**
Implement update-check:

- no more than once per 24 hours,
- cache results,
- on network errors do not retry until TTL expires,
- skip on `--json` and when `AGENTPLANE_NO_UPDATE_CHECK` is set.

**Proposed cache design**

- Path (recommended global): `${AGENTPLANE_HOME}/cache/update-check.json`
  (AGENTPLANE_HOME already used for global recipes).
- Format:

```json
{
  "schema_version": 1,
  "checked_at": "2026-02-04T00:00:00.000Z",
  "latest_version": "0.1.4",
  "etag": "\"...\"",
  "status": "ok" | "error" | "not_modified"
}
```

**Steps**

1. Move update-check into `packages/agentplane/src/cli/update-check.ts`.
2. Implement:
   - `readUpdateCache()`
   - `writeUpdateCacheAtomic()` (temp + rename)
   - `shouldCheckNow(checked_at, ttl=24h)`
   - `fetchLatestNpmVersionConditional(etag?)` (use `If-None-Match`)

3. `maybeWarnOnUpdate()` logic:
   - if `skip/json/env` → return
   - read cache:
     - if fresh: compare `latest_version` to `currentVersion`, warn if needed, **no network**
     - if stale/missing: make 1 network request (keep timeout), update cache

   - if network fails: write cache with `status=error`, `checked_at=now`, so we do not hammer the network

4. Add tests:
   - “with fresh cache, fetch is not called”
   - “after TTL, fetch is called”
   - “on error, still no retry within a day”
   - “ETag 304 updates checked_at without latest_version”

**Acceptance Criteria**

- Multiple CLI runs within a day: **0 network requests** after the first (when cache is fresh).
- Offline: at most 1 attempt per day, then quiet.
- Behavior can be disabled by `AGENTPLANE_NO_UPDATE_CHECK`.

**Where**

- `packages/agentplane/src/cli/run-cli.ts` (keep the call, move implementation out)
- New file `packages/agentplane/src/cli/update-check.ts`
- Tests: new `update-check.test.ts`

---

# Epic C: Safe archive extraction (P0)

Status: DONE (2026-02-05, task 202602050609-PGC5S3)

## AP-020 — Safe extract for tar/zip (close zip-slip/path traversal)

Status: DONE (2026-02-05, tasks 202602050609-2SWFWB, 202602050609-MT8GF4)

**Problem**
`extractArchive()` uses system `tar/unzip` without validating archive paths. An archive can write `../...` outside `destDir`, create symlinks, etc. This is critical because the archive comes from:

- `agentplane upgrade` (remote bundle)
- `agentplane recipes install` (remote archive)

**Solution**
Before extraction, **pre-scan** archive contents and strictly validate each entry:

- ban absolute paths
- ban `..` segments
- ban/ignore symlinks
- optionally: total size limit (zip-bomb protection)

**Steps (minimally invasive, keep system tar/unzip)**

1. For `.tar.gz`:
   - `tar -tzf archive` → list paths

2. For `.zip`:
   - `unzip -Z1 archive` → list paths (or `zipinfo -1`)

3. Validate each path via `validateArchiveEntryPath(entry, destDir)`:
   - normalize (posix), forbid `..`, forbid `:` on Windows (if relevant), forbid `\0`

4. Handle symlinks separately:
   - tar can provide entry types (`tar -tvzf`) and reject `l` entries
   - zip is harder; if needed, switch to a JS library (see alternative)

5. Only after successful validation, run the real extraction.
6. Add tests for “evil archives” (fixtures):
   - `../pwn`
   - `/abs/path`
   - symlink to `../../.git/config`

**Alternative (more reliable, adds dependencies)**
Move to JS tar/zip libraries so each entry can be filtered before disk write.

**Acceptance Criteria**

- Any archive with traversal/absolute paths/symlinks is rejected with `E_VALIDATION` (exit 3).
- No write outside `destDir` is possible.
- Covered by tests.

**Where**

- `packages/agentplane/src/cli/run-cli.ts` (replace `extractArchive`)
- New module `packages/agentplane/src/cli/archive.ts`
- Tests: `run-cli.recipes.test.ts`, `run-cli.core.test.ts` + new fixtures

---

# Epic D: Decompose `run-cli.ts` (P0)

Status: DONE (2026-02-05, task 202602050621-33SAVX)

## AP-030 — Split `run-cli.ts` into command modules and shared utilities

Status: DONE (2026-02-05, tasks 202602050621-M6NF1X, 202602050621-6RP0GH, 202602050621-7AC9PB)

**Problem**
`run-cli.ts` is ~10.7k lines — high coupling and regression risk. Any change affects “everything”, testability and velocity suffer.

**Solution**
Introduce a modular structure:

- `src/cli/*` — shared utilities (errors, exit codes, fs/net, update-check, archive, output)
- `src/commands/*` — command namespaces (task/recipes/scenario/upgrade/hooks/backend/…)
- `run-cli.ts` becomes a thin router: parse args → dispatch → unified error handler

**Proposed structure**

- `packages/agentplane/src/cli/`
  - `context.ts` (cwd/rootOverride/json/quiet/…)
  - `exit-codes.ts`
  - `errors.ts` (or keep current but without command logic)
  - `output.ts` (human/json output, stderr/stdout rules)
  - `http.ts` (`fetchJson`, `downloadToFile` with correct classification)
  - `archive.ts` (safe extract)
  - `update-check.ts` (daily cache)

- `packages/agentplane/src/commands/`
  - `config.ts`
  - `mode.ts`
  - `task.ts`
  - `recipes.ts`
  - `scenario.ts`
  - `upgrade.ts`
  - `hooks.ts`
  - `backend.ts`
  - `ide.ts`
  - `role.ts`
  - (as needed)

**Steps (sequential refactor without behavior change)**

1. Extract “obvious” utilities without command dependencies:
   - `fetchJson/downloadToFile` → `cli/http.ts`
   - `extractArchive` → `cli/archive.ts`
   - update-check → `cli/update-check.ts`
   - unified error/exit mapping → `cli/exit-codes.ts`

2. Extract the “recipes” block into `commands/recipes.ts`:
   - recipes arg parsing
   - index cache, install/remove/list/info/explain

3. Extract `upgrade` into `commands/upgrade.ts`
4. Extract `task` namespace into `commands/task.ts` (or folder `commands/task/*`)
5. After each extraction:
   - run existing `run-cli.*.test.ts`
   - add 1–2 smoke e2e tests for the command (via `execa`/node spawn)

**Acceptance Criteria**

- CLI behavior unchanged (except pre-agreed fixes AP-001/AP-010/AP-020).
- `run-cli.ts` reduced to ≤ ~500–800 lines (router + wiring).
- Tests cover major namespaces.

**Where**

- `packages/agentplane/src/cli/run-cli.ts` + new files
- Tests already exist: `cli-smoke.test.ts`, `run-cli.*.test.ts`

---

# Epic E: Spec ↔ runtime validation (P1)

## AP-040 — Make a single source of truth for configuration (schema or runtime)

**Problem**
There is `packages/spec/schemas/config.schema.json`, but `packages/core/src/config/config.ts` validates manually and is sometimes stricter/different. Result: “valid per schema, fails at runtime” and vice versa.

**Solution**
Choose and enforce a strategy:

- **Recommended**: schema becomes the source of truth; runtime validates via schema (Ajv) + defaults.
- Alternative: runtime is source of truth; align schema to it (less useful for ecosystem).

**Steps (schema → runtime)**

1. Add Ajv in `@agentplaneorg/core` and load schema from `@agentplaneorg/spec`.
2. Standardize loading:
   - `raw = JSON.parse(config.json)`
   - `merged = deepMerge(defaultConfig(), raw)` (or Ajv `useDefaults`)
   - `validate(merged)` → if ok, persist as `config`

3. Sync `required`, min/max, enums in schema with actual expectations.
4. Add tests:
   - all `packages/spec/examples/config.json` validate at runtime
   - negative cases → proper messages

**Acceptance Criteria**

- Examples in `packages/spec/examples` pass runtime validation.
- Any schema change breaks tests if runtime is not updated (and vice versa).

**Where**

- `packages/core/src/config/config.ts`
- `packages/spec/schemas/config.schema.json`
- Tests: `packages/core/src/config/config.test.ts`

---

# Epic F: Remove task-doc duplication and ID generation (P1)

## AP-050 — Move doc/markdown operations to `core` and reuse everywhere

**Problem**
Identical functions (markdown section normalization, combined heading split, set section, ensure metadata) are duplicated in:

- `packages/core/src/tasks/task-store.ts`
- `packages/agentplane/src/backends/task-backend.ts`
- partly in `packages/agentplane/src/cli/run-cli.ts`
  This causes behavioral drift.

**Solution**
Create `task-doc.ts` in `@agentplaneorg/core` as the single implementation:

- normalize doc
- set section
- ensure doc metadata
- validate doc metadata

**Steps**

1. Extract functions into `core/src/task-doc.ts` + tests.
2. Replace copies in `task-store.ts` and `task-backend.ts` with imports.
3. Add regression tests:
   - the same README processed via different commands yields identical output (byte-for-byte after normalization)

**Acceptance Criteria**

- No duplicate implementations remain in `agentplane`.
- Normalization behavior is stable and tested.

---

## AP-051 — Unify task id generation (crypto instead of Math.random)

**Problem**
`core/task-store.ts` uses `Math.random`, while `task-backend.ts` uses `crypto.randomInt`. This impacts quality and consistency.

**Solution**
Implement a single generator in core:

- `generateTaskId({ date, suffixLength, alphabet })` using `crypto.randomInt`
- use it in CLI and backends.

**Steps**

1. Implement the generator in core and add tests.
2. Switch all generation sites to it.

**Acceptance Criteria**

- One ID generation algorithm across the codebase.
- Tests fix the format and alphabet.

---

# Epic G: Performance and task metadata cache (P1)

## AP-060 — Task index in `.agentplane/cache` to speed up `list/search` and hooks

**Problem**
With hundreds of tasks, `list/search` and some hooks may read many README files. `.agentplane/cache/` exists but is not used systematically.

**Solution**
Introduce a task index (metadata + mtime):

- file: `.agentplane/cache/tasks-index.v1.json`
- store: `taskId`, `readmePath`, `mtimeMs`, `subset(frontmatter)` (status/priority/tags/owner/depends_on), `title`
- on `list/search`: `stat` → re-read only changed READMEs

**Steps**

1. Define a minimal field set for fast operations.
2. Implement:
   - `loadIndex()`, `saveIndexAtomic()`
   - `updateIndexIncremental()` (stat + selective parse)

3. Integrate into:
   - `task list`
   - `task search`
   - `commit-msg` hook (if it uses task id lookup)

4. Add a maintenance command:
   - `agentplane cache rebuild` (optional)

5. Tests:
   - when files are unchanged, repeated `list` does not read README (use fs mocks or parse call counter)

**Acceptance Criteria**

- Repeated `list/search` performs significantly less IO (verified by test/instrumentation).
- Index invalidates correctly by mtime/size.

---

# Epic H: Backend architecture and Redmine first-class (P1)

## AP-070 — Separate “recipes plugins” vs “backend integrations”

**Problem**
Redmine backend is installed as a recipe, mixing:

- workflow extensions (recipes: agents/scenarios/tools)
- system integrations (backends: task sources, sync)
  This breaks the recipes model and complicates support.

**Solution**
Make backends first-class:

- built-in: `local`, `redmine` (official)
- extensible: allow third-party backend modules (optional)

**Steps**

1. Move Redmine backend into a separate monorepo package:
   - `packages/backend-redmine` (or keep in `agentplane` but split modularly)

2. `loadTaskBackend()`:
   - build registry `builtInBackends = { local, redmine }`
   - select by `backend.json -> id`

3. Update backend config format (non-breaking migration):
   - keep compatibility with current fields
   - optionally add `backend.type`/`backend.module` for future plugin loading

4. Docs:
   - explicitly state that recipes should not “carry” backends

5. Tests:
   - local backend behaves as before
   - redmine backend loads when `id=redmine`

**Acceptance Criteria**

- Redmine works without installing as a recipe.
- Recipes remain workflow-only plugins.

---

## AP-071 — (Optional) Support external backend modules via `module`/`export`

**Problem**
`backend.json` has `module/class`, but they are not used (and look like Python legacy).

**Solution**
If third-party backend extensibility is needed, implement a safe loader:

- backend.json:
  - `id`
  - `module`: npm package name or relative path
  - `export`: exported factory/class name (JS/TS)

- load via dynamic import
- allowlist (disabled by default, enabled by flag/config)

**Steps**

1. Design new format (versioned).
2. Implement loader + validation.
3. Add a safety flag:
   - `config.backends.allow_dynamic_modules=false` by default

**Acceptance Criteria**

- Third-party backends load only with explicit permission.

---

# Epic I: Supply-chain trust for recipes index and scenario runs (P2)

## AP-080 — Sign recipes index (protect against repo/channel compromise)

**Problem**
Currently the index (`index.json`) is trusted over HTTPS and “human moderation”, but if the repo is compromised, an attacker can replace both URL and sha256.

**Solution (recommended)**

- Add signature `index.json.sig` (ed25519/minisign):
  - public key embedded in AgentPlane
  - CLI verifies signature before using index

- Optional: pinned tag/commit for index, updated via `agentplane upgrade`

**Steps**

1. Define signature format and key rotation.
2. In recipes repo:
   - publish `index.json` + `index.json.sig`

3. In CLI:
   - download both
   - verify signature

4. Tests for invalid signature.

**Acceptance Criteria**

- Index is not used without a valid signature.

---

## AP-081 — Audit report for recipe scenario runs (traceability)

**Problem**
A recipe is a plugin with tools/agents/scenarios; even with moderation we need a “trail”:

- which files were touched,
- which commands were executed,
- which env vars were used (without secrets).

**Solution**

- Before run: print permissions/expected actions summary (partly exists)
- After run: save audit report at `.agentplane/recipes/<id>/runs/<runId>/report.json`

**Steps**

1. Define report model:
   - start/end timestamps
   - recipe id/version, scenario id
   - executed tool steps (args redacted)
   - git diff summary (files changed)

2. Implement redaction rules.
3. Tie into the existing runs directory (if present).

**Acceptance Criteria**

- Each run leaves a reproducible report.
- No secrets in reports.

---

# Epic J: Versioning, env normalization, reliable file writes (P2)

## AP-090 — CLI version from package.json (remove manual constant)

**Problem**
`packages/agentplane/src/meta/version.ts` contains a manual string version — risk of “forgot to update”.

**Solution**

- Generate version at build time or read from package.json (careful with ESM/TS build).

**Acceptance Criteria**

- Version always matches the package release.

---

## AP-091 — Atomic write for critical files

**Problem**
Files like `config.json`, `tasks.json`, cache indexes must be written atomically, or partial writes can corrupt JSON on process crash.

**Solution**

- `writeFileAtomic(path, content)` → temp + fsync + rename

**Acceptance Criteria**

- No “broken” JSON on interrupted writes (verify by test/instrumentation).

---

## AP-092 — Normalize env vars (with compatibility period)

**Problem**
Different prefixes exist (`AGENTPLANE_`, `AGENT_PLANE_`, others). This harms predictability.

**Solution**

- One canonical prefix: `AGENTPLANE_`
- Support old aliases for 1–2 releases with warnings

---

# 3) Appendix: pinpoint notes in current code (so devs don’t hunt)

1. **Update-check**: `maybeWarnOnUpdate()` in `run-cli.ts` (~line 288) calls `fetchLatestNpmVersion()` on every run.
2. **Network exit codes**: `fetchJson()` / `downloadToFile()` set `exitCode: 6` on `E_NETWORK`.
3. **Unsafe extract**: `extractArchive()` (~1255) invokes `tar/unzip` without pre-scan.
4. **Backend error mapping**: `mapBackendError()` always sets 6 even for `E_NETWORK`.
5. **Backend config**: `.agentplane/backends/local/backend.json` includes `module/class` (likely legacy), but `loadTaskBackend()` only uses `id/settings`.
6. **Doc logic duplication**: `core/task-store.ts` and `agentplane/task-backend.ts` have parallel markdown/doc normalization implementations.

---

# 4) Critical Control (what breaks if P0 is not done)

1. Without safe-extract, any compromise of bundle/recipe sources becomes arbitrary file writes on the developer’s machine.
2. Without correct exit codes, automation on top of AgentPlane will “guess” error causes by text.
3. Without a daily cache, update-check violates offline-first and creates hidden network usage.
4. Without decomposing `run-cli.ts`, development speed drops and regression cost rises.

---

If needed, I can extend this document with a **reference CLI modular architecture** (which commands go to which files, which shared types/contexts are needed) and propose a **migration plan without massive git conflicts** (minimal PR iterations).
