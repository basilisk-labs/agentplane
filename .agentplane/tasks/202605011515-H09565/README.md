---
id: "202605011515-H09565"
title: "Add AgentPlane to bradAGI awesome-cli-coding-agents"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605011515-SS66H4"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T16:06:33.341Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T16:10:12.715Z"
  updated_by: "DOCS"
  note: "External PR opened and body formatting verified."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: submitting AgentPlane to bradAGI/awesome-cli-coding-agents with CLI harness infrastructure positioning and verified PR-body formatting."
events:
  -
    type: "status"
    at: "2026-05-01T16:06:44.186Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: submitting AgentPlane to bradAGI/awesome-cli-coding-agents with CLI harness infrastructure positioning and verified PR-body formatting."
  -
    type: "verify"
    at: "2026-05-01T16:10:12.715Z"
    author: "DOCS"
    state: "ok"
    note: "External PR opened and body formatting verified."
doc_version: 3
doc_updated_at: "2026-05-01T16:10:12.724Z"
doc_updated_by: "DOCS"
description: "Submit a GitHub PR adding AgentPlane to bradAGI/awesome-cli-coding-agents under Harnesses and orchestration after verifying the current category names and formatting conventions."
sections:
  Summary: |-
    Add AgentPlane to bradAGI awesome-cli-coding-agents
    
    Submit a GitHub PR adding AgentPlane to bradAGI/awesome-cli-coding-agents under Harnesses and orchestration after verifying the current category names and formatting conventions.
  Scope: |-
    - In scope: Submit a GitHub PR adding AgentPlane to bradAGI/awesome-cli-coding-agents under Harnesses and orchestration after verifying the current category names and formatting conventions.
    - Out of scope: unrelated refactors not required for "Add AgentPlane to bradAGI awesome-cli-coding-agents".
  Plan: |-
    1. Inspect bradAGI/awesome-cli-coding-agents current README, categories, ordering, and contribution rules.
    2. Add AgentPlane under the closest Harnesses & orchestration subsection without changing unrelated entries.
    3. Use CLI-coding-agent infrastructure wording from docs/listing.md.
    4. Open the upstream GitHub PR using a body file, verify rendered body formatting, record the PR URL, and update task evidence.
  Verify Steps: |-
    1. Confirm bradAGI/awesome-cli-coding-agents has a harness/orchestration section appropriate for AgentPlane.
    2. Confirm the PR changes only the required upstream list source files.
    3. Confirm the entry positions AgentPlane as Git-native workflow control for CLI coding-agent workflows, not as another agent.
    4. Confirm upstream PR body renders as Markdown with real line breaks and includes maintainer disclosure.
    5. Record the upstream PR URL in this task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T16:10:12.715Z — VERIFY — ok
    
    By: DOCS
    
    Note: External PR opened and body formatting verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:06:44.186Z, excerpt_hash=sha256:042b281765a5e61897aaeef2990d58a61905e03ca121655068c5ebd1ea3c5591
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: bradAGI/awesome-cli-coding-agents has Harnesses & orchestration -> Agent infrastructure. Added one README entry sorted by GitHub stars after Nex (40) and before brood-box (29). Opened https://github.com/bradAGI/awesome-cli-coding-agents/pull/71 using --body-file and verified gh pr view shows real Markdown line breaks. Ran git diff --check.
      Impact: AgentPlane is positioned as Git-native workflow control for CLI coding-agent workflows, not as another coding agent.
      Resolution: Upstream PR is open and task evidence records the URL and verification.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add AgentPlane to bradAGI awesome-cli-coding-agents

Submit a GitHub PR adding AgentPlane to bradAGI/awesome-cli-coding-agents under Harnesses and orchestration after verifying the current category names and formatting conventions.

## Scope

- In scope: Submit a GitHub PR adding AgentPlane to bradAGI/awesome-cli-coding-agents under Harnesses and orchestration after verifying the current category names and formatting conventions.
- Out of scope: unrelated refactors not required for "Add AgentPlane to bradAGI awesome-cli-coding-agents".

## Plan

1. Inspect bradAGI/awesome-cli-coding-agents current README, categories, ordering, and contribution rules.
2. Add AgentPlane under the closest Harnesses & orchestration subsection without changing unrelated entries.
3. Use CLI-coding-agent infrastructure wording from docs/listing.md.
4. Open the upstream GitHub PR using a body file, verify rendered body formatting, record the PR URL, and update task evidence.

## Verify Steps

1. Confirm bradAGI/awesome-cli-coding-agents has a harness/orchestration section appropriate for AgentPlane.
2. Confirm the PR changes only the required upstream list source files.
3. Confirm the entry positions AgentPlane as Git-native workflow control for CLI coding-agent workflows, not as another agent.
4. Confirm upstream PR body renders as Markdown with real line breaks and includes maintainer disclosure.
5. Record the upstream PR URL in this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T16:10:12.715Z — VERIFY — ok

By: DOCS

Note: External PR opened and body formatting verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T16:06:44.186Z, excerpt_hash=sha256:042b281765a5e61897aaeef2990d58a61905e03ca121655068c5ebd1ea3c5591

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: bradAGI/awesome-cli-coding-agents has Harnesses & orchestration -> Agent infrastructure. Added one README entry sorted by GitHub stars after Nex (40) and before brood-box (29). Opened https://github.com/bradAGI/awesome-cli-coding-agents/pull/71 using --body-file and verified gh pr view shows real Markdown line breaks. Ran git diff --check.
  Impact: AgentPlane is positioned as Git-native workflow control for CLI coding-agent workflows, not as another coding agent.
  Resolution: Upstream PR is open and task evidence records the URL and verification.
  Promotion: incident-candidate
  Fixability: external
