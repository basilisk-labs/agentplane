# 0.7.12 Planning Release Handoff

## Implementation Boundary

Task `202609261720-KKE9ZN` implements the PL-01 through PL-12 planning scope. A sufficient supplied
Plan uses the existing Kernel proposal and approval path without a separate PLANNER dispatch.
Required planning, verification, independent EVALUATOR review, exact result binding, and external
authority remain enforced. No 0.7.13 Recipe contract or 0.7.14 review-omission behavior is included.

See [workflow](../user/workflow.mdx), [task lifecycle](../user/task-lifecycle.mdx), and the
[M04 disposition](v0.7.12-m04.md). M04 is **NOT ESTABLISHED**. No full-host token, cost, or latency
improvement and no live-provider containment certification is claimed.

PL-10 installed qualification at `bb6cfaf0da9981370fb03d0ebcd574b88202fa8e` passed six planning
scenarios, eight migration scenarios, and 64 release-critical tests across 11 files. PL-11 records
the measurement limitations at `db14bb4aad12c31a04d895967442d0b5db3bcd2b`. These are intermediate
source identities, not the final stable release SHA.

PL-12 corrects create output for supplied input: `status=advance_required` and
`required_role=null` defer the planning decision to the coordinator. Unsupplied intake retains
`semantic_input_required` and `PLANNER`. Public documentation and the generated CLI reference
include `--plan-file`. New immutable input provenance fields require upgraded writers; older
strict writers must not mutate those records.

The website discovery corpus was regenerated in the explicit user-authorized operator commit
`78914ea0f89749a7b2e94de5a0b74ed50de94b01`. The controller then observed the exact changed path
and recorded USER approval through `task scope extend`, request
`sha256:35e64b36ed666fd04d9b7311f26dfeee3233109465f73f3eda55d31aa00ea8c1`.
The operator commit bypassed local commit hooks; it does not replace the required native checks
or final release gates. No runtime authority guard was weakened for this documentation change.

## Remaining Release Gates

This handoff is not publication evidence. The workspace package version is still
`0.7.12-beta.1` at the planning implementation boundary.

1. Complete native PL-12 verification and review. Integrate the feature through the normal
   protected-main workflow. Include the already-merged repair from
   `81fc89167d9d7655bd29664849af6fa2eb4bb054`; this feature started before that repair.
2. Use the release task and approved stable version `0.7.12`. Freeze exact package versions and
   internal dependencies, regenerate release notes from actual included commits, and refresh
   compatibility candidate provenance and generated release assets against the resulting source.
   Do not modify immutable published baselines to make checks pass.
3. Run `bun run release:check`, `bun run release:check:registry`, and
   `bun run release:ci-check` at the final candidate. The latter includes contract checks,
   packed-install smoke, workflow/significant coverage, release-critical tests, and generated
   references. Also verify generated site/corpus freshness. Preserve failed attempts and fix
   their causes before repeating the gates.
4. Require successful hosted checks and the release-ready artifact for the exact protected-main
   SHA. Local green checks or intermediate WorkItem commits are not substitutes.
5. Publish through the repository's release workflow under the user's explicit release authority.
   Verify the npm versions and distribution tags, Git tag and GitHub Release, standalone assets,
   and package-manager/distribution evidence. Run published-package smoke and postpublish audit.
6. Report production success only after those observations match the exact released SHA and
   version. Record remaining unavailable distribution evidence as a blocker, not a successful
   release.

Repository deletion is prohibited by the user. Existing task history, failure evidence, stashes,
and unrelated work must be preserved.
