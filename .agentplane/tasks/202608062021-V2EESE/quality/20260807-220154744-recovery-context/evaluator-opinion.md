# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Semantic policy-module loading can follow an in-repository symlink to a file outside the repository without explicit approval.

## Evidence
- .agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/ec35466367477fcacaa6e34963ca56a97d64725ab49eeb96a2cd914873359c21.patch
- .agentplane/policy/security.must.md

## Missing Tests
- Add a test where a blueprint-selected policy-module path is lexically inside the repository but is a symlink to an outside-repository file; semantic prompt compilation must reject it before reading the target.
- Record a final repository-state check covering unintended tracked changes and unreviewed untracked artifacts, as required by the loaded core DoD.

## Hidden Assumptions
- A policy-module path that is lexically contained by git_root is assumed to resolve physically inside git_root.
- Blueprint-selected policy modules are assumed never to be symlinks to outside-repository targets.
- The frozen verification summary is assumed sufficient despite containing no final git status evidence.

## Residual Risks
- Resolve policy-module paths against their physical filesystem targets before reading, reject targets outside the repository unless matching explicit approval exists, add the symlink escape regression test, and provide the required final repository-state evidence.
