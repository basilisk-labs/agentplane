# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The exact-provider-input guard still allows Git choreography embedded in ordinary prose, such as "Commit changes with git commit", because Git detection only covers line-start/backtick commands or four enumerated imperative verbs.

## Evidence
- .agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/a70aee63b48a7a5dfe23d411a55757d2b924db1d78892c463a297a30d8e5d2ed.patch

## Missing Tests
- Add exact compiled-provider-input rejection cases where forbidden Git commands occur mid-sentence without the prefixes run, execute, invoke, or use, including "Commit changes with git commit" and "After editing, git push origin branch".

## Hidden Assumptions
- Forbidden Git choreography is assumed to appear only at a line or backtick boundary, or after one of four English imperative verbs.
- The finite English phrasing patterns are assumed to cover user instructions and repository policy prose sufficiently for a security-relevant rejection gate.

## Residual Risks
- Harden Git-command detection so forbidden commands are rejected regardless of surrounding prose, then add exact compiled-provider-input tests for mid-sentence and varied-imperative forms and rerun all declared verification steps.
