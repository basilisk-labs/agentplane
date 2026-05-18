---
name: agentplane-local-dev-operator
description: Use when accelerating AgentPlane framework development, selecting targeted local checks, validating branch_pr task scope, using the Turborepo local graph, or triaging dependency bumps before merge or release.
---

# AgentPlane Local Dev Operator

## Use This Skill When

- A task asks which local checks are sufficient for a change.
- A branch_pr worktree needs scope validation before commit or PR update.
- Dependency bumps need repo-specific triage before merge.
- A developer or agent wants graph-aware local evidence.

## Core Rule

Prefer existing repo-local check routing and Turborepo evidence over broad, slow command chains. Use the narrowest check set that still covers the changed files and release risk.

## Script Entry Points

```bash
bun run dev:impact
bun run dev:impact -- --json
bun run dev:task-scope:check -- --task-id <task-id>
bun run deps:triage
bun run deps:triage -- --write
bun run dev:turbo:affected
bun run ci:local:turbo
```

- `dev:impact` lists changed files, the local CI selector bucket, and recommended commands.
- `dev:task-scope:check` fails when branch_pr mutations appear on `main` or the branch does not match the task id.
- `deps:triage` is dry-run by default; use `--write` to run install/parity/schema/knip/local CI checks for dependency bumps.
- `dev:turbo:affected` and `ci:local:turbo` produce local graph/evidence reports under `.agentplane/cache/` and `.turbo/runs/`.

## Dependency Bump Triage

Do not treat a successful lockfile update as proof that a dependency PR is safe. Run the affected repo surfaces:

```bash
bun run deps:triage -- --write
```

Expected evidence:

- `bun install --ignore-scripts`
- `bun run release:parity`
- `bun run schemas:check`
- `bun run knip:check`
- `bun run ci:local:fast`

If one dependency family fails, keep the failure scoped and either fix that migration in the same approved task or classify the bump as deferred/stale.
