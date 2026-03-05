# Example: PR Note

```md
### Summary
Implemented policy-gateway refactor for AGENTS.md and moved workflow detail into modular files.

### Verification
- bun run policy:routing:check
- bun run agents:check

### Risks
- Routing ambiguity if new modules are added without updating AGENTS load rules.
```
