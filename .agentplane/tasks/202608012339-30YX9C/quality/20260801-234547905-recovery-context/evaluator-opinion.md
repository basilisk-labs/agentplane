# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The documentation-path exception permits every file beneath website/static/img/social, including implementation or executable files that are not generated social-card artifacts.

## Evidence
- .agentplane/tasks/202608012339-30YX9C/quality/20260801-234547905-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608012339-30YX9C/README.md

## Missing Tests
- Verify that a docs.change task is rejected when staging a non-artifact implementation or executable file such as website/static/img/social/generate.ts or website/static/img/social/build.sh.
- Verify the complete intended allowlist of generated social-card artifact types and manifest paths independently, rather than only in one combined positive case.

## Hidden Assumptions
- Everything placed beneath website/static/img/social is assumed to be a generated documentation artifact regardless of file type or purpose.
- The existing website/src negative case is assumed to prove implementation paths remain blocked even inside the newly exempted social-artifact subtree.

## Residual Risks
- Narrow the social-card exception to the canonical generated artifact paths or permitted artifact extensions, then add an adversarial negative test for implementation or executable content inside website/static/img/social and rerun the focused policy test and full documentation-site gate.
