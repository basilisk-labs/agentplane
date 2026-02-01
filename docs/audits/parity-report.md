# Parity report: Python agentctl vs Node.js CLI

Date: 2026-01-30

## What was audited

- Python `agentctl` command surface + task subcommands.
- Framework control scripts (`recipes.py`, clean scripts, viewer script, sync helper).
- Node.js CLI command surface (as implemented in `packages/agentplane/src/run-cli.ts` and `packages/agentplane/src/help.ts`).

See:

- `docs/audits/agentctl-python-inventory.md`
- `docs/audits/nodejs-parity-matrix.md`

## Current parity status (summary)

- Core task workflow, branch/PR workflow, guard/commit, and sync: **parity appears complete** at the command level.
- Several **Python support scripts** do not have a Node CLI equivalent.
- Node CLI includes **new features** (init, recipes, scenario tooling) not in Python.
- `agentplane quickstart` now ships a built-in command guide (no agentctl.md dependency).

## Gaps to reach 1:1 parity

### 1) Missing Node equivalents for Python support scripts

- `.agent-plane/recipes.py` bundle/compile tooling remains Python-only; Node relies on `recipes.json` plus `recipes list --full` and `recipes explain`.
- `scripts/ci-scope.mjs` is standalone (CI helper; not intended for CLI parity).

### 2) Hook runner parity (minor)

- Python has a suppressed `hooks run` path (internal).
- Node only exposes install/uninstall.

### 4) Distribution parity risk: `dist/cli.js` vs `src/run-cli.ts`

- CLI entrypoint uses `packages/agentplane/dist/cli.js`.
- If dist is stale, runtime parity can lag behind source.

## Recommended work plan (front of work)

### P0 (blockers to 1:1 parity)

1. Recipes parity:
   - Core recipe management is now handled in Node (centralized catalog, `recipes.json`, list/install/remove/tag filters, explain).
   - Remaining `recipes.py` bundle/compile tooling still needs a Node equivalent or an explicit external-script policy.

### P1 (parity hardening)

2. Port `recipes.py` bundle/compile into Node, or document a stable Python dependency.
3. Clarify GitHub sync: rely on the recipe-based workflow + documented flow.

### P2 (behavioral verification)

4. Create a parity test matrix (CLI I/O, errors, files touched, exit codes) for key flows:
   - task lifecycle: new/update/doc/comment/start/block/finish
   - guard/commit hooks
   - branch/pr/integrate flows
   - backend sync
5. Ensure `dist/` build is updated in CI whenever `src/` changes (to avoid drift).

## Notes

- This audit is command-surface focused. It does not certify byte-for-byte identical outputs or edge-case behavior.
- For strict 1:1 parity, automated fixtures and snapshot tests should be added for CLI outputs.
