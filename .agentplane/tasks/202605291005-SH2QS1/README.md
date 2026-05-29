---
id: "202605291005-SH2QS1"
title: "Fix social preview subtitle slogan"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T10:06:44.374Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T10:10:08.973Z"
  updated_by: "CODER"
  note: "Command: bun run docs:social:generate; Result: pass; Evidence: generated 203 docs social images after template change, then 0 changed on rerun. Command: bun run docs:social:check; Result: pass; Evidence: checked 203 docs social images. Command: cd website && node scripts/generate-social-images.mjs --check --strict; Result: pass; Evidence: checked 203 docs social images against regenerated PNG bytes. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bunx eslint website/scripts/generate-social-images.mjs; Result: pass. Command: git diff --check; Result: pass. Visual check: website/static/img/social/docs.png shows the full Agentplane slogan subtitle instead of a route breadcrumb."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: updating the website social preview generator subtitle slogan in the dedicated task worktree, then regenerating and verifying social image artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T10:07:05.445Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: updating the website social preview generator subtitle slogan in the dedicated task worktree, then regenerating and verifying social image artifacts."
  -
    type: "verify"
    at: "2026-05-29T10:10:08.973Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:social:generate; Result: pass; Evidence: generated 203 docs social images after template change, then 0 changed on rerun. Command: bun run docs:social:check; Result: pass; Evidence: checked 203 docs social images. Command: cd website && node scripts/generate-social-images.mjs --check --strict; Result: pass; Evidence: checked 203 docs social images against regenerated PNG bytes. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bunx eslint website/scripts/generate-social-images.mjs; Result: pass. Command: git diff --check; Result: pass. Visual check: website/static/img/social/docs.png shows the full Agentplane slogan subtitle instead of a route breadcrumb."
doc_version: 3
doc_updated_at: "2026-05-29T10:10:08.987Z"
doc_updated_by: "CODER"
description: "Update the website social preview image generator so the generated subtitle is a full new-version slogan describing how Agentplane speeds up agent work, then regenerate and verify social image artifacts."
sections:
  Summary: |-
    Fix social preview subtitle slogan

    Update the website social preview image generator so the generated subtitle is a full new-version slogan describing how Agentplane speeds up agent work, then regenerate and verify social image artifacts.
  Scope: |-
    - In scope: Update the website social preview image generator so the generated subtitle is a full new-version slogan describing how Agentplane speeds up agent work, then regenerate and verify social image artifacts.
    - Out of scope: unrelated refactors not required for "Fix social preview subtitle slogan".
  Plan: "Scope: update only the website social preview generator and its generated social image artifacts so the subtitle becomes a complete Agentplane version slogan about speeding up agent work. Steps: 1. Inspect the current SVG/text layout and manifest hashing. 2. Add a deterministic subtitle/slogan field to generated entries and render it in the card in place of the current breadcrumb subtitle area. 3. Keep route/title/section generation behavior unchanged. 4. Regenerate social images and manifest. 5. Verify social image freshness, routing policy, and focused generator behavior."
  Verify Steps: |-
    1. Run bun run docs:social:generate. Expected: generated social preview images and website/static/img/social/manifest.json are current for the new subtitle rendering.
    2. Run bun run docs:social:check. Expected: all generated docs social images exist with the expected dimensions and manifest freshness.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing and size-budget checks pass after this code/frontend task.
    4. Inspect a representative generated social image or manifest entry. Expected: the subtitle is a full Agentplane slogan about speeding up agent work, not a route breadcrumb.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T10:10:08.973Z — VERIFY — ok

    By: CODER

    Note: Command: bun run docs:social:generate; Result: pass; Evidence: generated 203 docs social images after template change, then 0 changed on rerun. Command: bun run docs:social:check; Result: pass; Evidence: checked 203 docs social images. Command: cd website && node scripts/generate-social-images.mjs --check --strict; Result: pass; Evidence: checked 203 docs social images against regenerated PNG bytes. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bunx eslint website/scripts/generate-social-images.mjs; Result: pass. Command: git diff --check; Result: pass. Visual check: website/static/img/social/docs.png shows the full Agentplane slogan subtitle instead of a route breadcrumb.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T10:09:59.965Z, excerpt_hash=sha256:6f3f39fa3b927ca57f511af944f32c0ca95496828757f2923ea62926b73994ca

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291005-SH2QS1-fix-social-preview-subtitle-slogan/.agentplane/tasks/202605291005-SH2QS1/blueprint/resolved-snapshot.json
    - old_digest: 5b2fc86405027157c5d349f5296d1b4bcfd2bb230e8555f95e3ae2f828d17670
    - current_digest: 5b2fc86405027157c5d349f5296d1b4bcfd2bb230e8555f95e3ae2f828d17670
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291005-SH2QS1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Full bun run lint:website fails on existing website-wide lint debt outside this task, while targeted bunx eslint website/scripts/generate-social-images.mjs passes after scoped generator cleanup.
      Impact: The requested social preview generator change is verified, but full website lint remains unsuitable as a task-scoped pass/fail gate until unrelated files are cleaned up.
      Resolution: Used targeted eslint for the changed generator plus docs:social freshness checks; left unrelated lint debt untouched.
