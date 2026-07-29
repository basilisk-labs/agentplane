# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- The frozen checks artifact contains no command-level verification records, runner history, or runtime evidence, so the claimed dependency-present, dependency-blocked, routing-policy, and doctor results cannot be independently verified or bound to the evaluated SHA.

## Evidence
- .agentplane/tasks/202607291428-SNSCBP/quality/20260729-181447307-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607291428-SNSCBP/README.md

## Missing Tests
- Capture the exact output and exit status of `node packages/agentplane/bin/agentplane.js task show 202607221908-MR9EA9`, proving `depends_on` contains `202607291148-1F9GZD` at evaluated SHA `6c8a2220d5e5fcb2896a11b13aa57300a3038b43`.
- Capture the exact output and exit status of `node packages/agentplane/bin/agentplane.js task active`, proving beta.1 qualification is blocked while `202607291148-1F9GZD` is absent or incomplete.
- Capture SHA-bound outputs and exit statuses for `node .agentplane/policy/check-routing.mjs` and `node packages/agentplane/bin/agentplane.js doctor`.

## Hidden Assumptions
- Narrative verification entries in the task README accurately reflect commands executed against the evaluated SHA despite the authoritative observed-checks artifact containing no corresponding records.
- A missing dependency and an incomplete dependency produce equivalent blocking behavior; the frozen evidence proves neither runtime case.

## Residual Risks
- Regenerate the frozen observed-checks evidence with command outputs, exit statuses, and evaluated-SHA binding for the dependency-present, dependency-blocked, routing-policy, and doctor checks, then repeat semantic evaluation without changing scope.
