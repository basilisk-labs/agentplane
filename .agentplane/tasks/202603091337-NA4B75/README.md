---
id: "202603091337-NA4B75"
title: "Rewrite README opening as category-and-value-first surface"
result_summary: "Rewrote the README opening into a category-and-value-first acquisition surface for the current release."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202603091337-6WRTM4"
tags:
  - "docs"
  - "positioning"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T13:39:56.794Z"
  updated_by: "ORCHESTRATOR"
  note: "Opening rewrite approved: category/value first, release-truthful, no framework-first top screen."
verification:
  state: "ok"
  updated_at: "2026-03-09T13:41:17.007Z"
  updated_by: "REVIEWER"
  note: "Command: read the first screen of README.md; Result: pass; Evidence: the opening now names AgentPlane, states the category phrase, explains local CLI + git repository scope, and makes approvals/task state/verification/closure visible before internal doctrine. Scope: top-screen acquisition messaging. Command: compare the opening against README.md context plus docs/user/overview.mdx, docs/user/workflow.mdx, docs/user/commands.mdx, and website/CONTENT.md; Result: pass; Evidence: the new language stays faithful to the current release and does not add hosted-runtime or assistant-platform claims. Scope: release-truthful positioning. Command: inspect the top section for internal doctrine; Result: pass; Evidence: role taxonomy and harness engineering no longer carry the first-screen explanation. Scope: readability and positioning discipline."
commit:
  hash: "b7655893814ffc31c705ffcf56b6532e19f1061b"
  message: "📝 NA4B75 readme: lead with category and value"
comments:
  -
    author: "DOCS"
    body: "Start: rewriting the README opening so the first screen immediately explains category, local runtime, trust model, and governed git workflow without depending on internal doctrine."
  -
    author: "DOCS"
    body: "Verified: the README first screen now makes the product category, local runtime, trust model, and governed git workflow legible without depending on framework-first language or role taxonomy."
events:
  -
    type: "status"
    at: "2026-03-09T13:39:57.933Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: rewriting the README opening so the first screen immediately explains category, local runtime, trust model, and governed git workflow without depending on internal doctrine."
  -
    type: "verify"
    at: "2026-03-09T13:41:17.007Z"
    author: "REVIEWER"
    state: "ok"
    note: "Command: read the first screen of README.md; Result: pass; Evidence: the opening now names AgentPlane, states the category phrase, explains local CLI + git repository scope, and makes approvals/task state/verification/closure visible before internal doctrine. Scope: top-screen acquisition messaging. Command: compare the opening against README.md context plus docs/user/overview.mdx, docs/user/workflow.mdx, docs/user/commands.mdx, and website/CONTENT.md; Result: pass; Evidence: the new language stays faithful to the current release and does not add hosted-runtime or assistant-platform claims. Scope: release-truthful positioning. Command: inspect the top section for internal doctrine; Result: pass; Evidence: role taxonomy and harness engineering no longer carry the first-screen explanation. Scope: readability and positioning discipline."
  -
    type: "status"
    at: "2026-03-09T13:41:25.813Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: the README first screen now makes the product category, local runtime, trust model, and governed git workflow legible without depending on framework-first language or role taxonomy."
doc_version: 3
doc_updated_at: "2026-03-09T13:41:25.813Z"
doc_updated_by: "DOCS"
description: "Rewrite the top section of README.md so the first screen clearly explains what AgentPlane is, where it runs, why teams trust it, and what workflow it governs, without leading with internal doctrine."
id_source: "generated"
---
## Summary

Rewrite README opening as category-and-value-first surface

Rewrite the top section of README.md so the first screen clearly explains what AgentPlane is, where it runs, why teams trust it, and what workflow it governs, without leading with internal doctrine.

## Scope

- In scope: Rewrite the top section of README.md so the first screen clearly explains what AgentPlane is, where it runs, why teams trust it, and what workflow it governs, without leading with internal doctrine.
- Out of scope: unrelated refactors not required for "Rewrite README opening as category-and-value-first surface".

## Plan

1. Replace the current title, tagline, and opening paragraph so the first screen leads with product category, where it runs, why teams trust it, and the governed git workflow promise.
2. Keep the visible top section truthful to the current release by grounding every sentence in local CLI behavior, repo-native artifacts, approvals, verification, and workflow modes already documented in the repo.
3. Re-read only the top screen after editing and confirm it no longer depends on role taxonomy, framework-speak, or harness doctrine to explain what the product is.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T13:41:17.007Z — VERIFY — ok

By: REVIEWER

Note: Command: read the first screen of README.md; Result: pass; Evidence: the opening now names AgentPlane, states the category phrase, explains local CLI + git repository scope, and makes approvals/task state/verification/closure visible before internal doctrine. Scope: top-screen acquisition messaging. Command: compare the opening against README.md context plus docs/user/overview.mdx, docs/user/workflow.mdx, docs/user/commands.mdx, and website/CONTENT.md; Result: pass; Evidence: the new language stays faithful to the current release and does not add hosted-runtime or assistant-platform claims. Scope: release-truthful positioning. Command: inspect the top section for internal doctrine; Result: pass; Evidence: role taxonomy and harness engineering no longer carry the first-screen explanation. Scope: readability and positioning discipline.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:39:57.933Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
