---
id: "202604201827-GZKGE3"
title: "Add release and packaging operator skill"
result_summary: "Added repo-local release and packaging operator skill with release/package workflow guidance."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
  - "skills"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T18:27:47.242Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T03:45:08.834Z"
  updated_by: "CODER"
  note: "Verified release/operator skill content, skills index entry, package naming, format check, policy routing, doctor, and package build evidence."
commit:
  hash: "a49495728059f6890988785f20b3eba41a18fbbf"
  message: "📝 7Y2QS2 task: refresh PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: implementing release and packaging operator skill."
  -
    author: "CODER"
    body: "Verified: release/operator skill added, indexed, and checked."
events:
  -
    type: "status"
    at: "2026-04-20T18:28:03.348Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing release and packaging operator skill."
  -
    type: "verify"
    at: "2026-04-21T03:45:08.834Z"
    author: "CODER"
    state: "ok"
    note: "Verified release/operator skill content, skills index entry, package naming, format check, policy routing, doctor, and package build evidence."
  -
    type: "status"
    at: "2026-04-21T03:46:40.868Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release/operator skill added, indexed, and checked."
doc_version: 3
doc_updated_at: "2026-04-21T03:46:40.868Z"
doc_updated_by: "CODER"
description: "Add a repo-local skill that captures Agentplane release, package build ordering, npm publish, install smoke, and release recovery workflow knowledge."
sections:
  Summary: |-
    Add release and packaging operator skill
    
    Add a repo-local skill that captures Agentplane release, package build ordering, npm publish, install smoke, and release recovery workflow knowledge.
  Scope: |-
    - In scope: Add a repo-local skill that captures Agentplane release, package build ordering, npm publish, install smoke, and release recovery workflow knowledge.
    - Out of scope: unrelated refactors not required for "Add release and packaging operator skill".
  Plan: |-
    Plan:
    1. Add a repo-local release/operator skill under skills/ with frontmatter metadata and focused operational guidance for Agentplane release state, package build ordering, npm visibility, install smoke, and recovery.
    2. Update the skills index so the skill is discoverable by humans and prompt discovery.
    3. Verify with formatting and policy checks plus repository skill discovery tests.
  Verify Steps: |-
    1. Review the requested outcome for "Add release and packaging operator skill". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T03:45:08.834Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified release/operator skill content, skills index entry, package naming, format check, policy routing, doctor, and package build evidence.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:03.380Z, excerpt_hash=sha256:823e9868fb4ab6a03d897b10fcb9dac8186388eb28705a623da82af4213b1af3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added skills/agentplane-release-and-packaging-operator/SKILL.md and indexed it in skills/README.md.
      Impact: Agents get focused release/package workflow guidance without loading broad incident history.
      Resolution: Checks passed: bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add release and packaging operator skill

Add a repo-local skill that captures Agentplane release, package build ordering, npm publish, install smoke, and release recovery workflow knowledge.

## Scope

- In scope: Add a repo-local skill that captures Agentplane release, package build ordering, npm publish, install smoke, and release recovery workflow knowledge.
- Out of scope: unrelated refactors not required for "Add release and packaging operator skill".

## Plan

Plan:
1. Add a repo-local release/operator skill under skills/ with frontmatter metadata and focused operational guidance for Agentplane release state, package build ordering, npm visibility, install smoke, and recovery.
2. Update the skills index so the skill is discoverable by humans and prompt discovery.
3. Verify with formatting and policy checks plus repository skill discovery tests.

## Verify Steps

1. Review the requested outcome for "Add release and packaging operator skill". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T03:45:08.834Z — VERIFY — ok

By: CODER

Note: Verified release/operator skill content, skills index entry, package naming, format check, policy routing, doctor, and package build evidence.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:03.380Z, excerpt_hash=sha256:823e9868fb4ab6a03d897b10fcb9dac8186388eb28705a623da82af4213b1af3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added skills/agentplane-release-and-packaging-operator/SKILL.md and indexed it in skills/README.md.
  Impact: Agents get focused release/package workflow guidance without loading broad incident history.
  Resolution: Checks passed: bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build.
  Promotion: incident-candidate
  Fixability: external
