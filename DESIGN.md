---
version: "alpha"
name: "AgentPlane — Git-Native Agent Control Plane"
description: "Design system for agentplane.org using the new editorial-glass visual language: full-bleed grid composition, Fraunces display typography, Inter body copy, JetBrains Mono labels, sharp proof surfaces, pill secondary controls, blue technical accent, and repository-native workflow artifacts."
mode: "light"
atmosphere:
  density: "compact-editorial"
  mood: "precise, gridded, glassy, premium, technical"
  product_frame: "agent work as governed repository infrastructure"
  avoid: "generic AI dashboards, neon/cyberpunk visuals, soft SaaS blobs, arbitrary feature-card farms"
colors:
  primary: "#0055FF"
  secondary: "#FFFFFF"
  tertiary: "#640AFF"
  neutral: "#FFFFFF"
  background: "#FFFFFF"
  surface: "#FAFAF7"
  surface-glass: "rgba(255, 255, 255, 0.72)"
  surface-dark: "#0A0A0A"
  text-primary: "#111111"
  text-secondary: "#444444"
  text-muted: "#666666"
  text-faint: "#8A8A84"
  border: "#E5E5E2"
  border-strong: "#111111"
  accent: "#0055FF"
  accent-secondary: "#640AFF"
  accent-soft: "rgba(0, 85, 255, 0.08)"
  grid-line: "rgba(17, 17, 17, 0.08)"
  gradient-border: "linear-gradient(135deg, rgb(229, 229, 226), rgba(0, 0, 0, 0))"
  gradient-page: "linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 55%, #FFFFFF 100%)"
  gradient-accent: "linear-gradient(135deg, rgba(0, 85, 255, 0.40), rgba(229, 229, 226, 0.75), transparent)"
typography:
  display-lg:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "72px"
    fontWeight: 300
    lineHeight: "72px"
    letterSpacing: "-0.025em"
  display-md:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "56px"
    fontWeight: 300
    lineHeight: "60px"
    letterSpacing: "-0.024em"
  headline-lg:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "44px"
    fontWeight: 300
    lineHeight: "48px"
    letterSpacing: "-0.022em"
  headline-md:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "32px"
    fontWeight: 300
    lineHeight: "38px"
    letterSpacing: "-0.018em"
  body-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: "30px"
  body-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: "26px"
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: "22px"
  label-md:
    fontFamily: "JetBrains Mono, SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 200
    lineHeight: "16px"
    letterSpacing: "1.2px"
    textTransform: "uppercase"
  label-sm:
    fontFamily: "JetBrains Mono, SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace"
    fontSize: "10px"
    fontWeight: 200
    lineHeight: "14px"
    letterSpacing: "1px"
    textTransform: "uppercase"
  code-md:
    fontFamily: "JetBrains Mono, SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 300
    lineHeight: "22px"
rounded:
  none: "0px"
  md: "0px"
  full: "9999px"
spacing:
  base: "4px"
  sm: "1px"
  md: "4px"
  lg: "10px"
  xl: "12px"
  gap: "8px"
  gap-md: "12px"
  gap-lg: "16px"
  gap-xl: "24px"
  card-padding: "18px"
  card-padding-md: "24px"
  card-padding-lg: "32px"
  artifact-padding: "40px"
  section-padding: "32px"
  section-padding-md: "56px"
  section-padding-lg: "96px"
  full-bleed-max: "none"
  content-max: "1280px"
borders:
  hairline: "1px solid #E5E5E2"
  strong: "1px solid #111111"
  dark-muted: "1px solid #222222"
  dark-soft: "1px solid #333333"
shadows:
  soft: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
  elevated: "rgba(0, 0, 0, 0.10) 0px 20px 25px -5px, rgba(0, 0, 0, 0.10) 0px 8px 10px -6px"
  none: "rgba(0, 0, 0, 0) 0px 0px 0px 0px"
blur:
  sm: "4px"
  md: "12px"
