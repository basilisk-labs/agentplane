# Stable 0.7.12 Qualification

## Verified Candidate

- Implementation commit: `c39a66a100f7c8ee2b68492b4eba4a14e608a8be`.
- Base commit: `0ca8b380cab196690f0df45433e695adfeba44f0`.
- The native implementation checks passed, including `release:prepublish` (6,133,442 ms).
- The independent read-only EVALUATOR returned PASS. Its compact result is recorded in the task's native quality artifact.
- The separate native final validation passed all six commands. The unmodified native evidence is retained in `final-validation.json`.
- Evidence file SHA-256: `1a29f7e05669bee0fe2d0d61284476258dd351f93e5ecabb952e676080af6c86`.

## Final Check Results

| Command | Exit Code | Duration (ms) |
| --- | --- | --- |
| `bun run release:parity` | 0 | 722 |
| `bun run release:tasks:check -- --allow-active-release-task` | 0 | 4,446 |
| `bun run release:prepublish` | 0 | 5,909,790 |
| `node .agentplane/policy/check-routing.mjs` | 0 | 739 |
| `agentplane doctor` | 0 | 51,258 |
| `bun run ci:local:full` | 0 | 2,323,348 |

## Operator Recovery Boundary

The user explicitly authorized operator recovery and necessary repository-policy overrides for this release. The user prohibited deletion of the GitHub repository.

After successful checks, the supervisor persisted an operational verification record but failed while refreshing PR metadata. The branch ownership guard rejects compact archival summaries under the already completed task `202609261720-KKE9ZN`. The summaries replace four prohibited volatile provider logs. The original bytes remain available in Git history and the local recovery archive. The completed task cannot be added to a new branch PR batch through the current CLI.

The canonical aggregate therefore still has no final-validation record. This report does not claim canonical task completion or successful publication. The immutable native final-check evidence is the source for the check results above. The generated operational verification record refers to the shared declared-check path; use the retained final-validation evidence for the complete six-command result.

The operator will publish the candidate through a normal GitHub PR and retain all required protected-main checks. This exception does not authorize bypassing GitHub branch protection, fabricating task receipts, changing the approved release version, or weakening release qualification. Exact-SHA hosted readiness and post-publication audit remain required.

## Remaining Gates

- Protected-main PR verification and integration.
- Exact-SHA Core CI release-ready artifact.
- GitHub publication workflow and successful publish-result manifest.
- Public package and distribution readback, published-install smoke, and post-publication audit.

M04 efficiency remains NOT ESTABLISHED. Live-provider containment is not certified by this release evidence.

## Post-Qualification Dependency Repair

The first candidate push exposed Dependabot alert 2 (GHSA-82fw-gwwq-j7x9). The advisory affects the development test toolchain's mock redirect file-serving boundary. Vitest 4.1.11 is the first patched release. The operator updated the exact Vitest and coverage-provider pins from 4.1.9 to 4.1.11 under the user's explicit release-defect repair authorization. The product version remains 0.7.12.

The native evidence above applies to implementation commit `c39a66a100f7c8ee2b68492b4eba4a14e608a8be` before this dependency repair. Qualification of the repaired dependency graph must be recorded separately. The earlier pass must not be represented as a pass of the changed lockfile.

The operator ran `bun run ci:local:full` on repair commit `a3c6bcf1193672debd04e62c5414e3afb494302b` with Vitest 4.1.11. It exited 0. All five execution groups passed. The core suite reported 692 passing files, 5970 passing tests, and one existing skipped test. All five critical CLI groups passed. The documentation site, workflow coverage (98 tests), significant coverage (101 tests), and coverage contract passed. The ignored full log has SHA-256 `0f215e2dadb3d397eaf0a2e3b7f72ceb7427c0da811b8b3a8fa0f5a18c680c2b`. A new release prepublish run and hosted checks remain required for this repaired graph.

The subsequent prepublish run passed groups 1-51 but failed two replay-hardening tests in group 52 with `ANCHOR_LOCK_MISMATCH`. The historical anchor validator rejected the security patch's development-only lock delta. The operator added a narrowly scoped projection bound to the complete hashes of the reviewed 4.1.9 and 4.1.11 package subsets. The projection preserves the frozen subject and full comparison of all remaining lock data. It rejects altered pins, versions, integrity, registry, metadata, unrelated packages, added or missing packages, and subject tampering.

Focused replay validation passed with Vitest 4.1.11: two files and 22 tests, including the real offline exact-anchor adapter-failure entrypoint. Targeted ESLint and the frozen replay-baseline check also passed. The historical baseline was not regenerated. A complete prepublish rerun remains required after this repair.
