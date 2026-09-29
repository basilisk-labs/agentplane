Task: `202609200336-EJTVES`
Title: Replace generated per-document social images with the standard static site image
Canonical task record: `.agentplane/tasks/202609200336-EJTVES/README.md`

## Summary

Replace generated per-document social images with the standard static site image

Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI.

## Scope

- In scope: Remove the per-page social image generator, its commands and checks, the custom per-doc og:image override, and all generated social assets. Retain website/static/img/og-image.png as the standard Docusaurus social image. Update generated scripts documentation and verify docs build, release checks, and full local CI.
- Out of scope: unrelated refactors not required for "Replace generated per-document social images with the standard static site image".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T03:50:14.188Z
- Branch: task/202609200336-EJTVES/canonical-ejtves
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/releases/v0.7.10.md                           |    2 +
 package.json                                       |    4 +-
 scripts/README.md                                  |   70 +-
 website/package.json                               |    6 +-
 website/scripts/generate-social-images.mjs         |  470 -----
 website/src/theme/DocItem/Layout/index.tsx         |   31 -
 website/static/img/social/docs.png                 |  Bin 61476 -> 0 bytes
 .../img/social/docs/adr/0001-zod-config-parity.png |  Bin 60197 -> 0 bytes
 .../img/social/docs/adr/0002-adr-process.png       |  Bin 58357 -> 0 bytes
 .../social/docs/adr/0003-refactor-sequencing.png   |  Bin 63017 -> 0 bytes
 .../social/docs/adr/0004-keep-custom-cli-stack.png |  Bin 60673 -> 0 bytes
 .../social/docs/adr/0005-defer-biome-migration.png |  Bin 60550 -> 0 bytes
 .../docs/adr/0006-no-effect-fp-ts-migration.png    |  Bin 60972 -> 0 bytes
 .../docs/adr/0007-freeze-yaml-parser-stack.png     |  Bin 63314 -> 0 bytes
 .../adr/0008-keep-yauzl-for-zip-validation.png     |  Bin 62767 -> 0 bytes
 ...0009-recipes-index-signing-algorithm-policy.png |  Bin 67266 -> 0 bytes
 .../adr/0010-core-root-export-compatibility.png    |  Bin 64116 -> 0 bytes
 .../social/docs/adr/0011-v0.3-surface-freeze.png   |  Bin 60711 -> 0 bytes
 .../docs/adr/0012-v0.4-surface-transition.png      |  Bin 59988 -> 0 bytes
 .../img/social/docs/adr/0013-zod-contract-ssot.png |  Bin 61827 -> 0 bytes
 .../docs/adr/0014-task-execution-authority.png     |  Bin 62119 -> 0 bytes
 .../docs/adr/0015-task-workspace-isolation.png     |  Bin 63987 -> 0 bytes
 .../adr/0016-serialized-direct-integration.png     |  Bin 64166 -> 0 bytes
 .../docs/adr/0017-clean-task-core-rebuild.png      |  Bin 62072 -> 0 bytes
 .../docs/archive/v0-3/cli-bug-ledger-v0-3-x.png    |  Bin 62463 -> 0 bytes
 .../archive/v0-3/framework-refactor-program.png    |  Bin 67430 -> 0 bytes
 website/static/img/social/docs/compare.png         |  Bin 62340 -> 0 bytes
 .../img/social/docs/concepts/agent-workflows.png   |  Bin 58582 -> 0 bytes
 .../social/docs/concepts/context-engineering.png   |  Bin 63967 -> 0 bytes
 .../social/docs/concepts/harness-engineering.png   |  Bin 63686 -> 0 bytes
 website/static/img/social/docs/concepts/traces.png |  Bin 60422 -> 0 bytes
 website/static/img/social/docs/context.png         |  Bin 53322 -> 0 bytes
 .../static/img/social/docs/context/agent-guide.png |  Bin 62783 -> 0 bytes
 website/static/img/social/docs/context/files.png   |  Bin 59466 -> 0 bytes
 website/static/img/social/docs/context/ingest.png  |  Bin 61598 -> 0 bytes
 website/static/img/social/docs/context/modes.png   |  Bin 60872 -> 0 bytes
 .../static/img/social/docs/context/quickstart.png  |  Bin 58575 -> 0 bytes
 website/static/img/social/docs/context/review.png  |  Bin 61487 -> 0 bytes
 .../img/social/docs/context/troubleshooting.png    |  Bin 60746 -> 0 bytes
 .../docs/contributing/citation-guidelines.png      |  Bin 58730 -> 0 bytes
 .../agent-change-record-implementation.png         |  Bin 60594 -> 0 bytes
 .../img/social/docs/developer/architecture.png     |  Bin 55264 -> 0 bytes
 .../img/social/docs/developer/blueprints.png       |  Bin 59205 -> 0 bytes
 .../img/social/docs/developer/cli-contract.png     |  Bin 55064 -> 0 bytes
 .../img/social/docs/developer/cli-help-json.png    |  Bin 66157 -> 0 bytes
 .../img/social/docs/developer/close-taxonomy.png   |  Bin 58269 -> 0 bytes
 .../developer/cloud-backend-integration-plan.png   |  Bin 61659 -> 0 bytes
 .../img/social/docs/developer/code-quality.png     |  Bin 60328 -> 0 bytes
 .../img/social/docs/developer/contributing.png     |  Bin 55404 -> 0 bytes
 .../social/docs/developer/design-principles.png    |  Bin 57740 -> 0 bytes
 .../documentation-information-architecture.png     |  Bin 64455 -> 0 bytes
 .../evaluation-and-recursive-improvement.png       |  Bin 63629 -> 0 bytes
 .../img/social/docs/developer/harness-dev.png      |  Bin 62357 -> 0 bytes
 .../social/docs/developer/harness-engineering.png  |  Bin 58869 -> 0 bytes
 .../img/social/docs/developer/incident-archive.png |  Bin 56230 -> 0 bytes
 .../img/social/docs/developer/local-context.png    |  Bin 60484 -> 0 bytes
 .../docs/developer/modular-prompt-assembly.png     |  Bin 61433 -> 0 bytes
 .../img/social/docs/developer/module-topology.png  |  Bin 58524 -> 0 bytes
 .../docs/developer/performance-baselines.png       |  Bin 60291 -> 0 bytes
 .../img/social/docs/developer/project-layout.png   |  Bin 56712 -> 0 bytes
 .../social/docs/developer/recipes-development.png  |  Bin 60064 -> 0 bytes
 .../social/docs/developer/recipes-how-it-works.png |  Bin 58039 -> 0 bytes
 .../img/social/docs/developer/recipes-safety.png   |  Bin 57886 -> 0 bytes
 .../img/social/docs/developer/recipes-spec.png     |  Bin 60236 -> 0 bytes
 .../docs/developer/release-and-publishing.png      |  Bin 60101 -> 0 bytes
 .../docs/developer/schema-validation-strategy.png  |  Bin 62633 -> 0 bytes
 .../docs/developer/task-execution-authority.png    |  Bin 60394 -> 0 bytes
 .../social/docs/developer/testing-and-quality.png  |  Bin 58187 -> 0 bytes
 .../docs/developer/typescript-esm-imports.png      |  Bin 61180 -> 0 bytes
 .../docs/developer/verification-contract.png       |  Bin 59442 -> 0 bytes
 .../docs/developer/website-success-metrics.png     |  Bin 62333 -> 0 bytes
 .../social/docs/developer/workflow-contract.png    |  Bin 59479 -> 0 bytes
 .../developer/workflow-harness-test-matrix.png     |  Bin 61521 -> 0 bytes
 .../docs/examples/debug-agent-run-with-traces.png  |  Bin 61727 -> 0 bytes
 .../img/social/docs/examples/export-traces.png     |  Bin 55870 -> 0 bytes
 .../social/docs/help/broken-workflow-runbook.png   |  Bin 60034 -> 0 bytes
 website/static/img/social/docs/help/glossary.png   |  Bin 53845 -> 0 bytes
 .../social/docs/help/legacy-upgrade-recovery.png   |  Bin 58318 -> 0 bytes
 .../docs/help/troubleshooting-by-symptom.png       |  Bin 60570 -> 0 bytes
 .../img/social/docs/help/troubleshooting.png       |  Bin 56422 -> 0 bytes
 .../social/docs/internal/git-mutation-model.png    |  Bin 57393 -> 0 bytes
 .../social/docs/internal/v0.6.22-refactor-plan.png |  Bin 59916 -> 0 bytes
 .../internal/v0.7-agent-efficiency-baseline.png    |  Bin 61454 -> 0 bytes
 .../social/docs/internal/v0.7-refactor-plan.png    |  Bin 57858 -> 0 bytes
 website/static/img/social/docs/listing.png         |  Bin 58671 -> 0 bytes
 website/static/img/social/docs/manifesto.png       |  Bin 61519 -> 0 bytes
 website/static/img/social/docs/recipes.png         |  Bin 53496 -> 0 bytes
 .../static/img/social/docs/recipes/docs-update.png |  Bin 58908 -> 0 bytes
 .../img/social/docs/recipes/hermes-agentplane.png  |  Bin 61607 -> 0 bytes
 .../img/social/docs/recipes/security-review.png    |  Bin 60112 -> 0 bytes
 website/static/img/social/docs/recipes/tdd.png     |  Bin 53763 -> 0 bytes
 .../img/social/docs/reference/acr-schema.png       |  Bin 56131 -> 0 bytes
 website/static/img/social/docs/reference/acr.png   |  Bin 61767 -> 0 bytes
 .../reference/clean-task-core-rebuild-spec.png     |  Bin 65468 -> 0 bytes
 website/static/img/social/docs/reference/cli.png   |  Bin 55546 -> 0 bytes
 .../static/img/social/docs/reference/evidence.png  |  Bin 57155 -> 0 bytes
 .../social/docs/reference/generated-reference.png  |  Bin 60246 -> 0 bytes
 .../img/social/docs/reference/runner-handoff.png   |  Bin 60128 -> 0 bytes
 .../social/docs/reference/task-observations.png    |  Bin 59123 -> 0 bytes
 .../img/social/docs/reference/trace-schema.png     |  Bin 55896 -> 0 bytes
 .../img/social/docs/reference/workflow-file.png    |  Bin 60709 -> 0 bytes
 website/static/img/social/docs/releases.png        |  Bin 56603 -> 0 bytes
 .../static/img/social/docs/releases/TEMPLATE.png   |  Bin 51354 -> 0 bytes
 website/static/img/social/docs/releases/v0.1.3.png |  Bin 52155 -> 0 bytes
 website/static/img/social/docs/releases/v0.1.4.png |  Bin 51466 -> 0 bytes
 website/static/img/social/docs/releases/v0.1.5.png |  Bin 51955 -> 0 bytes
 website/static/img/social/docs/releases/v0.1.6.png |  Bin 52300 -> 0 bytes
 website/static/img/social/docs/releases/v0.1.7.png |  Bin 51555 -> 0 bytes
 website/static/img/social/docs/releases/v0.1.8.png |  Bin 52281 -> 0 bytes
 website/static/img/social/docs/releases/v0.1.9.png |  Bin 52309 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.0.png |  Bin 52810 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.1.png |  Bin 51959 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.10.png    |  Bin 53180 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.11.png    |  Bin 52203 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.12.png    |  Bin 52838 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.13.png    |  Bin 53160 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.14.png    |  Bin 52420 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.15.png    |  Bin 53026 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.16.png    |  Bin 53224 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.17.png    |  Bin 52507 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.18.png    |  Bin 53332 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.19.png    |  Bin 53286 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.2.png |  Bin 52518 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.20.png    |  Bin 53645 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.21.png    |  Bin 52779 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.22.png    |  Bin 53389 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.23.png    |  Bin 53643 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.24.png    |  Bin 53013 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.25.png    |  Bin 53490 -> 0 bytes
 .../static/img/social/docs/releases/v0.2.26.png    |  Bin 53696 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.3.png |  Bin 52826 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.4.png |  Bin 52193 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.5.png |  Bin 52623 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.6.png |  Bin 52931 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.7.png |  Bin 52273 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.8.png |  Bin 52893 -> 0 bytes
 website/static/img/social/docs/releases/v0.2.9.png |  Bin 52942 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.0.png |  Bin 52994 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.1.png |  Bin 52175 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.10.png    |  Bin 53372 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.11.png    |  Bin 52415 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.12.png    |  Bin 53064 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.13.png    |  Bin 53329 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.14.png    |  Bin 52660 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.15.png    |  Bin 53176 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.16.png    |  Bin 53422 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.17.png    |  Bin 52759 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.18.png    |  Bin 53495 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.19.png    |  Bin 53466 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.2.png |  Bin 52728 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.20.png    |  Bin 53858 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.21.png    |  Bin 53012 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.22.png    |  Bin 53585 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.23.png    |  Bin 53823 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.24.png    |  Bin 53226 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.25.png    |  Bin 53667 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.26.png    |  Bin 53948 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.27.png    |  Bin 53291 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.28.png    |  Bin 54005 -> 0 bytes
 .../static/img/social/docs/releases/v0.3.29.png    |  Bin 53980 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.3.png |  Bin 52986 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.4.png |  Bin 52441 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.5.png |  Bin 52830 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.6.png |  Bin 53097 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.7.png |  Bin 52516 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.8.png |  Bin 53125 -> 0 bytes
 website/static/img/social/docs/releases/v0.3.9.png |  Bin 53119 -> 0 bytes
 website/static/img/social/docs/releases/v0.4.0.png |  Bin 52374 -> 0 bytes
 website/static/img/social/docs/releases/v0.4.1.png |  Bin 51486 -> 0 bytes
 website/static/img/social/docs/releases/v0.4.2.png |  Bin 52096 -> 0 bytes
 website/static/img/social/docs/releases/v0.4.3.png |  Bin 52394 -> 0 bytes
 website/static/img/social/docs/releases/v0.4.4.png |  Bin 51691 -> 0 bytes
 .../img/social/docs/releases/v0.5.0-rc.1.png       |  Bin 54951 -> 0 bytes
 website/static/img/social/docs/releases/v0.5.0.png |  Bin 52860 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.0.png |  Bin 53137 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.1.png |  Bin 52349 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.10.png    |  Bin 53495 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.11.png    |  Bin 52585 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.12.png    |  Bin 53204 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.13.png    |  Bin 53508 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.14.png    |  Bin 52780 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.15.png    |  Bin 53308 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.16.png    |  Bin 53546 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.17.png    |  Bin 52912 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.18.png    |  Bin 53670 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.19.png    |  Bin 53615 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.2.png |  Bin 52899 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.20.png    |  Bin 54005 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.21.png    |  Bin 53138 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.22.png    |  Bin 53730 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.23.png    |  Bin 54024 -> 0 bytes
 .../static/img/social/docs/releases/v0.6.24.png    |  Bin 53357 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.3.png |  Bin 53166 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.4.png |  Bin 52589 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.5.png |  Bin 52959 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.6.png |  Bin 53231 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.7.png |  Bin 52664 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.8.png |  Bin 53198 -> 0 bytes
 website/static/img/social/docs/releases/v0.6.9.png |  Bin 53268 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.0.png |  Bin 52424 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.1.png |  Bin 51523 -> 0 bytes
 .../static/img/social/docs/releases/v0.7.10.png    |  Bin 52774 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.2.png |  Bin 52164 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.3.png |  Bin 52451 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.4.png |  Bin 51787 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.5.png |  Bin 52241 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.6.png |  Bin 52540 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.7.png |  Bin 51876 -> 0 bytes
 .../docs/releases/v0.7.8-evidence/preparation.png  |  Bin 55103 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.8.png |  Bin 52552 -> 0 bytes
 .../docs/releases/v0.7.9-evidence/preparation.png  |  Bin 55103 -> 0 bytes
 website/static/img/social/docs/releases/v0.7.9.png |  Bin 52555 -> 0 bytes
 website/static/img/social/docs/showcase.png        |  Bin 56133 -> 0 bytes
 .../img/social/docs/start/first-local-run.png      |  Bin 53737 -> 0 bytes
 .../static/img/social/docs/start/quickstart.png    |  Bin 54453 -> 0 bytes
 .../social/docs/start/what-agentplane-writes.png   |  Bin 63695 -> 0 bytes
 .../social/docs/user/agent-bootstrap.generated.png |  Bin 57645 -> 0 bytes
 .../img/social/docs/user/agent-discovery.png       |  Bin 61904 -> 0 bytes
 website/static/img/social/docs/user/agents.png     |  Bin 52623 -> 0 bytes
 .../docs/user/branching-and-pr-artifacts.png       |  Bin 59347 -> 0 bytes
 .../img/social/docs/user/breaking-changes.png      |  Bin 58163 -> 0 bytes
 .../social/docs/user/cli-reference.generated.png   |  Bin 60881 -> 0 bytes
 website/static/img/social/docs/user/commands.png   |  Bin 54406 -> 0 bytes
 .../static/img/social/docs/user/configuration.png  |  Bin 55652 -> 0 bytes
 .../user/indexing-and-webmaster-operations.png     |  Bin 63633 -> 0 bytes
 .../static/img/social/docs/user/local-context.png  |  Bin 63925 -> 0 bytes
 website/static/img/social/docs/user/overview.png   |  Bin 59616 -> 0 bytes
 .../static/img/social/docs/user/prerequisites.png  |  Bin 55059 -> 0 bytes
 website/static/img/social/docs/user/setup.png      |  Bin 51671 -> 0 bytes
 .../static/img/social/docs/user/task-lifecycle.png |  Bin 55380 -> 0 bytes
 .../img/social/docs/user/tasks-and-backends.png    |  Bin 58645 -> 0 bytes
 .../static/img/social/docs/user/v0-7-migration.png |  Bin 61403 -> 0 bytes
 website/static/img/social/docs/user/website-ia.png |  Bin 62127 -> 0 bytes
 .../img/social/docs/user/workflow-migration.png    |  Bin 62914 -> 0 bytes
 website/static/img/social/docs/user/workflow.png   |  Bin 53837 -> 0 bytes
 website/static/img/social/docs/workflow-guides.png |  Bin 62151 -> 0 bytes
 .../img/social/docs/workflow-guides/aider.png      |  Bin 61037 -> 0 bytes
 .../img/social/docs/workflow-guides/branch-pr.png  |  Bin 59481 -> 0 bytes
 .../social/docs/workflow-guides/claude-code.png    |  Bin 63397 -> 0 bytes
 .../img/social/docs/workflow-guides/codex.png      |  Bin 62183 -> 0 bytes
 .../img/social/docs/workflow-guides/cursor.png     |  Bin 61913 -> 0 bytes
 .../social/docs/workflow-guides/github-actions.png |  Bin 60142 -> 0 bytes
 .../social/docs/workflow-guides/hermes-kanban.png  |  Bin 62057 -> 0 bytes
 website/static/img/social/manifest.json            | 1904 --------------------
 244 files changed, 39 insertions(+), 2448 deletions(-)
```

</details>
