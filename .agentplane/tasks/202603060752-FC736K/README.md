---
id: "202603060752-FC736K"
title: "Redesign website blog landing"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T08:07:26.258Z"
  updated_by: "ORCHESTRATOR"
  note: "Re-approved after user-expanded scope: roadmap post public, v0.3.0 post staged as hidden draft."
verification:
  state: "ok"
  updated_at: "2026-03-06T13:20:54.055Z"
  updated_by: "CODER"
  note: "Command: git diff -- website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css website/src/css/custom.css; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Result: pass. Evidence: blog landing remains live, cleaner, and compliant with the website design contract after the visual refinement pass. Scope: blog landing and shared blog styling."
commit:
  hash: "5e89de17a561fa97595835ba2f6607746895b285"
  message: "✨ website: refine public site within design contract"
comments:
  -
    author: "CODER"
    body: "Start: redesign /blog landing, remove placeholder, and surface the first release-story post."
  -
    author: "CODER"
    body: "Verified: homepage, blog landing, content-map, docs-readiness follow-up, and the final website refinement all passed their recorded checks and now resolve the remaining open website/docs tasks without changing the DESIGN.md contract."
events:
  -
    type: "status"
    at: "2026-03-06T07:53:41.546Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: redesign /blog landing, remove placeholder, and surface the first release-story post."
  -
    type: "verify"
    at: "2026-03-06T07:56:41.611Z"
    author: "CODER"
    state: "ok"
    note: "website/typecheck and website/build passed; /blog placeholder removed and first public release post added."
  -
    type: "verify"
    at: "2026-03-06T08:09:38.043Z"
    author: "CODER"
    state: "ok"
    note: "blog now has two public posts (v0.2.25 and roadmap) plus a hidden v0.3.0 draft; repo and website checks passed."
  -
    type: "verify"
    at: "2026-03-06T13:20:54.055Z"
    author: "CODER"
    state: "ok"
    note: "Command: git diff -- website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css website/src/css/custom.css; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Result: pass. Evidence: blog landing remains live, cleaner, and compliant with the website design contract after the visual refinement pass. Scope: blog landing and shared blog styling."
  -
    type: "status"
    at: "2026-03-06T13:22:32.533Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: homepage, blog landing, content-map, docs-readiness follow-up, and the final website refinement all passed their recorded checks and now resolve the remaining open website/docs tasks without changing the DESIGN.md contract."
doc_version: 2
doc_updated_at: "2026-03-06T13:22:32.533Z"
doc_updated_by: "CODER"
description: "Replace blog placeholder with a modern landing page and surface the first release post from the previous release cycle."
id_source: "generated"
---
## Summary

Redesign website blog landing

Replace blog placeholder with a modern landing page and surface the first release post from the previous release cycle.

## Scope

- In scope: website/src/pages/blog/index.tsx, website/src/pages/blog/index.module.css, website/blog/2026-02-24-roadmap-0-5-agentplane-runner.mdx, and blog metadata/content needed to surface public posts and stage hidden drafts.
- In scope: remove the blog placeholder, promote the previous release post, make the roadmap post publicly listed, and add a hidden v0.3.0 post based on release notes.
- Out of scope: homepage redesign, docs IA changes, analytics, and unrelated repo files already modified in the worktree.

## Plan

Approved execution graph: inspect website blog implementation -> redesign custom /blog landing in website/src/pages/blog -> unhide and promote the first release-story post -> verify website build and record evidence.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan
Validate the redesigned /blog landing, confirm the roadmap article is publicly listed, and stage a hidden v0.3.0 release post based on formal release notes.

### Results
- Command: bun run typecheck
- Result: pass
- Evidence: root TypeScript build completed with no diagnostics.
- Scope: repository TypeScript project references, including website codepaths.

- Command: bun run lint:core
- Result: pass
- Evidence: eslint completed for packages and scripts with no reported violations.
- Scope: repository lint contract for source changes.

- Command: bun run test:fast
- Result: pass
- Evidence: Vitest finished with 107 passed test files and 640 passed tests.
- Scope: repository fast test suite.

- Command: bun run build
- Result: pass
- Evidence: Docusaurus generated static files in website/build; remaining warning is an upstream webpack critical-dependency notice from vscode-languageserver-types during server compilation.
- Scope: full website static build, including blog routes and MDX content.

- Command: git status --short -- website .agentplane/tasks/202603060752-FC736K
- Result: pass
- Evidence: touched website files include the public roadmap post, the public v0.2.25 post, the hidden v0.3.0 post, the blog landing updates, and the task README only.
- Scope: changed files attributable to this task within website/ plus task traceability.

- Command: git diff -- website/src/pages/blog/index.tsx website/blog/2026-02-24-roadmap-0-5-agentplane-runner.mdx website/blog/2026-02-26-release-0-2-25-safer-commits-cleaner-release-flow.mdx website/blog/2026-03-06-release-0-3-0-policy-gateway-and-release-discipline.mdx
- Result: pass
- Evidence: diff shows /blog now links to the roadmap post, roadmap is no longer unlisted, and blog content includes release posts for v0.2.25 and hidden v0.3.0.
- Scope: changed blog entry files and public/hidden visibility state.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T08:09:38.043Z — VERIFY — ok

By: CODER

Note: blog now has two public posts (v0.2.25 and roadmap) plus a hidden v0.3.0 draft; repo and website checks passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T08:09:37.562Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

#### 2026-03-06T13:20:54.055Z — VERIFY — ok

By: CODER

Note: Command: git diff -- website/src/pages/blog/index.tsx website/src/pages/blog/index.module.css website/src/css/custom.css; bun run --cwd website typecheck; bun run --cwd website build; node scripts/check-design-language.mjs. Result: pass. Evidence: blog landing remains live, cleaner, and compliant with the website design contract after the visual refinement pass. Scope: blog landing and shared blog styling.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T08:09:38.045Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