motion:
  level: "expressive"
  durations:
    fast: "150ms"
    base: "300ms"
    reveal: "500ms"
    section: "700ms"
    ambient: "2000ms"
  easings:
    standard: "ease"
    exit: "cubic-bezier(0.4, 0, 1, 1)"
    expressive: "cubic-bezier(0.2, 0.6, 0.2, 1)"
  hoverPatterns:
    - "color"
    - "text"
    - "stroke"
    - "underline"
    - "grayscale"
  scrollPatterns:
    - "gsap-scrolltrigger"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "20px"
    border: "0px solid transparent"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.72)"
    textColor: "{colors.text-muted}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "10px 14px"
    border: "1px solid #E5E5E2"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
    border: "0px solid transparent"
  glass-shell:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "1px"
    border: "none"
    backgroundImage: "{colors.gradient-border}"
    blur: "{blur.md}"
  card:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "32px"
    border: "1px solid #E5E5E2"
    shadow: "{shadows.soft}"
  proof-card:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "24px"
    border: "1px solid #E5E5E2"
    shadow: "none"
  dark-artifact:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.secondary}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "40px"
    border: "0px solid transparent"
    shadow: "none"
  workflow-chip:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "10px"
    border: "1px solid #E5E5E2"
  approval-gate:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "18px"
    border: "1px solid rgba(0, 85, 255, 0.40)"
  grid-section:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "32px"
    backgroundImage: "linear-gradient(to right, rgba(17, 17, 17, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 17, 17, 0.08) 1px, transparent 1px)"
    backgroundSize: "32px 32px"
  icon:
    treatment: "linear"
    set: "Solar"
---

# AgentPlane Design System

## Overview

AgentPlane is a Git-native control plane for auditable agent work. The interface should make governed repository execution feel visible, deliberate, and inspectable. It should not look like a generic AI assistant, hosted automation dashboard, or decorative workflow canvas.

The visual system uses a premium editorial-glass language: a white canvas, a soft off-white surface layer, strong full-bleed grid structure, sharp squared proof cards, thin gradient border shells, restrained glass blur, and a single saturated technical blue. The product should feel like a next-generation development studio built around real repository artifacts.

Use the style to frame AgentPlane as a precise operating surface for agent work:

- `AGENTS.md`, `CLAUDE.md`, `.agentplane/`, task records, workflow contracts, verification steps, and close commits are visual objects, not hidden implementation details.
- Plan, approval, execution, verification, and finish are distinct interface states with visible boundaries.
- Controls are minimal and typographic. The interface should rely on grid, borders, labels, and artifact surfaces before decoration.
- The page can feel expressive, but every visual flourish must reinforce governance, traceability, or deterministic closure.

The primary aesthetic is light, glassy, gridded, and editorial. Dark surfaces are reserved for terminal-like proof blocks, command examples, and high-emphasis repository artifacts.

## Colors

The palette is a light technical system with one dominant blue accent.

- **Command Blue (`#0055FF`):** Main accent for active state, selected task, primary links, progress, repository focus markers, and conversion-critical actions. Use it as a decisive technical signal, not as a decorative wash.
- **White Canvas (`#FFFFFF`):** Primary background, card interior, navigation chrome, and clean negative space.
- **Warm Surface (`#FAFAF7`):** Secondary page layer for panels, section transitions, soft documentation blocks, and glass-backed frames.
- **Ink Black (`#111111`):** Primary text, primary buttons, hard borders, terminal labels, and decisive interface moments.
- **Repository Grey (`#444444`):** Body support text, metadata, secondary labels, and explanatory copy.
- **Muted Control Grey (`#666666`):** Secondary buttons, inactive navigation, quiet state labels, and utility controls.
- **Hairline Border (`#E5E5E2`):** Structural linework for cards, shell edges, dividers, comparison rows, and proof surfaces.
- **Violet Reserve (`#640AFF`):** Rare secondary accent for cross-state contrast, advanced mode markers, or visual distinction between `direct` and `branch_pr` flows. Never let it compete with Command Blue.
- **Dark Artifact (`#0A0A0A`):** Terminal-like proof surfaces, command panels, or release/verification blocks that need strong contrast.

The source visual language mentions dark mode, but its actual tokens define a light system. AgentPlane should therefore stay light-first and use dark material only as an artifact treatment.

### Gradients

Use gradients as structural depth, not as illustration.

