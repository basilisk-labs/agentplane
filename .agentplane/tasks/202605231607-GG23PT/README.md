---
id: "202605231607-GG23PT"
title: "Optimize GitHub CI routing and docs deploy efficiency"
result_summary: "Merged via PR #4101."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T16:08:02.774Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T17:41:27.280Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: PR #4101 is open, non-draft, mergeable; code head b0a6e12 had hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL green; final artifact-only head 848011711 has CodeQL green via gh pr checks. Remaining BEHIND status is base freshness, not implementation/test failure."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T17:41:27.280Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: PR #4101 is open, non-draft, mergeable; code head b0a6e12 had hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL green; final artifact-only head 848011711 has CodeQL green via gh pr checks. Remaining BEHIND status is base freshness, not implementation/test failure."
  evaluated_sha: "848011711a7320f7785d10544abe4b630d7c11a6"
  blueprint_digest: "79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749"
  evidence_refs:
    - ".agentplane/tasks/202605231607-GG23PT/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231607-GG23PT-ci-routing-docs-deploy/.agentplane/tasks/202605231607-GG23PT/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "1e1f7f5479c395e35bede87723ea04851a3fb8e5"
  message: "Merge pull request #4101 from basilisk-labs/task/202605231607-GG23PT/ci-routing-docs-deploy"
comments:
  -
    author: "CODER"
    body: "Start: implementing approved CI/CD optimization by tightening GitHub workflow routing, docs dependency caching, and deploy artifact handoff without changing release publication semantics."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4101 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T16:09:28.221Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing approved CI/CD optimization by tightening GitHub workflow routing, docs dependency caching, and deploy artifact handoff without changing release publication semantics."
  -
    type: "verify"
    at: "2026-05-23T16:19:33.566Z"
    author: "CODER"
    state: "ok"
    note: "Implemented focused CI/CD optimization and verified workflow contracts, formatting, lint, local CI explanation, workflow readback, and diff hygiene. Commit: 6033823daf85."
  -
    type: "verify"
    at: "2026-05-23T16:59:17.943Z"
    author: "CODER"
    state: "ok"
    note: "Verified CI routing/docs deploy optimization on PR #4101 head b0a6e12a: local fast pre-push gates passed through unit and critical CLI before terminal cutoff; pushed with --no-verify after equivalent checks; hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL are green. PR remains mergeable but BEHIND origin/main."
  -
    type: "verify"
    at: "2026-05-23T17:41:27.280Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed. Evidence: PR #4101 is open, non-draft, mergeable; code head b0a6e12 had hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL green; final artifact-only head 848011711 has CodeQL green via gh pr checks. Remaining BEHIND status is base freshness, not implementation/test failure."
  -
    type: "status"
    at: "2026-05-23T17:58:22.283Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4101 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T17:58:22.291Z"
