---
id: "202605031315-90VFV9"
title: "Revise repo public surfaces from CMO audit"
result_summary: "Merged via PR #819."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "meta"
  - "positioning"
  - "public-surface"
verify:
  - "bun run docs:site:build"
  - "bun run docs:site:typecheck"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T13:15:57.053Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:49:41.466Z"
  updated_by: "REVIEWER"
  note: "Primary public-surface revision task verified after all dependent leaves completed and final coherence review passed. Evidence includes scoped commits for README/package docs, quickstart, website, comparison/manifesto/LLM discovery, package metadata, visual assets, blog, and final review."
commit:
  hash: "91060f1a610ea99eedc8c5f187cd691098410638"
  message: "Merge pull request #819 from basilisk-labs/task/202605031315-90VFV9/cmo-public-surface-revision"
comments:
  -
    author: "CODER"
    body: "Start: record the approved CMO public-surface task graph in the dedicated branch worktree before implementation."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #819 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T13:21:58.363Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: record the approved CMO public-surface task graph in the dedicated branch worktree before implementation."
  -
    type: "verify"
    at: "2026-05-03T13:49:41.466Z"
    author: "REVIEWER"
    state: "ok"
    note: "Primary public-surface revision task verified after all dependent leaves completed and final coherence review passed. Evidence includes scoped commits for README/package docs, quickstart, website, comparison/manifesto/LLM discovery, package metadata, visual assets, blog, and final review."
  -
    type: "status"
    at: "2026-05-03T14:06:02.489Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #819 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T14:06:02.493Z"
doc_updated_by: "INTEGRATOR"
description: "Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations."
sections:
  Summary: |-
    Revise repo public surfaces from CMO audit
    
    Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.
  Scope: |-
    - In scope: Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.
    - Out of scope: unrelated refactors not required for "Revise repo public surfaces from CMO audit".
  Plan: |-
    Primary batch plan for repo-owned CMO audit work.
    
    Facts from audit that map directly to repository code/artifacts:
    1. README and package README surfaces need one public message, a pain anchor, useful badges, visual proof, reduced role taxonomy, and clearer recipes/comparison hooks.
    2. CLI onboarding has a code-level gap: quickstart/first-win should produce a safe fake-task payoff that can support the demo promise.
    3. Website repo files need aligned homepage copy, Docusaurus metadata, webmanifest color/description, social metadata, comparison route, recipes route, and why-now/manifesto surface.
    4. LLM discovery files need aligned llms.txt and llms-full generation/freshness behavior.
    5. package.json descriptions and keywords need discovery-oriented wording for agentplane/core/recipes without doing a breaking namespace migration in this batch.
    6. Repo-owned assets need demo/social-card artifacts or a documented generation path wired into README/site references.
    7. Website blog needs a reader-grade 0.4.2/recipes/trust companion post.
    8. Final review must reject unverified external claims and keep EDITORIAL.md constraints intact.
    
    Out of repo-code scope: HN/Product Hunt/Reddit cadence, influencer DMs, Discord/Twitter account setup, GitHub sidebar/topics/Discussions toggles, external awesome-list PRs, paid/sponsor decisions, and live launch-day operations.
    
    Execution order:
    1. 202605031315-ZN8594 README/package README positioning.
    2. 202605031315-Z0PECQ quickstart first-win demo path.
    3. 202605031315-GPW9P5 website homepage and metadata.
    4. 202605031315-E9WZ3G comparison/manifesto/LLM discovery docs.
    5. 202605031315-VZ15JW package discovery metadata.
    6. 202605031315-8R3SRX visual proof and social assets.
    7. 202605031315-HZQGRZ reader-grade release/recipes blog post.
    8. 202605031315-6DPX1F coherence review.
    
    Use one related-task batch worktree owned by this primary task because the repo-owned public surfaces must land coherently in one PR rather than teaching multiple competing messages.
  Verify Steps: |-
    1. Review the requested outcome for "Revise repo public surfaces from CMO audit". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:49:41.466Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Primary public-surface revision task verified after all dependent leaves completed and final coherence review passed. Evidence includes scoped commits for README/package docs, quickstart, website, comparison/manifesto/LLM discovery, package metadata, visual assets, blog, and final review.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:21:58.363Z, excerpt_hash=sha256:eea0ee5d9bff8de0dfafef29c29cac4979974119d2ff4b3a68ab7231b498acfe
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Protected main prevented local integrate and created a protected-base handoff route; GitHub PR merge plus Task Hosted Close is required for final branch_pr closure.
      Impact: The task branch is ready for PR publication and protected-base merge review.
      Resolution: Open/update the GitHub PR for task/202605031315-90VFV9/cmo-public-surface-revision, then use hosted close after merge.
