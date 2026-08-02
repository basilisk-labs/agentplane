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

```bash
bun run docs:cli:check && bun run schemas:check && bun run docs:ia:check && node \
  .agentplane/policy/check-routing.mjs && bun run typescript:toolchain:check. Result: pass. \
  Evidence: generated CLI and schemas fresh, IA/sidebar aligned, routing OK, TypeScript 7.0.2 \
  typecheck and 6.0.3 compiler-API split confirmed. Scope: generated contracts and documentation \
  structure. Command: bunx vitest run [9 SGR/work-order/receipt/supervisor test files]. Result: \
  pass. Evidence: 9 files, 90 tests. Scope: documented direct, context, branch_pr, WorkOrder, \
  SemanticResult, and ExecutionReceipt behavior. Command: bun run docs:site:check && bun run \
  docs:social:check. Result: pass. Evidence: production Docusaurus build, navigation check, design \
  check, and 221/221 social images. Scope: published site surfaces. Command: bun run \
  package:install-smoke. Result: pass. Evidence: installed migration matrix 8/8 and local tarball \
  smoke 202608020230-5EPM2Z. Scope: fresh, 0.6.24, 0.6.26, direct, branch_pr, workflow/task \
  migration and rollback. Command: bun run format:check && git diff --check && git diff --cached \
  --check. Result: pass. Evidence: Prettier and whitespace clean. Scope: final docs diff. Real \
  workflow proof: merge main into YMYYQ8 committed as de63e018d without bypass after the base-sync \
  hook fix.
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
