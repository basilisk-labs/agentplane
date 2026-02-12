# Docs (Mintlify)

Mintlify entrypoint: `docs/index.mdx`.

If you are reading this in GitHub, open `docs/index.mdx` for the full reading order.

Docs are organized into `docs/user/`, `docs/developer/`, and `docs/help/` sections.

Canonical docs ownership and section boundaries are defined in:

- `docs/developer/documentation-information-architecture.mdx`

When adding or moving pages, update these files together:

- `docs/index.mdx`
- `docs/docs.json`
- `docs/README.md`

Generated command reference:

- `docs/user/cli-reference.generated.mdx` is generated from live CLI specs.
- Refresh it with `agentplane docs cli --out docs/user/cli-reference.generated.mdx`.
