# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The structured gateway projection still admits lifecycle and persistence instructions written without command syntax or underscore-form artifact names, including instructions to return output to a “result path,” request a fresh packet, and defer formal transitions.

## Evidence
- .agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/664313f67f436b594b6967f22f2b442433c92bdb4cbaa86d9c11fef3c6bdfaa5.patch

## Missing Tests
- Compile the real policy gateway for each semantic role and assert that prose variants such as “result path,” “fresh packet,” “state transition,” and “formal transition” are absent from the exact provider input.
- Add a mixed hard-constraint fragment test proving that semantic safety constraints are retained while lifecycle and persistence sentences without CLI command syntax are removed.

## Hidden Assumptions
- Forbidden choreography is assumed to be identifiable through command-shaped text or underscore-form artifact names.
- All hard_constraint fragments are assumed to be provider-semantic unless individual lines match the current blacklist.

## Residual Risks
- Replace blacklist-only filtering of hard-constraint prose with an explicit allowlisted semantic projection, then qualify the exact compiled prompts against lifecycle and persistence concepts expressed both as commands and ordinary prose.
