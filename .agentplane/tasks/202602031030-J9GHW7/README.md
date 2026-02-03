---
id: "202602031030-J9GHW7"
title: "Improve npm package READMEs"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs"]
verify: []
commit: { hash: "2b89660dd3ef1aa3e7bed44a5d43401c7ecd1cee", message: "🧾 V8A8XC record task metadata" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: reviewing package READMEs and drafting npm-friendly replacements." }
  - { author: "ORCHESTRATOR", body: "Verified: Updated package READMEs for agentplane and core with npm-friendly structure, install/usage, and links. Manual review only." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:52.880Z"
doc_updated_by: "agentplane"
description: "Make packages/agentplane and packages/core README.md files complete and npm-friendly with clear overview, install, usage, and links."
id_source: "generated"
---
## Summary

Refreshed package READMEs to be npm-friendly with clear overview, install, quickstart, and links.



## Scope

Update packages/agentplane/README.md and packages/core/README.md only.



## Risks

Docs could drift from CLI behavior; mitigated by linking to canonical docs and keeping commands generic.



## Verify Steps

Open both READMEs and confirm formatting, links, and referenced commands are valid for the CLI.



## Rollback Plan

Revert packages/agentplane/README.md and packages/core/README.md to the previous versions.
