---
id: "202605170957-59F5AJ"
title: "Update README header image generator"
result_summary: "Merged via PR #3818."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T09:57:52.735Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T10:14:51.825Z"
  updated_by: "CODER"
  note: "README header target verification passed for all 13 README surfaces before merge."
  attempts: 0
commit:
  hash: "c5efbe7b242023dd2133a777a7d92ab513e15eb9"
  message: "Merge pull request #3818 from basilisk-labs/task/202605170957-59F5AJ/readme-header-template"
comments:
  -
    author: "CODER"
    body: "Start: Updating the README header generator in an isolated task worktree from origin/main because the base checkout has unrelated conflicts and is behind upstream."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3818 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T09:58:50.602Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Updating the README header generator in an isolated task worktree from origin/main because the base checkout has unrelated conflicts and is behind upstream."
  -
    type: "verify"
    at: "2026-05-17T10:05:42.370Z"
    author: "CODER"
    state: "ok"
    note: "Generator-only verification passed: docs:readme-header generate/check, node syntax check, git diff whitespace check, and rendered PNG layout inspection."
  -
    type: "verify"
    at: "2026-05-17T10:10:23.576Z"
    author: "CODER"
    state: "ok"
    note: "Final layout verification passed after spacing adjustment: README header artifacts are fresh, generator syntax is valid, whitespace check passes, and rendered PNG shows larger gap between agent/plane and release text with 114px line-height."
  -
    type: "verify"
    at: "2026-05-17T10:12:15.912Z"
    author: "CODER"
    state: "ok"
    note: "Final block layout verification passed: release text is a separate bottom-anchored block, README header artifacts are fresh, generator syntax is valid, whitespace check passes, and rendered PNG keeps the bottom text offset aligned with the 52px left inset."
  -
    type: "verify"
    at: "2026-05-17T10:14:51.825Z"
    author: "CODER"
    state: "ok"
    note: "README header target verification passed for all 13 README surfaces before merge."
  -
    type: "status"
    at: "2026-05-17T11:42:00.336Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3818 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T11:42:00.344Z"
