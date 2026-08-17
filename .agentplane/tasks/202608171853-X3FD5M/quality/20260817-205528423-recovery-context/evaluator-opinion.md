# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The clean packaged scenario reached fixture initialization and then failed with ENOENT for .agentplane/config.json.
- AgentPlane loadConfig gives canonical WORKFLOW.md precedence and current init intentionally does not create legacy config.json, so the trusted issuer must be added to WORKFLOW frontmatter.
- The repair should remain fixture setup state and must not weaken the harness prohibition on reading internal lifecycle evidence.

## Evidence
- .agentplane/tasks/202608171853-X3FD5M/quality/objects/sha256/c8ae07741aaf4336340061d47b88855bf457d093e407c78bde6efd3980a459a4.patch

## Missing Tests
- A clean execution of node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs must pass after configuring the signer in canonical WORKFLOW.md.

## Hidden Assumptions
- The initial implementation assumed init still emitted legacy .agentplane/config.json.

## Residual Risks
- Rework required. The signer and exact request-bound receipt construction are correct, but the fixture trust bootstrap targets legacy .agentplane/config.json while current init emits canonical .agentplane/WORKFLOW.md only.
