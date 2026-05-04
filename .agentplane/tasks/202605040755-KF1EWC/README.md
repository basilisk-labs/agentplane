---
id: "202605040755-KF1EWC"
title: "Fix launch README example role leakage"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "readme"
verify:
  - "rg -n -e '--owner ' -e '--by ' -e '--updated-by ' -e '--author ' README.md packages/agentplane/README.md website/src/data/homepage-content.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T07:56:25.797Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T08:09:25.981Z"
  updated_by: "DOCS"
  note: "Verified: launch punch-list branch checks passed at current PR-artifact head."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: updating public README and homepage example commands in the primary launch punch-list worktree, with included task IDs tracked in the approved plan."
events:
  -
    type: "status"
    at: "2026-05-04T07:57:07.166Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: updating public README and homepage example commands in the primary launch punch-list worktree, with included task IDs tracked in the approved plan."
  -
    type: "verify"
    at: "2026-05-04T08:07:19.427Z"
    author: "DOCS"
    state: "ok"
    note: "Public examples no longer expose concrete internal role IDs; targeted homepage import and lint passed."
  -
    type: "verify"
    at: "2026-05-04T08:09:25.981Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: launch punch-list branch checks passed at current PR-artifact head."
doc_version: 3
doc_updated_at: "2026-05-04T08:09:25.989Z"
doc_updated_by: "DOCS"
description: "Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note."
sections:
  Summary: |-
    Fix launch README example role leakage
    
    Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.
  Scope: |-
    - In scope: Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.
    - Out of scope: unrelated refactors not required for "Fix launch README example role leakage".
  Plan: "Primary batch task for launch punch-list follow-up. Included tasks: 202605040755-KF1EWC role-free public examples; 202605040755-SM1KH2 launch-day copy artifacts; 202605040756-TVF732 refreshed README header asset; 202605040756-SV9YYN ACR fixture version guard. Scope: README.md, packages/agentplane/README.md, website/src/data/homepage-content.ts, docs/launch/*.md, docs/assets/header.png, website/static/img/header.png, packages/spec/examples/acr.json, scripts/package metadata only if needed for the version guard. Verify role flag cleanup, launch files, header asset hashes, ACR example check, agentplane doctor, and policy routing."
  Verify Steps: |-
    1. rg -n -e 'CODER|DOCS|ORCHESTRATOR' README.md packages/agentplane/README.md website/src/data/homepage-content.ts returns no matches.
    2. bun run docs:site:typecheck passes.
    3. node .agentplane/policy/check-routing.mjs passes.
    4. agentplane doctor passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T08:07:19.427Z — VERIFY — ok
    
    By: DOCS
    
    Note: Public examples no longer expose concrete internal role IDs; targeted homepage import and lint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:01:44.770Z, excerpt_hash=sha256:4db061bd72b1ef4d23f9dd76ca963cc5571cada5709b8f98343db57d348090f8
    
    ### 2026-05-04T08:09:25.981Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: launch punch-list branch checks passed at current PR-artifact head.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:07:19.439Z, excerpt_hash=sha256:4db061bd72b1ef4d23f9dd76ca963cc5571cada5709b8f98343db57d348090f8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: rg -n -e 'CODER|DOCS|ORCHESTRATOR' README.md packages/agentplane/README.md website/src/data/homepage-content.ts returned no matches; node -e import('./website/src/data/homepage-content.ts') passed with module-type warning only; node_modules/.bin/eslint website/src/data/homepage-content.ts passed; bun run docs:site:typecheck passed after offline dependency materialization. Full lint:website still fails on pre-existing unrelated website files outside this change.
      Impact: T05 public-command conversion is verified; residual full website lint debt is unrelated to touched lines.
      Resolution: Keep full lint failure task-local; do not widen this launch punch-list scope.
    
    - Observation: Commands at branch head: rg concrete role IDs in public examples returned no matches; launch artifact and Discord invite/badge checks passed; bun run release:acr-example:check, spec:examples:check, docs:scripts:check, release:demo:check passed; bun run docs:site:typecheck passed; node .agentplane/policy/check-routing.mjs and agentplane doctor passed. Full lint:website and lint:core still fail on unrelated pre-existing lint debt outside touched lines; targeted eslint checks for changed TS/script files passed.
      Impact: Primary batch task is verified at current local branch head for the approved scope.
      Resolution: Do not widen scope to unrelated lint debt.
id_source: "generated"
---
## Summary

Fix launch README example role leakage

Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.

## Scope

- In scope: Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.
- Out of scope: unrelated refactors not required for "Fix launch README example role leakage".

## Plan

Primary batch task for launch punch-list follow-up. Included tasks: 202605040755-KF1EWC role-free public examples; 202605040755-SM1KH2 launch-day copy artifacts; 202605040756-TVF732 refreshed README header asset; 202605040756-SV9YYN ACR fixture version guard. Scope: README.md, packages/agentplane/README.md, website/src/data/homepage-content.ts, docs/launch/*.md, docs/assets/header.png, website/static/img/header.png, packages/spec/examples/acr.json, scripts/package metadata only if needed for the version guard. Verify role flag cleanup, launch files, header asset hashes, ACR example check, agentplane doctor, and policy routing.

## Verify Steps

1. rg -n -e 'CODER|DOCS|ORCHESTRATOR' README.md packages/agentplane/README.md website/src/data/homepage-content.ts returns no matches.
2. bun run docs:site:typecheck passes.
3. node .agentplane/policy/check-routing.mjs passes.
4. agentplane doctor passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T08:07:19.427Z — VERIFY — ok

By: DOCS

Note: Public examples no longer expose concrete internal role IDs; targeted homepage import and lint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:01:44.770Z, excerpt_hash=sha256:4db061bd72b1ef4d23f9dd76ca963cc5571cada5709b8f98343db57d348090f8

### 2026-05-04T08:09:25.981Z — VERIFY — ok

By: DOCS

Note: Verified: launch punch-list branch checks passed at current PR-artifact head.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:07:19.439Z, excerpt_hash=sha256:4db061bd72b1ef4d23f9dd76ca963cc5571cada5709b8f98343db57d348090f8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: rg -n -e 'CODER|DOCS|ORCHESTRATOR' README.md packages/agentplane/README.md website/src/data/homepage-content.ts returned no matches; node -e import('./website/src/data/homepage-content.ts') passed with module-type warning only; node_modules/.bin/eslint website/src/data/homepage-content.ts passed; bun run docs:site:typecheck passed after offline dependency materialization. Full lint:website still fails on pre-existing unrelated website files outside this change.
  Impact: T05 public-command conversion is verified; residual full website lint debt is unrelated to touched lines.
  Resolution: Keep full lint failure task-local; do not widen this launch punch-list scope.

- Observation: Commands at branch head: rg concrete role IDs in public examples returned no matches; launch artifact and Discord invite/badge checks passed; bun run release:acr-example:check, spec:examples:check, docs:scripts:check, release:demo:check passed; bun run docs:site:typecheck passed; node .agentplane/policy/check-routing.mjs and agentplane doctor passed. Full lint:website and lint:core still fail on unrelated pre-existing lint debt outside touched lines; targeted eslint checks for changed TS/script files passed.
  Impact: Primary batch task is verified at current local branch head for the approved scope.
  Resolution: Do not widen scope to unrelated lint debt.
