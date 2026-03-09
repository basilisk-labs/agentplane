# AgentPlane Website — Design System & Experience Principles (v2)

This document defines the presentation design system for AgentPlane.
Its purpose is not aesthetic exploration. Its purpose is category legibility, trust, and proof.

AgentPlane is not a generic AI product and not a hosted autonomy narrative.
The website must make one thing clear within the first screen:

**AgentPlane is a Git-native control plane for auditable agent work.**

Human version:

**Put coding agents on a governed Git workflow.**

---

## 1. Strategic Role of Design

### 1.1 What the design must accomplish

The website must do five things, in order:

1. Make the product category legible in one screen.
2. Show where the product lives: inside real Git repositories.
3. Show why it is trusted: approvals, task state, verification, closure.
4. Show what appears in the repo: `AGENTS.md` / `CLAUDE.md`, `.agentplane/`, task artifacts.
5. Route the visitor to the next concrete action: docs, workflow, install, demo.

### 1.2 What the design is not allowed to imply

The design must not make AgentPlane look like:

- a generic AI coding assistant,
- an autonomous company dashboard,
- a consumer chat product,
- a vague workflow framework,
- a decorative “futurist AI” brand.

### 1.3 Visual metaphor

The core metaphor is:

**editorial control surface over an engineering sheet**

That means:

- editorial typography for hierarchy,
- engineering artifacts for proof,
- restrained depth for modernity,
- visible control boundaries instead of vague “AI magic”.

The site should feel like a precise operator surface with modern finish, not a flat spec sheet and not a glossy SaaS fantasy.

---

## 2. Core Design Principles

### 2.1 Legibility before flourish

If a visitor cannot tell what AgentPlane is within one screen, the page fails.

### 2.2 Proof over vibe

Every major claim should be backed by one concrete surface:

- command,
- file path,
- workflow line,
- task artifact,
- repo structure,
- real screenshot,
- policy excerpt.

### 2.3 Product before doctrine

Top-level pages should explain the product before introducing internal philosophy such as harness engineering, role taxonomy, or workflow internals.

### 2.4 Modern, but restrained

The website should look current for 2026, but the modernity should come from:

- typography,
- spacing,
- composition,
- controlled translucency,
- restrained gradients,
- subtle depth,
- clean motion.

Not from spectacle.

### 2.5 One strong idea per screen

Each viewport should communicate one dominant point. Avoid stacking too many competing elements.

---

## 3. Allowed vs Disallowed Visual Language

### 3.1 Allowed

The following are explicitly allowed:

- oversized editorial typography,
- bento-style layouts **when each tile maps to a real product surface or proof artifact**,
- restrained glass chrome for shell/navigation and selected callout surfaces,
- soft aurora or directional gradient fields with low saturation,
- small to medium radius where it improves separation,
- very subtle shadows for depth separation,
- layered proof stacks (terminal + repo surface + workflow chip),
- large whitespace and asymmetrical composition,
- quiet texture or noise at very low opacity,
- product visuals that resemble actual repository or workflow surfaces.

### 3.2 Disallowed

The following remain disallowed:

- rainbow “AI futurism”, neon, cyberpunk styling,
- decorative glassmorphism everywhere,
- generic feature-card farms with no proof,
- fake dashboards that do not map to shipped behavior,
- playful motion, bounce, parallax, scroll theater,
- oversized illustration systems used as filler,
- multi-accent palettes,
- visual density that competes with the copy.

### 3.3 Rule of evidence for cards and surfaces

A card is allowed only if it carries one of these:

- artifact,
- workflow step,
- repo surface,
- user mode,
- proof point,
- routing CTA.

A card that only repeats marketing language is design debt.

---

## 4. Information Architecture by Page Type

### 4.1 Homepage

Required sequence:

