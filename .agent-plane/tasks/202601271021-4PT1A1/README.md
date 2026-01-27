---
id: "202601271021-4PT1A1"
title: "Migrate docs/ to Mintlify format"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs", "mintlify"]
comments:
  - { author: "DOCS", body: "Start: Migrating docs/ to Mintlify MDX pages + docs.json navigation and updating repo links." }
doc_version: 2
doc_updated_at: "2026-01-27T10:29:10+00:00"
doc_updated_by: "agentctl"
description: "Convert docs/ markdown to Mintlify-ready pages: add required YAML frontmatter, ensure heading hierarchy (start at H2), create Mintlify navigation config (docs/docs.json), and update internal links so the docs render correctly in Mintlify."
---
## Summary

Convert docs/ into a Mintlify-ready documentation site (MDX pages + navigation config) so the docs render correctly in Mintlify.

## Scope

- Add Mintlify navigation config at docs/docs.json\n- Create Mintlify pages under docs/*.mdx with required YAML frontmatter\n- Remove the legacy numbered docs/*.md files to avoid duplicate/slugs conflicts\n- Update repo links (README.md, ROADMAP.md) to point at the new docs paths

## Risks

- Mintlify config schema differences (docs.json vs mint.json) could require minor adjustments after import.\n- Links to repo-root files (e.g. ROADMAP.md) may need a hosted URL depending on how the Mintlify site root is configured.

## Verify Steps

- Verify docs navigation references existing pages:\n  - python -c "import json,os; cfg=json.load(open('docs/docs.json')); pages=[p for g in cfg['navigation'] for p in g['pages']]; assert all(os.path.exists(f'docs/{p}.mdx') for p in pages)"\n- Open the Mintlify preview and confirm:\n  - sidebar navigation renders\n  - each page title/description shows from frontmatter\n  - internal links resolve

## Rollback Plan

- Revert the implementation commit for this task.\n- Restore the prior docs/*.md files (or recover from git history) and remove docs/docs.json + docs/*.mdx if needed.

