# PR Review

Created: 2026-05-14T19:43:17.925Z

## Task

- Task: `202605141942-R7ZZE0`
- Title: Generate versioned README header images
- Status: DOING
- Branch: `task/202605141942-R7ZZE0/versioned-readme-headers`
- Canonical task record: `.agentplane/tasks/202605141942-R7ZZE0/README.md`

## Verification

- State: ok
- Note: Command: bun run docs:readme-header:check | Result: pass | Evidence: README header artifacts are fresh for v0.6.0 | Scope: generated README header SVGs and README link blocks. Command: release distribution render checks | Result: pass with local credential skips for external PR checks | Evidence: distribution and GHCR checks passed; Homebrew/Scoop/setup-action local checks exited skipped_missing_credentials; publish workflow contract tests prove incomplete external distribution fails closed. Command: bunx vitest release workflow contract tests | Result: pass | Evidence: 5 files, 18 tests passed. Command: release:bun:check and release:parity | Result: pass | Evidence: Bun executable assets fresh for v0.6.0; package parity 0.6.0 aligned. Command: formatting, routing, doctor, SVG XML | Result: pass with pre-existing doctor warnings | Evidence: Prettier/diff-check/routing/xmllint passed; doctor OK with existing shipped-task reconciliation warnings.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T19:51:02.380Z
- Branch: task/202605141942-R7ZZE0/versioned-readme-headers
- Head: c5f30af05486

```text
 .../blueprint/resolved-snapshot.json               | 416 +++++++++++++++++++++
 README.md                                          |   2 +-
 docs/README.md                                     |   4 +
 docs/adr/README.md                                 |   4 +
 docs/assets/header.svg                             |  10 +-
 docs/assets/readme-headers/adr.svg                 |  23 ++
 docs/assets/readme-headers/agentplane-cli.svg      |  23 ++
 docs/assets/readme-headers/agentplane.svg          |  23 ++
 docs/assets/readme-headers/core.svg                |  23 ++
 docs/assets/readme-headers/docs.svg                |  23 ++
 docs/assets/readme-headers/humanizer.svg           |  23 ++
 docs/assets/readme-headers/recipes.svg             |  23 ++
 docs/assets/readme-headers/releases.svg            |  23 ++
 docs/assets/readme-headers/schemas.svg             |  23 ++
 docs/assets/readme-headers/scripts.svg             |  23 ++
 docs/assets/readme-headers/skills.svg              |  23 ++
 docs/assets/readme-headers/spec.svg                |  23 ++
 docs/assets/readme-headers/testkit.svg             |  23 ++
 docs/releases/README.md                            |   4 +
 packages/agentplane/README.md                      |   2 +-
 .../src/shared/builtin-assets.generated.ts         |   6 +-
 packages/core/README.md                            |   4 +
 packages/recipes/README.md                         |   4 +
 packages/spec/README.md                            |   4 +
 packages/testkit/README.md                         |   4 +
 schemas/README.md                                  |   4 +
 scripts/README.md                                  |   4 +
 scripts/generate/generate-readme-header.mjs        | 193 +++++++++-
 skills/README.md                                   |   4 +
 skills/humanizer/README.md                         |   4 +
 30 files changed, 948 insertions(+), 24 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
