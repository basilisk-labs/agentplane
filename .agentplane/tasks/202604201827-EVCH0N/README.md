---
id: "202604201827-EVCH0N"
title: "Add testkit migration skill"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "skills"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T18:27:49.440Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T03:45:09.221Z"
  updated_by: "CODER"
  note: "Verified testkit migration skill content, canonical @agentplane/testkit package name, skills index entry, format check, policy routing, doctor, and package build evidence."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing testkit migration skill."
events:
  -
    type: "status"
    at: "2026-04-20T18:28:05.153Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing testkit migration skill."
  -
    type: "verify"
    at: "2026-04-21T03:45:09.221Z"
    author: "CODER"
    state: "ok"
    note: "Verified testkit migration skill content, canonical @agentplane/testkit package name, skills index entry, format check, policy routing, doctor, and package build evidence."
doc_version: 3
doc_updated_at: "2026-04-21T03:45:09.225Z"
doc_updated_by: "CODER"
description: "Add a repo-local skill for migrating tests to the canonical testkit surface and diagnosing testkit export/build-order failures."
sections:
  Summary: |-
    Add testkit migration skill
    
    Add a repo-local skill for migrating tests to the canonical testkit surface and diagnosing testkit export/build-order failures.
  Scope: |-
    - In scope: Add a repo-local skill for migrating tests to the canonical testkit surface and diagnosing testkit export/build-order failures.
    - Out of scope: unrelated refactors not required for "Add testkit migration skill".
  Plan: |-
    Plan:
    1. Add a repo-local testkit migration skill under skills/ with frontmatter metadata and guidance for @agentplane/testkit migration, export chains, build ordering, and focused verification.
    2. Update the skills index so the skill is discoverable by humans and prompt discovery.
    3. Verify with formatting and package build checks that cover testkit before agentplane.
  Verify Steps: |-
    1. Review the requested outcome for "Add testkit migration skill". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T03:45:09.221Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified testkit migration skill content, canonical @agentplane/testkit package name, skills index entry, format check, policy routing, doctor, and package build evidence.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:05.203Z, excerpt_hash=sha256:cb470e6650adcd22d89bcf214ec9e7ab482093061e07c61c458ef1aa2b9ada57
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added skills/agentplane-testkit-migration/SKILL.md and indexed it in skills/README.md.
      Impact: Agents get reusable guidance for testkit migrations, export chains, and build-order failures.
      Resolution: Checks passed: rg found no @agentplaneorg/testkit references in skills; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add testkit migration skill

Add a repo-local skill for migrating tests to the canonical testkit surface and diagnosing testkit export/build-order failures.

## Scope

- In scope: Add a repo-local skill for migrating tests to the canonical testkit surface and diagnosing testkit export/build-order failures.
- Out of scope: unrelated refactors not required for "Add testkit migration skill".

## Plan

Plan:
1. Add a repo-local testkit migration skill under skills/ with frontmatter metadata and guidance for @agentplane/testkit migration, export chains, build ordering, and focused verification.
2. Update the skills index so the skill is discoverable by humans and prompt discovery.
3. Verify with formatting and package build checks that cover testkit before agentplane.

## Verify Steps

1. Review the requested outcome for "Add testkit migration skill". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T03:45:09.221Z — VERIFY — ok

By: CODER

Note: Verified testkit migration skill content, canonical @agentplane/testkit package name, skills index entry, format check, policy routing, doctor, and package build evidence.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:05.203Z, excerpt_hash=sha256:cb470e6650adcd22d89bcf214ec9e7ab482093061e07c61c458ef1aa2b9ada57

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added skills/agentplane-testkit-migration/SKILL.md and indexed it in skills/README.md.
  Impact: Agents get reusable guidance for testkit migrations, export chains, and build-order failures.
  Resolution: Checks passed: rg found no @agentplaneorg/testkit references in skills; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build.
  Promotion: incident-candidate
  Fixability: external
