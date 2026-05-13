---
id: "202605131632-TDMHEC"
title: "Introduce bounded agentic classification and curation surfaces"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "agents"
  - "blueprints"
  - "code"
  - "context"
  - "incidents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:32:53.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T17:49:25.583Z"
  updated_by: "CODER"
  note: "Review fix verified: added managed upgrade removals for legacy SKILL_EXTRACTOR cleanup, added CURATOR to managed manifest, and reran targeted upgrade tests plus typecheck/format/assets/agents/diff checks."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement bounded one-word agent role contracts for intake classification, incident curation, context harvest extraction, PLANNER-owned Verify Steps, and optional PR reviewer summaries while preserving deterministic validation gates."
events:
  -
    type: "status"
    at: "2026-05-13T16:33:55.026Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement bounded one-word agent role contracts for intake classification, incident curation, context harvest extraction, PLANNER-owned Verify Steps, and optional PR reviewer summaries while preserving deterministic validation gates."
  -
    type: "verify"
    at: "2026-05-13T16:52:46.383Z"
    author: "CODER"
    state: "ok"
    note: "Verified bounded agentic role contracts and deterministic gates. Checks: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  -
    type: "verify"
    at: "2026-05-13T17:00:39.116Z"
    author: "CODER"
    state: "ok"
    note: "Final verification remains valid on implementation commit 662d86313. Checks previously run: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  -
    type: "verify"
    at: "2026-05-13T17:49:25.583Z"
    author: "CODER"
    state: "ok"
    note: "Review fix verified: added managed upgrade removals for legacy SKILL_EXTRACTOR cleanup, added CURATOR to managed manifest, and reran targeted upgrade tests plus typecheck/format/assets/agents/diff checks."
doc_version: 3
doc_updated_at: "2026-05-13T17:49:25.607Z"
doc_updated_by: "CODER"
description: "Move semantic task intake, incident curation, context harvest extraction, and PR summary guidance behind named one-word agent roles while preserving deterministic validation gates. Remove obsolete upgrade semantic review framing."
sections:
  Summary: |-
    Introduce bounded agentic classification and curation surfaces
    
    Move semantic task intake, incident curation, context harvest extraction, and PR summary guidance behind named one-word agent roles while preserving deterministic validation gates. Remove obsolete upgrade semantic review framing.
  Scope: |-
    - In scope: Move semantic task intake, incident curation, context harvest extraction, and PR summary guidance behind named one-word agent roles while preserving deterministic validation gates. Remove obsolete upgrade semantic review framing.
    - Out of scope: unrelated refactors not required for "Introduce bounded agentic classification and curation surfaces".
  Plan: "1. Audit existing agent role names and semantic algorithm surfaces for intake, incidents, context harvest, task docs, upgrade review, and PR artifacts. 2. Introduce one-word bounded role naming for the requested semantic agents: INTAKE, CURATOR, PLANNER, REVIEWER, with deterministic code retaining schema, allowlist, freshness, and policy gates. 3. Replace blueprint/task-kind semantic inference framing with an INTAKE-backed contract and keep deterministic resolver validation as a fallback/gate. 4. Move incident matching/promotion semantics behind CURATOR guidance while preserving registry parsing, scoring fallback, dedupe, and append-only validation. 5. Make content harvest semantic extraction agent-first by default for broad harvest flows; keep algorithmic harvest as raw/proposal scaffold. 6. Make task doc Verify Steps generation explicitly PLANNER-owned, with algorithmic default only as fallback and validation layer. 7. Remove obsolete upgrade semantic-review framing from upgrade agent review artifacts/docs instead of adding a new upgrade reviewer. 8. Add optional REVIEWER bounded PR summary guidance without replacing deterministic PR artifacts. 9. Update focused tests/docs and run targeted verification plus policy routing/doctor."
  Verify Steps: |-
    1. Run focused tests for blueprint intake mode, context harvest, incident commands, PR summary rendering, task Verify Steps scaffolding, upgrade plan-only reports, and prompt-module role contracts. Expected: all targeted tests pass.
    2. Run generator freshness checks for agents, builtin assets, CLI reference, and help snapshots. Expected: generated artifacts are current and no stale mirrors remain.
    3. Run repository safety checks: typecheck, formatting on touched files, git diff --check, policy routing, and agentplane doctor. Expected: all pass with no errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T16:52:46.383Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified bounded agentic role contracts and deterministic gates. Checks: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:51:52.604Z, excerpt_hash=sha256:573b6c1c49bf023ca473ca7a24e3a7cec0c905a0f6092a350d2769335a529530
    
    Details:
    
    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131632-TDMHEC-agentic-classifiers/.agentplane/tasks/202605131632-TDMHEC/blueprint/resolved-snapshot.json
    - old_digest: 3f01e140e50041bab023e73a5e8dc69c1058103e6a333a345747190344d06ae9
    - current_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131632-TDMHEC
    
    ### 2026-05-13T17:00:39.116Z — VERIFY — ok
    
    By: CODER
    
    Note: Final verification remains valid on implementation commit 662d86313. Checks previously run: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:52:46.456Z, excerpt_hash=sha256:573b6c1c49bf023ca473ca7a24e3a7cec0c905a0f6092a350d2769335a529530
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131632-TDMHEC-agentic-classifiers/.agentplane/tasks/202605131632-TDMHEC/blueprint/resolved-snapshot.json
    - old_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
    - current_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131632-TDMHEC
    
    ### 2026-05-13T17:49:25.583Z — VERIFY — ok
    
    By: CODER
    
    Note: Review fix verified: added managed upgrade removals for legacy SKILL_EXTRACTOR cleanup, added CURATOR to managed manifest, and reran targeted upgrade tests plus typecheck/format/assets/agents/diff checks.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:00:39.359Z, excerpt_hash=sha256:573b6c1c49bf023ca473ca7a24e3a7cec0c905a0f6092a350d2769335a529530
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131632-TDMHEC-agentic-classifiers/.agentplane/tasks/202605131632-TDMHEC/blueprint/resolved-snapshot.json
    - old_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
    - current_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131632-TDMHEC
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub Codex review reported stale .agentplane/agents/SKILL_EXTRACTOR.json would remain after upgrade and break agents:check.
      Impact: Existing repos could fail post-upgrade validation after the EXTRACTOR rename.
      Resolution: Upgrade manifest now supports safe removals and deletes legacy managed files only when current content matches the upgrade baseline; local edits are preserved.
