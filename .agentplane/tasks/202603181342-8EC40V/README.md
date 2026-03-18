---
id: "202603181342-8EC40V"
title: "Refresh governance docs for current workflow"
result_summary: "Aligned contributor-facing governance docs and docs onboarding with the current task workflow and docs-site ownership model."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 25
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
  updated_at: "2026-03-18T13:50:29.775Z"
  updated_by: "DOCS"
  note: "Docs checks passed: routing, doctor, and docs site build succeeded."
commit:
  hash: "94403413fe528259840616d9e81913fe79bf92cd"
  message: "📝 8EC40V docs: align docs onboarding sources"
comments:
  -
    author: "DOCS"
    body: "Start: audit and refresh root contributor and governance docs against current CLI, workflow, and repository layout; scope limited to confirmed documentation drift in root docs; risk is low because changes are docs-only but stale commands or paths would mislead contributors."
  -
    author: "DOCS"
    body: "Verified: docs/README.md now separates canonical docs content, the Docusaurus site shell, and the docs navigation manifest; validation passed with policy routing OK and agentplane doctor OK."
  -
    author: "DOCS"
    body: "Verified: contributor-facing governance docs and docs onboarding now match the current task-driven workflow, agentplane CLI guidance, and Docusaurus-backed site layout; routing, doctor, and docs build checks passed."
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
  -
    type: "verify"
    at: "2026-03-18T13:50:29.775Z"
    author: "DOCS"
    state: "ok"
    note: "Docs checks passed: routing, doctor, and docs site build succeeded."
  -
    type: "status"
    at: "2026-03-18T13:51:02.840Z"
    author: "DOCS"
    from: "DONE"
    to: "DONE"
    note: "Verified: contributor-facing governance docs and docs onboarding now match the current task-driven workflow, agentplane CLI guidance, and Docusaurus-backed site layout; routing, doctor, and docs build checks passed."
doc_version: 3
doc_updated_at: "2026-03-18T13:51:02.841Z"
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
    
    #### 2026-03-18T13:50:29.775Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs checks passed: routing, doctor, and docs site build succeeded.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-18T13:50:10.894Z, excerpt_hash=sha256:56f744206a9fc779fab3934c63538a76c00e4d86f38b4d2a9c965b498ba754e6
    
    Details:
    
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK
      Scope: CONTRIBUTING.md, docs/README.md, docs/developer/contributing.mdx, docs/developer/documentation-information-architecture.mdx
      Links: AGENTS.md, .agentplane/policy/workflow.direct.md, .agentplane/policy/dod.docs.md
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK with zero errors and zero warnings
      Scope: CONTRIBUTING.md, docs/README.md, docs/developer/contributing.mdx, docs/developer/documentation-information-architecture.mdx
      Links: AGENTS.md
    - Command: bun run docs:site:build
      Result: pass
      Evidence: Docusaurus production build succeeded and generated static files in build/
      Scope: docs/README.md, docs/developer/contributing.mdx, docs/developer/documentation-information-architecture.mdx
      Links: website/docusaurus.config.ts
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the docs changes introduced by this task.
    - Re-run node .agentplane/policy/check-routing.mjs and agentplane doctor to confirm the repository returns to the prior docs-policy state.
    - If a reverted file was updated to remove stale commands or paths, re-check README links so contributor guidance does not point at removed content.
  Findings: |-
    - No separate SUPPORT.md was added in this task. The repository currently publishes a verified private route only for security reports at security@agentplane.dev plus public GitHub issues and PRs; adding a broader support surface without a confirmed maintainer-owned channel would create policy text that the repo cannot yet honor.
    - docs/docs.json remains in the repository, but the active public docs shell is Docusaurus under website/. This task reduced contributor-facing ambiguity without deleting the legacy metadata artifact.
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

#### 2026-03-18T13:50:29.775Z — VERIFY — ok

By: DOCS

Note: Docs checks passed: routing, doctor, and docs site build succeeded.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-18T13:50:10.894Z, excerpt_hash=sha256:56f744206a9fc779fab3934c63538a76c00e4d86f38b4d2a9c965b498ba754e6

Details:

- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK
  Scope: CONTRIBUTING.md, docs/README.md, docs/developer/contributing.mdx, docs/developer/documentation-information-architecture.mdx
  Links: AGENTS.md, .agentplane/policy/workflow.direct.md, .agentplane/policy/dod.docs.md
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK with zero errors and zero warnings
  Scope: CONTRIBUTING.md, docs/README.md, docs/developer/contributing.mdx, docs/developer/documentation-information-architecture.mdx
  Links: AGENTS.md
- Command: bun run docs:site:build
  Result: pass
  Evidence: Docusaurus production build succeeded and generated static files in build/
  Scope: docs/README.md, docs/developer/contributing.mdx, docs/developer/documentation-information-architecture.mdx
  Links: website/docusaurus.config.ts

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the docs changes introduced by this task.
- Re-run node .agentplane/policy/check-routing.mjs and agentplane doctor to confirm the repository returns to the prior docs-policy state.
- If a reverted file was updated to remove stale commands or paths, re-check README links so contributor guidance does not point at removed content.

## Findings

- No separate SUPPORT.md was added in this task. The repository currently publishes a verified private route only for security reports at security@agentplane.dev plus public GitHub issues and PRs; adding a broader support surface without a confirmed maintainer-owned channel would create policy text that the repo cannot yet honor.
- docs/docs.json remains in the repository, but the active public docs shell is Docusaurus under website/. This task reduced contributor-facing ambiguity without deleting the legacy metadata artifact.
