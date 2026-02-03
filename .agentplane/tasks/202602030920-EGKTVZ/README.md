---
id: "202602030920-EGKTVZ"
title: "Fix npm publish auth in GitHub Actions"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release"]
verify: []
commit: { hash: "4b155224cb4deacab75c8377d86d2268bf90ca32", message: "🛠️ EGKTVZ fix publish auth + add release check" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: fix npm publish auth in workflow, ensure OIDC trusted publishing, add local dry-run check." }
  - { author: "ORCHESTRATOR", body: "Verified: ran bun run release:check; workflow updated to clear npm auth token before publish." }
doc_version: 2
doc_updated_at: "2026-02-03T11:52:32.875Z"
doc_updated_by: "agentplane"
description: "Ensure publish workflow uses trusted publishing (OIDC) without stale tokens; add local publish dry-run check."
id_source: "generated"
---
## Summary


Removed npm auth token usage in publish workflow and added a local release dry-run script.



Normalized task doc sections (dedupe).





## Scope


Workflow auth cleanup and local publish dry-run validation.





## Risks


Low; publish now relies on GitHub OIDC only.





## Verify Steps


1) bun run release:check\n2) GitHub Actions publish workflow runs on tag push





## Rollback Plan


Revert workflow/script changes and re-run publish with corrected auth.