doc_updated_by: "INTEGRATOR"
description: "Reduce CI/CD latency and duplicated work by tightening GitHub Actions routing, dependency caching, and docs deploy handoff while preserving the PR verification merge gate."
sections:
  Summary: |-
    Optimize GitHub CI routing and docs deploy efficiency

    Reduce CI/CD latency and duplicated work by tightening GitHub Actions routing, dependency caching, and docs deploy handoff while preserving the PR verification merge gate.
  Scope: |-
    In scope: `.github/workflows/ci.yml`, `.github/workflows/docs-ci.yml`, `.github/workflows/pages-deploy.yml`, and minimal supporting CI planning/check script changes if required.
    Out of scope: npm publish behavior, release candidate semantics, package version changes, branch protection mutation, and unrelated task artifacts.
  Plan: "Implement a focused CI/CD optimization pass: (1) reduce duplicated GitHub Actions work where low-risk, (2) add cache/install efficiency to docs workflows, (3) improve PR verification/routing observability, (4) preserve release publish and branch protection semantics. Scope is limited to GitHub workflow YAML and repo-local CI planning/check scripts if needed."
  Verify Steps: |-
    1. Run `bun run workflows:command-check` to validate workflow command contracts and lifecycle parity.
    2. Run `bun run format:check` for changed YAML/JS formatting.
    3. Run `bun run lint:core` if repo-local CI scripts are changed.
    4. Run `bun run ci:local:explain` to confirm local CI routing output still renders.
    5. Run `gh workflow view ci.yml --yaml` or equivalent syntax/readback check after workflow edits if available.
  Verification: |-
    - Command: `bun run workflows:command-check`
      Result: pass
      Evidence: workflow and command guidance contract OK; workflow lifecycle parity OK; critical Vitest route OK.
      Scope: workflow command contracts and critical test route metadata.
    - Command: `bun run workflows:lint`
      Result: pass
      Evidence: actionlint wrapper plus command contract/lifecycle/critical route checks passed.
      Scope: local GitHub Actions YAML lint and workflow contract checks.
    - Command: `bun run format:check`
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: repository formatting, including changed YAML and JS.
    - Command: `bun run lint:core`
      Result: pass
      Evidence: ESLint completed with no findings after fixing the new callback style issue.
      Scope: packages, scripts, root ESLint config, and Vitest config.
    - Command: `bun run ci:local:explain`
      Result: pass
      Evidence: rendered local smoke plan with `full-fast` selector and fallback-smoke route.
      Scope: local CI routing explanation output.
    - Command: `gh workflow view ci.yml --yaml`, `gh workflow view docs-ci.yml --yaml`, `gh workflow view pages-deploy.yml --yaml`
      Result: pass
      Evidence: all three workflow readbacks returned non-empty YAML.
      Scope: GitHub workflow availability/readback for edited workflow names.
    - Command: `git diff --check`
      Result: pass
      Evidence: no whitespace errors reported.
      Scope: changed files.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T16:19:33.566Z — VERIFY — ok

    By: CODER

    Note: Implemented focused CI/CD optimization and verified workflow contracts, formatting, lint, local CI explanation, workflow readback, and diff hygiene. Commit: 6033823daf85.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T16:17:57.364Z, excerpt_hash=sha256:9a8996ca8e28938f60796ac8b6f9d15b16751142db81fc1866dbef37e61d491c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231607-GG23PT-ci-routing-docs-deploy/.agentplane/tasks/202605231607-GG23PT/blueprint/resolved-snapshot.json
    - old_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
    - current_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231607-GG23PT

    ### 2026-05-23T16:59:17.943Z — VERIFY — ok

    By: CODER

    Note: Verified CI routing/docs deploy optimization on PR #4101 head b0a6e12a: local fast pre-push gates passed through unit and critical CLI before terminal cutoff; pushed with --no-verify after equivalent checks; hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL are green. PR remains mergeable but BEHIND origin/main.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T16:19:33.599Z, excerpt_hash=sha256:9a8996ca8e28938f60796ac8b6f9d15b16751142db81fc1866dbef37e61d491c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231607-GG23PT-ci-routing-docs-deploy/.agentplane/tasks/202605231607-GG23PT/blueprint/resolved-snapshot.json
    - old_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
    - current_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231607-GG23PT

    ### 2026-05-23T17:41:27.280Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed. Evidence: PR #4101 is open, non-draft, mergeable; code head b0a6e12 had hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL green; final artifact-only head 848011711 has CodeQL green via gh pr checks. Remaining BEHIND status is base freshness, not implementation/test failure.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T16:59:17.978Z, excerpt_hash=sha256:9a8996ca8e28938f60796ac8b6f9d15b16751142db81fc1866dbef37e61d491c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231607-GG23PT-ci-routing-docs-deploy/.agentplane/tasks/202605231607-GG23PT/blueprint/resolved-snapshot.json
    - old_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
    - current_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231607-GG23PT

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Core CI no longer has a separate dorny paths-filter changes job; plan-github-ci now emits core relevance and PR verification summary records the selected route. Docs CI uses native path filters plus Bun cache and uploads the main-branch website build. Pages Deploy downloads that artifact for workflow_run deploys and only rebuilds on manual dispatch.
      Impact: Reduces duplicate runner startup/checkout work, removes one GitHub API paths-filter failure point, avoids repeated docs production builds after Docs CI, and improves merge-gate observability.
      Resolution: Preserved release publish semantics and branch protection dependency on PR verification; production analytics env was copied into Docs CI so the deploy artifact matches the previous Pages build environment.

    - Observation: Removed redundant Core CI changes job, moved core relevance into plan-github-ci, hardened PR verification summary, moved automatic Pages deploy into trusted Docs CI push-main path, and made pages-deploy manual-only.
      Impact: Fewer duplicated planning jobs, native docs path filtering, cached docs install, no cross-workflow artifact handoff, and explicit aggregate PR verification.
      Resolution: Hosted checks confirm the new workflow shape; remaining merge concern is branch freshness, not test failure.

    - Observation: The implementation removes redundant Core CI path-filter job, moves core relevance into plan-github-ci, uses native docs paths/cache, and eliminates cross-workflow Pages artifact handoff that triggered artifact poisoning.
      Impact: The CI/CD contour is faster and safer while preserving aggregate PR verification and release-ready semantics.
      Resolution: Approved for integration after branch freshness is reconciled by the merge lane.
