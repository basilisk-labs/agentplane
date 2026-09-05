Task: `202608221228-T3GR9X`
Title: Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already revie...
Canonical task record: `.agentplane/tasks/202608221228-T3GR9X/README.md`

## Summary

Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.

Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.

## Scope

- In scope: Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.
- Out of scope: unrelated refactors not required for "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T12:32:07.817Z
- Branch: task/202608221228-T3GR9X/prepare-and-publish-v0-7-8-from-exact-main-ee460
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/releases/v0.7.8.md                            | 475 +++++++++++++++++++++
 website/static/img/social/docs/releases/v0.7.8.png | Bin 0 -> 53352 bytes
 website/static/img/social/manifest.json            |   8 +
 17 files changed, 511 insertions(+), 28 deletions(-)
```

</details>