doc_updated_by: "INTEGRATOR"
description: "Update the README header image generation algorithm to use the new release header template while keeping layout stable and varying only release version plus generated release-heading text."
sections:
  Summary: |-
    Update README header image generator

    Update the README header image generation algorithm to use the new release header template while keeping layout stable and varying only release version plus generated release-heading text.
  Scope: |-
    - In scope: Update the README header image generation algorithm to use the new release header template while keeping layout stable and varying only release version plus generated release-heading text.
    - Out of scope: unrelated refactors not required for "Update README header image generator".
  Plan: |-
    1. Inspect the current README header generator and generated assets.
    2. Update only the generation algorithm/template for the new fixed layout: version and generated release-heading text remain the release-specific variables.
    3. Add or adapt overflow safeguards so generated heading text stays inside the 1421x357 text box.
    4. Regenerate README header assets and verify stale-check/test coverage.
  Verify Steps: |-
    1. Run `bun run docs:readme-header:generate`. Expected: generated SVG assets are refreshed from the new fixed header template.
    2. Run `bun run docs:readme-header:check`. Expected: README header artifacts are fresh.
    3. Run `node --check scripts/generate/generate-readme-header.mjs`. Expected: generator syntax is valid.
    4. Run `git diff --check`. Expected: no whitespace errors.
    5. Render `docs/assets/readme-headers/agentplane.svg` to PNG and inspect the layout. Expected: only version and release headline vary, text stays inside the template, with added air between logo and release text and tighter line-height.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T10:05:42.370Z — VERIFY — ok

    By: CODER

    Note: Generator-only verification passed: docs:readme-header generate/check, node syntax check, git diff whitespace check, and rendered PNG layout inspection.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T09:58:50.602Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
    - old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

    ### 2026-05-17T10:10:23.576Z — VERIFY — ok

    By: CODER

    Note: Final layout verification passed after spacing adjustment: README header artifacts are fresh, generator syntax is valid, whitespace check passes, and rendered PNG shows larger gap between agent/plane and release text with 114px line-height.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:05:42.394Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
    - old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

    ### 2026-05-17T10:12:15.912Z — VERIFY — ok

    By: CODER

    Note: Final block layout verification passed: release text is a separate bottom-anchored block, README header artifacts are fresh, generator syntax is valid, whitespace check passes, and rendered PNG keeps the bottom text offset aligned with the 52px left inset.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:10:23.597Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
    - old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

    ### 2026-05-17T10:14:51.825Z — VERIFY — ok

    By: CODER

    Note: README header target verification passed for all 13 README surfaces before merge.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:12:15.927Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
    - old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Updated scripts/generate/generate-readme-header.mjs to render the fixed white/grid header template with stable agent/plane wordmark, version label, generated release headline, 1421x357 text-box wrapping, added vertical air after the wordmark, and 114px release headline line-height. Regenerated docs/assets/header.svg and docs/assets/readme-headers/*.svg.
      Impact: README header images now change per release only through the version tag and generated headline text while keeping the visual layout stable.
      Resolution: Rendered docs/assets/readme-headers/agentplane.svg to /tmp/agentplane-readme-header-preview.png with rsvg-convert and confirmed the text stays inside the layout.

    - Observation: Adjusted release headline baseline to 571/685 within the fixed text box so the paragraph sits lower under the wordmark while preserving the template geometry.
      Impact: The generated release headline has more visual air from the logo and retains the tighter line-height requested by the user.
      Resolution: Regenerated all README header SVGs and rendered docs/assets/readme-headers/agentplane.svg to /tmp/agentplane-readme-header-preview.png for visual inspection.

    - Observation: Changed header text positioning from baseline nudging to a bottom-anchored block: bottom=728 against the grid edge, descender allowance=20, line-height=114, x=52.
      Impact: The logo and release paragraph now read as separate blocks with more vertical air, while the text bottom aligns to the requested inset rule.
      Resolution: Regenerated all header SVGs and inspected /tmp/agentplane-readme-header-preview.png.

    - Observation: Checked every README header <img src> used by README.md, package READMEs, docs READMEs, scripts, schemas, skills, and humanizer. Raw GitHub header URLs were mapped back to the repository paths they publish from.
      Impact: All generated README header references resolve to checked-in SVG files, so the new files open from every README surface.
      Resolution: One-off Node check resolved all 13 README image targets to docs/assets/readme-headers/*.svg with no missing files.
id_source: "generated"
---
## Summary

Update README header image generator

Update the README header image generation algorithm to use the new release header template while keeping layout stable and varying only release version plus generated release-heading text.

## Scope

- In scope: Update the README header image generation algorithm to use the new release header template while keeping layout stable and varying only release version plus generated release-heading text.
- Out of scope: unrelated refactors not required for "Update README header image generator".

## Plan

1. Inspect the current README header generator and generated assets.
2. Update only the generation algorithm/template for the new fixed layout: version and generated release-heading text remain the release-specific variables.
3. Add or adapt overflow safeguards so generated heading text stays inside the 1421x357 text box.
4. Regenerate README header assets and verify stale-check/test coverage.

## Verify Steps

1. Run `bun run docs:readme-header:generate`. Expected: generated SVG assets are refreshed from the new fixed header template.
2. Run `bun run docs:readme-header:check`. Expected: README header artifacts are fresh.
3. Run `node --check scripts/generate/generate-readme-header.mjs`. Expected: generator syntax is valid.
4. Run `git diff --check`. Expected: no whitespace errors.
5. Render `docs/assets/readme-headers/agentplane.svg` to PNG and inspect the layout. Expected: only version and release headline vary, text stays inside the template, with added air between logo and release text and tighter line-height.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T10:05:42.370Z — VERIFY — ok

By: CODER

Note: Generator-only verification passed: docs:readme-header generate/check, node syntax check, git diff whitespace check, and rendered PNG layout inspection.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T09:58:50.602Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
- old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

### 2026-05-17T10:10:23.576Z — VERIFY — ok

By: CODER

Note: Final layout verification passed after spacing adjustment: README header artifacts are fresh, generator syntax is valid, whitespace check passes, and rendered PNG shows larger gap between agent/plane and release text with 114px line-height.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:05:42.394Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
- old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

### 2026-05-17T10:12:15.912Z — VERIFY — ok

By: CODER

Note: Final block layout verification passed: release text is a separate bottom-anchored block, README header artifacts are fresh, generator syntax is valid, whitespace check passes, and rendered PNG keeps the bottom text offset aligned with the 52px left inset.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:10:23.597Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
- old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

### 2026-05-17T10:14:51.825Z — VERIFY — ok

By: CODER

Note: README header target verification passed for all 13 README surfaces before merge.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T10:12:15.927Z, excerpt_hash=sha256:cc2b3743dd2d245b22bc56932720e372dba8048ac95b9da20298fe9f5fe15ad1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170957-59F5AJ-readme-header-template/.agentplane/tasks/202605170957-59F5AJ/blueprint/resolved-snapshot.json
- old_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- current_digest: aadb5ce5775525492a7d2b3027147925d24efb8df4a2c578cf6a022556fd83e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170957-59F5AJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Updated scripts/generate/generate-readme-header.mjs to render the fixed white/grid header template with stable agent/plane wordmark, version label, generated release headline, 1421x357 text-box wrapping, added vertical air after the wordmark, and 114px release headline line-height. Regenerated docs/assets/header.svg and docs/assets/readme-headers/*.svg.
  Impact: README header images now change per release only through the version tag and generated headline text while keeping the visual layout stable.
  Resolution: Rendered docs/assets/readme-headers/agentplane.svg to /tmp/agentplane-readme-header-preview.png with rsvg-convert and confirmed the text stays inside the layout.

- Observation: Adjusted release headline baseline to 571/685 within the fixed text box so the paragraph sits lower under the wordmark while preserving the template geometry.
  Impact: The generated release headline has more visual air from the logo and retains the tighter line-height requested by the user.
  Resolution: Regenerated all README header SVGs and rendered docs/assets/readme-headers/agentplane.svg to /tmp/agentplane-readme-header-preview.png for visual inspection.

- Observation: Changed header text positioning from baseline nudging to a bottom-anchored block: bottom=728 against the grid edge, descender allowance=20, line-height=114, x=52.
  Impact: The logo and release paragraph now read as separate blocks with more vertical air, while the text bottom aligns to the requested inset rule.
  Resolution: Regenerated all header SVGs and inspected /tmp/agentplane-readme-header-preview.png.

- Observation: Checked every README header <img src> used by README.md, package READMEs, docs READMEs, scripts, schemas, skills, and humanizer. Raw GitHub header URLs were mapped back to the repository paths they publish from.
  Impact: All generated README header references resolve to checked-in SVG files, so the new files open from every README surface.
  Resolution: One-off Node check resolved all 13 README image targets to docs/assets/readme-headers/*.svg with no missing files.