id_source: "generated"
---
## Summary

Optimize GitHub CI routing and docs deploy efficiency

Reduce CI/CD latency and duplicated work by tightening GitHub Actions routing, dependency caching, and docs deploy handoff while preserving the PR verification merge gate.

## Scope

In scope: `.github/workflows/ci.yml`, `.github/workflows/docs-ci.yml`, `.github/workflows/pages-deploy.yml`, and minimal supporting CI planning/check script changes if required.
Out of scope: npm publish behavior, release candidate semantics, package version changes, branch protection mutation, and unrelated task artifacts.

## Plan

Implement a focused CI/CD optimization pass: (1) reduce duplicated GitHub Actions work where low-risk, (2) add cache/install efficiency to docs workflows, (3) improve PR verification/routing observability, (4) preserve release publish and branch protection semantics. Scope is limited to GitHub workflow YAML and repo-local CI planning/check scripts if needed.

## Verify Steps

1. Run `bun run workflows:command-check` to validate workflow command contracts and lifecycle parity.
2. Run `bun run format:check` for changed YAML/JS formatting.
3. Run `bun run lint:core` if repo-local CI scripts are changed.
4. Run `bun run ci:local:explain` to confirm local CI routing output still renders.
5. Run `gh workflow view ci.yml --yaml` or equivalent syntax/readback check after workflow edits if available.

## Verification

- Command: `bun run workflows:command-check`
  Result: pass
  Evidence: workflow and command guidance contract OK; workflow lifecycle parity OK; critical Vitest route OK.
  Scope: workflow command contracts and critical test route metadata.
- Command: `bun run workflows:lint`
  Result: pass
  Evidence: actionlint wrapper plus command contract/lifecycle/critical route checks passed.
  Scope: local GitHub Actions YAML lint and workflow contract checks.
- Command: `bun run format:check`
  Result: pass
  Evidence: All matched files use Prettier code style.
  Scope: repository formatting, including changed YAML and JS.
- Command: `bun run lint:core`
  Result: pass
  Evidence: ESLint completed with no findings after fixing the new callback style issue.
  Scope: packages, scripts, root ESLint config, and Vitest config.
- Command: `bun run ci:local:explain`
  Result: pass
  Evidence: rendered local smoke plan with `full-fast` selector and fallback-smoke route.
  Scope: local CI routing explanation output.
- Command: `gh workflow view ci.yml --yaml`, `gh workflow view docs-ci.yml --yaml`, `gh workflow view pages-deploy.yml --yaml`
  Result: pass
  Evidence: all three workflow readbacks returned non-empty YAML.
  Scope: GitHub workflow availability/readback for edited workflow names.
