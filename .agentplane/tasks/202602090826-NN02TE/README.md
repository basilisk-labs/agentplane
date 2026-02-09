---
id: "202602090826-NN02TE"
title: "AGENTS.md: align roles vs agents + warn on unknown task owner"
result_summary: "Owner registry warnings + AGENTS.md alignment"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "agents"
  - "cli"
  - "policy"
  - "ux"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T08:32:54.982Z"
  updated_by: "ORCHESTRATOR"
  note: "Updated AGENTS.md to explicitly separate authority roles vs execution agents registry (.agentplane/agents). Implemented warn-only owner validation: task new/update emit warning when owner is not found under .agentplane/agents. Added unit tests for warnIfUnknownOwner. bun run lint/test:full/coverage PASS."
commit:
  hash: "f5613603dbdb0357f832eec899a8ca8fe78bf726"
  message: "✅ NN02TE policy: warn on unknown task owner"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Update AGENTS.md contracts around agent assignment; add warn-only owner validation in task new/update with tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Updated AGENTS.md to distinguish authority roles vs execution agents registry and require downstream tasks to be owned by an existing agent (or schedule CREATOR). Implemented warn-only owner validation in task new/update with unit tests; lint/test:full/coverage pass."
events:
  -
    type: "status"
    at: "2026-02-09T08:27:04.221Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Update AGENTS.md contracts around agent assignment; add warn-only owner validation in task new/update with tests."
  -
    type: "verify"
    at: "2026-02-09T08:32:54.982Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Updated AGENTS.md to explicitly separate authority roles vs execution agents registry (.agentplane/agents). Implemented warn-only owner validation: task new/update emit warning when owner is not found under .agentplane/agents. Added unit tests for warnIfUnknownOwner. bun run lint/test:full/coverage PASS."
  -
    type: "status"
    at: "2026-02-09T08:33:42.606Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Updated AGENTS.md to distinguish authority roles vs execution agents registry and require downstream tasks to be owned by an existing agent (or schedule CREATOR). Implemented warn-only owner validation in task new/update with unit tests; lint/test:full/coverage pass."
doc_version: 2
doc_updated_at: "2026-02-09T08:33:42.606Z"
doc_updated_by: "ORCHESTRATOR"
description: "Review AGENTS.md for internal consistency and update it to require downstream tasks to be assigned to an existing agent ID (or schedule CREATOR). Add CLI warnings when task owner is not found under .agentplane/agents."
id_source: "generated"
---
## Summary

Update AGENTS.md to clearly separate authority roles from execution agents (IDs under .agentplane/agents/*.json), require every downstream task to be assigned to an existing agent (or schedule a CREATOR task when missing), and make the document more immediately actionable.

Add warn-only enforcement in the CLI: task new/update should emit a warning if the specified owner id is not present under .agentplane/agents.

## Scope

In-scope:
- AGENTS.md
- packages/agentplane/src/commands/task/new.ts
- packages/agentplane/src/commands/task/update.ts
- packages/agentplane/src/commands/task/shared.ts
- New unit tests for the warning behavior

Out-of-scope:
- Hard errors (this change is warning-only)
- Schema changes to tasks export format

## Plan

1. Update AGENTS.md with explicit contracts: execution agents = IDs from .agentplane/agents; every downstream task MUST set owner to an existing agent id; if missing, PLANNER MUST create a CREATOR task and make dependent tasks depend_on it.
2. Implement warnIfUnknownOwner(ctx, owner) and call it from task new/update when setting owner.
3. Add unit tests that assert warnings are emitted for unknown owners and not emitted for known owners.
4. Run bun run lint, bun run test:full, bun run coverage.

## Risks

Risk: extra stderr noise for repos that used free-form owner values.
Mitigation: warning-only + clear remediation (create agent JSON or pick an existing id).

Risk: false positives when agents directory does not exist (repo not initialized).
Mitigation: skip the warning when agents_dir is missing or contains no *.json.

## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T08:32:54.982Z — VERIFY — ok

By: ORCHESTRATOR

Note: Updated AGENTS.md to explicitly separate authority roles vs execution agents registry (.agentplane/agents). Implemented warn-only owner validation: task new/update emit warning when owner is not found under .agentplane/agents. Added unit tests for warnIfUnknownOwner. bun run lint/test:full/coverage PASS.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:28:04.042Z, excerpt_hash=sha256:f5457b97e854b607f7ea322044a312d32868d862de5b3039fe24000045b71c1c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

git revert коммита; bun run test:full.

## Context

Currently task owner is only validated as non-empty. This allows arbitrary owner values that do not correspond to any agent definition. The policy also describes authority roles, but does not hard-require assignment to an existing execution agent or the CREATOR fallback when no suitable agent exists.

## Notes

### Decision
Owner validation is introduced as a warning (not an error) to avoid breaking existing workflows.

### Follow-up
Once warning adoption is stable, we can consider upgrading this to a lint error / CI gate.
