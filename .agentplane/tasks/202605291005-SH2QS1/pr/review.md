# PR Review

Created: 2026-05-29T10:07:05.504Z

## Task

- Task: `202605291005-SH2QS1`
- Title: Fix social preview subtitle slogan
- Status: DOING
- Branch: `task/202605291005-SH2QS1/fix-social-preview-subtitle-slogan`
- Canonical task record: `.agentplane/tasks/202605291005-SH2QS1/README.md`

## Verification

- State: ok
- Note: Command: bun run docs:social:generate; Result: pass; Evidence: generated 0 docs social images (203 unchanged). Command: bun run docs:social:check; Result: pass; Evidence: checked 203 docs social images. Command: cd website && node scripts/generate-social-images.mjs --check --strict; Result: pass. Command: bun run docs:readme-header:generate; Result: pass; Evidence: generated 14 README header images for v0.6.12 and linked 13 README files. Command: bun run docs:readme-header:check; Result: pass. Command: bun run docs:scripts:generate and bun run docs:scripts:check; Result: pass; Evidence: scripts/README.md is up to date after normalizing the scripts README generator casing. Command: bun run --cwd website check-content; Result: pass; Evidence: site-content ok. Command: bun run docs:site:build; Result: pass; Evidence: Docusaurus build generated static files and navigation-check passed. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: bunx eslint website/scripts/generate-social-images.mjs scripts/generate/generate-readme-header.mjs scripts/generate/generate-scripts-readme.mjs; Result: pass. Command: git diff --check; Result: pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T10:07:05.504Z
- Branch: task/202605291005-SH2QS1/fix-social-preview-subtitle-slogan
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/assets/header.svg                             |   9 +-
 docs/assets/readme-headers/adr.svg                 |   9 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   9 +-
 docs/assets/readme-headers/agentplane.svg          |   9 +-
 docs/assets/readme-headers/core.svg                |   9 +-
 docs/assets/readme-headers/docs.svg                |   9 +-
 docs/assets/readme-headers/humanizer.svg           |   9 +-
 docs/assets/readme-headers/recipes.svg             |   9 +-
 docs/assets/readme-headers/releases.svg            |   9 +-
 docs/assets/readme-headers/schemas.svg             |   9 +-
 docs/assets/readme-headers/scripts.svg             |   9 +-
 docs/assets/readme-headers/skills.svg              |   9 +-
 docs/assets/readme-headers/spec.svg                |   9 +-
 docs/assets/readme-headers/testkit.svg             |   9 +-
 packages/agentplane/README.md                      |   2 +-
 packages/core/README.md                            |   2 +-
 packages/recipes/README.md                         |   2 +-
 packages/spec/README.md                            |   2 +-
 packages/testkit/README.md                         |   2 +-
 schemas/README.md                                  |   2 +-
 scripts/README.md                                  |   2 +-
 scripts/generate/generate-readme-header.mjs        | 128 +---
 scripts/generate/generate-scripts-readme.mjs       |   2 +-
 skills/README.md                                   |   2 +-
 skills/humanizer/README.md                         |   2 +-
 website/scripts/generate-social-images.mjs         |  37 +-
 website/static/img/social/docs.png                 | Bin 46332 -> 61573 bytes
 .../img/social/docs/adr/0001-zod-config-parity.png | Bin 50908 -> 60703 bytes
 .../img/social/docs/adr/0002-adr-process.png       | Bin 48139 -> 58776 bytes
 .../social/docs/adr/0003-refactor-sequencing.png   | Bin 54258 -> 63536 bytes
 .../social/docs/adr/0004-keep-custom-cli-stack.png | Bin 52349 -> 61558 bytes
 .../social/docs/adr/0005-defer-biome-migration.png | Bin 52142 -> 61297 bytes
 .../docs/adr/0006-no-effect-fp-ts-migration.png    | Bin 54889 -> 63732 bytes
 .../docs/adr/0007-freeze-yaml-parser-stack.png     | Bin 54950 -> 63598 bytes
 .../adr/0008-keep-yauzl-for-zip-validation.png     | Bin 55325 -> 63437 bytes
 ...0009-recipes-index-signing-algorithm-policy.png | Bin 61683 -> 68559 bytes
 .../adr/0010-core-root-export-compatibility.png    | Bin 56584 -> 64462 bytes
 .../social/docs/adr/0011-v0.3-surface-freeze.png   | Bin 51607 -> 61190 bytes
 .../docs/adr/0012-v0.4-surface-transition.png      | Bin 51361 -> 60565 bytes
 .../img/social/docs/adr/0013-zod-contract-ssot.png | Bin 51788 -> 61779 bytes
 .../docs/archive/v0-3/cli-bug-ledger-v0-3-x.png    | Bin 56146 -> 64869 bytes
 .../archive/v0-3/framework-refactor-program.png    | Bin 59271 -> 67228 bytes
 website/static/img/social/docs/compare.png         | Bin 49390 -> 62671 bytes
 .../img/social/docs/concepts/agent-workflows.png   | Bin 48606 -> 58773 bytes
 .../social/docs/concepts/context-engineering.png   | Bin 54216 -> 64016 bytes
 .../social/docs/concepts/harness-engineering.png   | Bin 54014 -> 63824 bytes
 website/static/img/social/docs/concepts/traces.png | Bin 48553 -> 60250 bytes
 website/static/img/social/docs/context.png         | Bin 39194 -> 53313 bytes
 .../static/img/social/docs/context/agent-guide.png | Bin 53542 -> 64728 bytes
 website/static/img/social/docs/context/files.png   | Bin 47210 -> 59700 bytes
 website/static/img/social/docs/context/ingest.png  | Bin 49744 -> 61656 bytes
 website/static/img/social/docs/context/modes.png   | Bin 48886 -> 60889 bytes
 .../static/img/social/docs/context/quickstart.png  | Bin 46750 -> 58365 bytes
 website/static/img/social/docs/context/review.png  | Bin 49496 -> 61403 bytes
 .../img/social/docs/context/troubleshooting.png    | Bin 50675 -> 61090 bytes
 .../docs/contributing/citation-guidelines.png      | Bin 49814 -> 59345 bytes
 .../agent-change-record-implementation.png         | Bin 54042 -> 60780 bytes
 .../img/social/docs/developer/architecture.png     | Bin 44452 -> 55549 bytes
 .../img/social/docs/developer/blueprints.png       | Bin 42568 -> 54052 bytes
 .../img/social/docs/developer/cli-contract.png     | Bin 43874 -> 55054 bytes
 .../img/social/docs/developer/cli-help-json.png    | Bin 55152 -> 66002 bytes
 .../img/social/docs/developer/close-taxonomy.png   | Bin 48434 -> 58462 bytes
 .../developer/cloud-backend-integration-plan.png   | Bin 56567 -> 64385 bytes
 .../img/social/docs/developer/code-quality.png     | Bin 50188 -> 60525 bytes
 .../img/social/docs/developer/contributing.png     | Bin 44704 -> 55827 bytes
 .../social/docs/developer/design-principles.png    | Bin 48993 -> 58724 bytes
 .../documentation-information-architecture.png     | Bin 57447 -> 64528 bytes
 .../evaluation-and-recursive-improvement.png       | Bin 56836 -> 63875 bytes
 .../img/social/docs/developer/harness-dev.png      | Bin 52193 -> 62779 bytes
 .../social/docs/developer/harness-engineering.png  | Bin 49816 -> 59180 bytes
 .../img/social/docs/developer/incident-archive.png | Bin 46652 -> 57013 bytes
 .../img/social/docs/developer/local-context.png    | Bin 50283 -> 60695 bytes
 .../docs/developer/modular-prompt-assembly.png     | Bin 53658 -> 62112 bytes
 .../img/social/docs/developer/module-topology.png  | Bin 49168 -> 58942 bytes
 .../docs/developer/performance-baselines.png       | Bin 51739 -> 60553 bytes
 .../img/social/docs/developer/project-layout.png   | Bin 46396 -> 56763 bytes
 .../social/docs/developer/recipes-development.png  | Bin 51284 -> 60384 bytes
 .../social/docs/developer/recipes-how-it-works.png | Bin 49100 -> 58451 bytes
 .../img/social/docs/developer/recipes-safety.png   | Bin 48015 -> 58165 bytes
 .../img/social/docs/developer/recipes-spec.png     | Bin 50951 -> 61237 bytes
 .../docs/developer/release-and-publishing.png      | Bin 51792 -> 60591 bytes
 .../docs/developer/schema-validation-strategy.png  | Bin 54509 -> 62571 bytes
 .../social/docs/developer/testing-and-quality.png  | Bin 49150 -> 58750 bytes
 .../docs/developer/typescript-esm-imports.png      | Bin 52786 -> 61638 bytes
 .../docs/developer/website-success-metrics.png     | Bin 54285 -> 62889 bytes
 .../social/docs/developer/workflow-contract.png    | Bin 49900 -> 59594 bytes
 .../developer/workflow-harness-test-matrix.png     | Bin 53757 -> 61892 bytes
 .../docs/examples/debug-agent-run-with-traces.png  | Bin 55155 -> 63647 bytes
 .../img/social/docs/examples/export-traces.png     | Bin 45039 -> 55903 bytes
 .../social/docs/help/broken-workflow-runbook.png   | Bin 50665 -> 60330 bytes
 website/static/img/social/docs/help/glossary.png   | Bin 41615 -> 54178 bytes
 .../social/docs/help/legacy-upgrade-recovery.png   | Bin 48997 -> 58425 bytes
 .../docs/help/troubleshooting-by-symptom.png       | Bin 51874 -> 60884 bytes
 .../img/social/docs/help/troubleshooting.png       | Bin 45350 -> 56674 bytes
 .../social/docs/internal/git-mutation-model.png    | Bin 47484 -> 58175 bytes
 .../static/img/social/docs/launch/checklist.png    | Bin 41127 -> 53663 bytes
 website/static/img/social/docs/launch/hn.png       | Bin 34240 -> 47742 bytes
 website/static/img/social/docs/launch/reddit.png   | Bin 38735 -> 51743 bytes
 website/static/img/social/docs/launch/twitter.png  | Bin 38656 -> 51565 bytes
 website/static/img/social/docs/listing.png         | Bin 45648 -> 59479 bytes
 website/static/img/social/docs/manifesto.png       | Bin 48980 -> 62155 bytes
 website/static/img/social/docs/recipes.png         | Bin 39788 -> 53907 bytes
 .../static/img/social/docs/recipes/docs-update.png | Bin 48365 -> 59360 bytes
 .../img/social/docs/recipes/security-review.png    | Bin 50090 -> 60589 bytes
 website/static/img/social/docs/recipes/tdd.png     | Bin 40873 -> 54065 bytes
 .../img/social/docs/reference/acr-schema.png       | Bin 44807 -> 56259 bytes
 website/static/img/social/docs/reference/acr.png   | Bin 49637 -> 61985 bytes
 website/static/img/social/docs/reference/cli.png   | Bin 42652 -> 55650 bytes
 .../static/img/social/docs/reference/evidence.png  | Bin 46086 -> 57642 bytes
 .../social/docs/reference/generated-reference.png  | Bin 50476 -> 59953 bytes
 .../img/social/docs/reference/runner-handoff.png   | Bin 49027 -> 59852 bytes
 .../social/docs/reference/task-observations.png    | Bin 49596 -> 59380 bytes
 .../img/social/docs/reference/trace-schema.png     | Bin 45013 -> 56182 bytes
 .../img/social/docs/reference/workflow-file.png    | Bin 50513 -> 61156 bytes
 website/static/img/social/docs/releases.png        | Bin 43687 -> 57249 bytes
 .../static/img/social/docs/releases/TEMPLATE.png   | Bin 39652 -> 51936 bytes
 website/static/img/social/docs/releases/v0.1.3.png | Bin 40536 -> 52900 bytes
 website/static/img/social/docs/releases/v0.1.4.png | Bin 39831 -> 52245 bytes
 website/static/img/social/docs/releases/v0.1.5.png | Bin 40378 -> 52784 bytes
 website/static/img/social/docs/releases/v0.1.6.png | Bin 40746 -> 53047 bytes
 website/static/img/social/docs/releases/v0.1.7.png | Bin 39798 -> 52214 bytes
 website/static/img/social/docs/releases/v0.1.8.png | Bin 40876 -> 53170 bytes
 website/static/img/social/docs/releases/v0.1.9.png | Bin 40808 -> 53116 bytes
 website/static/img/social/docs/releases/v0.2.0.png | Bin 41372 -> 53564 bytes
 website/static/img/social/docs/releases/v0.2.1.png | Bin 40209 -> 52623 bytes
 .../static/img/social/docs/releases/v0.2.10.png    | Bin 41800 -> 53872 bytes
 .../static/img/social/docs/releases/v0.2.11.png    | Bin 40537 -> 52864 bytes
 .../static/img/social/docs/releases/v0.2.12.png    | Bin 41184 -> 53374 bytes
 .../static/img/social/docs/releases/v0.2.13.png    | Bin 41566 -> 53722 bytes
 .../static/img/social/docs/releases/v0.2.14.png    | Bin 40847 -> 53081 bytes
 .../static/img/social/docs/releases/v0.2.15.png    | Bin 41438 -> 53651 bytes
 .../static/img/social/docs/releases/v0.2.16.png    | Bin 41797 -> 53917 bytes
 .../static/img/social/docs/releases/v0.2.17.png    | Bin 40912 -> 53171 bytes
 .../static/img/social/docs/releases/v0.2.18.png    | Bin 41910 -> 53979 bytes
 .../static/img/social/docs/releases/v0.2.19.png    | Bin 41826 -> 53916 bytes
 website/static/img/social/docs/releases/v0.2.2.png | Bin 40846 -> 53156 bytes
 .../static/img/social/docs/releases/v0.2.20.png    | Bin 42485 -> 54407 bytes
 .../static/img/social/docs/releases/v0.2.21.png    | Bin 41207 -> 53377 bytes
 .../static/img/social/docs/releases/v0.2.22.png    | Bin 41897 -> 53991 bytes
 .../static/img/social/docs/releases/v0.2.23.png    | Bin 42286 -> 54307 bytes
 .../static/img/social/docs/releases/v0.2.24.png    | Bin 41575 -> 53705 bytes
 .../static/img/social/docs/releases/v0.2.25.png    | Bin 42170 -> 54238 bytes
 .../static/img/social/docs/releases/v0.2.26.png    | Bin 42520 -> 54484 bytes
 website/static/img/social/docs/releases/v0.2.3.png | Bin 41167 -> 53424 bytes
 website/static/img/social/docs/releases/v0.2.4.png | Bin 40526 -> 52869 bytes
 website/static/img/social/docs/releases/v0.2.5.png | Bin 41081 -> 53387 bytes
 website/static/img/social/docs/releases/v0.2.6.png | Bin 41466 -> 53684 bytes
 website/static/img/social/docs/releases/v0.2.7.png | Bin 40553 -> 52883 bytes
 website/static/img/social/docs/releases/v0.2.8.png | Bin 41523 -> 53730 bytes
 website/static/img/social/docs/releases/v0.2.9.png | Bin 41461 -> 53688 bytes
 website/static/img/social/docs/releases/v0.3.0.png | Bin 41614 -> 53729 bytes
 website/static/img/social/docs/releases/v0.3.1.png | Bin 40545 -> 52878 bytes
 .../static/img/social/docs/releases/v0.3.10.png    | Bin 42037 -> 54014 bytes
 .../static/img/social/docs/releases/v0.3.11.png    | Bin 40848 -> 53090 bytes
 .../static/img/social/docs/releases/v0.3.12.png    | Bin 41592 -> 53709 bytes
 .../static/img/social/docs/releases/v0.3.13.png    | Bin 41924 -> 53975 bytes
 .../static/img/social/docs/releases/v0.3.14.png    | Bin 41186 -> 53337 bytes
 .../static/img/social/docs/releases/v0.3.15.png    | Bin 41718 -> 53845 bytes
 .../static/img/social/docs/releases/v0.3.16.png    | Bin 42091 -> 54104 bytes
 .../static/img/social/docs/releases/v0.3.17.png    | Bin 41213 -> 53385 bytes
 .../static/img/social/docs/releases/v0.3.18.png    | Bin 42202 -> 54171 bytes
 .../static/img/social/docs/releases/v0.3.19.png    | Bin 42168 -> 54149 bytes
 website/static/img/social/docs/releases/v0.3.2.png | Bin 41225 -> 53447 bytes
 .../static/img/social/docs/releases/v0.3.20.png    | Bin 42909 -> 54727 bytes
 .../static/img/social/docs/releases/v0.3.21.png    | Bin 41571 -> 53678 bytes
 .../static/img/social/docs/releases/v0.3.22.png    | Bin 42362 -> 54337 bytes
 .../static/img/social/docs/releases/v0.3.23.png    | Bin 42720 -> 54619 bytes
 .../static/img/social/docs/releases/v0.3.24.png    | Bin 41944 -> 54002 bytes
 .../static/img/social/docs/releases/v0.3.25.png    | Bin 42555 -> 54516 bytes
 .../static/img/social/docs/releases/v0.3.26.png    | Bin 43027 -> 54885 bytes
 .../static/img/social/docs/releases/v0.3.27.png    | Bin 41908 -> 53968 bytes
 .../static/img/social/docs/releases/v0.3.28.png    | Bin 43002 -> 54843 bytes
 .../static/img/social/docs/releases/v0.3.29.png    | Bin 43008 -> 54846 bytes
 website/static/img/social/docs/releases/v0.3.3.png | Bin 41468 -> 53656 bytes
 website/static/img/social/docs/releases/v0.3.4.png | Bin 40896 -> 53170 bytes
 website/static/img/social/docs/releases/v0.3.5.png | Bin 41396 -> 53624 bytes
 website/static/img/social/docs/releases/v0.3.6.png | Bin 41773 -> 53899 bytes
 website/static/img/social/docs/releases/v0.3.7.png | Bin 40877 -> 53120 bytes
 website/static/img/social/docs/releases/v0.3.8.png | Bin 41814 -> 53934 bytes
 website/static/img/social/docs/releases/v0.3.9.png | Bin 41821 -> 53948 bytes
 website/static/img/social/docs/releases/v0.4.0.png | Bin 41011 -> 53239 bytes
 website/static/img/social/docs/releases/v0.4.1.png | Bin 39770 -> 52192 bytes
 website/static/img/social/docs/releases/v0.4.2.png | Bin 40485 -> 52819 bytes
 website/static/img/social/docs/releases/v0.4.3.png | Bin 40775 -> 53071 bytes
 website/static/img/social/docs/releases/v0.4.4.png | Bin 40105 -> 52457 bytes
 .../img/social/docs/releases/v0.5.0-rc.1.png       | Bin 44257 -> 55882 bytes
 website/static/img/social/docs/releases/v0.5.0.png | Bin 41491 -> 53697 bytes
 website/static/img/social/docs/releases/v0.6.0.png | Bin 41815 -> 53928 bytes
 website/static/img/social/docs/releases/v0.6.1.png | Bin 40783 -> 53119 bytes
 .../static/img/social/docs/releases/v0.6.10.png    | Bin 42299 -> 54242 bytes
 .../static/img/social/docs/releases/v0.6.11.png    | Bin 41116 -> 53346 bytes
 .../static/img/social/docs/releases/v0.6.12.png    | Bin 41784 -> 53906 bytes
 website/static/img/social/docs/releases/v0.6.2.png | Bin 41467 -> 53714 bytes
 website/static/img/social/docs/releases/v0.6.3.png | Bin 41712 -> 53913 bytes
 website/static/img/social/docs/releases/v0.6.4.png | Bin 41128 -> 53390 bytes
 website/static/img/social/docs/releases/v0.6.5.png | Bin 41594 -> 53821 bytes
 website/static/img/social/docs/releases/v0.6.6.png | Bin 41898 -> 54017 bytes
 website/static/img/social/docs/releases/v0.6.7.png | Bin 41158 -> 53396 bytes
 website/static/img/social/docs/releases/v0.6.8.png | Bin 42124 -> 54215 bytes
 website/static/img/social/docs/releases/v0.6.9.png | Bin 42033 -> 54149 bytes
 website/static/img/social/docs/showcase.png        | Bin 42968 -> 56396 bytes
 .../img/social/docs/start/first-local-run.png      | Bin 41602 -> 53792 bytes
 .../static/img/social/docs/start/quickstart.png    | Bin 41900 -> 54418 bytes
 .../social/docs/start/what-agentplane-writes.png   | Bin 54061 -> 63974 bytes
 .../social/docs/user/agent-bootstrap.generated.png | Bin 48217 -> 57481 bytes
 .../img/social/docs/user/agent-discovery.png       | Bin 51893 -> 62721 bytes
 website/static/img/social/docs/user/agents.png     | Bin 39712 -> 52719 bytes
 .../docs/user/branching-and-pr-artifacts.png       | Bin 49845 -> 59349 bytes
 .../img/social/docs/user/breaking-changes.png      | Bin 47776 -> 58510 bytes
 .../social/docs/user/cli-reference.generated.png   | Bin 51176 -> 60915 bytes
 website/static/img/social/docs/user/commands.png   | Bin 41687 -> 54337 bytes
 .../static/img/social/docs/user/configuration.png  | Bin 43939 -> 55924 bytes
 .../user/indexing-and-webmaster-operations.png     | Bin 55801 -> 64019 bytes
 .../static/img/social/docs/user/local-context.png  | Bin 52093 -> 63763 bytes
 website/static/img/social/docs/user/overview.png   | Bin 47815 -> 59979 bytes
 .../static/img/social/docs/user/prerequisites.png  | Bin 43608 -> 55457 bytes
 website/static/img/social/docs/user/setup.png      | Bin 38305 -> 51600 bytes
 .../static/img/social/docs/user/task-lifecycle.png | Bin 44156 -> 55875 bytes
 .../img/social/docs/user/tasks-and-backends.png    | Bin 48269 -> 58784 bytes
 website/static/img/social/docs/user/website-ia.png | Bin 51248 -> 63166 bytes
 .../img/social/docs/user/workflow-migration.png    | Bin 50682 -> 61355 bytes
 website/static/img/social/docs/user/workflow.png   | Bin 41541 -> 54216 bytes
 website/static/img/social/docs/workflow-guides.png | Bin 50994 -> 62914 bytes
 .../img/social/docs/workflow-guides/aider.png      | Bin 51054 -> 61687 bytes
 .../img/social/docs/workflow-guides/branch-pr.png  | Bin 49439 -> 59660 bytes
 .../social/docs/workflow-guides/claude-code.png    | Bin 53178 -> 62826 bytes
 .../img/social/docs/workflow-guides/codex.png      | Bin 52337 -> 62864 bytes
 .../img/social/docs/workflow-guides/cursor.png     | Bin 51558 -> 62097 bytes
 .../social/docs/workflow-guides/github-actions.png | Bin 51384 -> 60625 bytes
 website/static/img/social/manifest.json            | 812 ++++++++++-----------
 230 files changed, 530 insertions(+), 593 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
