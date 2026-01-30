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

## Gaps to reach 1:1 parity

### 1) Missing Node equivalents for Python support scripts

- `clean.sh` / `clean.ps1` cleanup helpers.
- `viewer.sh` tasks viewer launcher.
- `.agent-plane/recipes.py` (inventory + bundle tooling).
- `.github/scripts/sync_tasks.py` GitHub sync helper (now partly replaced by recipe).
- `scripts/ci-scope.mjs` is standalone (not wired into CLI).

### 2) Missing Node command: `quickstart`

- Python has `agentctl quickstart` (prints `.agent-plane/agentctl.md`).
- Node has no `agentplane quickstart` equivalent.

### 3) Hook runner parity (minor)

- Python has a suppressed `hooks run` path (internal).
- Node only exposes install/uninstall.

### 4) Distribution parity risk: `dist/cli.js` vs `src/run-cli.ts`

- CLI entrypoint uses `packages/agentplane/dist/cli.js`.
- If dist is stale, runtime parity can lag behind source.

## Recommended work plan (front of work)

### P0 (blockers to 1:1 parity)

1. Add `agentplane quickstart` that prints `.agent-plane/agentctl.md` (match Python behavior).
2. Decide on support-script parity:
   - Either port `clean.sh`, `clean.ps1`, `viewer.sh`, and `recipes.py` into Node CLI commands,
   - or explicitly declare them as supported external scripts and keep them shipped/linked.

### P1 (parity hardening)

3. Add Node wrappers for `clean` and `viewer` (even if they call scripts) to match operator workflow.
4. Port `recipes.py` functionality into Node (scan/show/bundle/refresh), or document a stable Python dependency.
5. Clarify GitHub sync: keep `sync_tasks.py` or replace it fully with the GitHub sync recipe + documented flow.

### P2 (behavioral verification)

6. Create a parity test matrix (CLI I/O, errors, files touched, exit codes) for key flows:
   - task lifecycle: new/update/doc/comment/start/block/finish
   - guard/commit hooks
   - branch/pr/integrate flows
   - backend sync
7. Ensure `dist/` build is updated in CI whenever `src/` changes (to avoid drift).

## Notes

- This audit is command-surface focused. It does not certify byte-for-byte identical outputs or edge-case behavior.
- For strict 1:1 parity, automated fixtures and snapshot tests should be added for CLI outputs.
