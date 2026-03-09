---
id: "202603090923-TQ2ASN"
title: "Strengthen external backend CI matrix"
result_summary: "External backend CI coverage now includes a canonical env-gated live Redmine suite and backend matrix scripts, so install-first projection behavior is exercised against a real remote source without making ordinary pre-push flows depend on network or secrets."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T10:10:46.680Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T10:21:08.804Z"
  updated_by: "CODER"
  note: "Passed bunx vitest run packages/agentplane/src/backends/task-backend/redmine/live.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000, bun run test:backend:redmine-live, bun run test:backend:matrix, bun run test:backend-critical, bun run lint:core -- package.json scripts/run-backend-live-suite.mjs packages/agentplane/src/backends/task-backend/redmine/live.test.ts, bun run docs:site:check, and node .agentplane/policy/check-routing.mjs after adding an env-gated read-only Redmine projection contract suite and canonical backend matrix scripts."
commit:
  hash: "5f4c8fae0dde089e4f27d2437ef3f556675731a4"
  message: "✨ TQ2ASN code: add live redmine backend matrix"
comments:
  -
    author: "CODER"
    body: "Start: implement an env-gated live Redmine contract suite plus canonical scripts and docs so external backends are validated through the same projection-first install-first model as local repos, without introducing remote writes."
  -
    author: "CODER"
    body: "Verified: env-gated live Redmine contract coverage now validates projection refresh, projection reads, and snapshot export through canonical backend matrix scripts without introducing remote writes into the default local loop."
events:
  -
    type: "status"
    at: "2026-03-09T10:10:51.462Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement an env-gated live Redmine contract suite plus canonical scripts and docs so external backends are validated through the same projection-first install-first model as local repos, without introducing remote writes."
  -
    type: "verify"
    at: "2026-03-09T10:21:08.804Z"
    author: "CODER"
    state: "ok"
    note: "Passed bunx vitest run packages/agentplane/src/backends/task-backend/redmine/live.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000, bun run test:backend:redmine-live, bun run test:backend:matrix, bun run test:backend-critical, bun run lint:core -- package.json scripts/run-backend-live-suite.mjs packages/agentplane/src/backends/task-backend/redmine/live.test.ts, bun run docs:site:check, and node .agentplane/policy/check-routing.mjs after adding an env-gated read-only Redmine projection contract suite and canonical backend matrix scripts."
  -
    type: "status"
    at: "2026-03-09T10:21:15.405Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: env-gated live Redmine contract coverage now validates projection refresh, projection reads, and snapshot export through canonical backend matrix scripts without introducing remote writes into the default local loop."
doc_version: 3
doc_updated_at: "2026-03-09T10:21:15.405Z"
doc_updated_by: "CODER"
description: "Add stronger backend contract coverage so local and external backends are exercised through the same install-first projection and migration scenarios before the next patch release."
id_source: "generated"
---
## Summary

- Problem: external backends are still weaker than local in CI because they lack a live contract path that exercises projection refresh, snapshot export, and install-first recovery against a real remote source.
- Target outcome: add a read-only, env-gated Redmine contract suite and canonical scripts/docs so external backends are validated through the same projection-first model expected by installed users.
- Constraint: the suite must not perform remote writes and must remain optional unless Redmine env is present.

## Scope

### In scope
- Add an env-gated live Redmine smoke or contract suite that exercises projection refresh and snapshot export without remote writes.
- Wire the suite into canonical scripts and document how it participates in backend validation.
- Keep the suite install-first and projection-first: explicit network access, local projection reads after refresh, and snapshot export assertions.

### Out of scope
- Remote write or sync-push coverage against Redmine.
- A pluggable backend registry or broader backend architecture refactor beyond this validation contour.
- Making the live suite mandatory in GitHub Actions without explicit secret provisioning.

## Plan

1. Inspect existing Redmine backend tests and define the smallest live contract that proves refreshProjection, projection reads, and exportProjectionSnapshot against a real remote source.
2. Implement an env-gated live Redmine test file plus canonical scripts so the suite can run deterministically when Redmine credentials are present and skip cleanly otherwise.
3. Update backend/testing docs to describe the live matrix and then verify the suite locally before closing the task.

## Verify Steps

1. Run `bun run test:backend:redmine-live`. Expected: with Redmine env present, the suite refreshes projection from the remote backend, reads tasks from projection, exports a snapshot, and passes without remote writes; without env, it exits cleanly with a skip.
2. Run `bun run test:backend:matrix`. Expected: hermetic backend-critical regressions and the env-gated live Redmine suite pass together.
3. Run `bun run docs:site:check` and `node .agentplane/policy/check-routing.mjs`. Expected: docs and policy routing remain clean after documenting the external backend matrix.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T10:21:08.804Z — VERIFY — ok

By: CODER

Note: Passed bunx vitest run packages/agentplane/src/backends/task-backend/redmine/live.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000, bun run test:backend:redmine-live, bun run test:backend:matrix, bun run test:backend-critical, bun run lint:core -- package.json scripts/run-backend-live-suite.mjs packages/agentplane/src/backends/task-backend/redmine/live.test.ts, bun run docs:site:check, and node .agentplane/policy/check-routing.mjs after adding an env-gated read-only Redmine projection contract suite and canonical backend matrix scripts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T10:20:11.440Z, excerpt_hash=sha256:189efa972ba668775b32be693f15afe526e60a4530f9a067c77bb31f99bfc209

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the backend live-test and script/docs commits.
2. Re-run `bun run test:backend-critical` to confirm the hermetic backend matrix is restored.

## Findings

- Observation: live Redmine validation works best as an env-gated canonical script instead of a default pre-push step.
  Impact: install-first remote backend coverage becomes first-class without making ordinary local loops depend on network and secrets.
  Resolution: added `test:backend:redmine-live` and `test:backend:matrix`.
  Promotion: none.