id_source: "generated"
---
## Summary

Fix social preview subtitle slogan

Update the website social preview image generator so the generated subtitle is a full new-version slogan describing how Agentplane speeds up agent work, then regenerate and verify social image artifacts.

## Scope

- In scope: Update the website social preview image generator so the generated subtitle is a full new-version slogan describing how Agentplane speeds up agent work, then regenerate and verify social image artifacts.
- Out of scope: unrelated refactors not required for "Fix social preview subtitle slogan".

## Plan

Scope: update only the website social preview generator and its generated social image artifacts so the subtitle becomes a complete Agentplane version slogan about speeding up agent work. Steps: 1. Inspect the current SVG/text layout and manifest hashing. 2. Add a deterministic subtitle/slogan field to generated entries and render it in the card in place of the current breadcrumb subtitle area. 3. Keep route/title/section generation behavior unchanged. 4. Regenerate social images and manifest. 5. Verify social image freshness, routing policy, and focused generator behavior.

## Verify Steps

1. Run bun run docs:social:generate. Expected: generated social preview images and website/static/img/social/manifest.json are current for the new subtitle rendering.
2. Run bun run docs:social:check. Expected: all generated docs social images exist with the expected dimensions and manifest freshness.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing and size-budget checks pass after this code/frontend task.
4. Inspect a representative generated social image or manifest entry. Expected: the subtitle is a full Agentplane slogan about speeding up agent work, not a route breadcrumb.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T10:10:08.973Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:social:generate; Result: pass; Evidence: generated 203 docs social images after template change, then 0 changed on rerun. Command: bun run docs:social:check; Result: pass; Evidence: checked 203 docs social images. Command: cd website && node scripts/generate-social-images.mjs --check --strict; Result: pass; Evidence: checked 203 docs social images against regenerated PNG bytes. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bunx eslint website/scripts/generate-social-images.mjs; Result: pass. Command: git diff --check; Result: pass. Visual check: website/static/img/social/docs.png shows the full Agentplane slogan subtitle instead of a route breadcrumb.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T10:09:59.965Z, excerpt_hash=sha256:6f3f39fa3b927ca57f511af944f32c0ca95496828757f2923ea62926b73994ca

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291005-SH2QS1-fix-social-preview-subtitle-slogan/.agentplane/tasks/202605291005-SH2QS1/blueprint/resolved-snapshot.json
- old_digest: 5b2fc86405027157c5d349f5296d1b4bcfd2bb230e8555f95e3ae2f828d17670
- current_digest: 5b2fc86405027157c5d349f5296d1b4bcfd2bb230e8555f95e3ae2f828d17670
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291005-SH2QS1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Full bun run lint:website fails on existing website-wide lint debt outside this task, while targeted bunx eslint website/scripts/generate-social-images.mjs passes after scoped generator cleanup.
  Impact: The requested social preview generator change is verified, but full website lint remains unsuitable as a task-scoped pass/fail gate until unrelated files are cleaned up.
  Resolution: Used targeted eslint for the changed generator plus docs:social freshness checks; left unrelated lint debt untouched.
