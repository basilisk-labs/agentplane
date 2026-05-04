# Launch Checklist

## Repo-Scoped Checks

- [ ] README first task flow uses neutral configurable agent IDs, not internal role examples.
- [ ] CLI package README mirrors the root README example style.
- [ ] Homepage demo terminal mirrors the same public example style.
- [ ] `docs/launch/hn.md` is ready.
- [ ] `docs/launch/twitter.md` is ready.
- [ ] `docs/launch/reddit.md` is ready.
- [ ] README header uses the current tagline: "The audit layer for coding agents."
- [ ] `website/static/img/og-image.png`, `twitter-card.png`, and `hn-card.png` are distinct.
- [ ] `docs/assets/agentplane-demo.gif` exists.
- [ ] `docs/assets/agentplane-demo.tape` exists.
- [ ] `website/static/llms.txt` links to the ACR schema and ACR docs page.
- [ ] `packages/spec/examples/acr.json` matches the current package version.
- [ ] `bun run release:acr-example:check` passes.
- [ ] `bun run release:demo:check` passes.
- [ ] `node .agentplane/policy/check-routing.mjs` passes.
- [ ] `agentplane doctor` passes.

## Off-Repo Confirmations

- [ ] GitHub About description is current.
- [ ] GitHub topic chips are current.
- [ ] GitHub website slot points to `https://agentplane.org`.
- [ ] GitHub social preview uses the current social card.
- [ ] npm shows `agentplane@0.4.3`.
- [ ] npm shows `@agentplaneorg/core@0.4.3`.
- [ ] npm shows `@agentplaneorg/recipes@0.4.3`.
- [ ] Awesome-list PR URLs are captured below.
- [ ] `@agentplaneorg` Twitter/X profile is live with the canonical bio.
- [ ] `@agentplane.org` Bluesky profile is live with the canonical bio.

## Awesome-List PR URLs

- bradAGI/awesome-cli-coding-agents:
- ai-boost/awesome-harness-engineering:
- Picrew/awesome-agent-harness:
- walkinglabs/awesome-harness-engineering:
- ai-for-developers/awesome-ai-coding-tools:
- brandonhimpfen/awesome-ai-coding-agents:
- AutoJunjie/awesome-agent-harness:
- sorrycc/awesome-code-agents:
- filipecalegario/awesome-vibe-coding:

## Stop Rules

- Do not announce Discord until a real server id and invite exist.
- Do not claim awesome-list acceptance until the upstream PR is merged.
- Do not claim GitHub social preview is live until repo settings are checked.
- Do not post HN/Reddit copy before confirming all linked URLs return 200.
