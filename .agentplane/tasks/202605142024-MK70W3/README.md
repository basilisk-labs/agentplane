---
id: "202605142024-MK70W3"
title: "Refresh homepage navigation and Basilisk-style feature sections (issue #3767)"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
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
  updated_at: "2026-05-14T20:24:31.422Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T20:34:09.165Z"
  updated_by: "CODER"
  note: "Implemented issue #3767: navbar exposes Recipes, Blueprints, ACR, Blog, Docs, and Context; homepage uses a Basilisk-style bento presentation with one docs-linked feature section per menu surface; local checks and browser smoke passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing issue #3767 in the dedicated branch_pr worktree by updating navbar, homepage content, Basilisk-style presentation layout, and website verification."
events:
  -
    type: "status"
    at: "2026-05-14T20:24:59.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing issue #3767 in the dedicated branch_pr worktree by updating navbar, homepage content, Basilisk-style presentation layout, and website verification."
  -
    type: "verify"
    at: "2026-05-14T20:34:09.165Z"
    author: "CODER"
    state: "ok"
    note: "Implemented issue #3767: navbar exposes Recipes, Blueprints, ACR, Blog, Docs, and Context; homepage uses a Basilisk-style bento presentation with one docs-linked feature section per menu surface; local checks and browser smoke passed."
