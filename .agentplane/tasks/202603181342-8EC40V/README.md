---
id: "202603181342-8EC40V"
title: "Refresh governance docs for current workflow"
result_summary: "Clarified docs-site ownership and navigation model in docs/README.md without touching other files."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 21
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-18T13:43:13.977Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-18T13:46:19.455Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/README.md. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), findings=0; Scope: docs/README.md."
commit:
  hash: "b2f640c26b33324c8ec4c18716a8a21adb4b4243"
  message: "📝 docs: clarify docs site layout"
comments:
  -
    author: "DOCS"
    body: "Start: audit and refresh root contributor and governance docs against current CLI, workflow, and repository layout; scope limited to confirmed documentation drift in root docs; risk is low because changes are docs-only but stale commands or paths would mislead contributors."
  -
    author: "DOCS"
    body: "Verified: docs/README.md now separates canonical docs content, the Docusaurus site shell, and the docs navigation manifest; validation passed with policy routing OK and agentplane doctor OK."
events:
  -
    type: "status"
    at: "2026-03-18T13:43:57.343Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: audit and refresh root contributor and governance docs against current CLI, workflow, and repository layout; scope limited to confirmed documentation drift in root docs; risk is low because changes are docs-only but stale commands or paths would mislead contributors."
  -
    type: "verify"
    at: "2026-03-18T13:45:13.465Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/README.md; Links: docs/README.md, docs/developer/documentation-information-architecture.mdx, docs/user/website-ia.mdx. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), findings=0; Scope: docs/README.md; Links: docs/README.md."
  -
    type: "verify"
    at: "2026-03-18T13:45:18.729Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: workflow doctor check ok with findings=0. Scope: CONTRIBUTING.md updated to current task-driven workflow; CODE_OF_CONDUCT.md and SECURITY.md verified unchanged because no confirmed drift was found."
  -
    type: "status"
    at: "2026-03-18T13:46:03.427Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs/README.md now separates canonical docs content, the Docusaurus site shell, and the docs navigation manifest; validation passed with policy routing OK and agentplane doctor OK."
  -
    type: "verify"
    at: "2026-03-18T13:46:06.326Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: workflow doctor check ok with findings=0. Scope: CONTRIBUTING.md updated to current task-driven workflow; CODE_OF_CONDUCT.md and SECURITY.md verified unchanged because no confirmed drift was found."
  -
    type: "verify"
    at: "2026-03-18T13:46:19.455Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/README.md. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), findings=0; Scope: docs/README.md."
doc_version: 3
doc_updated_at: "2026-03-18T13:46:19.458Z"
doc_updated_by: "DOCS"
description: "Audit root governance/community docs against the current AgentPlane repository state and update stale guidance."
sections:
  Summary: |-
    Refresh governance docs for current workflow
    
    Audit root governance/community docs against the current AgentPlane repository state and update stale guidance.
  Scope: |-
    - In scope: root contributor and governance docs that describe how people should work with this repository now, especially README-linked files such as CONTRIBUTING.md, CODE_OF_CONDUCT.md, and SECURITY.md when drift is confirmed.
    - In scope: aligning contributor-facing commands and process language with the current agentplane task lifecycle, workflow modes, docs layout, and verification expectations.
    - Out of scope: behavior changes, policy-tree edits under .agentplane/policy, release-note edits, or broad docs rewrites outside the identified root files unless needed to keep links and statements consistent.
  Plan: "Scope: audit root governance/community docs for current repo reality, focusing on README-linked policy files and contributor-facing guidance. Steps: compare README/CONTRIBUTING/CODE_OF_CONDUCT/SECURITY against AGENTS.md, current CLI help, docs source layout, and package scripts; update stale files; run docs-policy verification; record evidence and close with traceable commit metadata. Constraints: no network, no outside-repo access, no changes outside approved docs scope unless drift is explicitly re-approved."
  Verify Steps: |-
    1. Compare docs/README.md against docs/index.mdx, docs/docs.json, website/docusaurus.config.ts, docs/developer/documentation-information-architecture.mdx, and docs/user/website-ia.mdx. Expected: the page clearly distinguishes canonical docs content, the docs site shell, and the docs navigation manifest.
    2. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
    3. Run agentplane doctor. Expected: workspace invariants pass with no docs-policy drift.
  Verification: |-
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK
      Scope: docs/README.md
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor (OK), findings=0
      Scope: docs/README.md
    
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-18T13:46:19.455Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/README.md. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), findings=0; Scope: docs/README.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-18T13:46:19.359Z, excerpt_hash=sha256:56f744206a9fc779fab3934c63538a76c00e4d86f38b4d2a9c965b498ba754e6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the docs changes introduced by this task.
    - Re-run node .agentplane/policy/check-routing.mjs and agentplane doctor to confirm the repository returns to the prior docs-policy state.
    - If a reverted file was updated to remove stale commands or paths, re-check README links so contributor guidance does not point at removed content.
  Findings: "No additional findings."
id_source: "generated"
---
## Summary

Refresh governance docs for current workflow

Audit root governance/community docs against the current AgentPlane repository state and update stale guidance.

## Scope

- In scope: root contributor and governance docs that describe how people should work with this repository now, especially README-linked files such as CONTRIBUTING.md, CODE_OF_CONDUCT.md, and SECURITY.md when drift is confirmed.
- In scope: aligning contributor-facing commands and process language with the current agentplane task lifecycle, workflow modes, docs layout, and verification expectations.
- Out of scope: behavior changes, policy-tree edits under .agentplane/policy, release-note edits, or broad docs rewrites outside the identified root files unless needed to keep links and statements consistent.

## Plan

Scope: audit root governance/community docs for current repo reality, focusing on README-linked policy files and contributor-facing guidance. Steps: compare README/CONTRIBUTING/CODE_OF_CONDUCT/SECURITY against AGENTS.md, current CLI help, docs source layout, and package scripts; update stale files; run docs-policy verification; record evidence and close with traceable commit metadata. Constraints: no network, no outside-repo access, no changes outside approved docs scope unless drift is explicitly re-approved.

## Verify Steps

1. Compare docs/README.md against docs/index.mdx, docs/docs.json, website/docusaurus.config.ts, docs/developer/documentation-information-architecture.mdx, and docs/user/website-ia.mdx. Expected: the page clearly distinguishes canonical docs content, the docs site shell, and the docs navigation manifest.
2. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
3. Run agentplane doctor. Expected: workspace invariants pass with no docs-policy drift.

## Verification

- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK
  Scope: docs/README.md
- Command: agentplane doctor
  Result: pass
  Evidence: doctor (OK), findings=0
  Scope: docs/README.md

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-18T13:46:19.455Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: docs/README.md. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), findings=0; Scope: docs/README.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-18T13:46:19.359Z, excerpt_hash=sha256:56f744206a9fc779fab3934c63538a76c00e4d86f38b4d2a9c965b498ba754e6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the docs changes introduced by this task.
- Re-run node .agentplane/policy/check-routing.mjs and agentplane doctor to confirm the repository returns to the prior docs-policy state.
- If a reverted file was updated to remove stale commands or paths, re-check README links so contributor guidance does not point at removed content.

## Findings

No additional findings.
