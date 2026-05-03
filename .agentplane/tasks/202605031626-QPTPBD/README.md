---
id: "202605031626-QPTPBD"
title: "ACR docs examples and release gates"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031626-83YQTA"
  - "202605031626-ZN55PB"
tags:
  - "docs"
verify:
  - "agentplane doctor"
  - "bun run docs:cli:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:28:31.788Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:22:17.230Z"
  updated_by: "DOCS"
  note: "Command: bun run docs:cli:check. Result: pass. Evidence: CLI reference is up to date. Scope: generated ACR commands and finish --no-write-acr docs. Command: bunx prettier --check changed ACR docs and CLI reference. Result: pass. Evidence: all matched files use Prettier code style. Scope: docs formatting. Command: rg -n 'Agent Change Record|ACR|planned|opt-in|when .*lands' docs/user docs/developer -g '*.mdx'. Result: pass by review. Evidence: remaining planned hits are unrelated roadmap/eval or title text; ACR docs describe active behavior. Scope: ACR docs drift."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document the shipped ACR v0.1 behavior, examples, configuration defaults, generated CLI reference, and release-gate expectations from confirmed runtime output."
events:
  -
    type: "status"
    at: "2026-05-03T17:12:20.443Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the shipped ACR v0.1 behavior, examples, configuration defaults, generated CLI reference, and release-gate expectations from confirmed runtime output."
  -
    type: "verify"
    at: "2026-05-03T17:22:17.230Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun run docs:cli:check. Result: pass. Evidence: CLI reference is up to date. Scope: generated ACR commands and finish --no-write-acr docs. Command: bunx prettier --check changed ACR docs and CLI reference. Result: pass. Evidence: all matched files use Prettier code style. Scope: docs formatting. Command: rg -n 'Agent Change Record|ACR|planned|opt-in|when .*lands' docs/user docs/developer -g '*.mdx'. Result: pass by review. Evidence: remaining planned hits are unrelated roadmap/eval or title text; ACR docs describe active behavior. Scope: ACR docs drift."
doc_version: 3
doc_updated_at: "2026-05-03T17:22:17.255Z"
doc_updated_by: "DOCS"
description: "Update AgentPlane user and developer documentation for ACR, generated CLI reference, examples/fixtures, and release verification gates. Document automatic finish export, optional PR requirement policy, README plus ACR parallel evidence model, and privacy limits."
sections:
  Summary: |-
    ACR docs examples and release gates
    
    Update AgentPlane user and developer documentation for ACR, generated CLI reference, examples/fixtures, and release verification gates. Document automatic finish export, optional PR requirement policy, README plus ACR parallel evidence model, and privacy limits.
  Scope: |-
    - In scope: Update AgentPlane user and developer documentation for ACR, generated CLI reference, examples/fixtures, and release verification gates. Document automatic finish export, optional PR requirement policy, README plus ACR parallel evidence model, and privacy limits.
    - Out of scope: unrelated refactors not required for "ACR docs examples and release gates".
  Plan: "Plan: (1) Update user and developer docs for ACR v0.1 implementation. (2) Regenerate CLI reference from command specs. (3) Add examples/fixtures that explain README plus ACR parallel evidence model, automatic finish export, optional PR check enforcement, and privacy boundaries. (4) Run docs CLI freshness, policy routing, and doctor checks."
  Verify Steps: |-
    1. Review the requested outcome for "ACR docs examples and release gates". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:22:17.230Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: bun run docs:cli:check. Result: pass. Evidence: CLI reference is up to date. Scope: generated ACR commands and finish --no-write-acr docs. Command: bunx prettier --check changed ACR docs and CLI reference. Result: pass. Evidence: all matched files use Prettier code style. Scope: docs formatting. Command: rg -n 'Agent Change Record|ACR|planned|opt-in|when .*lands' docs/user docs/developer -g '*.mdx'. Result: pass by review. Evidence: remaining planned hits are unrelated roadmap/eval or title text; ACR docs describe active behavior. Scope: ACR docs drift.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:20.443Z, excerpt_hash=sha256:659a936db0bae31502bf403a46dfde33ef84530122d8eaef897e4645dab73609
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR docs examples and release gates

Update AgentPlane user and developer documentation for ACR, generated CLI reference, examples/fixtures, and release verification gates. Document automatic finish export, optional PR requirement policy, README plus ACR parallel evidence model, and privacy limits.

## Scope

- In scope: Update AgentPlane user and developer documentation for ACR, generated CLI reference, examples/fixtures, and release verification gates. Document automatic finish export, optional PR requirement policy, README plus ACR parallel evidence model, and privacy limits.
- Out of scope: unrelated refactors not required for "ACR docs examples and release gates".

## Plan

Plan: (1) Update user and developer docs for ACR v0.1 implementation. (2) Regenerate CLI reference from command specs. (3) Add examples/fixtures that explain README plus ACR parallel evidence model, automatic finish export, optional PR check enforcement, and privacy boundaries. (4) Run docs CLI freshness, policy routing, and doctor checks.

## Verify Steps

1. Review the requested outcome for "ACR docs examples and release gates". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:22:17.230Z — VERIFY — ok

By: DOCS

Note: Command: bun run docs:cli:check. Result: pass. Evidence: CLI reference is up to date. Scope: generated ACR commands and finish --no-write-acr docs. Command: bunx prettier --check changed ACR docs and CLI reference. Result: pass. Evidence: all matched files use Prettier code style. Scope: docs formatting. Command: rg -n 'Agent Change Record|ACR|planned|opt-in|when .*lands' docs/user docs/developer -g '*.mdx'. Result: pass by review. Evidence: remaining planned hits are unrelated roadmap/eval or title text; ACR docs describe active behavior. Scope: ACR docs drift.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T17:12:20.443Z, excerpt_hash=sha256:659a936db0bae31502bf403a46dfde33ef84530122d8eaef897e4645dab73609

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