doc_version: 3
doc_updated_at: "2026-05-14T20:34:09.175Z"
doc_updated_by: "CODER"
description: "Update AgentPlane website navbar and homepage to expose Recipes, Blueprints, ACR, Blog, Docs, and Context, using basilisk-labs.com as the visual reference and adding docs-linked presentation sections for each surface. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3767"
sections:
  Summary: |-
    Refresh homepage navigation and Basilisk-style feature sections (issue #3767)

    Update AgentPlane website navbar and homepage to expose Recipes, Blueprints, ACR, Blog, Docs, and Context, using basilisk-labs.com as the visual reference and adding docs-linked presentation sections for each surface. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3767
  Scope: |-
    - In scope: Update AgentPlane website navbar and homepage to expose Recipes, Blueprints, ACR, Blog, Docs, and Context, using basilisk-labs.com as the visual reference and adding docs-linked presentation sections for each surface. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3767.
    - Out of scope: unrelated refactors not required for "Refresh homepage navigation and Basilisk-style feature sections (issue #3767)".
  Plan: |-
    Scope:
    1. Update the Docusaurus navbar to expose exactly the requested primary surfaces: Recipes, Blueprints, ACR, Blog, Docs, and Context, keeping install/GitHub CTAs secondary.
    2. Rebuild the homepage around the basilisk-labs.com presentation model: bento grid, liquid-glass editorial panels, lattice/background technical motif, restrained local navigation.
    3. Add one homepage presentation section for each navbar surface, each explaining the value and linking to the relevant docs/blog target.
    4. Remove or avoid duplicate/fragile GitHub button behavior if it causes visual or console regressions in the redesigned navbar.
    5. Verify with formatting/lint, docs IA/onboarding, Docusaurus build, and browser smoke at desktop/mobile widths.

    Approved outside-repo input:
    - Read-only reference use of sibling repository /Users/densmirnov/Github/basilisk-labs.com, explicitly approved by the user.

    Files expected in scope:
    - website/docusaurus.config.ts
    - website/src/data/homepage-content.ts
    - website/src/pages/index.tsx
    - website/src/pages/_home.module.css
    - website/src/theme/Root.tsx only if needed to remove nav visual regressions
    - task/PR artifacts for 202605142024-MK70W3

    Verification:
    - bun run docs:onboarding:check
    - bun run docs:ia:check
    - ./node_modules/.bin/eslint website/src/pages/index.tsx website/src/theme/Root.tsx website/docusaurus.config.ts
    - bun run --cwd website docusaurus build
    - browser smoke of the built/served homepage confirming navbar labels and six feature sections render.
  Verify Steps: |-
    1. Run `./node_modules/.bin/prettier --write website/docusaurus.config.ts website/src/data/homepage-content.ts website/src/pages/index.tsx website/src/pages/_home.module.css`. Expected: no remaining formatting drift.
    2. Run `./node_modules/.bin/eslint website/src/pages/index.tsx website/docusaurus.config.ts`. Expected: changed TS/TSX website files pass lint.
    3. Run `bun run docs:onboarding:check`. Expected: onboarding surfaces remain aligned.
    4. Run `bun run docs:ia:check`. Expected: docs IA, sidebar coverage, and path references remain aligned.
    5. Run `bun run --cwd website build`. Expected: Docusaurus production build succeeds; known webpack/localStorage warnings are acceptable if build exits 0.
    6. Serve the built site locally and run browser smoke. Expected: navbar shows Recipes, Blueprints, ACR, Blog, Docs, Context; homepage renders one presentation section for each surface without obvious desktop/mobile overlap.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T20:34:09.165Z — VERIFY — ok

    By: CODER

    Note: Implemented issue #3767: navbar exposes Recipes, Blueprints, ACR, Blog, Docs, and Context; homepage uses a Basilisk-style bento presentation with one docs-linked feature section per menu surface; local checks and browser smoke passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T20:34:01.724Z, excerpt_hash=sha256:5b8e0e9c14d57e84f6633cb3381093178aac19ad33a4f1deb9cf57c249f8daf7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142024-MK70W3-homepage-feature-nav/.agentplane/tasks/202605142024-MK70W3/blueprint/resolved-snapshot.json
    - old_digest: 5c59cf84bce023dcf9c967424487e560c98502afe9757fe5886d56833f4a39d6
    - current_digest: 5c59cf84bce023dcf9c967424487e560c98502afe9757fe5886d56833f4a39d6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605142024-MK70W3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub issue #3767 was created and added to the basilisk-labs/agentplane GitHub Project.
      Impact: Website redesign has GitHub-side traceability before implementation.
      Resolution: Linked task 202605142024-MK70W3 to issue #3767 in task title/description and branch scope.

    - Observation: Browser smoke on http://127.0.0.1:3031 confirmed the requested navbar labels and six homepage feature sections. The first run exposed a legacy GitHub Buttons console error.
      Impact: Keeping the old buttons script would leave a visible/runtime navbar regression in the redesigned surface.
      Resolution: Removed the legacy GitHub Buttons script/mobile injection from Root.tsx; the second browser open reported no console errors in Playwright output.

    - Observation: `bun run --cwd website build` succeeds with existing webpack/localStorage warnings.
      Impact: The redesigned Docusaurus homepage builds for production.
      Resolution: Warnings are retained as known non-fatal build output; no new build failure remains.

    - Observation: Commands passed: prettier write for changed website files; eslint website/src/pages/index.tsx website/docusaurus.config.ts; bun run docs:onboarding:check; bun run docs:ia:check; bun run --cwd website build; node .agentplane/policy/check-routing.mjs; ap doctor OK with unrelated pre-existing branch_pr warnings. Browser smoke at http://127.0.0.1:3031 confirmed labels/sections and no console errors after removing legacy GitHub Buttons injection.
      Impact: Website top-level navigation and homepage now match the requested product surfaces and give each surface a presentation block with a documentation/blog CTA.
      Resolution: Recorded task findings and verification evidence for task 202605142024-MK70W3.
id_source: "generated"
---
## Summary

Refresh homepage navigation and Basilisk-style feature sections (issue #3767)

Update AgentPlane website navbar and homepage to expose Recipes, Blueprints, ACR, Blog, Docs, and Context, using basilisk-labs.com as the visual reference and adding docs-linked presentation sections for each surface. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3767

## Scope

- In scope: Update AgentPlane website navbar and homepage to expose Recipes, Blueprints, ACR, Blog, Docs, and Context, using basilisk-labs.com as the visual reference and adding docs-linked presentation sections for each surface. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3767.
- Out of scope: unrelated refactors not required for "Refresh homepage navigation and Basilisk-style feature sections (issue #3767)".

## Plan

Scope:
1. Update the Docusaurus navbar to expose exactly the requested primary surfaces: Recipes, Blueprints, ACR, Blog, Docs, and Context, keeping install/GitHub CTAs secondary.
2. Rebuild the homepage around the basilisk-labs.com presentation model: bento grid, liquid-glass editorial panels, lattice/background technical motif, restrained local navigation.
3. Add one homepage presentation section for each navbar surface, each explaining the value and linking to the relevant docs/blog target.
4. Remove or avoid duplicate/fragile GitHub button behavior if it causes visual or console regressions in the redesigned navbar.
5. Verify with formatting/lint, docs IA/onboarding, Docusaurus build, and browser smoke at desktop/mobile widths.

Approved outside-repo input:
- Read-only reference use of sibling repository /Users/densmirnov/Github/basilisk-labs.com, explicitly approved by the user.

Files expected in scope:
- website/docusaurus.config.ts
- website/src/data/homepage-content.ts
- website/src/pages/index.tsx
- website/src/pages/_home.module.css
- website/src/theme/Root.tsx only if needed to remove nav visual regressions
- task/PR artifacts for 202605142024-MK70W3

Verification:
- bun run docs:onboarding:check
- bun run docs:ia:check
- ./node_modules/.bin/eslint website/src/pages/index.tsx website/src/theme/Root.tsx website/docusaurus.config.ts
- bun run --cwd website docusaurus build
- browser smoke of the built/served homepage confirming navbar labels and six feature sections render.

## Verify Steps

1. Run `./node_modules/.bin/prettier --write website/docusaurus.config.ts website/src/data/homepage-content.ts website/src/pages/index.tsx website/src/pages/_home.module.css`. Expected: no remaining formatting drift.
2. Run `./node_modules/.bin/eslint website/src/pages/index.tsx website/docusaurus.config.ts`. Expected: changed TS/TSX website files pass lint.
3. Run `bun run docs:onboarding:check`. Expected: onboarding surfaces remain aligned.
4. Run `bun run docs:ia:check`. Expected: docs IA, sidebar coverage, and path references remain aligned.
5. Run `bun run --cwd website build`. Expected: Docusaurus production build succeeds; known webpack/localStorage warnings are acceptable if build exits 0.
6. Serve the built site locally and run browser smoke. Expected: navbar shows Recipes, Blueprints, ACR, Blog, Docs, Context; homepage renders one presentation section for each surface without obvious desktop/mobile overlap.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T20:34:09.165Z — VERIFY — ok

By: CODER

Note: Implemented issue #3767: navbar exposes Recipes, Blueprints, ACR, Blog, Docs, and Context; homepage uses a Basilisk-style bento presentation with one docs-linked feature section per menu surface; local checks and browser smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T20:34:01.724Z, excerpt_hash=sha256:5b8e0e9c14d57e84f6633cb3381093178aac19ad33a4f1deb9cf57c249f8daf7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142024-MK70W3-homepage-feature-nav/.agentplane/tasks/202605142024-MK70W3/blueprint/resolved-snapshot.json
- old_digest: 5c59cf84bce023dcf9c967424487e560c98502afe9757fe5886d56833f4a39d6
- current_digest: 5c59cf84bce023dcf9c967424487e560c98502afe9757fe5886d56833f4a39d6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605142024-MK70W3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub issue #3767 was created and added to the basilisk-labs/agentplane GitHub Project.
  Impact: Website redesign has GitHub-side traceability before implementation.
  Resolution: Linked task 202605142024-MK70W3 to issue #3767 in task title/description and branch scope.

- Observation: Browser smoke on http://127.0.0.1:3031 confirmed the requested navbar labels and six homepage feature sections. The first run exposed a legacy GitHub Buttons console error.
  Impact: Keeping the old buttons script would leave a visible/runtime navbar regression in the redesigned surface.
  Resolution: Removed the legacy GitHub Buttons script/mobile injection from Root.tsx; the second browser open reported no console errors in Playwright output.

- Observation: `bun run --cwd website build` succeeds with existing webpack/localStorage warnings.
  Impact: The redesigned Docusaurus homepage builds for production.
  Resolution: Warnings are retained as known non-fatal build output; no new build failure remains.

- Observation: Commands passed: prettier write for changed website files; eslint website/src/pages/index.tsx website/docusaurus.config.ts; bun run docs:onboarding:check; bun run docs:ia:check; bun run --cwd website build; node .agentplane/policy/check-routing.mjs; ap doctor OK with unrelated pre-existing branch_pr warnings. Browser smoke at http://127.0.0.1:3031 confirmed labels/sections and no console errors after removing legacy GitHub Buttons injection.
  Impact: Website top-level navigation and homepage now match the requested product surfaces and give each surface a presentation block with a documentation/blog CTA.
  Resolution: Recorded task findings and verification evidence for task 202605142024-MK70W3.
