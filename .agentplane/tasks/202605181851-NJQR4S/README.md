---
id: "202605181851-NJQR4S"
title: "Implement Agentplane website redesign backlog"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "frontend"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T18:52:15.247Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T19:20:22.753Z"
  updated_by: "CODER"
  note: "Implemented website redesign backlog in isolated branch_pr worktree. Verification passed: check-content, check-links with external O'Reilly HEAD 403 warning only, docs:site:typecheck, docs:site:build, policy routing, ap doctor, and browser smoke for homepage, examples, docs, quickstart, local context, traces, and blog."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved website redesign backlog from an isolated branch_pr worktree, preserving unrelated base task-file drift and keeping the milestone free of hosted, pricing, enterprise, sales, or paid-platform messaging."
events:
  -
    type: "status"
    at: "2026-05-18T18:53:03.925Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved website redesign backlog from an isolated branch_pr worktree, preserving unrelated base task-file drift and keeping the milestone free of hosted, pricing, enterprise, sales, or paid-platform messaging."
  -
    type: "verify"
    at: "2026-05-18T19:20:22.753Z"
    author: "CODER"
    state: "ok"
    note: "Implemented website redesign backlog in isolated branch_pr worktree. Verification passed: check-content, check-links with external O'Reilly HEAD 403 warning only, docs:site:typecheck, docs:site:build, policy routing, ap doctor, and browser smoke for homepage, examples, docs, quickstart, local context, traces, and blog."
doc_version: 3
doc_updated_at: "2026-05-18T19:20:22.789Z"
doc_updated_by: "CODER"
description: "Implement the public website redesign backlog across homepage, docs, README-adjacent copy, SEO/AEO metadata, design-system touches, examples, recipes, GitHub star CTA, and quality gates. Scope excludes hosted product, pricing, enterprise, sales, or paid-platform messaging."
sections:
  Summary: |-
    Implement Agentplane website redesign backlog

    Implement the public website redesign backlog across homepage, docs, README-adjacent copy, SEO/AEO metadata, design-system touches, examples, recipes, GitHub star CTA, and quality gates. Scope excludes hosted product, pricing, enterprise, sales, or paid-platform messaging.
  Scope: |-
    - In scope: Implement the public website redesign backlog across homepage, docs, README-adjacent copy, SEO/AEO metadata, design-system touches, examples, recipes, GitHub star CTA, and quality gates. Scope excludes hosted product, pricing, enterprise, sales, or paid-platform messaging.
    - Out of scope: unrelated refactors not required for "Implement Agentplane website redesign backlog".
  Plan: "Implement the final Agentplane website redesign backlog in one isolated branch_pr worktree. Scope: website homepage, navbar/footer, examples route, docs IA, concept docs, recipe docs, ACR/reference docs, README positioning, llms.txt, structured data, GitHub stars button, command copy UX, lightweight analytics hooks, and content checks. Constraints: use Agentplane brand casing for product and lowercase agentplane only for CLI/package/commands; do not add hosted product, pricing, enterprise, sales, or paid-platform messaging; preserve unrelated existing task-file drift in base checkout. Verification: run targeted content checks, docs site typecheck/build, policy routing check, agentplane doctor, and browser/static smoke where feasible."
  Verify Steps: |-
    1. Run `bun run --cwd website check-content`. Expected: site content guard passes, including brand casing and no hardcoded proof metrics.
    2. Run `bun run --cwd website check-links`. Expected: internal links pass; critical external links warn rather than fail on temporary provider blocks.
    3. Run `bun run docs:site:typecheck`. Expected: TypeScript/Docusaurus site typecheck passes.
    4. Run `bun run docs:site:build`. Expected: Docusaurus production build succeeds.
    5. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
    6. Run `ap doctor`. Expected: no errors or warnings.
    7. Browser smoke `/`, `/examples`, `/docs`, `/docs/start/quickstart`, `/docs/user/local-context`, `/docs/concepts/traces`, `/blog` on local static serve. Expected: pages render Agentplane content and no raw HTML fragments are visible.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T19:20:22.753Z — VERIFY — ok

    By: CODER

    Note: Implemented website redesign backlog in isolated branch_pr worktree. Verification passed: check-content, check-links with external O'Reilly HEAD 403 warning only, docs:site:typecheck, docs:site:build, policy routing, ap doctor, and browser smoke for homepage, examples, docs, quickstart, local context, traces, and blog.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T19:20:14.415Z, excerpt_hash=sha256:82b13657cb3df02a2655c95090ee232253304b66a1659ce9cd91c69e130f897f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181851-NJQR4S-website-redesign-backlog/.agentplane/tasks/202605181851-NJQR4S/blueprint/resolved-snapshot.json
    - old_digest: fb44c16406ed079d3b3d703ad0c22e6025fd7720438ffde687434add36632de2
    - current_digest: fb44c16406ed079d3b3d703ad0c22e6025fd7720438ffde687434add36632de2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181851-NJQR4S

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Browser screenshot capture timed out in the in-app browser, but DOM smoke verified titles, Agentplane content, navbar star text, terminal command copy, and no raw HTML fragments on key routes.
      Impact: Visual evidence is text/DOM-based rather than screenshot-based for this local run.
      Resolution: Production build and route smoke passed; external O'Reilly 403 is warning-only in link checker as designed.
