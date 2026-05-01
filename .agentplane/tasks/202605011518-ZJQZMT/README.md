---
id: "202605011518-ZJQZMT"
title: "Add AgentPlane to AutoJunjie awesome-agent-harness"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605011515-NKWCVZ"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T16:46:02.957Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T16:48:36.396Z"
  updated_by: "DOCS"
  note: "External AutoJunjie PR opened and body formatting verified."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: submit AgentPlane to AutoJunjie/awesome-agent-harness with repo-local coding-agent harness positioning and verified PR body formatting."
events:
  -
    type: "status"
    at: "2026-05-01T16:46:21.997Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: submit AgentPlane to AutoJunjie/awesome-agent-harness with repo-local coding-agent harness positioning and verified PR body formatting."
  -
    type: "verify"
    at: "2026-05-01T16:48:36.396Z"
    author: "DOCS"
    state: "ok"
    note: "External AutoJunjie PR opened and body formatting verified."
doc_version: 3
doc_updated_at: "2026-05-01T16:48:36.403Z"
doc_updated_by: "DOCS"
description: "Submit a GitHub PR adding AgentPlane to AutoJunjie/awesome-agent-harness as a Git-native coding-agent harness after verifying the current repository structure and list formatting."
sections:
  Summary: |-
    Add AgentPlane to AutoJunjie awesome-agent-harness
    
    Submit a GitHub PR adding AgentPlane to AutoJunjie/awesome-agent-harness as a Git-native coding-agent harness after verifying the current repository structure and list formatting.
  Scope: |-
    - In scope: Submit a GitHub PR adding AgentPlane to AutoJunjie/awesome-agent-harness as a Git-native coding-agent harness after verifying the current repository structure and list formatting.
    - Out of scope: unrelated refactors not required for "Add AgentPlane to AutoJunjie awesome-agent-harness".
  Plan: |-
    1. Inspect AutoJunjie/awesome-agent-harness current README, contribution guidance, category structure, and ordering.
    2. Add AgentPlane to the closest harness/workflow-control section using neutral repo-local coding-agent work wording.
    3. Keep upstream diff minimal and follow README/source conventions.
    4. Open the upstream PR using --body-file, verify rendered Markdown body, and record URL/evidence in the task.
  Verify Steps: |-
    1. Confirm AutoJunjie/awesome-agent-harness category placement matches coding-agent harness/workflow-control scope.
    2. Confirm upstream changes are limited to required list source files and use existing formatting/order.
    3. Confirm entry uses repo-local coding-agent work wording and does not imply official integrations with specific products.
    4. Confirm upstream PR body renders as Markdown with real line breaks and includes maintainer disclosure.
    5. Record upstream PR URL and validation commands in this task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T16:48:36.396Z — VERIFY — ok
    
    By: DOCS
    
    Note: External AutoJunjie PR opened and body formatting verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:46:21.997Z, excerpt_hash=sha256:ca876982977a236c3ecc18e0274b295154403918658e407b053c76015c247a2e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: AutoJunjie/awesome-agent-harness is README-only for this contribution. The README contribution section says new entries should be appended to the end of their category. Added AgentPlane at the end of Task Runners with repo-local coding-agent harness wording. Opened https://github.com/AutoJunjie/awesome-agent-harness/pull/16 using --body-file and verified gh pr view body renders with real Markdown line breaks. Ran git diff --check.
      Impact: AgentPlane is positioned as a Git-native workflow-control harness whose repository-local records act as system of record for coding-agent work.
      Resolution: Upstream PR is open and task evidence records category, wording, URL, and verification.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add AgentPlane to AutoJunjie awesome-agent-harness

Submit a GitHub PR adding AgentPlane to AutoJunjie/awesome-agent-harness as a Git-native coding-agent harness after verifying the current repository structure and list formatting.

## Scope

- In scope: Submit a GitHub PR adding AgentPlane to AutoJunjie/awesome-agent-harness as a Git-native coding-agent harness after verifying the current repository structure and list formatting.
- Out of scope: unrelated refactors not required for "Add AgentPlane to AutoJunjie awesome-agent-harness".

## Plan

1. Inspect AutoJunjie/awesome-agent-harness current README, contribution guidance, category structure, and ordering.
2. Add AgentPlane to the closest harness/workflow-control section using neutral repo-local coding-agent work wording.
3. Keep upstream diff minimal and follow README/source conventions.
4. Open the upstream PR using --body-file, verify rendered Markdown body, and record URL/evidence in the task.

## Verify Steps

1. Confirm AutoJunjie/awesome-agent-harness category placement matches coding-agent harness/workflow-control scope.
2. Confirm upstream changes are limited to required list source files and use existing formatting/order.
3. Confirm entry uses repo-local coding-agent work wording and does not imply official integrations with specific products.
4. Confirm upstream PR body renders as Markdown with real line breaks and includes maintainer disclosure.
5. Record upstream PR URL and validation commands in this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T16:48:36.396Z — VERIFY — ok

By: DOCS

Note: External AutoJunjie PR opened and body formatting verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:46:21.997Z, excerpt_hash=sha256:ca876982977a236c3ecc18e0274b295154403918658e407b053c76015c247a2e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: AutoJunjie/awesome-agent-harness is README-only for this contribution. The README contribution section says new entries should be appended to the end of their category. Added AgentPlane at the end of Task Runners with repo-local coding-agent harness wording. Opened https://github.com/AutoJunjie/awesome-agent-harness/pull/16 using --body-file and verified gh pr view body renders with real Markdown line breaks. Ran git diff --check.
  Impact: AgentPlane is positioned as a Git-native workflow-control harness whose repository-local records act as system of record for coding-agent work.
  Resolution: Upstream PR is open and task evidence records category, wording, URL, and verification.
  Promotion: incident-candidate
  Fixability: external