1. Hero: category + value + trust mechanism
2. Problem framing: what breaks without a control plane
3. Repository surface: what AgentPlane adds to a repo
4. Workflow path: plan -> start -> execute -> verify -> finish
5. Modes: `direct` and `branch_pr`
6. Control model: approvals, scope, verification, closure
7. Documentation rail
8. Release / journal / roadmap rail
9. Closing CTA

### 4.2 Docs index

The docs landing page should optimize for orientation, not persuasion:

- start here,
- first task flow,
- workflow modes,
- recovery / troubleshooting,
- command reference.

### 4.3 Blog / journal pages

Blog pages can carry more visual texture, but must still prioritize readability and evidence.

---

## 5. Layout System

### 5.1 Widths

- Main prose: target `66–76ch`
- Hero content: up to `12–14` grid columns, usually split `5/7` or `6/6`
- Dense proof sections may expand wider, but prose must remain readable

### 5.2 Rhythm

- Major section spacing: `96–144px` desktop, `72–96px` tablet, `56–72px` mobile
- Use spacing and contrast first; borders and shadows second
- Avoid deeply nested containers

### 5.3 Structural patterns

Approved section patterns:

- editorial left / proof right,
- proof left / explanatory right,
- 2x2 or 3-up bento for product surfaces,
- horizontal timeline or control loop,
- compact comparison rows.

Avoid long runs of identical section geometry.

---

## 6. Typography

### 6.1 Tone

Typography should carry the authority of the brand.
It must feel exact, current, and controlled.

### 6.2 Font stack

- Primary: **Geist Sans**
- Monospace artifacts: **Geist Mono**
- Micro tags / anchors: **Geist Pixel** (strictly limited)

### 6.3 Type scale

Use clamp-based sizing.

- H1: `60–84px`, weight `700`, tracking `-0.04em` to `-0.02em`
- H2: `40–52px`, weight `650–700`
- H3: `24–30px`, weight `650`
- Body: `17–19px`, weight `400–450`, line-height `1.5–1.65`
- Meta: `13–14px`
- Mono: `13–15px`

### 6.4 Copy fit rules

- Hero headings: 1–3 lines max
- Supporting copy: 2–4 short paragraphs or one compact list
- Avoid long abstract intros
- Prefer nouns like `repo`, `task`, `verification`, `approval`, `closure`, `artifact`, `workflow`

---

## 7. Color, Depth, and Materiality

### 7.1 Philosophy

The palette should feel neutral, technical, and high-trust.
Depth is allowed, but it must remain restrained.

### 7.2 Base tokens

- `--bg`: warm or cool white
- `--fg`: near-black
- `--muted`: neutral gray
- `--border`: low-contrast gray
- `--surface`: translucent near-white or very light neutral
- `--accent`: one cool technical accent only

Recommended accent direction:

- quiet teal,
- cool cyan,
- deep blue-teal.

No purple/pink neon systems.

### 7.3 Gradient rules

Gradients are allowed only as atmosphere or separation.
They must be:

- low saturation,
- low frequency,
- not text-dependent,
- never the main proof surface.

Good uses:

- hero backdrop,
- CTA field,
- selected section halo.

Bad uses:

- gradient text everywhere,
- gradient-heavy cards,
- glowing feature matrix.

### 7.4 Shadow rules

Shadows are allowed only for depth separation between layers.
They must remain soft and short.

Use shadows for:

- floating shell,
- hero proof stack,
- elevated CTA or reference surfaces.

Do not use shadows as the main structural language.

---

## 8. Component System

### 8.1 Hero

The hero must include:

- category line or eyebrow,
- primary headline,
- supporting value statement,
- 1–2 CTAs,
- compact proof chips,
- one proof-oriented visual surface.

The visual surface should show product reality, not abstraction for its own sake.

### 8.2 Proof chips

Small inline chips are allowed for concise trust signals:

- `Repo-native`
- `Explicit approvals`
- `Verification record`
- `Direct + PR modes`
- `Local CLI`

Do not overload with more than 4–5 chips.

