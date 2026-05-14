Task: `202605141942-R7ZZE0`
Title: Generate versioned README header images
Canonical task record: `.agentplane/tasks/202605141942-R7ZZE0/README.md`

## Summary

Generate versioned README header images

Extend the README header image generator so the current AgentPlane version produces reusable header images and package/related README files link to those generated artifacts.

## Scope

- In scope: Extend the README header image generator so the current AgentPlane version produces reusable header images and package/related README files link to those generated artifacts.
- Out of scope: unrelated refactors not required for "Generate versioned README header images".

## Verification

- State: ok
- Note:

```bash
bun run docs:readme-header:check | Result: pass | Evidence: README header artifacts are fresh for \
  v0.6.0 | Scope: generated README header SVGs and README link blocks. Command: release distribution \
  render checks | Result: pass with local credential skips for external PR checks | Evidence: \
  distribution and GHCR checks passed; Homebrew/Scoop/setup-action local checks exited \
  skipped_missing_credentials; publish workflow contract tests prove incomplete external \
  distribution fails closed. Command: bunx vitest release workflow contract tests | Result: pass | \
  Evidence: 5 files, 18 tests passed. Command: release:bun:check and release:parity | Result: pass | \
  Evidence: Bun executable assets fresh for v0.6.0; package parity 0.6.0 aligned. Command: \
  formatting, routing, doctor, SVG XML | Result: pass with pre-existing doctor warnings | Evidence: \
  Prettier/diff-check/routing/xmllint passed; doctor OK with existing shipped-task reconciliation \
  warnings.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T19:43:17.925Z
- Branch: task/202605141942-R7ZZE0/versioned-readme-headers
- Head: b9ebb6e0eb9c

```text
No changes detected.
```

</details>
