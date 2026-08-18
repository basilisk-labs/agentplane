# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- Task-owner context resolution now checks ownership of the explicitly resolved task branch before retaining a current worktree context, with a stale-worktree regression.
- Prerelease classification now precedes release-ready, registry, incident, release-note, and npm checks, and the detect step writes the exact checkout SHA.
- The detect job output still declares sha from steps.source.outputs.sha; that step is intentionally skipped for prereleases, so downstream or diagnostic consumers receive an empty SHA despite the detect step emitting one.
- Residual risk: Without the one-line output correction, prerelease automation succeeds but loses exact provenance in the job result.

## Evidence
- .agentplane/tasks/202608181634-3EHFWF/quality/objects/sha256/379cd4d761527438e3ffa7c7f6821e6b1af480b2e92141006e22dbac98867cac.patch

## Missing Tests
- Add a workflow-contract assertion that the detect job exports sha from steps.detect.outputs.sha, not the stable-only source step.

## Hidden Assumptions
- The implementation assumed the detect job's sha output was irrelevant whenever should_publish=false, even though it is part of the job's declared output contract.

## Residual Risks
- The candidate addresses both hosted P1 findings and its claimed local checks are recorded, but the prerelease publish path leaves the detect job's public sha output wired to the stable-only source step, so the new successful prerelease result exports an empty SHA.