### 8.3 Bento surfaces

Bento blocks are approved when they clarify distinct product surfaces such as:

- repo artifacts,
- workflow stages,
- modes,
- operator controls,
- proof outputs.

Each tile needs a clear title, short explanation, and either a concrete artifact or a precise concept.

### 8.4 Artifact blocks

Artifact blocks remain core to trust.
Approved artifact types:

- terminal transcript,
- repo tree,
- workflow line,
- policy excerpt,
- task record,
- verification summary,
- diff snippet.

Artifacts should be readable first, stylized second.

### 8.5 Comparison rows

Comparison components are encouraged for category legibility.
Examples:

- without AgentPlane / with AgentPlane
- raw agent session / governed task flow
- direct / branch_pr

### 8.6 CTA surfaces

CTA surfaces may use slightly richer visual treatment than documentation sections, but copy must remain concrete.

---

## 9. Motion and Microinteractions

### 9.1 Principle

Motion must provide feedback, orientation, or hierarchy.
Never entertainment.

### 9.2 Approved motion

- fade and rise transitions,
- small translate transitions,
- underline expansion,
- active nav interpolation,
- artifact copy feedback,
- subtle wordmark micro-motion.

### 9.3 Motion limits

- duration generally `120–280ms`
- slower hero entry only when it does not delay comprehension
- all motion must respect `prefers-reduced-motion`

### 9.4 Disallowed motion

- bounce,
- elastic easing,
- parallax,
- background animation that competes with reading,
- auto-playing visual loops with no functional role.

---

## 10. Imagery and Proof Strategy

### 10.1 Visual proof hierarchy

Use visuals in this order of preference:

1. real repository artifacts,
2. real CLI output,
3. stylized but truthful workflow diagrams,
4. abstract editorial textures.

### 10.2 Product screenshots

Screenshots are preferred when they help the user understand:

- what appears in the repo,
- how a task progresses,
- how modes differ,
- where verification and closure live.

Screenshots should be cropped, intentional, and never tiny.

### 10.3 Illustration rule

Illustration is allowed only when it clarifies a product concept or supports a journal/roadmap piece.
Illustration may not replace proof on top-level acquisition pages.

---

## 11. Content Fit Rules for Design

Design and editorial must work together.
Every major section should ideally follow this shape:

1. one-line claim,
2. short rationale,
3. one proof surface,
4. one route to the next action.

If a section has no proof and no next action, question why it exists.

---

## 12. Accessibility and Performance

### 12.1 Accessibility

- Strong contrast on all primary copy
- Visible focus states
- No essential meaning carried by color alone
- Motion reduction respected everywhere
- Decorative texture must remain non-blocking

### 12.2 Performance

- Static/SSG by default
- Minimal client JS
- No heavy visual libraries without justification
- Visual richness should come primarily from CSS and composition

---

## 13. QA Checklist

A page is not done until all are true:

### Category legibility

- [ ] The first screen clearly says what AgentPlane is.
- [ ] The page makes AgentPlane look Git-native, governed, and auditable.
- [ ] The page does not imply a hosted AI assistant or company OS.

### Visual discipline

- [ ] Modern depth exists, but does not overpower the content.
- [ ] Bento, gradient, glass, and shadow are all restrained and purposeful.
- [ ] No section uses decorative cards with empty marketing copy.

### Proof

- [ ] Each major claim has at least one proof surface.
- [ ] Artifact blocks are readable and accurate.
- [ ] Repo, workflow, or verification surfaces appear early.

### Conversion and routing

- [ ] The page tells the visitor what to do next.
- [ ] The primary CTA is obvious.
- [ ] Docs and workflow links are easy to find.

### Technical quality

- [ ] Works without visual gimmicks.
- [ ] Respects reduced motion.
- [ ] Keeps JS weight low.

---

## 14. Versioning Rule

This file is a contract.
Any substantial addition of a new motif, motion system, or visual language must update this document first.
