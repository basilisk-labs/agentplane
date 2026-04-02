---
id: "202604021557-WKSE9Q"
title: "Publish v0.3.8 release blog post"
result_summary: "integrate: squash task/202604021557-WKSE9Q/release-0-3-8-0-3-9-blog"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-02T18:20:24.759Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-02T18:27:55.188Z"
  updated_by: "DOCS"
  note: "Verified: routing, doctor, docs build, and targeted landing-page lint passed for the unified 0.3.8/0.3.9 release post."
commit:
  hash: "033484e95ef053f35badc2f12e56188fc1375b4b"
  message: "🧩 WKSE9Q integrate: squash task/202604021557-WKSE9Q/release-0-3-8-0-3-9-blog"
comments:
  -
    author: "DOCS"
    body: "Start: writing one unified release-journal post for v0.3.8 and v0.3.9, updating the curated 0.3.x blog landing entry, and verifying the docs site build before integration."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604021557-WKSE9Q/pr."
events:
  -
    type: "status"
    at: "2026-04-02T18:21:14.443Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: writing one unified release-journal post for v0.3.8 and v0.3.9, updating the curated 0.3.x blog landing entry, and verifying the docs site build before integration."
  -
    type: "verify"
    at: "2026-04-02T18:27:55.188Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: routing, doctor, docs build, and targeted landing-page lint passed for the unified 0.3.8/0.3.9 release post."
  -
    type: "status"
    at: "2026-04-02T18:29:35.164Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604021557-WKSE9Q/pr."
doc_version: 3
doc_updated_at: "2026-04-02T18:29:35.170Z"
doc_updated_by: "INTEGRATOR"
description: "Add and publish a short public blog post for the v0.3.8 release, focused on preparation for the 0.4 and 0.5 lines, and update the curated blog landing."
sections:
  Summary: |-
    Publish unified v0.3.8 and v0.3.9 release blog post
    
    Add one public blog entry that treats v0.3.8 and v0.3.9 as a single release story: internal preparation for 0.4 and 0.5, the broken npm artifact in v0.3.8, and the corrective v0.3.9 publish. Update the curated blog landing so the 0.3.x release line points to that unified entry.
  Scope: |-
    - In scope: publish one public blog post that treats v0.3.8 and v0.3.9 as a single release story, centered on preparation for 0.4 and 0.5, the broken v0.3.8 npm artifact, and the corrective v0.3.9 publish; update the curated blog landing accordingly.
    - Out of scope: unrelated docs refactors, extra marketing pages, or changes to the formal release notes beyond referencing them from the blog post.
  Plan: |-
    1. Inspect the current public blog format plus the shipped v0.3.8 and v0.3.9 release notes.
    2. Rewrite the task scope from a v0.3.8-only post to one unified release-journal entry that explains v0.3.8 and v0.3.9 together, with the install failure in v0.3.8 and the corrective publish in v0.3.9 treated as one release story.
    3. Add the new post under website/blog and update the custom blog landing so the 0.3.x release line links to the unified entry instead of leaving a gap after v0.3.7.
    4. Run docs-only verification: routing check, doctor, and local website build.
    5. Publish through the normal branch_pr path and record verification evidence in the task doc.
  Verify Steps: |-
    1. Open the new post in website/blog. Expected: one published MDX entry explains v0.3.8 and v0.3.9 as a single release narrative, including the broken npm artifact and the corrective patch.
    2. Open website/src/pages/blog/index.tsx. Expected: the curated 0.3.x release block links to the new unified release entry with matching title and excerpt.
    3. Run docs-only verification commands. Expected: routing check, doctor, and local website build all pass and are recorded in the task Verification section.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - Command: `node .agentplane/policy/check-routing.mjs`
      Result: pass
      Evidence: `policy routing OK`.
      Scope: `website/blog/2026-04-03-release-0-3-8-and-0-3-9-preparing-0-4-fixing-installability.mdx`, `website/src/pages/blog/index.tsx`.
      Links: `AGENTS.md`, `.agentplane/policy/security.must.md`, `.agentplane/policy/dod.core.md`, `.agentplane/policy/workflow.branch_pr.md`, `.agentplane/policy/dod.docs.md`.
    - Command: `agentplane doctor`
      Result: pass
      Evidence: `doctor (OK)` with `errors=0 warnings=0`; only informational runtime lines remained.
      Scope: `website/blog/2026-04-03-release-0-3-8-and-0-3-9-preparing-0-4-fixing-installability.mdx`, `website/src/pages/blog/index.tsx`.
      Links: `AGENTS.md`.
    - Command: `bun run docs:site:build`
      Result: pass
      Evidence: Docusaurus generated static files in `build`.
      Scope: `website/blog/2026-04-03-release-0-3-8-and-0-3-9-preparing-0-4-fixing-installability.mdx`, `website/src/pages/blog/index.tsx`.
      Links: `website/blog`, `website/src/pages/blog/index.tsx`.
    - Command: `bunx eslint website/src/pages/blog/index.tsx`
      Result: pass
      Evidence: exit code `0` with no lint output.
      Scope: `website/src/pages/blog/index.tsx`.
      Links: `website/src/pages/blog/index.tsx`.
    
    ### 2026-04-02T18:27:55.188Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: routing, doctor, docs build, and targeted landing-page lint passed for the unified 0.3.8/0.3.9 release post.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T18:27:14.952Z, excerpt_hash=sha256:df94b39ddf3795d0aa07a877fd759b31ce729ec529bfba2595089ffadc9395a9
    
    Details:
    
    Commands run: node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:site:build; bunx eslint website/src/pages/blog/index.tsx. Note: bun run lint:website still fails in unrelated pre-existing website/src/theme files and was treated as outside this docs-only scope.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Publish unified v0.3.8 and v0.3.9 release blog post

