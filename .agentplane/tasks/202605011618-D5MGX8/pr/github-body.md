## Summary

Refine the reusable listing submission copy so external PRs do not enumerate specific coding-agent products by default.

## Why

The product-specific examples are present in AgentPlane docs and recipes, including the Aider recipe, but that is not the best evidence standard for curated-list submissions. External list copy should avoid implying official integrations unless the target list explicitly asks for examples.

## Changes

- Updated `docs/listing.md` medium snippet, CLI-list entry, and PR body template to use `repo-local coding-agent work`.
- Added maintainer guidance to avoid enumerating specific products in external submission copy by default.
- Already updated the open external PRs:
  - https://github.com/bradAGI/awesome-cli-coding-agents/pull/71
  - https://github.com/Picrew/awesome-agent-harness/pull/4

## Verification

- `git diff --check`
- `rg -n "Claude Code, Codex, Cursor, Aider|similar coding-agent workflows|CLI coding-agent workflows" docs/listing.md` returned no matches
- Verified both external PR bodies now render with real line breaks and use `repo-local coding-agent work`
