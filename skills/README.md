<p align="center">
  <img src="../docs/assets/readme-headers/skills.svg" alt="AgentPlane skills header" style="width:100%;max-width:100%;"/>
</p>

# Repository-local skills

This directory stores repo-local development skills that are useful while
working in this repository.

Each skill lives under `skills/<name>/` and should keep its original entrypoint
file as `SKILL.md`.

Current skills:

- `agentplane-release-and-packaging-operator`
  - Source: repo-local extraction from Agentplane release incidents, GitHub issue #467, and recent release CI build-order failures.
  - Use for release readiness, package build ordering, npm publish evidence, public install smoke tests, and release recovery.
- `agentplane-local-dev-operator`
  - Source: repo-local extraction from local CI selector, Turborepo overlay, branch_pr task-scope guardrails, and dependency triage patterns.
  - Use for targeted local checks, task worktree scope validation, graph-aware evidence, and dependency bump triage.
- `agentplane-testkit-migration`
  - Source: repo-local extraction from Epic E' testkit consolidation tasks and incidents INC-20260419-03 through INC-20260419-05.
  - Use for migrating tests to `@agentplane/testkit`, fixing testkit export/build failures, and splitting large test suites safely.
- `agentplane-task-closure-recovery`
  - Source: repo-local extraction from direct/branch_pr closure incidents INC-20260419-01 and INC-20260419-02 plus related task closure fixes.
  - Use for `finish`, `hosted-close`, close-tail, PR metadata, dirty artifact, and remote branch divergence recovery.

Vendored skills:

- `humanizer`
  - Source: https://github.com/blader/humanizer
  - Upstream commit: `d8085c7da5ddb9a179572837d4806b68cde3e9ff`
