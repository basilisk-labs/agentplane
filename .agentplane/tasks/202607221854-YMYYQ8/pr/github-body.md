Task: `202607221854-YMYYQ8`
Title: Publish the AgentPlane 0.7 architecture and migration guide
Canonical task record: `.agentplane/tasks/202607221854-YMYYQ8/README.md`

## Summary

Publish the AgentPlane 0.7 architecture and migration guide

Document the final CLI-versus-agent responsibility boundary, WorkOrder/SemanticResult/Receipt contracts, supervisor flows, knowledge lifecycle, authority model, compatibility window, migration, metrics, and operator recovery.

## Scope

- In scope: user/developer reference, architecture diagrams, contract/version tables, direct and branch_pr supervised flows, context/retrieval behavior, approval/sandbox model, migration/rollback, deprecations, metrics interpretation, recovery, changelog/roadmap, and generated CLI/schema surfaces.
- Out of scope: documenting unshipped behavior or using internal report claims without executable proof.

## Verification

- State: ok
- Note:

```text
Verified documentation and migration package after evaluator rework: standalone bun run
docs:site:generate:check passed with generated reference and llms-full both fresh; agentplane doctor
completed OK with 0 errors. Previously recorded gates remain green: docs:cli:check, schemas:check,
docs:ia:check, policy routing, typescript:toolchain:check, 90 focused
contract/supervisor/work-order/receipt tests, docs:site:check including production build/design,
docs:social:check 221/221, package:install-smoke migration matrix 8 scenarios plus local tarball
smoke, format:check and git diff checks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T23:23:00.326Z
- Branch: task/202607221854-YMYYQ8/publish-the-agentplane-0-7-architecture-and-migr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ROADMAP.md                                         |  33 ++--
 docs/README.md                                     |   3 +
 docs/developer/architecture.mdx                    | 175 +++++++++++++++++-
 docs/developer/local-context.mdx                   |  13 +-
 docs/developer/testing-and-quality.mdx             |  16 ++
 docs/index.mdx                                     |   2 +
 docs/releases/index.mdx                            |   4 +
 docs/user/breaking-changes.mdx                     |  21 ++-
 docs/user/commands.mdx                             |  34 ++--
 docs/user/local-context.mdx                        |  17 +-
 docs/user/setup.mdx                                |   7 +-
 docs/user/task-lifecycle.mdx                       |  27 +++
 docs/user/v0-7-migration.mdx                       | 200 +++++++++++++++++++++
 website/docusaurus.config.ts                       |   4 +
 website/sidebars.ts                                |   1 +
 .../static/img/social/docs/user/v0-7-migration.png | Bin 0 -> 61654 bytes
 website/static/img/social/manifest.json            |   8 +
 website/static/llms-full.txt                       |  68 +++++--
 18 files changed, 567 insertions(+), 66 deletions(-)
```

</details>