- **Gradient border shell:** `linear-gradient(135deg, rgb(229, 229, 226), rgba(0, 0, 0, 0))` around cards and hero panels.
- **Page transition:** `linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 55%, #FFFFFF 100%)` for section depth.
- **Accent edge:** `linear-gradient(135deg, rgba(0, 85, 255, 0.40), rgba(229, 229, 226, 0.75), transparent)` for selected proof surfaces or workflow focus states.

Do not create multicolor AI gradients, rainbow blobs, or synthetic glow effects.

## Typography

Typography pairs expressive editorial display type with restrained engineering text.

- **Display:** Fraunces, 300 weight, tight tracking. Use for hero headlines, major section titles, and high-level positioning. The display voice should feel precise and premium, not playful.
- **Body:** Inter, 300 weight, open line height. Use for descriptions, docs-style explanations, benefit statements, and captions.
- **Labels:** JetBrains Mono, 200 weight, uppercase, wide tracking. Use for workflow states, navigation labels, artifact IDs, task metadata, button copy, and small section markers.
- **Code and artifacts:** JetBrains Mono, 300 weight. Use for commands, file names, task IDs, verification output, and repository paths.

Recommended hierarchy:

- Hero headline: `display-lg`, 72px / 72px, `-0.025em`.
- Section headline: `display-md` or `headline-lg`, 56px or 44px with compact line height.
- Card title: `headline-md`, 32px / 38px.
- Body: `body-md`, 16px / 26px.
- Metadata: `label-md`, 12px / 16px, uppercase.

Avoid heavy sans-serif display headings. AgentPlane should feel like an editorial development system, not a standard B2B dashboard.

## Layout

The layout is full-bleed, gridded, and highly structured. The grid should be visible as a compositional principle even when lines are subtle.

Use a 4px base rhythm. Larger spacing should step out of that cadence instead of introducing unrelated values.

- **Layout type:** Full-bleed grid.
- **Primary rhythm:** 4px.
- **Micro spacing:** 1px, 4px, 8px, 10px, 12px.
- **Component gaps:** 8px, 12px, 16px, 24px.
- **Card padding:** 18px, 24px, 32px, 40px.
- **Section padding:** 32px, 56px, 96px.
- **Grid density:** Strong, but not noisy. Use subtle grid lines at low opacity.

### Page Composition

AgentPlane pages should use an editorial proof sequence:

1. **Positioning hero:** Fraunces headline, short Inter explanation, JetBrains Mono label, primary action, secondary pill action.
2. **Repository proof surface:** A visualized repo object, command block, task state, or workflow contract.
3. **Governance boundary:** Plan approval, policy gateway, verification, and finish shown as separate states.
4. **Mode comparison:** `direct` and `branch_pr` explained as workflow discipline, not pricing or maturity tiers.
5. **Deterministic close:** A final proof section showing verification, result, close commit, or audit trail.

Use two-column and asymmetric grid sections. Let the proof artifact carry visual weight while copy remains concise.

Do not produce generic feature-card farms. Every card must correspond to a real AgentPlane artifact, command, workflow state, or governance boundary.

## Elevation & Depth

Depth comes from glass, hairline borders, gradient shells, and occasional shadow. The system should feel dimensional but not glossy in a consumer-app way.

- **Default card:** White surface, `1px #E5E5E2` border, `0px` radius, 32px padding, soft shadow only when the card must separate from a dense grid.
- **Glass shell:** Outer wrapper with 1px padding, gradient border, subtle blur, and an inner white or off-white content surface.
- **Dark artifact:** `#0A0A0A`, 40px padding, square corners, no shadow. Use for terminal-like proof blocks only.
- **Hero surface:** Full-bleed or large grid-aligned glass shell with an off-white-to-white background transition.
- **Selected state:** Use accent-edge gradient or a thin Command Blue border. Do not use thick blue fills for large surfaces.

### Gradient Border Shell

Wrap major cards and proof surfaces in a 1px outer shell with `linear-gradient(135deg, rgb(229, 229, 226), rgba(0, 0, 0, 0))`. Keep the actual content surface inside the shell. The effect should read as a premium hairline frame, not a decorative border.

### Blur

Use `12px` blur for glass navigation and shell overlays. Use `4px` blur for small floating state labels. Avoid blur on text-heavy surfaces where readability is more important than material effect.

