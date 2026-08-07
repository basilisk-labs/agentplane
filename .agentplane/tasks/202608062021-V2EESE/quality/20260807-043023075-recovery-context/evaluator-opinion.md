# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The semantic projection drops an entire eligible gateway fragment whenever any forbidden command appears in that fragment, so mixed fragments lose valid scope or security constraints together with process choreography.
- The exact-provider-input guard covers only a narrow command list and then bypasses all inspection for broadly classified process-mechanism tasks; forbidden startup, task-run/advance, Git push, release, cleanup, and verification-persistence choreography can therefore reach the provider prompt without rejection.

## Evidence
- .agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/e0e656aa3c8ddf8d862d7ccca8df62d94b2adb6d32cb4b945538cb35bd0eb8cd.patch
- .agentplane/policy/security.must.md
- .agentplane/tasks/202608062021-V2EESE/README.md

## Missing Tests
- A projection test with one hard_constraint fragment containing both a required security rule and a forbidden lifecycle command, asserting that the security rule remains in the exact provider prompt.
- Exact-provider-input rejection tests for ap task advance, ap task run, git push, release/publish commands, verification-persistence commands, and cleanup/worktree commands.
- A negative test proving that generic prompts/supervisor tags plus incidental provider-prompt wording do not disable choreography inspection; the exception must require explicit lifecycle-repair authority.

## Hidden Assumptions
- Gateway fragments are assumed to be semantically homogeneous enough that dropping a whole fragment cannot remove required scope or security constraints.
- The enumerated regular expressions are assumed to represent every forbidden lifecycle and release surface named by the acceptance criteria.
- Task tags and narrative keywords are assumed to be sufficient authority to bypass the exact compiled-prompt guard.

## Residual Risks
- Replace whole-fragment suppression with a structured projection that preserves required semantic and security constraints, make forbidden-choreography qualification cover every declared process category, narrow lifecycle-repair authorization so it cannot disable the entire exact-input check, and add the listed negative tests before reevaluation.
