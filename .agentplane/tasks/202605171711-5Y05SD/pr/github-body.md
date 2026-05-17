Task: `202605171711-5Y05SD`
Title: Improve local quality-check feedback loops
Canonical task record: `.agentplane/tasks/202605171711-5Y05SD/README.md`

## Summary

Improve local quality-check feedback loops

Make local quality checks more deterministic and faster after profiling lint, format, test, build, and docs checks; add targeted/profile commands and reduce write side effects in check scripts.

## Scope

- In scope: Make local quality checks more deterministic and faster after profiling lint, format, test, build, and docs checks; add targeted/profile commands and reduce write side effects in check scripts.
- Out of scope: unrelated refactors not required for "Improve local quality-check feedback loops".

## Verification

- State: ok
- Note:

```text
Implemented deterministic local quality feedback-loop scripts and read-only docs-site checks.
Verification passed: profile smoke, format:changed, docs:site:check with unchanged tracked status,
typecheck/build via profile, lint:core, targeted script lint, test:critical, git diff --check,
policy routing. Residual: lint:website has pre-existing type-aware website errors outside this
change.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:25:03.188Z
- Branch: task/202605171711-5Y05SD/quality-feedback-loops
- Head: 934f75695833

```text
 .../blueprint/resolved-snapshot.json               | 550 +++++++++++++++++++++
 eslint.config.cjs                                  |  16 +
 package.json                                       |   6 +-
 scripts/README.md                                  |  45 +-
 scripts/checks/check-changed-format.mjs            | 105 ++++
 scripts/checks/profile-local-quality.mjs           | 166 +++++++
 scripts/generate/generate-llms-full.mjs            |  22 +-
 scripts/generate/generate-website-docs.mjs         |  24 +-
 website/package.json                               |   3 +-
 website/scripts/generate-social-images.mjs         |  55 ++-
 .../developer/cloud-backend-integration-plan.png   | Bin 0 -> 56567 bytes
 .../img/social/docs/developer/harness-dev.png      | Bin 0 -> 52193 bytes
 .../img/social/docs/developer/local-context.png    | Bin 0 -> 50283 bytes
 .../social/docs/internal/git-mutation-model.png    | Bin 0 -> 47484 bytes
 .../static/img/social/docs/launch/checklist.png    | Bin 0 -> 41127 bytes
 website/static/img/social/docs/launch/hn.png       | Bin 0 -> 34240 bytes
 website/static/img/social/docs/launch/reddit.png   | Bin 0 -> 38735 bytes
 website/static/img/social/docs/launch/twitter.png  | Bin 0 -> 38656 bytes
 website/static/img/social/docs/releases/v0.4.4.png | Bin 0 -> 40105 bytes
 .../img/social/docs/releases/v0.5.0-rc.1.png       | Bin 0 -> 44257 bytes
 website/static/img/social/docs/releases/v0.5.0.png | Bin 0 -> 41491 bytes
 website/static/img/social/docs/releases/v0.6.0.png | Bin 0 -> 41815 bytes
 website/static/img/social/docs/releases/v0.6.1.png | Bin 0 -> 40783 bytes
 .../static/img/social/docs/user/backends/cloud.png | Bin 0 -> 45323 bytes
 .../static/img/social/docs/user/local-context.png  | Bin 0 -> 43019 bytes
 website/static/llms-full.txt                       |  34 +-
 26 files changed, 994 insertions(+), 32 deletions(-)
```

</details>
