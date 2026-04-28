# Agentplane v0.3 Surface Freeze

Status: draft freeze artifact for the `0.3.x` line.
Generated: 2026-04-24.
Package version: `agentplane@0.3.29`.
Bound checkout: `a8151894058519242870871264fc5c60ebae30e1`.
CLI bundle: `packages/agentplane/dist/cli.js`.
CLI SHA256: `6554e5a592a22cfffd3154f41cd72c8e6c2e52bc53b3d6eda9d8d455c87965e2`.

This file fixes the repository-local v0.3 surface before the v0.4 line starts.
It is a documentation artifact only: it does not publish, tag, bump versions, or
change release state.

## Frozen Contract

The v0.3 surface is defined by these artifacts:

- CLI command specs under `packages/agentplane/src/commands/**/*.command.ts`.
- Runtime entry bundle `packages/agentplane/dist/cli.js`.
- Project state layout under `.agentplane/`.
- Task lifecycle docs in `docs/user/task-lifecycle.mdx`.
- Close taxonomy in `docs/developer/close-taxonomy.mdx`.
- Config schema implementation in `packages/core/src/config/schema.impl.ts`.
- Public config/schema re-exports through `@agentplaneorg/core/config` and
  `@agentplaneorg/core/schemas`.
- Private repository-local schema/example contracts in `packages/spec/schemas/**`
  and `packages/spec/examples/**` (`@agentplane/spec@0.0.0`,
  `private: true`). This is frozen as an internal compatibility input for v0.3
  projects, not as a published npm package surface.

Compatibility rule for `0.3.x`: public CLI names, `.agentplane/` task document
shape, and config fields are stable unless a later `0.3.x` task records a
targeted compatibility exception and verifies the migration path.

`@agentplane/spec` compatibility rule for `0.3.x`: schema/example changes must
be treated as compatibility-sensitive repository changes. Publishing or
versioning that package as public API is out of scope for this freeze artifact
and requires a separate package-boundary decision.

## Command Surface

Command spec files locked for v0.3: 95.

Mapping convention:

- Command spec: the listed `*.command.ts` file.
- Implementation: the sibling implementation module imported by the command
  spec, or the command file itself for thin namespace/spec-only commands.
- Tests: the current Vitest inventory plus targeted command tests selected by
  `scripts/lib/test-inventory.mjs` and `scripts/lib/local-ci-selection.mjs`.
- Docs: installed help text generated from command specs, plus user/developer
  docs where a command is part of a lifecycle route.

