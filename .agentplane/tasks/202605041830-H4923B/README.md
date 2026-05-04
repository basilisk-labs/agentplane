---
id: "202605041830-H4923B"
title: "Document AgentPlane dev fast local checks"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 12
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
  updated_at: "2026-05-04T18:42:18.090Z"
  updated_by: "DOCS"
  note: "Config and docs verification passed after setting require_network=false."
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
  -
    type: "verify"
    at: "2026-05-04T18:42:18.090Z"
    author: "DOCS"
    state: "ok"
    note: "Config and docs verification passed after setting require_network=false."
doc_version: 3
doc_updated_at: "2026-05-04T18:42:18.105Z"
doc_updated_by: "DOCS"
description: "Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks."
sections:
  Summary: |-
    Document AgentPlane dev fast local checks
    
    Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
  Scope: |-
    - In scope: Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
    - In scope: Set the repo-local workflow approval setting agents.approvals.require_network to false in .agentplane/WORKFLOW.md as explicitly requested by the user before publishing this branch.
    - Out of scope: blueprint implementation, consumer blueprint runtime, CI repair loop, scoped runner context, and unrelated refactors.
  Plan: |-
    1. Add developer documentation that makes bun run ci:local:fast the first local gate for AgentPlane framework development before hosted CI.
    2. Document the check tiers from cheap hygiene/runtime checks through full local and hosted/release gates, including when to escalate.
    3. Link the guidance from the contributor/developer entrypoint so future AgentPlane development tasks can discover it.
    4. Set agents.approvals.require_network to false in .agentplane/WORKFLOW.md after explicit user approval.
    5. Verify docs routing, doctor, docs IA, formatting, and resolved config, then record evidence on the task.
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
    2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
    3. Run bun run docs:ia:check. Expected: docs IA remains valid after developer docs changes.
    4. Run bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx. Expected: touched docs files are formatted.
    5. Run agentplane config show. Expected: agents.approvals.require_network resolves to false.
    6. Review changed docs and workflow config. Expected: dev fast-check guidance is scoped to AgentPlane framework development and consumer analysis/content tasks do not inherit CI or PR gates.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:37:29.269Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs verification passed for AgentPlane dev fast local checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:33:08.819Z, excerpt_hash=sha256:6d21b3627bace88c86aa5346a01a273cd0cf40de80a222d5f603e919e663e188
    
    Details:
    
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/developer/code-quality.mdx and docs/developer/contributing.mdx. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only; Scope: task worktree. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: developer docs links. Command: bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx; Result: pass after formatting; Evidence: All matched files use Prettier code style; Scope: touched docs files.
    
    ### 2026-05-04T18:42:18.090Z — VERIFY — ok
    
    By: DOCS
    
    Note: Config and docs verification passed after setting require_network=false.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:41:32.240Z, excerpt_hash=sha256:656208a81fc4e87bd9091303474c1ed994bd13d5d687bc5deef0bd612f0b3403
    
    Details:
    
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx; Result: pass; Evidence: All matched files use Prettier code style. Command: agentplane config show; Result: pass; Evidence: agents.approvals.require_network resolves to false.
    
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
- In scope: Set the repo-local workflow approval setting agents.approvals.require_network to false in .agentplane/WORKFLOW.md as explicitly requested by the user before publishing this branch.
- Out of scope: blueprint implementation, consumer blueprint runtime, CI repair loop, scoped runner context, and unrelated refactors.

## Plan

1. Add developer documentation that makes bun run ci:local:fast the first local gate for AgentPlane framework development before hosted CI.
2. Document the check tiers from cheap hygiene/runtime checks through full local and hosted/release gates, including when to escalate.
3. Link the guidance from the contributor/developer entrypoint so future AgentPlane development tasks can discover it.
4. Set agents.approvals.require_network to false in .agentplane/WORKFLOW.md after explicit user approval.
5. Verify docs routing, doctor, docs IA, formatting, and resolved config, then record evidence on the task.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
3. Run bun run docs:ia:check. Expected: docs IA remains valid after developer docs changes.
4. Run bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx. Expected: touched docs files are formatted.
5. Run agentplane config show. Expected: agents.approvals.require_network resolves to false.
6. Review changed docs and workflow config. Expected: dev fast-check guidance is scoped to AgentPlane framework development and consumer analysis/content tasks do not inherit CI or PR gates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:37:29.269Z — VERIFY — ok

By: DOCS

Note: Docs verification passed for AgentPlane dev fast local checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:33:08.819Z, excerpt_hash=sha256:6d21b3627bace88c86aa5346a01a273cd0cf40de80a222d5f603e919e663e188

Details:

Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/developer/code-quality.mdx and docs/developer/contributing.mdx. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only; Scope: task worktree. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: developer docs links. Command: bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx; Result: pass after formatting; Evidence: All matched files use Prettier code style; Scope: touched docs files.

### 2026-05-04T18:42:18.090Z — VERIFY — ok

By: DOCS

Note: Config and docs verification passed after setting require_network=false.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:41:32.240Z, excerpt_hash=sha256:656208a81fc4e87bd9091303474c1ed994bd13d5d687bc5deef0bd612f0b3403

Details:

Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime details only. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx; Result: pass; Evidence: All matched files use Prettier code style. Command: agentplane config show; Result: pass; Evidence: agents.approvals.require_network resolves to false.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
