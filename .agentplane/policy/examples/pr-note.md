<!-- ap:fragment id="policy.examples.pr-note.example.example.pr.note" slot="example" mutability="replaceable" -->
# Example: PR Note

```md
<!-- /ap:fragment -->
<!-- ap:fragment id="policy.examples.pr-note.purpose.summary" slot="purpose" mutability="replaceable" -->
### Summary

Implemented policy-gateway refactor for AGENTS.md and moved workflow detail into modular files.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.examples.pr-note.check.verification" slot="check" mutability="append_only" -->
### Verification

- node .agentplane/policy/check-routing.mjs
- bun run agents:check

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.examples.pr-note.example.risks" slot="example" mutability="replaceable" -->
### Risks

- Routing ambiguity if new modules are added without updating AGENTS load rules.
```
<!-- /ap:fragment -->
