---
id: "202605010546-168YR1"
title: "Refresh launch landing and acquisition docs"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T06:20:49.999Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T06:25:00.886Z"
  updated_by: "CODER"
  note: "Blog listing chronological order verified locally."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: refresh the landing page, README, and recipe-oriented docs from the approved launch acquisition plan."
events:
  -
    type: "status"
    at: "2026-05-01T05:48:19.077Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh the landing page, README, and recipe-oriented docs from the approved launch acquisition plan."
  -
    type: "verify"
    at: "2026-05-01T06:03:08.110Z"
    author: "CODER"
    state: "ok"
    note: "Website acquisition landing, README, and recipe docs verified."
  -
    type: "verify"
    at: "2026-05-01T06:17:40.741Z"
    author: "CODER"
    state: "ok"
    note: "Launch landing, README, docs, recipes, and design-system alignment verified locally."
  -
    type: "verify"
    at: "2026-05-01T06:25:00.886Z"
    author: "CODER"
    state: "ok"
    note: "Blog listing chronological order verified locally."
doc_version: 3
doc_updated_at: "2026-05-01T06:25:00.894Z"
doc_updated_by: "CODER"
description: "Update the public landing page, README, and user-facing docs so AgentPlane is positioned as a Git-native workflow layer for auditable coding-agent work, with focused CTAs, demo flow, recipes, FAQ, and concise quickstart."
sections:
  Summary: |-
    Refresh launch landing and acquisition docs
    
    Update the public landing page, README, and user-facing docs so AgentPlane is positioned as a Git-native workflow layer for auditable coding-agent work, with focused CTAs, demo flow, recipes, FAQ, and concise quickstart.
  Scope: |-
    - In scope: `website/src/pages/index.tsx`, `website/src/pages/_home.module.css`, `website/src/data/homepage-content.ts`, `website/docusaurus.config.ts`, `website/sidebars.ts`, `website/src/css/custom.css` when needed for navigation/landing styling.
    - In scope: `README.md`, `docs/index.mdx`, `docs/user/overview.mdx`, `docs/user/setup.mdx`, `docs/user/workflow.mdx`, `docs/user/website-ia.mdx`, and `docs/recipes/**` for acquisition docs and concrete recipe pages.
    - In scope: generated website docs artifacts only if `docs:site:generate` requires them.
    - Out of scope: CLI/runtime behavior changes, release/publish flow changes, hosted deployment, external analytics, new third-party service integrations, and unrelated docs refactors.
  Plan: "Extend the launch landing/docs task with one blog listing update: keep the redesigned acquisition homepage/README/docs work, and update the custom blog landing so it renders the available articles as one chronological archive using Docusaurus blog metadata, with all posts on the listing page and old-to-new ordering. Verify with focused website typecheck/build/lint and policy/doctor checks."
  Verify Steps: |-
    1. `bun run docs:site:typecheck` — expected: Docusaurus/React TypeScript passes for changed website code.
    2. `bun run docs:site:build` — expected: the public site builds with the new homepage and docs links.
    3. `bun run docs:site:check:design` — expected: public site language avoids banned vague/control-plane-heavy acquisition copy.
    4. `node .agentplane/policy/check-routing.mjs` — expected: policy routing budget and module paths remain valid.
    5. `agentplane doctor` — expected: no blocking repository workflow/runtime drift.
    6. `git diff --check` — expected: no whitespace errors in changed files.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T06:03:08.110Z — VERIFY — ok
    
    By: CODER
    
    Note: Website acquisition landing, README, and recipe docs verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T05:48:19.077Z, excerpt_hash=sha256:e2f8d223a04c269ed78c935f9d1340a180ab79746892bac98e6d69fb485b75ff
    
    ### 2026-05-01T06:17:40.741Z — VERIFY — ok
    
    By: CODER
    
    Note: Launch landing, README, docs, recipes, and design-system alignment verified locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:03:08.118Z, excerpt_hash=sha256:e2f8d223a04c269ed78c935f9d1340a180ab79746892bac98e6d69fb485b75ff
    
    ### 2026-05-01T06:25:00.886Z — VERIFY — ok
    
    By: CODER
    
    Note: Blog listing chronological order verified locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:20:45.037Z, excerpt_hash=sha256:e2f8d223a04c269ed78c935f9d1340a180ab79746892bac98e6d69fb485b75ff
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task branch commits or abandon the task worktree/branch before integration.
    - If integration has landed, revert the merge commit for task `202605010546-168YR1` and rerun website/docs checks.
    - No database, secrets, or external hosted state changes are expected.
  Findings: |-
    - Observation: Command: bun run docs:site:typecheck. Result: pass after linking ignored website/node_modules to the base checkout dependencies. Evidence: tsc exited 0. Scope: changed Docusaurus/React website code.
    Command: bun run docs:site:build. Result: pass after deleting tsc-emitted website/*.js artifacts before build. Evidence: Docusaurus generated static files in build; only existing vscode-languageserver critical dependency warning remained. Scope: homepage, nav, docs, recipes.
    Command: bun run docs:site:check:design. Result: pass. Evidence: DESIGN.md compliance check passed. Scope: website source.
    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing budget.
    Command: agentplane doctor. Result: pass. Evidence: doctor OK with zero errors and zero warnings. Scope: workflow/runtime state.
    Command: git diff --check. Result: pass. Evidence: no whitespace output. Scope: changed tracked files.
    Command: bun run docs:ia:check. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Scope: new recipes docs and navigation.
    Command: bun run lint:website. Result: pass after replacing the copy handler .then chain with an async helper. Evidence: eslint website exited 0. Scope: changed website code.
      Impact: The requested landing, README, and docs changes have local type/build/design/policy/IA/lint coverage.
      Resolution: Generated build/typecheck artifacts and the temporary website/node_modules symlink were removed before final status review.
    
    - Observation: Passed: bun run docs:site:typecheck; bun run docs:site:build; bun run docs:site:check:design; bun run docs:ia:check; bun run lint:website; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check. Playwright desktop and mobile screenshots showed non-overlapping hero/header, dark terminal surfaces, and no console warnings after aligning CSS with the updated DESIGN.md guidance.
      Impact: Homepage now works as a launch-post conversion bridge to GitHub/install/docs, README and docs share the Git-native workflow-layer story, and recipes provide concrete agent-stack entry points.
      Resolution: Only local verification was performed; hosted PR/push/integration is intentionally pending because network access is approval-gated and the main checkout contains user-owned DESIGN.md changes.
    
    - Observation: Updated the custom Docusaurus blog list to derive entries from blog metadata, sort them oldest-to-newest, and render all posts on /blog via postsPerPage=ALL. Passed: bun run docs:site:typecheck; bun run docs:site:build; bun run lint:website; bun run docs:site:check:design; bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane task verify-show 202605010546-168YR1; agentplane doctor; git diff --check. Additional generated HTML assertion confirmed /blog renders 12 posts in chronological order from 2026-02-24 through 2026-04-30.
      Impact: The blog landing no longer relies on stale manually grouped arrays and now shows the current article set as one chronological archive.
      Resolution: Temporary website node_modules/build/.docusaurus artifacts were removed before commit; hosted push/PR remains approval-gated.
id_source: "generated"
---
## Summary

Refresh launch landing and acquisition docs

Update the public landing page, README, and user-facing docs so AgentPlane is positioned as a Git-native workflow layer for auditable coding-agent work, with focused CTAs, demo flow, recipes, FAQ, and concise quickstart.

## Scope

- In scope: `website/src/pages/index.tsx`, `website/src/pages/_home.module.css`, `website/src/data/homepage-content.ts`, `website/docusaurus.config.ts`, `website/sidebars.ts`, `website/src/css/custom.css` when needed for navigation/landing styling.
- In scope: `README.md`, `docs/index.mdx`, `docs/user/overview.mdx`, `docs/user/setup.mdx`, `docs/user/workflow.mdx`, `docs/user/website-ia.mdx`, and `docs/recipes/**` for acquisition docs and concrete recipe pages.
- In scope: generated website docs artifacts only if `docs:site:generate` requires them.
- Out of scope: CLI/runtime behavior changes, release/publish flow changes, hosted deployment, external analytics, new third-party service integrations, and unrelated docs refactors.

## Plan

Extend the launch landing/docs task with one blog listing update: keep the redesigned acquisition homepage/README/docs work, and update the custom blog landing so it renders the available articles as one chronological archive using Docusaurus blog metadata, with all posts on the listing page and old-to-new ordering. Verify with focused website typecheck/build/lint and policy/doctor checks.

## Verify Steps

1. `bun run docs:site:typecheck` — expected: Docusaurus/React TypeScript passes for changed website code.
2. `bun run docs:site:build` — expected: the public site builds with the new homepage and docs links.
3. `bun run docs:site:check:design` — expected: public site language avoids banned vague/control-plane-heavy acquisition copy.
4. `node .agentplane/policy/check-routing.mjs` — expected: policy routing budget and module paths remain valid.
5. `agentplane doctor` — expected: no blocking repository workflow/runtime drift.
6. `git diff --check` — expected: no whitespace errors in changed files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T06:03:08.110Z — VERIFY — ok

By: CODER

Note: Website acquisition landing, README, and recipe docs verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T05:48:19.077Z, excerpt_hash=sha256:e2f8d223a04c269ed78c935f9d1340a180ab79746892bac98e6d69fb485b75ff

### 2026-05-01T06:17:40.741Z — VERIFY — ok

By: CODER

Note: Launch landing, README, docs, recipes, and design-system alignment verified locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:03:08.118Z, excerpt_hash=sha256:e2f8d223a04c269ed78c935f9d1340a180ab79746892bac98e6d69fb485b75ff

### 2026-05-01T06:25:00.886Z — VERIFY — ok

By: CODER

Note: Blog listing chronological order verified locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:20:45.037Z, excerpt_hash=sha256:e2f8d223a04c269ed78c935f9d1340a180ab79746892bac98e6d69fb485b75ff

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task branch commits or abandon the task worktree/branch before integration.
- If integration has landed, revert the merge commit for task `202605010546-168YR1` and rerun website/docs checks.
- No database, secrets, or external hosted state changes are expected.

## Findings

- Observation: Command: bun run docs:site:typecheck. Result: pass after linking ignored website/node_modules to the base checkout dependencies. Evidence: tsc exited 0. Scope: changed Docusaurus/React website code.
Command: bun run docs:site:build. Result: pass after deleting tsc-emitted website/*.js artifacts before build. Evidence: Docusaurus generated static files in build; only existing vscode-languageserver critical dependency warning remained. Scope: homepage, nav, docs, recipes.
Command: bun run docs:site:check:design. Result: pass. Evidence: DESIGN.md compliance check passed. Scope: website source.
Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing budget.
Command: agentplane doctor. Result: pass. Evidence: doctor OK with zero errors and zero warnings. Scope: workflow/runtime state.
Command: git diff --check. Result: pass. Evidence: no whitespace output. Scope: changed tracked files.
Command: bun run docs:ia:check. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Scope: new recipes docs and navigation.
Command: bun run lint:website. Result: pass after replacing the copy handler .then chain with an async helper. Evidence: eslint website exited 0. Scope: changed website code.
  Impact: The requested landing, README, and docs changes have local type/build/design/policy/IA/lint coverage.
  Resolution: Generated build/typecheck artifacts and the temporary website/node_modules symlink were removed before final status review.

- Observation: Passed: bun run docs:site:typecheck; bun run docs:site:build; bun run docs:site:check:design; bun run docs:ia:check; bun run lint:website; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check. Playwright desktop and mobile screenshots showed non-overlapping hero/header, dark terminal surfaces, and no console warnings after aligning CSS with the updated DESIGN.md guidance.
  Impact: Homepage now works as a launch-post conversion bridge to GitHub/install/docs, README and docs share the Git-native workflow-layer story, and recipes provide concrete agent-stack entry points.
  Resolution: Only local verification was performed; hosted PR/push/integration is intentionally pending because network access is approval-gated and the main checkout contains user-owned DESIGN.md changes.

- Observation: Updated the custom Docusaurus blog list to derive entries from blog metadata, sort them oldest-to-newest, and render all posts on /blog via postsPerPage=ALL. Passed: bun run docs:site:typecheck; bun run docs:site:build; bun run lint:website; bun run docs:site:check:design; bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane task verify-show 202605010546-168YR1; agentplane doctor; git diff --check. Additional generated HTML assertion confirmed /blog renders 12 posts in chronological order from 2026-02-24 through 2026-04-30.
  Impact: The blog landing no longer relies on stale manually grouped arrays and now shows the current article set as one chronological archive.
  Resolution: Temporary website node_modules/build/.docusaurus artifacts were removed before commit; hosted push/PR remains approval-gated.
