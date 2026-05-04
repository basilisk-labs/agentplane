# PR Review

Created: 2026-05-04T20:02:53.103Z
Branch: task/202605042000-Y8B7V1/docs-social-images

## Summary

Generate per-doc social images

Add a minimal Docusaurus docs social-image generator that renders official AgentPlane branding and page-specific section/title cards at build time.

## Scope

- In scope: Add a minimal Docusaurus docs social-image generator that renders official AgentPlane branding and page-specific section/title cards at build time.
- Out of scope: unrelated refactors not required for "Generate per-doc social images".

## Verification

### Plan

1. Review the requested outcome for "Generate per-doc social images". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Generated per-doc social cards and verified docs social metadata.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T20:18:17.760Z
- Branch: task/202605042000-Y8B7V1/docs-social-images
- Head: a6089353c846

```text
 bun.lock                                           |  55 +++++
 website/docusaurus.config.ts                       |   2 -
 website/package.json                               |   5 +-
 website/scripts/generate-social-images.mjs         | 262 +++++++++++++++++++++
 website/src/theme/DocItem/Layout/index.tsx         |  32 +++
 website/static/img/agentplane-demo.gif             | Bin 59788 -> 3834539 bytes
 website/static/img/header.png                      | Bin 170586 -> 84547 bytes
 website/static/img/hn-card.png                     | Bin 50649 -> 52746 bytes
 website/static/img/og-image.png                    | Bin 40910 -> 54158 bytes
 website/static/img/social/docs.png                 | Bin 0 -> 46045 bytes
 .../img/social/docs/adr/0001-zod-config-parity.png | Bin 0 -> 50908 bytes
 .../img/social/docs/adr/0002-adr-process.png       | Bin 0 -> 48139 bytes
 .../social/docs/adr/0003-refactor-sequencing.png   | Bin 0 -> 54258 bytes
 .../social/docs/adr/0004-keep-custom-cli-stack.png | Bin 0 -> 52349 bytes
 .../social/docs/adr/0005-defer-biome-migration.png | Bin 0 -> 52142 bytes
 .../docs/adr/0006-no-effect-fp-ts-migration.png    | Bin 0 -> 54889 bytes
 .../docs/adr/0007-freeze-yaml-parser-stack.png     | Bin 0 -> 54950 bytes
 .../adr/0008-keep-yauzl-for-zip-validation.png     | Bin 0 -> 55325 bytes
 ...0009-recipes-index-signing-algorithm-policy.png | Bin 0 -> 61683 bytes
 .../adr/0010-core-root-export-compatibility.png    | Bin 0 -> 56584 bytes
 .../social/docs/adr/0011-v0.3-surface-freeze.png   | Bin 0 -> 51607 bytes
 .../docs/adr/0012-v0.4-surface-transition.png      | Bin 0 -> 51361 bytes
 .../img/social/docs/adr/0013-zod-contract-ssot.png | Bin 0 -> 51788 bytes
 .../docs/archive/v0-3/cli-bug-ledger-v0-3-x.png    | Bin 0 -> 56146 bytes
 .../archive/v0-3/framework-refactor-program.png    | Bin 0 -> 59271 bytes
 website/static/img/social/docs/compare.png         | Bin 0 -> 49226 bytes
 .../agent-change-record-implementation.png         | Bin 0 -> 54042 bytes
 .../img/social/docs/developer/architecture.png     | Bin 0 -> 44452 bytes
 .../img/social/docs/developer/blueprints.png       | Bin 0 -> 42568 bytes
 .../img/social/docs/developer/cli-contract.png     | Bin 0 -> 43874 bytes
 .../img/social/docs/developer/cli-help-json.png    | Bin 0 -> 55152 bytes
 .../img/social/docs/developer/close-taxonomy.png   | Bin 0 -> 48434 bytes
 .../img/social/docs/developer/code-quality.png     | Bin 0 -> 50188 bytes
 .../img/social/docs/developer/contributing.png     | Bin 0 -> 44704 bytes
 .../social/docs/developer/design-principles.png    | Bin 0 -> 48993 bytes
 .../documentation-information-architecture.png     | Bin 0 -> 57447 bytes
 .../evaluation-and-recursive-improvement.png       | Bin 0 -> 56836 bytes
 .../social/docs/developer/harness-engineering.png  | Bin 0 -> 49816 bytes
 .../img/social/docs/developer/incident-archive.png | Bin 0 -> 46652 bytes
 .../docs/developer/modular-prompt-assembly.png     | Bin 0 -> 53658 bytes
 .../img/social/docs/developer/module-topology.png  | Bin 0 -> 49168 bytes
 .../docs/developer/performance-baselines.png       | Bin 0 -> 51739 bytes
 .../img/social/docs/developer/project-layout.png   | Bin 0 -> 46396 bytes
 .../social/docs/developer/recipes-development.png  | Bin 0 -> 51284 bytes
 .../social/docs/developer/recipes-how-it-works.png | Bin 0 -> 49100 bytes
 .../img/social/docs/developer/recipes-safety.png   | Bin 0 -> 48015 bytes
 .../img/social/docs/developer/recipes-spec.png     | Bin 0 -> 50951 bytes
 .../docs/developer/release-and-publishing.png      | Bin 0 -> 51792 bytes
 .../docs/developer/schema-validation-strategy.png  | Bin 0 -> 54509 bytes
 .../social/docs/developer/testing-and-quality.png  | Bin 0 -> 49150 bytes
 .../docs/developer/typescript-esm-imports.png      | Bin 0 -> 52786 bytes
 .../social/docs/developer/workflow-contract.png    | Bin 0 -> 49900 bytes
 .../developer/workflow-harness-test-matrix.png     | Bin 0 -> 53757 bytes
 .../social/docs/help/broken-workflow-runbook.png   | Bin 0 -> 50665 bytes
 website/static/img/social/docs/help/glossary.png   | Bin 0 -> 41615 bytes
 .../social/docs/help/legacy-upgrade-recovery.png   | Bin 0 -> 48997 bytes
 .../docs/help/troubleshooting-by-symptom.png       | Bin 0 -> 51874 bytes
 .../img/social/docs/help/troubleshooting.png       | Bin 0 -> 45350 bytes
 website/static/img/social/docs/listing.png         | Bin 0 -> 45648 bytes
 website/static/img/social/docs/manifesto.png       | Bin 0 -> 48744 bytes
 website/static/img/social/docs/recipes.png         | Bin 0 -> 39788 bytes
 .../static/img/social/docs/recipes/code-map.png    | Bin 0 -> 46992 bytes
 .../social/docs/reference/generated-reference.png  | Bin 0 -> 50476 bytes
 website/static/img/social/docs/releases.png        | Bin 0 -> 43687 bytes
 .../static/img/social/docs/releases/TEMPLATE.png   | Bin 0 -> 39652 bytes
 website/static/img/social/docs/releases/v0.1.3.png | Bin 0 -> 40536 bytes
 website/static/img/social/docs/releases/v0.1.4.png | Bin 0 -> 39831 bytes
 website/static/img/social/docs/releases/v0.1.5.png | Bin 0 -> 40378 bytes
 website/static/img/social/docs/releases/v0.1.6.png | Bin 0 -> 40746 bytes
 website/static/img/social/docs/releases/v0.1.7.png | Bin 0 -> 39798 bytes
 website/static/img/social/docs/releases/v0.1.8.png | Bin 0 -> 40876 bytes
 website/static/img/social/docs/releases/v0.1.9.png | Bin 0 -> 40808 bytes
 website/static/img/social/docs/releases/v0.2.0.png | Bin 0 -> 41372 bytes
 website/static/img/social/docs/releases/v0.2.1.png | Bin 0 -> 40209 bytes
 .../static/img/social/docs/releases/v0.2.10.png    | Bin 0 -> 41800 bytes
 .../static/img/social/docs/releases/v0.2.11.png    | Bin 0 -> 40537 bytes
 .../static/img/social/docs/releases/v0.2.12.png    | Bin 0 -> 41184 bytes
 .../static/img/social/docs/releases/v0.2.13.png    | Bin 0 -> 41566 bytes
 .../static/img/social/docs/releases/v0.2.14.png    | Bin 0 -> 40847 bytes
 .../static/img/social/docs/releases/v0.2.15.png    | Bin 0 -> 41438 bytes
 .../static/img/social/docs/releases/v0.2.16.png    | Bin 0 -> 41797 bytes
 .../static/img/social/docs/releases/v0.2.17.png    | Bin 0 -> 40912 bytes
 .../static/img/social/docs/releases/v0.2.18.png    | Bin 0 -> 41910 bytes
 .../static/img/social/docs/releases/v0.2.19.png    | Bin 0 -> 41826 bytes
 website/static/img/social/docs/releases/v0.2.2.png | Bin 0 -> 40846 bytes
 .../static/img/social/docs/releases/v0.2.20.png    | Bin 0 -> 42485 bytes
 .../static/img/social/docs/releases/v0.2.21.png    | Bin 0 -> 41207 bytes
 .../static/img/social/docs/releases/v0.2.22.png    | Bin 0 -> 41897 bytes
 .../static/img/social/docs/releases/v0.2.23.png    | Bin 0 -> 42286 bytes
 .../static/img/social/docs/releases/v0.2.24.png    | Bin 0 -> 41575 bytes
 .../static/img/social/docs/releases/v0.2.25.png    | Bin 0 -> 42170 bytes
 .../static/img/social/docs/releases/v0.2.26.png    | Bin 0 -> 42520 bytes
 website/static/img/social/docs/releases/v0.2.3.png | Bin 0 -> 41167 bytes
 website/static/img/social/docs/releases/v0.2.4.png | Bin 0 -> 40526 bytes
 website/static/img/social/docs/releases/v0.2.5.png | Bin 0 -> 41081 bytes
 website/static/img/social/docs/releases/v0.2.6.png | Bin 0 -> 41466 bytes
 website/static/img/social/docs/releases/v0.2.7.png | Bin 0 -> 40553 bytes
 website/static/img/social/docs/releases/v0.2.8.png | Bin 0 -> 41523 bytes
 website/static/img/social/docs/releases/v0.2.9.png | Bin 0 -> 41461 bytes
 website/static/img/social/docs/releases/v0.3.0.png | Bin 0 -> 41614 bytes
 website/static/img/social/docs/releases/v0.3.1.png | Bin 0 -> 40545 bytes
 .../static/img/social/docs/releases/v0.3.10.png    | Bin 0 -> 42037 bytes
 .../static/img/social/docs/releases/v0.3.11.png    | Bin 0 -> 40848 bytes
 .../static/img/social/docs/releases/v0.3.12.png    | Bin 0 -> 41592 bytes
 .../static/img/social/docs/releases/v0.3.13.png    | Bin 0 -> 41924 bytes
 .../static/img/social/docs/releases/v0.3.14.png    | Bin 0 -> 41186 bytes
 .../static/img/social/docs/releases/v0.3.15.png    | Bin 0 -> 41718 bytes
 .../static/img/social/docs/releases/v0.3.16.png    | Bin 0 -> 42091 bytes
 .../static/img/social/docs/releases/v0.3.17.png    | Bin 0 -> 41213 bytes
 .../static/img/social/docs/releases/v0.3.18.png    | Bin 0 -> 42202 bytes
 .../static/img/social/docs/releases/v0.3.19.png    | Bin 0 -> 42168 bytes
 website/static/img/social/docs/releases/v0.3.2.png | Bin 0 -> 41225 bytes
 .../static/img/social/docs/releases/v0.3.20.png    | Bin 0 -> 42909 bytes
 .../static/img/social/docs/releases/v0.3.21.png    | Bin 0 -> 41571 bytes
 .../static/img/social/docs/releases/v0.3.22.png    | Bin 0 -> 42362 bytes
 .../static/img/social/docs/releases/v0.3.23.png    | Bin 0 -> 42720 bytes
 .../static/img/social/docs/releases/v0.3.24.png    | Bin 0 -> 41944 bytes
 .../static/img/social/docs/releases/v0.3.25.png    | Bin 0 -> 42555 bytes
 .../static/img/social/docs/releases/v0.3.26.png    | Bin 0 -> 43027 bytes
 .../static/img/social/docs/releases/v0.3.27.png    | Bin 0 -> 41908 bytes
 .../static/img/social/docs/releases/v0.3.28.png    | Bin 0 -> 43002 bytes
 .../static/img/social/docs/releases/v0.3.29.png    | Bin 0 -> 43008 bytes
 website/static/img/social/docs/releases/v0.3.3.png | Bin 0 -> 41468 bytes
 website/static/img/social/docs/releases/v0.3.4.png | Bin 0 -> 40896 bytes
 website/static/img/social/docs/releases/v0.3.5.png | Bin 0 -> 41396 bytes
 website/static/img/social/docs/releases/v0.3.6.png | Bin 0 -> 41773 bytes
 website/static/img/social/docs/releases/v0.3.7.png | Bin 0 -> 40877 bytes
 website/static/img/social/docs/releases/v0.3.8.png | Bin 0 -> 41814 bytes
 website/static/img/social/docs/releases/v0.3.9.png | Bin 0 -> 41821 bytes
 website/static/img/social/docs/releases/v0.4.0.png | Bin 0 -> 41011 bytes
 website/static/img/social/docs/releases/v0.4.1.png | Bin 0 -> 39770 bytes
 website/static/img/social/docs/releases/v0.4.2.png | Bin 0 -> 40485 bytes
 website/static/img/social/docs/releases/v0.4.3.png | Bin 0 -> 40775 bytes
 website/static/img/social/docs/showcase.png        | Bin 0 -> 42968 bytes
 .../social/docs/user/agent-bootstrap.generated.png | Bin 0 -> 48217 bytes
 .../img/social/docs/user/agent-change-record.png   | Bin 0 -> 50028 bytes
 .../img/social/docs/user/agent-discovery.png       | Bin 0 -> 51893 bytes
 website/static/img/social/docs/user/agents.png     | Bin 0 -> 39712 bytes
 website/static/img/social/docs/user/backends.png   | Bin 0 -> 47055 bytes
 .../static/img/social/docs/user/backends/local.png | Bin 0 -> 44213 bytes
 .../img/social/docs/user/backends/redmine.png      | Bin 0 -> 46543 bytes
 .../docs/user/branching-and-pr-artifacts.png       | Bin 0 -> 49845 bytes
 .../img/social/docs/user/breaking-changes.png      | Bin 0 -> 47776 bytes
 .../social/docs/user/cli-reference.generated.png   | Bin 0 -> 51176 bytes
 website/static/img/social/docs/user/commands.png   | Bin 0 -> 41687 bytes
 .../static/img/social/docs/user/configuration.png  | Bin 0 -> 43939 bytes
 .../user/indexing-and-webmaster-operations.png     | Bin 0 -> 55801 bytes
 website/static/img/social/docs/user/overview.png   | Bin 0 -> 41548 bytes
 .../static/img/social/docs/user/prerequisites.png  | Bin 0 -> 43608 bytes
 website/static/img/social/docs/user/redmine.png    | Bin 0 -> 48797 bytes
 website/static/img/social/docs/user/setup.png      | Bin 0 -> 38305 bytes
 .../static/img/social/docs/user/task-lifecycle.png | Bin 0 -> 44156 bytes
 .../img/social/docs/user/tasks-and-backends.png    | Bin 0 -> 48269 bytes
 website/static/img/social/docs/user/website-ia.png | Bin 0 -> 51248 bytes
 .../img/social/docs/user/workflow-migration.png    | Bin 0 -> 50682 bytes
 website/static/img/social/docs/user/workflow.png   | Bin 0 -> 41541 bytes
 website/static/img/social/docs/workflow-guides.png | Bin 0 -> 48598 bytes
 .../img/social/docs/workflow-guides/aider.png      | Bin 0 -> 48669 bytes
 .../img/social/docs/workflow-guides/branch-pr.png  | Bin 0 -> 54196 bytes
 .../social/docs/workflow-guides/claude-code.png    | Bin 0 -> 53889 bytes
 .../img/social/docs/workflow-guides/codex.png      | Bin 0 -> 50140 bytes
 .../img/social/docs/workflow-guides/cursor.png     | Bin 0 -> 49530 bytes
 .../social/docs/workflow-guides/github-actions.png | Bin 0 -> 52593 bytes
 website/static/img/twitter-card.png                | Bin 46988 -> 63515 bytes
 164 files changed, 353 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