id_source: "generated"
---
## Summary

Introduce bounded agentic classification and curation surfaces

Move semantic task intake, incident curation, context harvest extraction, and PR summary guidance behind named one-word agent roles while preserving deterministic validation gates. Remove obsolete upgrade semantic review framing.

## Scope

- In scope: Move semantic task intake, incident curation, context harvest extraction, and PR summary guidance behind named one-word agent roles while preserving deterministic validation gates. Remove obsolete upgrade semantic review framing.
- Out of scope: unrelated refactors not required for "Introduce bounded agentic classification and curation surfaces".

## Plan

1. Audit existing agent role names and semantic algorithm surfaces for intake, incidents, context harvest, task docs, upgrade review, and PR artifacts. 2. Introduce one-word bounded role naming for the requested semantic agents: INTAKE, CURATOR, PLANNER, REVIEWER, with deterministic code retaining schema, allowlist, freshness, and policy gates. 3. Replace blueprint/task-kind semantic inference framing with an INTAKE-backed contract and keep deterministic resolver validation as a fallback/gate. 4. Move incident matching/promotion semantics behind CURATOR guidance while preserving registry parsing, scoring fallback, dedupe, and append-only validation. 5. Make content harvest semantic extraction agent-first by default for broad harvest flows; keep algorithmic harvest as raw/proposal scaffold. 6. Make task doc Verify Steps generation explicitly PLANNER-owned, with algorithmic default only as fallback and validation layer. 7. Remove obsolete upgrade semantic-review framing from upgrade agent review artifacts/docs instead of adding a new upgrade reviewer. 8. Add optional REVIEWER bounded PR summary guidance without replacing deterministic PR artifacts. 9. Update focused tests/docs and run targeted verification plus policy routing/doctor.

## Verify Steps

1. Run focused tests for blueprint intake mode, context harvest, incident commands, PR summary rendering, task Verify Steps scaffolding, upgrade plan-only reports, and prompt-module role contracts. Expected: all targeted tests pass.
2. Run generator freshness checks for agents, builtin assets, CLI reference, and help snapshots. Expected: generated artifacts are current and no stale mirrors remain.
3. Run repository safety checks: typecheck, formatting on touched files, git diff --check, policy routing, and agentplane doctor. Expected: all pass with no errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T16:52:46.383Z — VERIFY — ok

By: CODER

Note: Verified bounded agentic role contracts and deterministic gates. Checks: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:51:52.604Z, excerpt_hash=sha256:573b6c1c49bf023ca473ca7a24e3a7cec0c905a0f6092a350d2769335a529530

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131632-TDMHEC-agentic-classifiers/.agentplane/tasks/202605131632-TDMHEC/blueprint/resolved-snapshot.json
- old_digest: 3f01e140e50041bab023e73a5e8dc69c1058103e6a333a345747190344d06ae9
- current_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131632-TDMHEC

### 2026-05-13T17:00:39.116Z — VERIFY — ok

By: CODER

Note: Final verification remains valid on implementation commit 662d86313. Checks previously run: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:52:46.456Z, excerpt_hash=sha256:573b6c1c49bf023ca473ca7a24e3a7cec0c905a0f6092a350d2769335a529530

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131632-TDMHEC-agentic-classifiers/.agentplane/tasks/202605131632-TDMHEC/blueprint/resolved-snapshot.json
- old_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
- current_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131632-TDMHEC

### 2026-05-13T17:49:25.583Z — VERIFY — ok

By: CODER

Note: Review fix verified: added managed upgrade removals for legacy SKILL_EXTRACTOR cleanup, added CURATOR to managed manifest, and reran targeted upgrade tests plus typecheck/format/assets/agents/diff checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T17:00:39.359Z, excerpt_hash=sha256:573b6c1c49bf023ca473ca7a24e3a7cec0c905a0f6092a350d2769335a529530

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131632-TDMHEC-agentic-classifiers/.agentplane/tasks/202605131632-TDMHEC/blueprint/resolved-snapshot.json
- old_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
- current_digest: 72a7929ae820e3ed5c909c3c63108247f2b2e36d020118cc4b62a523e455cf8f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131632-TDMHEC

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub Codex review reported stale .agentplane/agents/SKILL_EXTRACTOR.json would remain after upgrade and break agents:check.
  Impact: Existing repos could fail post-upgrade validation after the EXTRACTOR rename.
  Resolution: Upgrade manifest now supports safe removals and deletes legacy managed files only when current content matches the upgrade baseline; local edits are preserved.