## Shapes

The geometry is intentionally binary.

- **Proof surfaces, cards, primary buttons, code blocks, and repository artifacts:** squared-off `0px` radius.
- **Secondary controls, small chips, navigation pills, and workflow tags:** `9999px` pill radius.
- **Icons:** linear Solar-style icons, thin strokes, simple geometry.

This contrast is important: square surfaces communicate determinism and auditability; pill controls communicate optional navigation, filtering, or secondary state.

Do not introduce soft rounded cards, 8px SaaS radii, bubbly components, or mixed radius scales.

## Components

### Buttons

**Primary Button**

Use for decisive actions: install, initialize, start a task, approve a plan, verify, finish, or open docs.

- Background: `#111111`.
- Text: `#FFFFFF`.
- Typography: JetBrains Mono, uppercase, 12px, 1.2px tracking.
- Radius: `0px`.
- Padding: `20px`.
- Hover: invert emphasis through text or stroke changes, not glow.

**Secondary Button**

Use for docs links, references, mode switching, and non-critical navigation.

- Background: transparent white or glass.
- Text: `#666666`.
- Border: `1px solid #E5E5E2`.
- Radius: `9999px`.
- Padding: `10px 14px`.
- Hover: text darkens to `#111111`; border can shift toward `#111111`.

**Link Button**

Use for inline navigation, command references, and small helper actions.

- Text: `#444444`.
- Typography: JetBrains Mono uppercase.
- Radius: `0px`.
- Padding: `0px`.
- Hover: underline, stroke, or color shift to `#0055FF`.

### Cards and Surfaces

**Proof Card**

A proof card presents one real AgentPlane object: task state, policy file, verification step, workflow mode, command, or closure artifact.

- Background: `#FFFFFF`.
- Border: `1px solid #E5E5E2`.
- Radius: `0px`.
- Padding: `24px` or `32px`.
- Shadow: none by default; soft shadow only when needed for layer separation.
- Header: JetBrains Mono label.
- Title: Fraunces or Inter depending on density.

**Glass Hero Shell**

Use for hero panels, pricing-like comparison blocks, or large workflow explainers.

- Outer background: gradient border shell.
- Inner background: `rgba(255, 255, 255, 0.72)` or `#FAFAF7`.
- Border: visually implied by the shell.
- Radius: `0px`.
- Blur: `12px`.
- Content: large Fraunces heading plus one concrete artifact.

**Dark Artifact Block**

Use for commands, terminal output, verification summaries, and close commits.

- Background: `#0A0A0A`.
- Text: `#FFFFFF`.
- Accent: `#0055FF` for cursor, active line, or selected command.
- Typography: JetBrains Mono.
- Radius: `0px`.
- Padding: `40px`.

### Repository Artifact Card

Repository artifact cards visualize files and directories that make agent work inspectable.

Recommended rows:

- `AGENTS.md` — policy gateway.
- `CLAUDE.md` — alternate policy gateway where relevant.
- `.agentplane/config.json` — repo configuration.
- `.agentplane/tasks/` — task records.
- `.agentplane/WORKFLOW.md` — workflow contract.
- `.agentplane/tasks.json` — exported task projection.

Use a square card with a mono label column, subtle row dividers, and one blue active marker for the currently explained artifact.

### Workflow State Strip

Use a horizontal or vertical strip to show task progression.

States:

1. `planned`
2. `approval_required`
3. `ready`
4. `running`
5. `verified`
6. `finished`

Each state should use a pill chip for metadata but sit inside a squared proof surface. This keeps the workflow readable without making it feel like a playful kanban board.

### Approval Gate

Approval gates should be visually strict.

- Use a square card, thin blue accent edge, and mono uppercase label.
- Show who approved, when it was approved, and what plan or policy condition was satisfied.
- Do not represent approvals as vague green checkmarks without context.

### Verification Panel

Verification panels should show proof, not reassurance.

Required content:

- Command or check name.
- Result state.
- Reviewer or actor.
- Note or evidence summary.
- Optional commit or task reference.

Use Command Blue sparingly for the result indicator. Keep the rest black, grey, and bordered.

### Mode Comparison

`direct` and `branch_pr` should be compared as workflow modes.