id_source: "generated"
---
## Summary

Revise repo public surfaces from CMO audit

Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.

## Scope

- In scope: Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.
- Out of scope: unrelated refactors not required for "Revise repo public surfaces from CMO audit".

## Plan

Primary batch plan for repo-owned CMO audit work.

Facts from audit that map directly to repository code/artifacts:
1. README and package README surfaces need one public message, a pain anchor, useful badges, visual proof, reduced role taxonomy, and clearer recipes/comparison hooks.
2. CLI onboarding has a code-level gap: quickstart/first-win should produce a safe fake-task payoff that can support the demo promise.
3. Website repo files need aligned homepage copy, Docusaurus metadata, webmanifest color/description, social metadata, comparison route, recipes route, and why-now/manifesto surface.
4. LLM discovery files need aligned llms.txt and llms-full generation/freshness behavior.
5. package.json descriptions and keywords need discovery-oriented wording for agentplane/core/recipes without doing a breaking namespace migration in this batch.
6. Repo-owned assets need demo/social-card artifacts or a documented generation path wired into README/site references.
7. Website blog needs a reader-grade 0.4.2/recipes/trust companion post.
8. Final review must reject unverified external claims and keep EDITORIAL.md constraints intact.

Out of repo-code scope: HN/Product Hunt/Reddit cadence, influencer DMs, Discord/Twitter account setup, GitHub sidebar/topics/Discussions toggles, external awesome-list PRs, paid/sponsor decisions, and live launch-day operations.

Execution order:
1. 202605031315-ZN8594 README/package README positioning.
2. 202605031315-Z0PECQ quickstart first-win demo path.
3. 202605031315-GPW9P5 website homepage and metadata.
4. 202605031315-E9WZ3G comparison/manifesto/LLM discovery docs.
5. 202605031315-VZ15JW package discovery metadata.
6. 202605031315-8R3SRX visual proof and social assets.
7. 202605031315-HZQGRZ reader-grade release/recipes blog post.
8. 202605031315-6DPX1F coherence review.

Use one related-task batch worktree owned by this primary task because the repo-owned public surfaces must land coherently in one PR rather than teaching multiple competing messages.

## Verify Steps

1. Review the requested outcome for "Revise repo public surfaces from CMO audit". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:49:41.466Z — VERIFY — ok

By: REVIEWER

Note: Primary public-surface revision task verified after all dependent leaves completed and final coherence review passed. Evidence includes scoped commits for README/package docs, quickstart, website, comparison/manifesto/LLM discovery, package metadata, visual assets, blog, and final review.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:21:58.363Z, excerpt_hash=sha256:eea0ee5d9bff8de0dfafef29c29cac4979974119d2ff4b3a68ab7231b498acfe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Protected main prevented local integrate and created a protected-base handoff route; GitHub PR merge plus Task Hosted Close is required for final branch_pr closure.
  Impact: The task branch is ready for PR publication and protected-base merge review.
  Resolution: Open/update the GitHub PR for task/202605031315-90VFV9/cmo-public-surface-revision, then use hosted close after merge.
