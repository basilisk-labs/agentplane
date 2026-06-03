---
aliases:
  - "Open PR assimilation 2026-06-03"
tags:
  - agentplane/context
  - agentplane/github
  - agentplane/branch-pr
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.reports.open_pr_assimilation_2026_06_03"
  title: "Open PR assimilation 2026-06-03"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "github:pull/4409"
    - "github:pull/4414"
    - "github:pull/4422"
    - "github:pull/4424"
    - "github:pull/4425"
    - "github:issue/4405"
    - "github:issue/4406"
    - "github:issue/4407"
    - "github:issue/4412"
    - "github:issue/4416"
    - "github:issue/4418"
    - "github:issue/4419"
  claims:
    - "PR 4409 was assimilated into main as a useful, green feature PR."
    - "PRs 4414, 4422, 4424, and 4425 remain useful but require base refresh and local formatting or routed-CI repair before merge."
    - "The locally materialized task for issue 4412 is superseded by merged PR 4420 and should not be promoted as new work."
  graph_refs:
    entities:
      - "entity.open_pr_assimilation_2026_06_03"
    edges: []
  conflicts: []
  updated_by: CURATOR
---

# Open PR assimilation 2026-06-03

## Outcome

Open PR review found five initially open PRs against `main`: #4409, #4414, #4422, #4424, and #4425.

PR #4409 was current enough to assimilate directly after a base update. Its branch was updated, GitHub checks reran cleanly, and it was merged into `main` as merge commit `2d44a066ea094f4e12e3486612ac7cd292bd6f53`.[1]

The remaining open PRs still contain useful work, but they are not merge-ready. They are behind current `main` and have stale CI failures, mostly formatting or routed fast-CI failures on old merge refs.[2][3][4][5]

## Assimilated

### PR #4409: Structured feedback issue triage

Status: merged.

Useful payload:

- Adds `insights triage` support for privacy-bounded diagnostic findings.
- Integrates triage output with feedback issue rendering.
- Adds command catalog, loader, docs, help snapshot, and focused insights tests.

Why it was safe to assimilate:

- No unresolved review threads were present.
- After `gh pr update-branch`, GitHub checks passed on head `4c1a8bfa923d486ae7234b3b032ad1f6449e09ec`: `PR verification`, `verify-contract`, `verify-static`, `verify-unit`, `verify-cli-critical`, `verify-workflow`, `verify-coverage`, `test-windows`, docs, and CodeQL.
- GitHub merge completed at `2026-06-03T22:05:05Z`.

## Useful Follow-Ups

### PR #4425: Local fallback for unavailable task backends

Status: keep and repair.

Useful payload:

- Improves backend-unavailable guidance for task backend loading.
- Adds local `.agentplane/tasks` fallback hints for generic `E_BACKEND` paths.
- Points full preflight toward backend configuration review instead of repeating a failing task list loop.

Current blocker:

- Old `verify-contract` failed formatting in `packages/agentplane/src/cli/error-map.ts` and `packages/agentplane/src/cli/reason-codes.ts`.
- The PR is behind `main`, so it needs base refresh and formatting before meaningful CI readback.

Assimilation action:

- Keep as an implementation candidate for issues #4405 and #4418.

### PR #4424: Quickstart route guidance by workflow mode

Status: keep and repair.

Useful payload:

- Makes `quickstart` load project config before rendering route guidance.
- Prevents mixed direct and branch_pr guidance when only one workflow mode is active.
- Adds direct and branch_pr renderer/CLI coverage.

Current blocker:

- Old routed CI failed formatting in `packages/agentplane/src/cli/command-guide.test.ts` and `packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts`.
- The PR is behind `main`.

Assimilation action:

- Keep as an implementation candidate for issues #4406 and #4416.

### PR #4422: Website dependency surface in branch_pr worktrees

Status: keep and repair.

Useful payload:

- Adds `website/node_modules` to branch_pr worktree install-layout materialization.
- Extends framework bootstrap/worktree fixtures for website dependency surface.
- Addresses branch_pr/docs worktree failures where website dependencies are absent.

Current blocker:

- Old `verify-contract` failed formatting in `packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts` and `scripts/workflow/bootstrap-framework-dev.mjs`.
- The PR is behind `main`.

Assimilation action:

- Keep as an implementation candidate for issue #4419 and the related local task for website dependency requirements.

### PR #4414: Direct verified closeout routing

Status: keep cautiously; validate against current `main`.

Useful payload:

- Attempts to distinguish verified direct-mode tasks from normal runnable work.
- Adds route-decision coverage and active-task classification changes.
- Touches route oracle, next-action, task list, and Hermes runtime paths.

Current blocker:

- Old `verify-contract` failed formatting in `packages/agentplane/src/commands/task/shared/branch-pr-list-state.ts`.
- Issue #4407 is already closed as `COMPLETED`, so the PR may be partially or fully superseded.
- The PR touches broader route/oracle surfaces than the other follow-ups and should be revalidated against current route behavior before merge.

Assimilation action:

- Keep as a reference patch for direct closeout routing, but do not merge without reproducing the current bug after #4420/#4409-era base changes.

## Do Not Promote

### Local task for issue #4412

The locally materialized task `202606032056-75WA1N` describes issue #4412, but issue #4412 is closed and PR #4420 was merged into `main` at `0cce82b628e14f616d091e207e196c3f83f3d78b`.

Assimilation action:

- Treat `202606032056-75WA1N` as superseded by merged task `202606032048-TXNN46`.
- Do not start a new worktree or PR from it unless a new regression appears.

## Sources

1. [GitHub PR #4409](https://github.com/basilisk-labs/agentplane/pull/4409), `gh pr view 4409`, `gh pr checks 4409`, and merge readback.
2. [GitHub PR #4425](https://github.com/basilisk-labs/agentplane/pull/4425) and failed `verify-contract` log for run `26914311727`.
3. [GitHub PR #4424](https://github.com/basilisk-labs/agentplane/pull/4424) and failed `verify-routed` log for run `26914166147`.
4. [GitHub PR #4422](https://github.com/basilisk-labs/agentplane/pull/4422) and failed `verify-contract` log for run `26914079818`.
5. [GitHub PR #4414](https://github.com/basilisk-labs/agentplane/pull/4414) and failed `verify-contract` log for run `26912494923`.
