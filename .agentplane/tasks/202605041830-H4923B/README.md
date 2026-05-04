---
id: "202605041830-H4923B"
title: "Document AgentPlane dev fast local checks"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:32:24.158Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:37:29.269Z"
  updated_by: "DOCS"
  note: "Docs verification passed for AgentPlane dev fast local checks."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document the AgentPlane framework development fast-check discipline in the task worktree, keeping scope limited to developer docs and task evidence."
events:
  -
    type: "status"
    at: "2026-05-04T18:33:08.819Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the AgentPlane framework development fast-check discipline in the task worktree, keeping scope limited to developer docs and task evidence."
  -
    type: "verify"
    at: "2026-05-04T18:37:29.269Z"
    author: "DOCS"
    state: "ok"
    note: "Docs verification passed for AgentPlane dev fast local checks."
doc_version: 3
doc_updated_at: "2026-05-04T18:37:29.288Z"
doc_updated_by: "DOCS"
description: "Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks."
sections:
  Summary: |-
    Document AgentPlane dev fast local checks
    
    Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
  Scope: |-
    - In scope: Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
    - Out of scope: unrelated refactors not required for "Document AgentPlane dev fast local checks".
  Plan: |-
    1. Add developer documentation that makes bun run ci:local:fast the first local gate for AgentPlane framework development before hosted CI.
    2. Document the check tiers from cheap hygiene/runtime checks through full local and hosted/release gates, including when to escalate.
    3. Link the guidance from the contributor/developer entrypoint so future AgentPlane development tasks can discover it.
    4. Verify docs routing and doctor, then record evidence on the task.
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
    2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
    3. Run bun run docs:ia:check. Expected: docs IA remains valid after adding or linking developer guidance.
    4. Review the changed developer docs. Expected: the guidance is explicitly scoped to AgentPlane framework development and does not impose CI/PR requirements on consumer analysis or content tasks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:37:29.269Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs verification passed for AgentPlane dev fast local checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:33:08.819Z, excerpt_hash=sha256:6d21b3627bace88c86aa5346a01a273cd0cf40de80a222d5f603e919e663e188
    
    Details:
    
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/developer/code-quality.mdx and docs/developer/contributing.mdx. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only; Scope: task worktree. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: developer docs links. Command: bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx; Result: pass after formatting; Evidence: All matched files use Prettier code style; Scope: touched docs files.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document AgentPlane dev fast local checks

Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.

## Scope

- In scope: Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
- Out of scope: unrelated refactors not required for "Document AgentPlane dev fast local checks".

## Plan

1. Add developer documentation that makes bun run ci:local:fast the first local gate for AgentPlane framework development before hosted CI.
2. Document the check tiers from cheap hygiene/runtime checks through full local and hosted/release gates, including when to escalate.
3. Link the guidance from the contributor/developer entrypoint so future AgentPlane development tasks can discover it.
4. Verify docs routing and doctor, then record evidence on the task.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
3. Run bun run docs:ia:check. Expected: docs IA remains valid after adding or linking developer guidance.
4. Review the changed developer docs. Expected: the guidance is explicitly scoped to AgentPlane framework development and does not impose CI/PR requirements on consumer analysis or content tasks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:37:29.269Z — VERIFY — ok

By: DOCS

Note: Docs verification passed for AgentPlane dev fast local checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:33:08.819Z, excerpt_hash=sha256:6d21b3627bace88c86aa5346a01a273cd0cf40de80a222d5f603e919e663e188

Details:

Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/developer/code-quality.mdx and docs/developer/contributing.mdx. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only; Scope: task worktree. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: developer docs links. Command: bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx; Result: pass after formatting; Evidence: All matched files use Prettier code style; Scope: touched docs files.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