id_source: "generated"
---
## Summary

Implement Agentplane website redesign backlog

Implement the public website redesign backlog across homepage, docs, README-adjacent copy, SEO/AEO metadata, design-system touches, examples, recipes, GitHub star CTA, and quality gates. Scope excludes hosted product, pricing, enterprise, sales, or paid-platform messaging.

## Scope

- In scope: Implement the public website redesign backlog across homepage, docs, README-adjacent copy, SEO/AEO metadata, design-system touches, examples, recipes, GitHub star CTA, and quality gates. Scope excludes hosted product, pricing, enterprise, sales, or paid-platform messaging.
- Out of scope: unrelated refactors not required for "Implement Agentplane website redesign backlog".

## Plan

Implement the final Agentplane website redesign backlog in one isolated branch_pr worktree. Scope: website homepage, navbar/footer, examples route, docs IA, concept docs, recipe docs, ACR/reference docs, README positioning, llms.txt, structured data, GitHub stars button, command copy UX, lightweight analytics hooks, and content checks. Constraints: use Agentplane brand casing for product and lowercase agentplane only for CLI/package/commands; do not add hosted product, pricing, enterprise, sales, or paid-platform messaging; preserve unrelated existing task-file drift in base checkout. Verification: run targeted content checks, docs site typecheck/build, policy routing check, agentplane doctor, and browser/static smoke where feasible.

## Verify Steps

1. Run `bun run --cwd website check-content`. Expected: site content guard passes, including brand casing and no hardcoded proof metrics.
2. Run `bun run --cwd website check-links`. Expected: internal links pass; critical external links warn rather than fail on temporary provider blocks.
3. Run `bun run docs:site:typecheck`. Expected: TypeScript/Docusaurus site typecheck passes.
4. Run `bun run docs:site:build`. Expected: Docusaurus production build succeeds.
5. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
6. Run `ap doctor`. Expected: no errors or warnings.
7. Browser smoke `/`, `/examples`, `/docs`, `/docs/start/quickstart`, `/docs/user/local-context`, `/docs/concepts/traces`, `/blog` on local static serve. Expected: pages render Agentplane content and no raw HTML fragments are visible.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T19:20:22.753Z — VERIFY — ok

By: CODER

Note: Implemented website redesign backlog in isolated branch_pr worktree. Verification passed: check-content, check-links with external O'Reilly HEAD 403 warning only, docs:site:typecheck, docs:site:build, policy routing, ap doctor, and browser smoke for homepage, examples, docs, quickstart, local context, traces, and blog.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T19:20:14.415Z, excerpt_hash=sha256:82b13657cb3df02a2655c95090ee232253304b66a1659ce9cd91c69e130f897f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181851-NJQR4S-website-redesign-backlog/.agentplane/tasks/202605181851-NJQR4S/blueprint/resolved-snapshot.json
- old_digest: fb44c16406ed079d3b3d703ad0c22e6025fd7720438ffde687434add36632de2
- current_digest: fb44c16406ed079d3b3d703ad0c22e6025fd7720438ffde687434add36632de2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181851-NJQR4S

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Browser screenshot capture timed out in the in-app browser, but DOM smoke verified titles, Agentplane content, navbar star text, terminal command copy, and no raw HTML fragments on key routes.
  Impact: Visual evidence is text/DOM-based rather than screenshot-based for this local run.
  Resolution: Production build and route smoke passed; external O'Reilly 403 is warning-only in link checker as designed.
