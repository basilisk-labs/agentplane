# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- recordExternalBlockedResult calls task set-status and then cmdCommit with allowTasks=true without first validating the current head, task fingerprint, baseline status, or agent-introduced paths.
- A non-completed agent could alter active-task README or PR metadata and return blocked; the new path can then stage those task artifacts under a trusted supervisor commit.
- The positive lifecycle and replay tests pass, but no negative test mutates task artifacts or workspace content before returning blocked.
- Residual risk: Without a zero-change return check, protected task metadata can cross the external-agent trust boundary inside a supervisor-attributed commit.

## Evidence
- .agentplane/tasks/202608101410-4GSCYN/quality/objects/sha256/3f2e6486bcb8fefe73ac994f158421e1dcfee6ba27f12e7d40eb647abecb9474.patch

## Missing Tests
- A blocked external result after agent-introduced task-artifact or workspace changes must be rejected before any BLOCKED transition or supervisor commit.

## Hidden Assumptions
- The implementation assumes a non-completed external agent result implies the workspace remained unchanged, but the supervisor does not enforce that condition.

## Residual Risks
- Before recording BLOCKED, validate the state-bound task/head baseline and require zero agent-introduced workspace changes. Add a regression that tampers with task artifacts or an allowed source path before returning blocked and proves rejection leaves task status, exchange application, and Git history unchanged.