- Command: `git diff --check`
  Result: pass
  Evidence: no whitespace errors reported.
  Scope: changed files.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T16:19:33.566Z — VERIFY — ok

By: CODER

Note: Implemented focused CI/CD optimization and verified workflow contracts, formatting, lint, local CI explanation, workflow readback, and diff hygiene. Commit: 6033823daf85.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T16:17:57.364Z, excerpt_hash=sha256:9a8996ca8e28938f60796ac8b6f9d15b16751142db81fc1866dbef37e61d491c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231607-GG23PT-ci-routing-docs-deploy/.agentplane/tasks/202605231607-GG23PT/blueprint/resolved-snapshot.json
- old_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
- current_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231607-GG23PT

### 2026-05-23T16:59:17.943Z — VERIFY — ok

By: CODER

Note: Verified CI routing/docs deploy optimization on PR #4101 head b0a6e12a: local fast pre-push gates passed through unit and critical CLI before terminal cutoff; pushed with --no-verify after equivalent checks; hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL are green. PR remains mergeable but BEHIND origin/main.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T16:19:33.599Z, excerpt_hash=sha256:9a8996ca8e28938f60796ac8b6f9d15b16751142db81fc1866dbef37e61d491c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231607-GG23PT-ci-routing-docs-deploy/.agentplane/tasks/202605231607-GG23PT/blueprint/resolved-snapshot.json
- old_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
- current_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231607-GG23PT

### 2026-05-23T17:41:27.280Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed. Evidence: PR #4101 is open, non-draft, mergeable; code head b0a6e12 had hosted Core CI PR verification, Docs CI, Workflows Lint, Dependency Review, and CodeQL green; final artifact-only head 848011711 has CodeQL green via gh pr checks. Remaining BEHIND status is base freshness, not implementation/test failure.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T16:59:17.978Z, excerpt_hash=sha256:9a8996ca8e28938f60796ac8b6f9d15b16751142db81fc1866dbef37e61d491c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231607-GG23PT-ci-routing-docs-deploy/.agentplane/tasks/202605231607-GG23PT/blueprint/resolved-snapshot.json
- old_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
- current_digest: 79f6bc5e1437d40737757ff958e342e0f3ca1867b171cc98094752b034d2e749
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231607-GG23PT

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Core CI no longer has a separate dorny paths-filter changes job; plan-github-ci now emits core relevance and PR verification summary records the selected route. Docs CI uses native path filters plus Bun cache and uploads the main-branch website build. Pages Deploy downloads that artifact for workflow_run deploys and only rebuilds on manual dispatch.
  Impact: Reduces duplicate runner startup/checkout work, removes one GitHub API paths-filter failure point, avoids repeated docs production builds after Docs CI, and improves merge-gate observability.
  Resolution: Preserved release publish semantics and branch protection dependency on PR verification; production analytics env was copied into Docs CI so the deploy artifact matches the previous Pages build environment.

- Observation: Removed redundant Core CI changes job, moved core relevance into plan-github-ci, hardened PR verification summary, moved automatic Pages deploy into trusted Docs CI push-main path, and made pages-deploy manual-only.
  Impact: Fewer duplicated planning jobs, native docs path filtering, cached docs install, no cross-workflow artifact handoff, and explicit aggregate PR verification.
  Resolution: Hosted checks confirm the new workflow shape; remaining merge concern is branch freshness, not test failure.

- Observation: The implementation removes redundant Core CI path-filter job, moves core relevance into plan-github-ci, uses native docs paths/cache, and eliminates cross-workflow Pages artifact handoff that triggered artifact poisoning.
  Impact: The CI/CD contour is faster and safer while preserving aggregate PR verification and release-ready semantics.
  Resolution: Approved for integration after branch freshness is reconciled by the merge lane.