| Area           | Locked command specs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend        | `commands/backend/sync.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Branch/work    | `commands/branch/base.command.ts`, `commands/branch/remove.command.ts`, `commands/branch/status.command.ts`, `commands/branch/work-start.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Cleanup        | `commands/cleanup/merged.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Commit         | `commands/commit.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Docs           | `commands/docs/cli.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Guard          | `commands/guard/clean.command.ts`, `commands/guard/commit.command.ts`, `commands/guard/guard.command.ts`, `commands/guard/suggest-allow.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Hooks          | `commands/hooks/hooks.command.ts`, `commands/hooks/install.command.ts`, `commands/hooks/run.command.ts`, `commands/hooks/uninstall.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Incidents      | `commands/incidents/advise.command.ts`, `commands/incidents/collect.command.ts`, `commands/incidents/incidents.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Integration    | `commands/integrate.command.ts`, `commands/pr/pr.command.ts`, `commands/ready.command.ts`, `commands/sync.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Recipes        | `commands/recipes/active.command.ts`, `commands/recipes/add.command.ts`, `commands/recipes/cache-prune.command.ts`, `commands/recipes/cache.command.ts`, `commands/recipes/detach.command.ts`, `commands/recipes/disable.command.ts`, `commands/recipes/enable.command.ts`, `commands/recipes/explain-active.command.ts`, `commands/recipes/explain.command.ts`, `commands/recipes/info.command.ts`, `commands/recipes/list-remote.command.ts`, `commands/recipes/list.command.ts`, `commands/recipes/recipes.command.ts`, `commands/recipes/remove.command.ts`, `commands/recipes/update.command.ts` |
| Release        | `commands/release/apply.command.ts`, `commands/release/plan.command.ts`, `commands/release/release.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Runtime        | `commands/runtime.command.ts`, `commands/upgrade.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Scenario       | `commands/scenario/info.command.ts`, `commands/scenario/list.command.ts`, `commands/scenario/run.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Task intake    | `commands/task/add.command.ts`, `commands/task/derive.command.ts`, `commands/task/new.command.ts`, `commands/task/scaffold.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Task docs      | `commands/task/doc-set.command.ts`, `commands/task/doc-show.command.ts`, `commands/task/doc.command.ts`, `commands/task/migrate-doc.command.ts`, `commands/task/migrate.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Task findings  | `commands/task/findings-add.command.ts`, `commands/task/findings.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Task handoff   | `commands/task/handoff-record.command.ts`, `commands/task/handoff-show.command.ts`, `commands/task/handoff.command.ts`, `commands/task/resume-context.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Task lifecycle | `commands/task/comment.command.ts`, `commands/task/export.command.ts`, `commands/task/lint.command.ts`, `commands/task/normalize.command.ts`, `commands/task/plan-approve.command.ts`, `commands/task/plan-reject.command.ts`, `commands/task/plan-set.command.ts`, `commands/task/plan.command.ts`, `commands/task/rebuild-index.command.ts`, `commands/task/reclaim.command.ts`, `commands/task/scrub.command.ts`, `commands/task/set-status.command.ts`, `commands/task/start-ready.command.ts`, `commands/task/task.command.ts`, `commands/task/update.command.ts`                                |
| Task run/trace | `commands/task/run-cancel.command.ts`, `commands/task/run-resume.command.ts`, `commands/task/run-retry.command.ts`, `commands/task/run-show.command.ts`, `commands/task/run-tail.command.ts`, `commands/task/run-trace.command.ts`, `commands/task/run.command.ts`                                                                                                                                                                                                                                                                                                                                    |
| Task verify    | `commands/task/verify-ok.command.ts`, `commands/task/verify-rework.command.ts`, `commands/task/verify-show.command.ts`, `commands/task/verify.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Task close     | `commands/task/close-duplicate.command.ts`, `commands/task/close-noop.command.ts`, `commands/task/hosted-close-pr.command.ts`, `commands/task/hosted-close.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Workflow       | `commands/workflow-build.command.ts`, `commands/workflow-playbook.command.ts`, `commands/workflow-restore.command.ts`, `commands/workflow.command.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## Lifecycle Map

The task lifecycle locked for v0.3 is:

1. Preflight: `agentplane config show`, `agentplane quickstart`,
   `agentplane task list`, `git status --short --untracked-files=no`.
2. Plan: `task plan set` followed by `task plan approve`.
3. Start: `task start-ready`.
4. Work: implementation or docs change in the active workflow route.
5. Verify: `task verify-show`, then `verify --ok|--rework`.
6. Commit: task-scoped implementation commit.
7. Finish: `finish --result ... --commit <git-rev>`.
8. Export or hosted close tail when the workflow route requires it.

Direct mode closes in the current checkout. Branch PR mode closes from the base
checkout after hosted merge evidence is available.

Close taxonomy locked for v0.3:

| Route                  | Meaning                                                   | Git/task effect                                                                   |
| ---------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `finish`               | Close a verified task.                                    | Writes task metadata and a deterministic close commit unless explicitly disabled. |
| `task close-noop`      | Close a task whose correct result is no code/docs change. | Writes terminal no-op task state.                                                 |
| `task close-duplicate` | Close a duplicate task and point to the canonical task.   | Writes terminal duplicate task state.                                             |
| `task hosted-close`    | Reconcile task closure from hosted merge evidence.        | Writes hosted merge metadata and base-side task closure.                          |
| `task hosted-close-pr` | Create or skip the follow-up close PR after hosted merge. | Writes close-tail state and hosted PR artifacts.                                  |
| `pr close`             | Close a hosted PR.                                        | Does not by itself prove task completion.                                         |
| `pr close-superseded`  | Close a hosted PR superseded by another route.            | Does not by itself prove task completion.                                         |

Authoritative references:

- `docs/user/task-lifecycle.mdx`
- `docs/developer/close-taxonomy.mdx`
- `.agentplane/policy/workflow.direct.md`
- `.agentplane/policy/workflow.branch_pr.md`

## Config Contract

The v0.3 config schema source is:

- `packages/core/src/config/schema.impl.ts`

Public compatibility surfaces:

- `@agentplaneorg/core/config`
- `@agentplaneorg/core/schemas`

The JSON Schema renderer is `renderAgentplaneConfigSchemaJson()`. The runtime
validator is `validateAgentplaneConfig()`. Deprecated-key stripping remains in
`packages/core/src/config/validation.ts`.

## Artifact Boundary

The npm package boundary for `agentplane@0.3.29` is intentionally narrow:

- `bin/*.js` entries explicitly whitelisted in `packages/agentplane/package.json`.
- `dist/cli.js` and `dist/cli.d.ts`.
- `assets/`, `README.md`, and `LICENSE`.

`tsup` is the runtime bundle source for the CLI. TSC-emitted package JS is
pruned before bundling so it does not expand the published artifact surface.

## Verification Gates

This freeze artifact is valid only when these checks pass in the same checkout:

- `test -f FREEZE.v0.3.md`
- `rg -n '0\.3\.' FREEZE.v0.3.md`
- `find packages/agentplane/src -name '*.command.ts' | wc -l`
- `shasum -a 256 packages/agentplane/dist/cli.js`
- `node .agentplane/policy/check-routing.mjs`
- `agentplane doctor`

Release publication is not part of this artifact. The later release task must
run release parity checks and update release notes before publishing any
`0.3.x` package.
