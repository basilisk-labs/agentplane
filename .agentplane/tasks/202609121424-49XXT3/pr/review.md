# PR Review

Created: 2026-09-13T22:57:11.966Z

## Task

- Task: `202609121424-49XXT3`
- Title: Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA
- Status: DOING
- Branch: `task/202609121424-49XXT3/publish-and-independently-verify-agentplane-0-7`
- Canonical task record: `.agentplane/tasks/202609121424-49XXT3/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T22:57:11.966Z
- Branch: task/202609121424-49XXT3/publish-and-independently-verify-agentplane-0-7
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |    2 +-
 docs/assets/header.svg                             |    4 +-
 docs/assets/readme-headers/adr.svg                 |    4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |    4 +-
 docs/assets/readme-headers/agentplane.svg          |    4 +-
 docs/assets/readme-headers/core.svg                |    4 +-
 docs/assets/readme-headers/docs.svg                |    4 +-
 docs/assets/readme-headers/humanizer.svg           |    4 +-
 docs/assets/readme-headers/recipes.svg             |    4 +-
 docs/assets/readme-headers/releases.svg            |    4 +-
 docs/assets/readme-headers/schemas.svg             |    4 +-
 docs/assets/readme-headers/scripts.svg             |    4 +-
 docs/assets/readme-headers/skills.svg              |    4 +-
 docs/assets/readme-headers/spec.svg                |    4 +-
 docs/assets/readme-headers/testkit.svg             |    4 +-
 docs/reference/generated-reference.mdx             |   14 +-
 .../candidate-base-synchronization.json            |   17 +
 docs/releases/v0.7.9-evidence/preparation.md       |   29 +
 .../v0.7.9-evidence/release-plan-changes.json      | 3162 ++++++++++++++++++++
 .../v0.7.9-evidence/release-plan-version.json      |    8 +
 docs/releases/v0.7.9.md                            |  679 +++++
 packages/agentplane/package.json                   |    6 +-
 ...li.core.route-decision.pr-open-metadata.test.ts |    8 +-
 .../run-cli.core.route-decision.quality.test.ts    |    7 +-
 ...un-cli.core.route-decision.verification.test.ts |    2 +
 ...n-cli.core.task-advance.evidence-rework.test.ts |  190 +-
 .../run-cli.core.task-create-base-intent.test.ts   |    2 +-
 .../src/cli/run-cli.core.task-run.test.ts          |    4 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |    7 +-
 packages/core/package.json                         |    2 +-
 packages/recipes/package.json                      |    2 +-
 packages/recipes/src/index.ts                      |    2 +-
 packages/spec/examples/acr.json                    |    4 +-
 packages/testkit/package.json                      |    2 +-
 scripts/baselines/clone-baseline.json              |  124 +-
 .../baselines/v0.7-compatibility-candidate.json    |    6 +-
 website/static/img/social/docs.png                 |  Bin 61573 -> 61476 bytes
 .../img/social/docs/adr/0001-zod-config-parity.png |  Bin 60703 -> 60197 bytes
 .../img/social/docs/adr/0002-adr-process.png       |  Bin 58776 -> 58357 bytes
 .../social/docs/adr/0003-refactor-sequencing.png   |  Bin 63536 -> 63017 bytes
 .../social/docs/adr/0004-keep-custom-cli-stack.png |  Bin 61558 -> 60673 bytes
 .../social/docs/adr/0005-defer-biome-migration.png |  Bin 61297 -> 60550 bytes
 .../docs/adr/0006-no-effect-fp-ts-migration.png    |  Bin 61663 -> 60972 bytes
 .../docs/adr/0007-freeze-yaml-parser-stack.png     |  Bin 63598 -> 63314 bytes
 .../adr/0008-keep-yauzl-for-zip-validation.png     |  Bin 63437 -> 62767 bytes
 ...0009-recipes-index-signing-algorithm-policy.png |  Bin 68559 -> 67266 bytes
 .../adr/0010-core-root-export-compatibility.png    |  Bin 64462 -> 64116 bytes
 .../social/docs/adr/0011-v0.3-surface-freeze.png   |  Bin 61190 -> 60711 bytes
 .../docs/adr/0012-v0.4-surface-transition.png      |  Bin 60565 -> 59988 bytes
 .../img/social/docs/adr/0013-zod-contract-ssot.png |  Bin 61779 -> 61827 bytes
 .../docs/adr/0014-task-execution-authority.png     |  Bin 62644 -> 62119 bytes
 .../docs/adr/0015-task-workspace-isolation.png     |  Bin 64475 -> 63987 bytes
 .../adr/0016-serialized-direct-integration.png     |  Bin 64669 -> 64166 bytes
 .../docs/adr/0017-clean-task-core-rebuild.png      |  Bin 62805 -> 62072 bytes
 .../docs/archive/v0-3/cli-bug-ledger-v0-3-x.png    |  Bin 63041 -> 62463 bytes
 .../archive/v0-3/framework-refactor-program.png    |  Bin 67371 -> 67430 bytes
 website/static/img/social/docs/compare.png         |  Bin 62671 -> 62340 bytes
 .../img/social/docs/concepts/agent-workflows.png   |  Bin 58773 -> 58582 bytes
 .../social/docs/concepts/context-engineering.png   |  Bin 64016 -> 63967 bytes
 .../social/docs/concepts/harness-engineering.png   |  Bin 63824 -> 63686 bytes
 website/static/img/social/docs/concepts/traces.png |  Bin 60250 -> 60422 bytes
 website/static/img/social/docs/context.png         |  Bin 53313 -> 53322 bytes
 .../static/img/social/docs/context/agent-guide.png |  Bin 62709 -> 62783 bytes
 website/static/img/social/docs/context/files.png   |  Bin 59700 -> 59466 bytes
 website/static/img/social/docs/context/ingest.png  |  Bin 61656 -> 61598 bytes
 website/static/img/social/docs/context/modes.png   |  Bin 60889 -> 60872 bytes
 .../static/img/social/docs/context/quickstart.png  |  Bin 58365 -> 58575 bytes
 website/static/img/social/docs/context/review.png  |  Bin 61403 -> 61487 bytes
 .../img/social/docs/context/troubleshooting.png    |  Bin 61090 -> 60746 bytes
 .../docs/contributing/citation-guidelines.png      |  Bin 59345 -> 58730 bytes
 .../agent-change-record-implementation.png         |  Bin 60780 -> 60594 bytes
 .../img/social/docs/developer/architecture.png     |  Bin 55549 -> 55264 bytes
 .../img/social/docs/developer/blueprints.png       |  Bin 54052 -> 53838 bytes
 .../img/social/docs/developer/cli-contract.png     |  Bin 55054 -> 55064 bytes
 .../img/social/docs/developer/cli-help-json.png    |  Bin 66002 -> 66157 bytes
 .../img/social/docs/developer/close-taxonomy.png   |  Bin 58462 -> 58269 bytes
 .../developer/cloud-backend-integration-plan.png   |  Bin 61892 -> 61659 bytes
 .../img/social/docs/developer/code-quality.png     |  Bin 60525 -> 60328 bytes
 .../img/social/docs/developer/contributing.png     |  Bin 55827 -> 55404 bytes
 .../social/docs/developer/design-principles.png    |  Bin 58724 -> 57740 bytes
 .../documentation-information-architecture.png     |  Bin 64528 -> 64455 bytes
 .../evaluation-and-recursive-improvement.png       |  Bin 63875 -> 63629 bytes
 .../img/social/docs/developer/harness-dev.png      |  Bin 62779 -> 62357 bytes
 .../social/docs/developer/harness-engineering.png  |  Bin 59180 -> 58869 bytes
 .../img/social/docs/developer/incident-archive.png |  Bin 57013 -> 56230 bytes
 .../img/social/docs/developer/local-context.png    |  Bin 60695 -> 60484 bytes
 .../docs/developer/modular-prompt-assembly.png     |  Bin 62112 -> 61433 bytes
 .../img/social/docs/developer/module-topology.png  |  Bin 58942 -> 58524 bytes
 .../docs/developer/performance-baselines.png       |  Bin 60553 -> 60291 bytes
 .../img/social/docs/developer/project-layout.png   |  Bin 56763 -> 56712 bytes
 .../social/docs/developer/recipes-development.png  |  Bin 60384 -> 60064 bytes
 .../social/docs/developer/recipes-how-it-works.png |  Bin 58451 -> 58039 bytes
 .../img/social/docs/developer/recipes-safety.png   |  Bin 58165 -> 57886 bytes
 .../img/social/docs/developer/recipes-spec.png     |  Bin 61237 -> 60236 bytes
 .../docs/developer/release-and-publishing.png      |  Bin 60591 -> 60101 bytes
 .../docs/developer/schema-validation-strategy.png  |  Bin 62571 -> 62633 bytes
 .../docs/developer/task-execution-authority.png    |  Bin 60616 -> 60394 bytes
 .../social/docs/developer/testing-and-quality.png  |  Bin 58750 -> 58187 bytes
 .../docs/developer/typescript-esm-imports.png      |  Bin 61638 -> 61180 bytes
 .../docs/developer/verification-contract.png       |  Bin 59695 -> 59442 bytes
 .../docs/developer/website-success-metrics.png     |  Bin 62889 -> 62333 bytes
 .../social/docs/developer/workflow-contract.png    |  Bin 59594 -> 59479 bytes
 .../developer/workflow-harness-test-matrix.png     |  Bin 61892 -> 61521 bytes
 .../docs/examples/debug-agent-run-with-traces.png  |  Bin 61238 -> 61727 bytes
 .../img/social/docs/examples/export-traces.png     |  Bin 55903 -> 55870 bytes
 .../social/docs/help/broken-workflow-runbook.png   |  Bin 60330 -> 60034 bytes
 website/static/img/social/docs/help/glossary.png   |  Bin 54178 -> 53845 bytes
 .../social/docs/help/legacy-upgrade-recovery.png   |  Bin 58425 -> 58318 bytes
 .../docs/help/troubleshooting-by-symptom.png       |  Bin 60884 -> 60570 bytes
 .../img/social/docs/help/troubleshooting.png       |  Bin 56674 -> 56422 bytes
 .../social/docs/internal/git-mutation-model.png    |  Bin 58175 -> 57393 bytes
 .../social/docs/internal/v0.6.22-refactor-plan.png |  Bin 60132 -> 59916 bytes
 .../internal/v0.7-agent-efficiency-baseline.png    |  Bin 62253 -> 61454 bytes
 .../social/docs/internal/v0.7-refactor-plan.png    |  Bin 57912 -> 57858 bytes
 website/static/img/social/docs/listing.png         |  Bin 59479 -> 58671 bytes
 website/static/img/social/docs/manifesto.png       |  Bin 62155 -> 61519 bytes
 website/static/img/social/docs/recipes.png         |  Bin 53907 -> 53496 bytes
 .../static/img/social/docs/recipes/docs-update.png |  Bin 59360 -> 58908 bytes
 .../img/social/docs/recipes/hermes-agentplane.png  |  Bin 61944 -> 61607 bytes
 .../img/social/docs/recipes/security-review.png    |  Bin 60589 -> 60112 bytes
 website/static/img/social/docs/recipes/tdd.png     |  Bin 54065 -> 53763 bytes
 .../img/social/docs/reference/acr-schema.png       |  Bin 56259 -> 56131 bytes
 website/static/img/social/docs/reference/acr.png   |  Bin 61985 -> 61767 bytes
 .../reference/clean-task-core-rebuild-spec.png     |  Bin 65880 -> 65468 bytes
 website/static/img/social/docs/reference/cli.png   |  Bin 55650 -> 55546 bytes
 .../static/img/social/docs/reference/evidence.png  |  Bin 57642 -> 57155 bytes
 .../social/docs/reference/generated-reference.png  |  Bin 59953 -> 60246 bytes
 .../img/social/docs/reference/runner-handoff.png   |  Bin 59852 -> 60128 bytes
 .../social/docs/reference/task-observations.png    |  Bin 59380 -> 59123 bytes
 .../img/social/docs/reference/trace-schema.png     |  Bin 56182 -> 55896 bytes
 .../img/social/docs/reference/workflow-file.png    |  Bin 61156 -> 60709 bytes
 website/static/img/social/docs/releases.png        |  Bin 57249 -> 56603 bytes
 .../static/img/social/docs/releases/TEMPLATE.png   |  Bin 51936 -> 51354 bytes
 website/static/img/social/docs/releases/v0.1.3.png |  Bin 52900 -> 52155 bytes
 website/static/img/social/docs/releases/v0.1.4.png |  Bin 52245 -> 51466 bytes
 website/static/img/social/docs/releases/v0.1.5.png |  Bin 52784 -> 51955 bytes
 website/static/img/social/docs/releases/v0.1.6.png |  Bin 53047 -> 52300 bytes
 website/static/img/social/docs/releases/v0.1.7.png |  Bin 52214 -> 51555 bytes
 website/static/img/social/docs/releases/v0.1.8.png |  Bin 53170 -> 52281 bytes
 website/static/img/social/docs/releases/v0.1.9.png |  Bin 53116 -> 52309 bytes
 website/static/img/social/docs/releases/v0.2.0.png |  Bin 53564 -> 52810 bytes
 website/static/img/social/docs/releases/v0.2.1.png |  Bin 52623 -> 51959 bytes
 .../static/img/social/docs/releases/v0.2.10.png    |  Bin 53872 -> 53180 bytes
 .../static/img/social/docs/releases/v0.2.11.png    |  Bin 52864 -> 52203 bytes
 .../static/img/social/docs/releases/v0.2.12.png    |  Bin 53374 -> 52838 bytes
 .../static/img/social/docs/releases/v0.2.13.png    |  Bin 53722 -> 53160 bytes
 .../static/img/social/docs/releases/v0.2.14.png    |  Bin 53081 -> 52420 bytes
 .../static/img/social/docs/releases/v0.2.15.png    |  Bin 53651 -> 53026 bytes
 .../static/img/social/docs/releases/v0.2.16.png    |  Bin 53917 -> 53224 bytes
 .../static/img/social/docs/releases/v0.2.17.png    |  Bin 53171 -> 52507 bytes
 .../static/img/social/docs/releases/v0.2.18.png    |  Bin 53979 -> 53332 bytes
 .../static/img/social/docs/releases/v0.2.19.png    |  Bin 53916 -> 53286 bytes
 website/static/img/social/docs/releases/v0.2.2.png |  Bin 53156 -> 52518 bytes
 .../static/img/social/docs/releases/v0.2.20.png    |  Bin 54407 -> 53645 bytes
 .../static/img/social/docs/releases/v0.2.21.png    |  Bin 53377 -> 52779 bytes
 .../static/img/social/docs/releases/v0.2.22.png    |  Bin 53991 -> 53389 bytes
 .../static/img/social/docs/releases/v0.2.23.png    |  Bin 54307 -> 53643 bytes
 .../static/img/social/docs/releases/v0.2.24.png    |  Bin 53705 -> 53013 bytes
 .../static/img/social/docs/releases/v0.2.25.png    |  Bin 54238 -> 53490 bytes
 .../static/img/social/docs/releases/v0.2.26.png    |  Bin 54484 -> 53696 bytes
 website/static/img/social/docs/releases/v0.2.3.png |  Bin 53424 -> 52826 bytes
 website/static/img/social/docs/releases/v0.2.4.png |  Bin 52869 -> 52193 bytes
 website/static/img/social/docs/releases/v0.2.5.png |  Bin 53387 -> 52623 bytes
 website/static/img/social/docs/releases/v0.2.6.png |  Bin 53684 -> 52931 bytes
 website/static/img/social/docs/releases/v0.2.7.png |  Bin 52883 -> 52273 bytes
 website/static/img/social/docs/releases/v0.2.8.png |  Bin 53730 -> 52893 bytes
 website/static/img/social/docs/releases/v0.2.9.png |  Bin 53688 -> 52942 bytes
 website/static/img/social/docs/releases/v0.3.0.png |  Bin 53729 -> 52994 bytes
 website/static/img/social/docs/releases/v0.3.1.png |  Bin 52878 -> 52175 bytes
 .../static/img/social/docs/releases/v0.3.10.png    |  Bin 54014 -> 53372 bytes
 .../static/img/social/docs/releases/v0.3.11.png    |  Bin 53090 -> 52415 bytes
 .../static/img/social/docs/releases/v0.3.12.png    |  Bin 53709 -> 53064 bytes
 .../static/img/social/docs/releases/v0.3.13.png    |  Bin 53975 -> 53329 bytes
 .../static/img/social/docs/releases/v0.3.14.png    |  Bin 53337 -> 52660 bytes
 .../static/img/social/docs/releases/v0.3.15.png    |  Bin 53845 -> 53176 bytes
 .../static/img/social/docs/releases/v0.3.16.png    |  Bin 54104 -> 53422 bytes
 .../static/img/social/docs/releases/v0.3.17.png    |  Bin 53385 -> 52759 bytes
 .../static/img/social/docs/releases/v0.3.18.png    |  Bin 54171 -> 53495 bytes
 .../static/img/social/docs/releases/v0.3.19.png    |  Bin 54149 -> 53466 bytes
 website/static/img/social/docs/releases/v0.3.2.png |  Bin 53447 -> 52728 bytes
 .../static/img/social/docs/releases/v0.3.20.png    |  Bin 54727 -> 53858 bytes
 .../static/img/social/docs/releases/v0.3.21.png    |  Bin 53678 -> 53012 bytes
 .../static/img/social/docs/releases/v0.3.22.png    |  Bin 54337 -> 53585 bytes
 .../static/img/social/docs/releases/v0.3.23.png    |  Bin 54619 -> 53823 bytes
 .../static/img/social/docs/releases/v0.3.24.png    |  Bin 54002 -> 53226 bytes
 .../static/img/social/docs/releases/v0.3.25.png    |  Bin 54516 -> 53667 bytes
 .../static/img/social/docs/releases/v0.3.26.png    |  Bin 54885 -> 53948 bytes
 .../static/img/social/docs/releases/v0.3.27.png    |  Bin 53968 -> 53291 bytes
 .../static/img/social/docs/releases/v0.3.28.png    |  Bin 54843 -> 54005 bytes
 .../static/img/social/docs/releases/v0.3.29.png    |  Bin 54846 -> 53980 bytes
 website/static/img/social/docs/releases/v0.3.3.png |  Bin 53656 -> 52986 bytes
 website/static/img/social/docs/releases/v0.3.4.png |  Bin 53170 -> 52441 bytes
 website/static/img/social/docs/releases/v0.3.5.png |  Bin 53624 -> 52830 bytes
 website/static/img/social/docs/releases/v0.3.6.png |  Bin 53899 -> 53097 bytes
 website/static/img/social/docs/releases/v0.3.7.png |  Bin 53120 -> 52516 bytes
 website/static/img/social/docs/releases/v0.3.8.png |  Bin 53934 -> 53125 bytes
 website/static/img/social/docs/releases/v0.3.9.png |  Bin 53948 -> 53119 bytes
 website/static/img/social/docs/releases/v0.4.0.png |  Bin 53239 -> 52374 bytes
 website/static/img/social/docs/releases/v0.4.1.png |  Bin 52192 -> 51486 bytes
 website/static/img/social/docs/releases/v0.4.2.png |  Bin 52819 -> 52096 bytes
 website/static/img/social/docs/releases/v0.4.3.png |  Bin 53071 -> 52394 bytes
 website/static/img/social/docs/releases/v0.4.4.png |  Bin 52457 -> 51691 bytes
 .../img/social/docs/releases/v0.5.0-rc.1.png       |  Bin 55882 -> 54951 bytes
 website/static/img/social/docs/releases/v0.5.0.png |  Bin 53697 -> 52860 bytes
 website/static/img/social/docs/releases/v0.6.0.png |  Bin 53928 -> 53137 bytes
 website/static/img/social/docs/releases/v0.6.1.png |  Bin 53119 -> 52349 bytes
 .../static/img/social/docs/releases/v0.6.10.png    |  Bin 54242 -> 53495 bytes
 .../static/img/social/docs/releases/v0.6.11.png    |  Bin 53346 -> 52585 bytes
 .../static/img/social/docs/releases/v0.6.12.png    |  Bin 53906 -> 53204 bytes
 .../static/img/social/docs/releases/v0.6.13.png    |  Bin 54186 -> 53508 bytes
 .../static/img/social/docs/releases/v0.6.14.png    |  Bin 53591 -> 52780 bytes
 .../static/img/social/docs/releases/v0.6.15.png    |  Bin 54042 -> 53308 bytes
 .../static/img/social/docs/releases/v0.6.16.png    |  Bin 54346 -> 53546 bytes
 .../static/img/social/docs/releases/v0.6.17.png    |  Bin 53567 -> 52912 bytes
 .../static/img/social/docs/releases/v0.6.18.png    |  Bin 54453 -> 53670 bytes
 .../static/img/social/docs/releases/v0.6.19.png    |  Bin 54420 -> 53615 bytes
 website/static/img/social/docs/releases/v0.6.2.png |  Bin 53714 -> 52899 bytes
 .../static/img/social/docs/releases/v0.6.20.png    |  Bin 55025 -> 54005 bytes
 .../static/img/social/docs/releases/v0.6.21.png    |  Bin 53992 -> 53138 bytes
 .../static/img/social/docs/releases/v0.6.22.png    |  Bin 54603 -> 53730 bytes
 .../static/img/social/docs/releases/v0.6.23.png    |  Bin 54823 -> 54024 bytes
 .../static/img/social/docs/releases/v0.6.24.png    |  Bin 54287 -> 53357 bytes
 website/static/img/social/docs/releases/v0.6.3.png |  Bin 53913 -> 53166 bytes
 website/static/img/social/docs/releases/v0.6.4.png |  Bin 53390 -> 52589 bytes
 website/static/img/social/docs/releases/v0.6.5.png |  Bin 53821 -> 52959 bytes
 website/static/img/social/docs/releases/v0.6.6.png |  Bin 54017 -> 53231 bytes
 website/static/img/social/docs/releases/v0.6.7.png |  Bin 53396 -> 52664 bytes
 website/static/img/social/docs/releases/v0.6.8.png |  Bin 54215 -> 53198 bytes
 website/static/img/social/docs/releases/v0.6.9.png |  Bin 54149 -> 53268 bytes
 website/static/img/social/docs/releases/v0.7.0.png |  Bin 53239 -> 52424 bytes
 website/static/img/social/docs/releases/v0.7.1.png |  Bin 52228 -> 51523 bytes
 website/static/img/social/docs/releases/v0.7.2.png |  Bin 52852 -> 52164 bytes
 website/static/img/social/docs/releases/v0.7.3.png |  Bin 53092 -> 52451 bytes
 website/static/img/social/docs/releases/v0.7.4.png |  Bin 52576 -> 51787 bytes
 website/static/img/social/docs/releases/v0.7.5.png |  Bin 53016 -> 52241 bytes
 website/static/img/social/docs/releases/v0.7.6.png |  Bin 53331 -> 52540 bytes
 website/static/img/social/docs/releases/v0.7.7.png |  Bin 52375 -> 51876 bytes
 .../docs/releases/v0.7.9-evidence/preparation.png  |  Bin 0 -> 55103 bytes
 website/static/img/social/docs/releases/v0.7.9.png |  Bin 0 -> 52555 bytes
 website/static/img/social/docs/showcase.png        |  Bin 56396 -> 56133 bytes
 .../img/social/docs/start/first-local-run.png      |  Bin 53792 -> 53737 bytes
 .../static/img/social/docs/start/quickstart.png    |  Bin 54418 -> 54453 bytes
 .../social/docs/start/what-agentplane-writes.png   |  Bin 63974 -> 63695 bytes
 .../social/docs/user/agent-bootstrap.generated.png |  Bin 57481 -> 57645 bytes
 .../img/social/docs/user/agent-discovery.png       |  Bin 62721 -> 61904 bytes
 website/static/img/social/docs/user/agents.png     |  Bin 52719 -> 52623 bytes
 .../docs/user/branching-and-pr-artifacts.png       |  Bin 59349 -> 59347 bytes
 .../img/social/docs/user/breaking-changes.png      |  Bin 58510 -> 58163 bytes
 .../social/docs/user/cli-reference.generated.png   |  Bin 60915 -> 60881 bytes
 website/static/img/social/docs/user/commands.png   |  Bin 54337 -> 54406 bytes
 .../static/img/social/docs/user/configuration.png  |  Bin 55924 -> 55652 bytes
 .../user/indexing-and-webmaster-operations.png     |  Bin 64019 -> 63633 bytes
 .../static/img/social/docs/user/local-context.png  |  Bin 63763 -> 63925 bytes
 website/static/img/social/docs/user/overview.png   |  Bin 59979 -> 59616 bytes
 .../static/img/social/docs/user/prerequisites.png  |  Bin 55457 -> 55059 bytes
 website/static/img/social/docs/user/setup.png      |  Bin 51600 -> 51671 bytes
 .../static/img/social/docs/user/task-lifecycle.png |  Bin 55875 -> 55380 bytes
 .../img/social/docs/user/tasks-and-backends.png    |  Bin 58784 -> 58645 bytes
 .../static/img/social/docs/user/v0-7-migration.png |  Bin 61654 -> 61403 bytes
 website/static/img/social/docs/user/website-ia.png |  Bin 62132 -> 62127 bytes
 .../img/social/docs/user/workflow-migration.png    |  Bin 63204 -> 62914 bytes
 website/static/img/social/docs/user/workflow.png   |  Bin 54216 -> 53837 bytes
 website/static/img/social/docs/workflow-guides.png |  Bin 62914 -> 62151 bytes
 .../img/social/docs/workflow-guides/aider.png      |  Bin 61687 -> 61037 bytes
 .../img/social/docs/workflow-guides/branch-pr.png  |  Bin 59660 -> 59481 bytes
 .../social/docs/workflow-guides/claude-code.png    |  Bin 62826 -> 63397 bytes
 .../img/social/docs/workflow-guides/codex.png      |  Bin 62864 -> 62183 bytes
 .../img/social/docs/workflow-guides/cursor.png     |  Bin 62097 -> 61913 bytes
 .../social/docs/workflow-guides/github-actions.png |  Bin 60625 -> 60142 bytes
 .../social/docs/workflow-guides/hermes-kanban.png  |  Bin 61420 -> 62057 bytes
 website/static/img/social/manifest.json            |   16 +
 271 files changed, 4136 insertions(+), 215 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