- `direct`: short loops in the current checkout.
- `branch_pr`: structured per-task branch or worktree flow with stricter handoff.

Use a two-column comparison card with equal visual weight. Do not style one mode as premium or superior by default.

### Navigation

Navigation can use glass framing, but it must stay quiet.

- Use pill secondary controls for docs, reference, blog, and GitHub links.
- Active navigation can use a blue underline, blue text, or soft blue background tint.
- Avoid heavy nav shadows or oversized header chrome.

### Iconography

Use linear Solar-style icons. Icons should explain structure: repository, branch, lock, check, terminal, file, timeline, shield, and close/finish. Avoid abstract sparkles, bot faces, brain icons, or generic AI magic symbols.

## Motion

Motion is expressive but functional. It should reveal structure, not perform personality.

- **Fast interactions:** 150ms for hover color, stroke, underline, or text changes.
- **Base transitions:** 300ms for card focus, button state, and small panel changes.
- **Section reveal:** 500ms to 700ms for scroll-driven entry.
- **Ambient rhythm:** 2000ms only for subtle grid, cursor, or artifact focus effects.
- **Easing:** `ease`, `cubic-bezier(0.4, 0, 1, 1)`, and `cubic-bezier(0.2, 0.6, 0.2, 1)`.
- **Scroll choreography:** GSAP ScrollTrigger is allowed for section reveal, workflow progression, and proof-card sequencing.

Hover behavior should focus on color, text, stroke, underline, or grayscale changes. Avoid bounce, elastic motion, parallax spectacle, or decorative particle systems.

## Do's and Don'ts

### Do

- Use the full-bleed grid as the primary composition device.
- Use Fraunces for high-level editorial hierarchy.
- Use Inter for clear explanatory prose.
- Use JetBrains Mono for labels, states, commands, and repository artifacts.
- Keep proof surfaces square and exact.
- Use pill shapes only for secondary controls and metadata chips.
- Use `#0055FF` for action, selection, proof focus, and active workflow state.
- Show real AgentPlane artifacts whenever a claim is made.
- Separate plan, approval, execution, verification, and finish as visible states.
- Use gradient border shells for hero panels and important proof blocks.
- Keep motion expressive but tied to comprehension.

### Don't

- Do not mention or import any non-AgentPlane brand identity into generated pages.
- Do not use generic AI visuals: sparkles, chat bubbles, robot mascots, neural blobs, or hallucinated dashboards.
- Do not replace repository artifacts with abstract cards.
- Do not create feature grids where each tile lacks a real command, file, state, or proof point.
- Do not introduce additional accent colors unless required for semantic states.
- Do not soften all corners. Square proof surfaces are part of the control-plane identity.
- Do not use dark mode as the default page mode.
- Do not use violet as a second primary accent.
- Do not let animation compete with text, code, or workflow evidence.

## Accessibility

- Maintain strong contrast between text and background. Use `#111111` for primary text on white or warm surfaces.
- Avoid using `#0055FF` as small body text unless paired with underline, weight, or another affordance.
- Ensure focus states are visible with a blue outline, black outline, or high-contrast border shift.
- Do not rely on color alone for task status. Pair color with labels such as `verified`, `approval_required`, or `finished`.
- Keep body text at or above 16px for marketing pages and 14px only for dense metadata.

## AgentPlane-Specific Content Rules

The visual system must support the actual product model.

AgentPlane is local and repository-native. It runs inside a git repository and makes agent work visible through policy files, `.agentplane/` workspace state, task records, verification state, and deterministic closure.

Use this language consistently:

- Primary line: **Git-native control plane for auditable agent work.**
- Human line: **Put coding agents on a governed Git workflow.**
- Product object: **local CLI, repo-local artifacts, explicit approvals, visible task state, verification, deterministic finish.**

Use concrete examples:

```bash
npm install -g agentplane
agentplane init
agentplane task new --title "Implement signed task closure"
agentplane task plan approve <task-id> --by REVIEWER
agentplane verify <task-id> --ok --by REVIEWER
agentplane finish <task-id> --commit <git-rev>
```

Avoid claims that imply AgentPlane is a hosted runtime, autonomous agent platform, generic prompt framework, or replacement for git, editors, or terminals.
