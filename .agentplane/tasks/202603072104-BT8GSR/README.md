---
id: "202603072104-BT8GSR"
title: "Refine website navbar glass and blog ordering"
result_summary: "Updated DESIGN.md for a narrow liquid-glass navbar exception, increased heading leading in docs/blog surfaces, and reordered the custom 0.3.x blog landing entries."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T21:06:14.681Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T21:09:32.080Z"
  updated_by: "CODER"
  note: "Updated the design contract to allow tightly constrained liquid-glass navbar chrome, increased heading leading across docs/blog surfaces, and reordered the 0.3.x custom blog landing entries to 0.3.0 -> 0.3.1 -> 0.3.2. Verified with docs:site:check, docs:bootstrap:check, and policy routing check."
commit:
  hash: "6c40137606337f54f4ba13c477b656518ca9a8e0"
  message: "🎨 BT8GSR website: add liquid glass navbar chrome"
comments:
  -
    author: "CODER"
    body: "Start: update the website contract and navbar chrome for a constrained liquid-glass treatment, increase heading leading, and reorder the custom 0.3.x blog landing entries."
  -
    author: "CODER"
    body: "Verified: navbar now uses a constrained liquid-glass chrome treatment, headings are looser, and the custom 0.3.x blog landing order is 0.3.0 -> 0.3.1 -> 0.3.2."
events:
  -
    type: "status"
    at: "2026-03-07T21:06:24.422Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update the website contract and navbar chrome for a constrained liquid-glass treatment, increase heading leading, and reorder the custom 0.3.x blog landing entries."
  -
    type: "verify"
    at: "2026-03-07T21:09:32.080Z"
    author: "CODER"
    state: "ok"
    note: "Updated the design contract to allow tightly constrained liquid-glass navbar chrome, increased heading leading across docs/blog surfaces, and reordered the 0.3.x custom blog landing entries to 0.3.0 -> 0.3.1 -> 0.3.2. Verified with docs:site:check, docs:bootstrap:check, and policy routing check."
  -
    type: "status"
    at: "2026-03-07T21:09:54.463Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: navbar now uses a constrained liquid-glass chrome treatment, headings are looser, and the custom 0.3.x blog landing order is 0.3.0 -> 0.3.1 -> 0.3.2."
doc_version: 3
doc_updated_at: "2026-03-07T21:09:54.463Z"
doc_updated_by: "CODER"
description: "Update DESIGN.md to allow tightly constrained liquid-glass elements, increase heading leading, add a subtle liquid-glass navbar treatment, and reorder the 0.3.x blog landing entries."
id_source: "generated"
---
## Summary

Refine website navbar glass and blog ordering

Update DESIGN.md to allow tightly constrained liquid-glass elements, increase heading leading, add a subtle liquid-glass navbar treatment, and reorder the 0.3.x blog landing entries.

## Scope

- In scope: Update DESIGN.md to allow tightly constrained liquid-glass elements, increase heading leading, add a subtle liquid-glass navbar treatment, and reorder the 0.3.x blog landing entries..
- Out of scope: unrelated refactors not required for "Refine website navbar glass and blog ordering".

## Plan

1. Update DESIGN.md to allow tightly constrained liquid-glass chrome elements and raise the target heading leading so the contract matches the intended website direction. 2. Apply the contract in website CSS by giving the navbar a subtle rectangular liquid-glass treatment with translucent white fill and by increasing heading leading in docs/blog surfaces. 3. Reorder the 0.3.x entries in the custom blog landing to place 0.3.1 between 0.3.0 and 0.3.2, then run site/design checks and close the task.

## Verify Steps

### Scope
- Primary tag: `frontend`
- Surfaces: `DESIGN.md`, website navbar chrome, heading leading on docs/blog surfaces, custom blog landing ordering.

### Checks
- `bun run docs:site:check`
- `bun run docs:bootstrap:check`
- `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record that the navbar uses the new constrained liquid-glass treatment, heading leading is visibly looser, and the custom blog landing lists `0.3`, `0.3.1`, `0.3.2` in the intended order.

### Pass criteria
- The design contract and implementation agree on a narrow liquid-glass exception, local design checks pass, and the blog landing order matches the requested release sequence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T21:09:32.080Z — VERIFY — ok

By: CODER

Note: Updated the design contract to allow tightly constrained liquid-glass navbar chrome, increased heading leading across docs/blog surfaces, and reordered the 0.3.x custom blog landing entries to 0.3.0 -> 0.3.1 -> 0.3.2. Verified with docs:site:check, docs:bootstrap:check, and policy routing check.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T21:06:24.422Z, excerpt_hash=sha256:9289c76882fca0e179734395bf815a3b15a3ebf169c66ccf4d0caf21f5253a67

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Assume the custom blog landing should present the 0.3.x line in the requested top-down order: 0.3.0, 0.3.1, 0.3.2.
- Keep the liquid-glass effect compatible with the current design checker by avoiding radius and box-shadow changes unless the checker itself is intentionally revised.

## Risks

- Risk: adding glass styling too broadly would violate the existing typography-first direction and turn the site into generic chrome-heavy UI.\n- Mitigation: constrain liquid-glass to navbar chrome only, keep it rectangular, low-contrast, and white-tinted with no decorative glow.\n\n- Risk: blog entry reordering could drift from the intended release sequence or confuse the landing section label.\n- Mitigation: keep the change local to the custom blog landing entries and preserve the rest of the page structure.