Add one public blog entry that treats v0.3.8 and v0.3.9 as a single release story: internal preparation for 0.4 and 0.5, the broken npm artifact in v0.3.8, and the corrective v0.3.9 publish. Update the curated blog landing so the 0.3.x release line points to that unified entry.

## Scope

- In scope: publish one public blog post that treats v0.3.8 and v0.3.9 as a single release story, centered on preparation for 0.4 and 0.5, the broken v0.3.8 npm artifact, and the corrective v0.3.9 publish; update the curated blog landing accordingly.
- Out of scope: unrelated docs refactors, extra marketing pages, or changes to the formal release notes beyond referencing them from the blog post.

## Plan

1. Inspect the current public blog format plus the shipped v0.3.8 and v0.3.9 release notes.
2. Rewrite the task scope from a v0.3.8-only post to one unified release-journal entry that explains v0.3.8 and v0.3.9 together, with the install failure in v0.3.8 and the corrective publish in v0.3.9 treated as one release story.
3. Add the new post under website/blog and update the custom blog landing so the 0.3.x release line links to the unified entry instead of leaving a gap after v0.3.7.
4. Run docs-only verification: routing check, doctor, and local website build.
5. Publish through the normal branch_pr path and record verification evidence in the task doc.

## Verify Steps

1. Open the new post in website/blog. Expected: one published MDX entry explains v0.3.8 and v0.3.9 as a single release narrative, including the broken npm artifact and the corrective patch.
2. Open website/src/pages/blog/index.tsx. Expected: the curated 0.3.x release block links to the new unified release entry with matching title and excerpt.
3. Run docs-only verification commands. Expected: routing check, doctor, and local website build all pass and are recorded in the task Verification section.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- Command: `node .agentplane/policy/check-routing.mjs`
  Result: pass
  Evidence: `policy routing OK`.
  Scope: `website/blog/2026-04-03-release-0-3-8-and-0-3-9-preparing-0-4-fixing-installability.mdx`, `website/src/pages/blog/index.tsx`.
  Links: `AGENTS.md`, `.agentplane/policy/security.must.md`, `.agentplane/policy/dod.core.md`, `.agentplane/policy/workflow.branch_pr.md`, `.agentplane/policy/dod.docs.md`.
- Command: `agentplane doctor`
  Result: pass
  Evidence: `doctor (OK)` with `errors=0 warnings=0`; only informational runtime lines remained.
  Scope: `website/blog/2026-04-03-release-0-3-8-and-0-3-9-preparing-0-4-fixing-installability.mdx`, `website/src/pages/blog/index.tsx`.
  Links: `AGENTS.md`.
- Command: `bun run docs:site:build`
  Result: pass
  Evidence: Docusaurus generated static files in `build`.
  Scope: `website/blog/2026-04-03-release-0-3-8-and-0-3-9-preparing-0-4-fixing-installability.mdx`, `website/src/pages/blog/index.tsx`.
  Links: `website/blog`, `website/src/pages/blog/index.tsx`.
- Command: `bunx eslint website/src/pages/blog/index.tsx`
  Result: pass
  Evidence: exit code `0` with no lint output.
  Scope: `website/src/pages/blog/index.tsx`.
  Links: `website/src/pages/blog/index.tsx`.

### 2026-04-02T18:27:55.188Z — VERIFY — ok

By: DOCS

Note: Verified: routing, doctor, docs build, and targeted landing-page lint passed for the unified 0.3.8/0.3.9 release post.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T18:27:14.952Z, excerpt_hash=sha256:df94b39ddf3795d0aa07a877fd759b31ce729ec529bfba2595089ffadc9395a9

Details:

Commands run: node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:site:build; bunx eslint website/src/pages/blog/index.tsx. Note: bun run lint:website still fails in unrelated pre-existing website/src/theme files and was treated as outside this docs-only scope.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
