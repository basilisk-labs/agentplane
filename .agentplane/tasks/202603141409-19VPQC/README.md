---
id: "202603141409-19VPQC"
title: "Publish the v0.3.7 release article"
result_summary: "Published and verified the v0.3.7 release article for the docs site."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 8
depends_on:
  - "202603141409-ZMR686"
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T14:10:00.803Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T18:10:27.764Z"
  updated_by: "DOCS"
  note: "Verified: bun run --cwd website typecheck; bun run --cwd website build. The article is based only on docs/releases/v0.3.7, GitHub release v0.3.7, successful Docs CI/Pages Deploy, successful Publish to npm, and npm registry versions 0.3.7."
commit:
  hash: "2a62237056a5b2ba45bcc1a206184b24b2db123c"
  message: "📝 19VPQC docs: publish v0.3.7 release article"
comments:
  -
    author: "DOCS"
    body: "Start: inspect the shipped release notes and recent website/blog release posts, write the v0.3.7 release article with only confirmed publication facts and shipped behavior, run the smallest blog/docs checks, and publish it through the standard docs deploy path."
  -
    author: "DOCS"
    body: "Verified: website typecheck and build passed; the v0.3.7 release article records only shipped facts confirmed by the release notes, GitHub Release, Pages deploy, and npm publication."
events:
  -
    type: "status"
    at: "2026-03-14T18:07:52.590Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the shipped release notes and recent website/blog release posts, write the v0.3.7 release article with only confirmed publication facts and shipped behavior, run the smallest blog/docs checks, and publish it through the standard docs deploy path."
  -
    type: "verify"
    at: "2026-03-14T18:10:27.764Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: bun run --cwd website typecheck; bun run --cwd website build. The article is based only on docs/releases/v0.3.7, GitHub release v0.3.7, successful Docs CI/Pages Deploy, successful Publish to npm, and npm registry versions 0.3.7."
  -
    type: "status"
    at: "2026-03-14T18:12:51.604Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: website typecheck and build passed; the v0.3.7 release article records only shipped facts confirmed by the release notes, GitHub Release, Pages deploy, and npm publication."
doc_version: 3
doc_updated_at: "2026-03-14T18:12:51.607Z"
doc_updated_by: "DOCS"
description: "Write and publish the public blog article for AgentPlane 0.3.7 after the patch release is confirmed on npm, using the final release notes and compatibility conclusions as the source of truth."
sections:
  Summary: |-
    Publish the v0.3.7 release article
    
    Write and publish the public blog article for AgentPlane 0.3.7 after the patch release is confirmed on npm, using the final release notes and compatibility conclusions as the source of truth.
  Scope: |-
    - In scope: Write and publish the public blog article for AgentPlane 0.3.7 after the patch release is confirmed on npm, using the final release notes and compatibility conclusions as the source of truth.
    - Out of scope: unrelated refactors not required for "Publish the v0.3.7 release article".
  Plan: "Plan: after release task 202603141409-ZMR686 is DONE and npm publication is confirmed, write website/blog/2026-03-14-release-0-3-7-*.mdx summarizing the patch release in plain language, link back to docs/releases/v0.3.7, run targeted docs-site checks, and publish the article in the public blog flow."
  Verify Steps: |-
    1. Run `bun run --cwd website typecheck`. Expected: the website TypeScript surface still passes after adding the release post.
    2. Run `bun run --cwd website build`. Expected: the Docusaurus site builds successfully and includes the new post without MDX/frontmatter errors.
    3. Review the published release evidence against the article copy. Expected: the article mentions only facts already confirmed by docs/releases/v0.3.7, GitHub Release v0.3.7, successful Pages Deploy, successful Publish to npm, and npm registry versions 0.3.7.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T18:10:27.764Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: bun run --cwd website typecheck; bun run --cwd website build. The article is based only on docs/releases/v0.3.7, GitHub release v0.3.7, successful Docs CI/Pages Deploy, successful Publish to npm, and npm registry versions 0.3.7.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T18:10:19.103Z, excerpt_hash=sha256:d9a3ceb46f2fa480f5023b667e2bf2fa9293ccbbcbacb2d06249711f8ebaa234
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Facts:
    - The shipped release notes live at docs/releases/v0.3.7.md and the GitHub release v0.3.7 is published.
    - npm registry now serves agentplane=0.3.7 and @agentplaneorg/core=0.3.7.
    - Docs CI 23093272193 and Pages Deploy 23093296457 both succeeded after the release push.
    - The new public article is website/blog/2026-03-14-release-0-3-7-legacy-recovery-redmine-and-safer-publish.mdx and summarizes only those confirmed release facts.
    
    Inference:
    - Publishing the article requires only the normal docs deploy path; no separate runtime or release mutation is needed beyond committing the blog file.
    
    Residual risk:
    - None beyond the ordinary follow-up close commit for this docs task.
id_source: "generated"
---
## Summary

Publish the v0.3.7 release article

Write and publish the public blog article for AgentPlane 0.3.7 after the patch release is confirmed on npm, using the final release notes and compatibility conclusions as the source of truth.

## Scope

- In scope: Write and publish the public blog article for AgentPlane 0.3.7 after the patch release is confirmed on npm, using the final release notes and compatibility conclusions as the source of truth.
- Out of scope: unrelated refactors not required for "Publish the v0.3.7 release article".

## Plan

Plan: after release task 202603141409-ZMR686 is DONE and npm publication is confirmed, write website/blog/2026-03-14-release-0-3-7-*.mdx summarizing the patch release in plain language, link back to docs/releases/v0.3.7, run targeted docs-site checks, and publish the article in the public blog flow.

## Verify Steps

1. Run `bun run --cwd website typecheck`. Expected: the website TypeScript surface still passes after adding the release post.
2. Run `bun run --cwd website build`. Expected: the Docusaurus site builds successfully and includes the new post without MDX/frontmatter errors.
3. Review the published release evidence against the article copy. Expected: the article mentions only facts already confirmed by docs/releases/v0.3.7, GitHub Release v0.3.7, successful Pages Deploy, successful Publish to npm, and npm registry versions 0.3.7.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T18:10:27.764Z — VERIFY — ok

By: DOCS

Note: Verified: bun run --cwd website typecheck; bun run --cwd website build. The article is based only on docs/releases/v0.3.7, GitHub release v0.3.7, successful Docs CI/Pages Deploy, successful Publish to npm, and npm registry versions 0.3.7.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T18:10:19.103Z, excerpt_hash=sha256:d9a3ceb46f2fa480f5023b667e2bf2fa9293ccbbcbacb2d06249711f8ebaa234

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Facts:
- The shipped release notes live at docs/releases/v0.3.7.md and the GitHub release v0.3.7 is published.
- npm registry now serves agentplane=0.3.7 and @agentplaneorg/core=0.3.7.
- Docs CI 23093272193 and Pages Deploy 23093296457 both succeeded after the release push.
- The new public article is website/blog/2026-03-14-release-0-3-7-legacy-recovery-redmine-and-safer-publish.mdx and summarizes only those confirmed release facts.

Inference:
- Publishing the article requires only the normal docs deploy path; no separate runtime or release mutation is needed beyond committing the blog file.

Residual risk:
- None beyond the ordinary follow-up close commit for this docs task.
