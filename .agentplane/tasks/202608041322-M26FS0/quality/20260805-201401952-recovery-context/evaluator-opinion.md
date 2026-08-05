# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The hosted closeout assumes `gh workflow run` returns the created Actions run URL, then immediately rejects any other output. The frozen contract test only checks workflow text and does not prove this runtime behavior, so the evidence PR can fail before its required check is published.

## Evidence
- .agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/c362c8e4a3270cc827ba7989523220b39597274d4576c021d7e6678288b962ab.patch
- .agentplane/cache/v0.7.3-premerge-26db6758.json

## Missing Tests
- Execute the hosted verification shell path against the supported GitHub CLI output contract, proving dispatch-to-run correlation, exact-SHA selection, waiting, check creation, and merge.
- Cover concurrent or pre-existing workflow runs so the dispatched Core CI run is correlated to the requested closure SHA rather than inferred from mutable or presentation-oriented CLI output.

## Hidden Assumptions
- `gh workflow run ci.yml ...` emits a canonical `/actions/runs/<id>` URL on stdout for the installed GitHub CLI version.
- The textual publish-workflow contract is sufficient evidence that the hosted dispatch, run correlation, and required-check publication work end to end.

## Residual Risks
- Replace or prove the unsupported dispatch-output assumption with deterministic run discovery correlated to the exact closure SHA, then add executable hosted-path regression coverage and rerun the four pre-merge checks.
