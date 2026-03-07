---
id: "202603072133-RHJ409"
title: "Load incidents only in recovery and error paths"
result_summary: "Moved incidents.md to a recovery-only reading contract for agents and aligned onboarding checks with that behavior."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603072133-TBN594"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T21:38:32.020Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T21:40:59.387Z"
  updated_by: "TESTER"
  note: "Verified: incidents.md is now explicitly outside the normal startup path, recovery-only surfaces still point to it, onboarding/bootstrap checks passed, and doctor remained green aside from known historical archive warnings."
commit:
  hash: "76f8dc3d7d48673c4a0aaf18c0b59e496b9e591f"
  message: "📝 RHJ409 docs: move incidents to recovery-only path"
comments:
  -
    author: "DOCS"
    body: "Start: move incidents.md out of the normal startup path, keep it explicit in recovery-only surfaces, and align onboarding checks with that contract."
  -
    author: "DOCS"
    body: "Verified: incidents.md is now explicitly outside the normal startup path, recovery-only surfaces still point to it, onboarding/bootstrap checks passed, and doctor remained green aside from known historical archive warnings."
events:
  -
    type: "status"
    at: "2026-03-07T21:38:38.103Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: move incidents.md out of the normal startup path, keep it explicit in recovery-only surfaces, and align onboarding checks with that contract."
  -
    type: "verify"
    at: "2026-03-07T21:40:59.387Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: incidents.md is now explicitly outside the normal startup path, recovery-only surfaces still point to it, onboarding/bootstrap checks passed, and doctor remained green aside from known historical archive warnings."
  -
    type: "status"
    at: "2026-03-07T21:41:15.118Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: incidents.md is now explicitly outside the normal startup path, recovery-only surfaces still point to it, onboarding/bootstrap checks passed, and doctor remained green aside from known historical archive warnings."
doc_version: 2
doc_updated_at: "2026-03-07T21:41:15.118Z"
doc_updated_by: "DOCS"
description: "Update agent guidance and runtime help so .agentplane/policy/incidents.md is not part of the normal startup path and is consulted only for failures, recovery, or incident response."
id_source: "generated"
---
## Summary

Make incidents.md a recovery-only surface for agents: normal startup should not require reading it, while error/recovery flows should still point to it explicitly.

## Scope

- In scope: Update agent guidance and runtime help so .agentplane/policy/incidents.md is not part of the normal startup path and is consulted only for failures, recovery, or incident response..
- Out of scope: unrelated refactors not required for "Load incidents only in recovery and error paths".

## Plan

1. Update agent-facing gateway/docs so incidents.md is explicitly out of the normal startup path and is consulted only for recovery, incident response, or direct incidents work. 2. Adjust onboarding checks so they enforce that contract instead of expecting incidents.md in the normal setup path. 3. Verify docs/bootstrap/onboarding checks and close the task.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. bun run docs:onboarding:check 2. bun run docs:bootstrap:check 3. node .agentplane/policy/check-routing.mjs 4. agentplane doctor 5. If docs site text changes materially, run bun run docs:site:check

## Verification

Command: bun run docs:onboarding:check
Result: pass
Evidence: onboarding scenario surfaces are aligned and no longer require incidents.md in the normal setup path
Scope: AGENTS.md, docs/user/setup.mdx, docs/user/agents.mdx, scripts/check-agent-onboarding-scenario.mjs
Links: AGENTS.md, docs/user/setup.mdx, docs/user/agents.mdx

Command: bun run docs:bootstrap:check
Result: pass
Evidence: bootstrap and startup surfaces stayed aligned after the recovery-only incidents contract change
Scope: startup guidance surfaces
Links: docs/user/agent-bootstrap.generated.mdx

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK
Scope: AGENTS.md and policy routing contract
Links: AGENTS.md

Command: agentplane doctor
Result: pass
Evidence: doctor OK; only known historical archive warnings remain
Scope: repository health after startup/recovery guidance updates
Links: AGENTS.md, docs/user/setup.mdx

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T21:40:59.387Z — VERIFY — ok

By: TESTER

Note: Verified: incidents.md is now explicitly outside the normal startup path, recovery-only surfaces still point to it, onboarding/bootstrap checks passed, and doctor remained green aside from known historical archive warnings.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T21:40:59.108Z, excerpt_hash=sha256:127a49915051ea7569cf67fa0d99df19bc7b928ff0a3eb9e5c43fd078546b7b1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the gateway/docs/onboarding-check changes if the new recovery-only contract hides incidents.md from a required troubleshooting path.
