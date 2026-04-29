---
version: "alpha"
name: "AgentPlane — Governed Git Workflow Studio"
description: "AgentPlane visual style adapted from the Nova Framework design system. The product semantics are AgentPlane-specific, while the visual language intentionally preserves the original Nova look: full-bleed grid, glassy editorial surfaces, warm white canvas, electric blue accent, square premium cards, pill chips, Fraunces display type, Inter body copy, and JetBrains Mono labels."
colors:
  primary: "#0055FF"
  secondary: "#FFFFFF"
  tertiary: "#640AFF"
  neutral: "#FFFFFF"
  background: "#FFFFFF"
  surface: "#FAFAF7"
  text-primary: "#111111"
  text-secondary: "#444444"
  text-muted: "#666666"
  border: "#E5E5E2"
  border-strong: "#111111"
  terminal: "#0A0A0A"
  accent: "#0055FF"
typography:
  display-lg:
    fontFamily: "Fraunces"
    fontSize: "72px"
    fontWeight: 300
    lineHeight: "72px"
    letterSpacing: "-0.025em"
  display-md:
    fontFamily: "Fraunces"
    fontSize: "52px"
    fontWeight: 300
    lineHeight: "56px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: "26px"
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: "22px"
  label-md:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
    fontWeight: 200
    lineHeight: "16px"
    letterSpacing: "1.2px"
    textTransform: "uppercase"
  code-md:
    fontFamily: "JetBrains Mono"
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
  card-padding: "18px"
  section-padding: "32px"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "#666666"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "10px 14px"
  button-link:
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
  card:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "32px"
  dark-artifact-card:
    backgroundColor: "{colors.terminal}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "40px"
  proof-chip:
    backgroundColor: "rgba(255,255,255,0.72)"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "10px 12px"
  command-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.code-md}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
  workflow-step:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "24px"
  repo-tree:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# AgentPlane Visual Style — Nova Framework Lineage

## Metadata

- Source style: Nova Framework — Next-Gen Development Studio.
- Palette lineage: Nova Framework light editorial palette.
- Layout lineage: full-bleed grid with strong structural framing.
- Material lineage: glass surface system with gradient border shells.
- Type lineage: Fraunces + Inter + JetBrains Mono.
- Geometry lineage: square cards, pill chips, linear iconography.
- Product category: Git-native control plane for auditable agent work.
- Primary line: Put coding agents on a governed Git workflow.
- Core surfaces: AGENTS.md / CLAUDE.md policy gateway, `.agentplane/` repo-local workspace, task state, plan approval, verification record, deterministic closure, `direct` and `branch_pr` workflow modes.

## 1. Назначение

Этот файл задаёт визуальный стиль AgentPlane на основе оригинальной системы Nova Framework.
Смысловая модель адаптирована под AgentPlane: Git-native workflow, repo-local artifacts, approvals, task state, verification, closure. Визуальная модель остаётся Nova: светлая editorial-сетка, glass shell, электрический синий акцент, квадратные карточки, pill-чипы, моноширинные технические подписи.

Ключевой принцип: AgentPlane должен выглядеть как точная инженерная поверхность управления, но внутри визуального языка Nova Framework, а не как новый бренд с другой типографикой, палитрой или радиусами.

## 2. Визуальная ДНК

### Сохранять

- Белый фон `#FFFFFF` и тёплую surface-базу `#FAFAF7`.
- Основной акцент `#0055FF`.
- Дополнительный акцент `#640AFF`, использовать редко и только для поддерживающего контраста.
- Основной текст `#111111`, вторичный текст `#444444`, muted `#666666`.
- Границы `#E5E5E2`.
- Fraunces для крупных заголовков.
- Inter для обычного текста.
- JetBrains Mono для labels, command chips, repo paths, task states.
- Full-bleed grid, сильный структурный каркас, 4px spacing rhythm.
- Квадратные карточки с `0px` radius.
- Pill-элементы только для chips, badges, mode toggles, secondary controls.
- Glass surface treatment: border + blur + gradient shell.
- Linear Solar-style iconography.

### Не менять

- Не заменять Fraunces на Geist, Inter на системный sans или JetBrains Mono на другой mono-stack.
- Не уводить интерфейс в тёмный режим, кроме terminal/artifact blocks.
- Не вводить новые яркие акценты, особенно rainbow/neon/cyber gradients.
- Не превращать AgentPlane в generic AI SaaS dashboard.
- Не делать карточки декоративными. Каждая карточка должна нести artifact, workflow state, repo surface, command, mode или route.

## 3. Тон интерфейса

AgentPlane внутри этого стиля должен ощущаться как:

- editorial control surface;
- precise engineering sheet;
- repo-native proof layer;
- governed workflow console;
- premium but quiet developer tool.

Не как:

- hosted AI assistant;
- chat product;
- autonomous company dashboard;
- futurist AI landing page;
- decorative glassmorphism demo.

## 4. Композиция

### 4.1 Page Shell

Использовать full-bleed canvas с внутренней grid-структурой.
Основные секции держать на широкой сетке, но текстовые блоки ограничивать по читаемости.

Рекомендуемый desktop pattern:

```txt
[ full bleed background ]
  [ 32px / 40px section inset ]
    [ 12-column grid ]
      left: editorial copy
      right: artifact/proof surface
```

Hero и ключевые proof-секции могут быть асимметричными. Пропорции: `5/7`, `6/6`, `7/5`.

### 4.2 Ритм

База — `4px`.

Использовать значения:

```txt
1px, 4px, 8px, 10px, 12px, 16px, 20px, 24px, 32px, 40px, 56px, 96px
```

Избегать случайных значений вроде `18px` можно только там, где они уже закреплены как original card-padding token.

### 4.3 Секции

Рекомендуемые section patterns:

1. Editorial left / proof right.
2. Proof left / explanation right.
3. 2x2 bento для repo surfaces.
4. Horizontal workflow rail: plan → start → execute → verify → finish.
5. Compact comparison rows: raw agent session vs governed task flow.
6. Mode comparison: `direct` vs `branch_pr`.

## 5. Цветовая система

Фактический режим — светлый.
Исходная система содержит белую canvas/surface-структуру, поэтому AgentPlane должен сохранять light editorial mode.

### Базовые роли

```css
:root {
  --ap-primary: #0055FF;
  --ap-secondary: #FFFFFF;
  --ap-tertiary: #640AFF;
  --ap-neutral: #FFFFFF;

  --ap-bg: #FFFFFF;
  --ap-surface: #FAFAF7;
  --ap-text-primary: #111111;
  --ap-text-secondary: #444444;
  --ap-text-muted: #666666;
  --ap-border: #E5E5E2;
  --ap-border-strong: #111111;
  --ap-terminal: #0A0A0A;
  --ap-accent: #0055FF;
}
```

### Использование

- Background: `#FFFFFF`
- Surface: `#FAFAF7`
- Primary text: `#111111`
- Secondary text: `#444444`
- Muted labels: `#666666`
- Borders: `#E5E5E2`
- Main accent/action: `#0055FF`
- Rare secondary accent: `#640AFF`
- Terminal/artifact dark surface: `#0A0A0A`

### Градиенты

Сохранять оригинальные gradient recipes:

```txt
bg-gradient-to-br from-[#E5E5E2] to-transparent
bg-gradient-to-b from-[#FAFAF7] to-white
bg-gradient-to-br from-[#0055FF]/40 to-transparent via-[#E5E5E2]
```

Градиенты не должны становиться главным содержанием. Они работают как edge depth, background atmosphere или CTA field.

## 6. Типографика

### Display

Fraunces, light editorial feel.

```css
--ap-display-lg-font: "Fraunces";
--ap-display-lg-size: 72px;
--ap-display-lg-weight: 300;
--ap-display-lg-line-height: 72px;
--ap-display-lg-letter-spacing: -0.025em;
```

Использовать для:

- hero headline;
- section-defining statements;
- major conversion blocks.

Пример:

```txt
Put coding agents on a governed Git workflow.
```

### Body

Inter, тонкий и спокойный.

```css
--ap-body-font: "Inter";
--ap-body-size: 16px;
--ap-body-weight: 300;
--ap-body-line-height: 26px;
```

Использовать для:

- explanations;
- product rationale;
- docs routing text;
- comparison descriptions.

### Labels / Mono

JetBrains Mono, uppercase, technical precision.

```css
--ap-label-font: "JetBrains Mono";
--ap-label-size: 12px;
--ap-label-weight: 200;
--ap-label-line-height: 16px;
--ap-label-letter-spacing: 1.2px;
--ap-label-transform: uppercase;
```

Использовать для:

- `Repo-native`
- `Verification record`
- `Direct mode`
- `branch_pr`
- `Task state`
- `AGENTS.md`
- command labels
- status badges

## 7. Material System

### 7.1 Glass Shell

Основной premium-приём: тонкая gradient border shell.

```css
.agentplane-shell {
  padding: 1px;
  border-radius: 0;
  background: linear-gradient(rgb(229, 229, 226), rgba(0, 0, 0, 0));
}

.agentplane-shell > .surface {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(12px);
  border: 1px solid #E5E5E2;
}
```

Применять к:

- hero proof stack;
- main workflow card;
- pricing/conversion panel;
- docs CTA;
- repository artifact preview.

### 7.2 Card Surface

```css
.agentplane-card {
  background: #FFFFFF;
  border: 1px solid #E5E5E2;
  border-radius: 0;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}
```

Карточка допустима только если она содержит:

- repo artifact;
- workflow state;
- command;
- task record;
- verification summary;
- mode comparison;
- routing CTA.

### 7.3 Dark Artifact Card

```css
.agentplane-artifact-dark {
  background: #0A0A0A;
  color: #FFFFFF;
  border-radius: 0;
  padding: 40px;
  box-shadow: none;
}
```

Использовать только для:

- terminal transcript;
- command output;
- verification log;
- compact CLI proof.

Не превращать весь сайт в dark mode.

## 8. AgentPlane Components

### 8.1 Hero

Hero должен иметь Nova-style editorial composition:

- eyebrow label;
- Fraunces headline;
- short Inter support copy;
- primary square CTA;
- secondary pill CTA;
- 3–5 proof chips;
- right-side proof surface.

Рекомендуемая структура:

```txt
Eyebrow: Git-native control plane
H1: Put coding agents on a governed Git workflow.
Body: AgentPlane gives agent work visible task state, approvals, verification, and closure inside the repository.
Primary CTA: Install AgentPlane
Secondary CTA: Read workflow docs
Chips: Repo-native / Explicit approvals / Verification record / direct + branch_pr
Visual: repo tree + task state + terminal command
```

### 8.2 Navigation

Navigation должна быть glassy, тихой, не SaaS-heavy.

```css
.agentplane-nav {
  background: rgba(255,255,255,0.76);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #E5E5E2;
}
```

Nav labels: JetBrains Mono или Inter small, в зависимости от плотности.
Primary nav CTA — square black button. Secondary docs link — text/link.

### 8.3 Buttons

Primary:

```css
.agentplane-button-primary {
  background: #111111;
  color: #FFFFFF;
  border-radius: 0;
  padding: 20px;
  font-family: "JetBrains Mono";
  font-size: 12px;
  font-weight: 200;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
```

Secondary:

```css
.agentplane-button-secondary {
  color: #666666;
  border: 1px solid #E5E5E2;
  border-radius: 9999px;
  padding: 10px 14px;
}
```

Link:

```css
.agentplane-button-link {
  color: #444444;
  border-radius: 0;
  padding: 0;
  font-family: "JetBrains Mono";
  font-size: 12px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
```

### 8.4 Proof Chips

```css
.agentplane-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 9999px;
  border: 1px solid #E5E5E2;
  background: rgba(255,255,255,0.72);
  padding: 10px 12px;
  color: #444444;
  font-family: "JetBrains Mono";
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
```

Approved chip labels:

```txt
Repo-native
Explicit approvals
Verification record
Local CLI
direct + branch_pr
Task state
Deterministic closure
```

### 8.5 Repo Tree Surface

```txt
.agentplane/
  config.json
  WORKFLOW.md
  tasks/
    T-042/
      plan.md
      verify.md
      finish.md
AGENTS.md
```

Visual rules:

- background `#FAFAF7`;
- mono text;
- paths may use `#0055FF`;
- avoid tiny unreadable screenshots;
- keep 1px border and square radius.

### 8.6 Workflow Rail

Use for the canonical AgentPlane flow:

```txt
Plan → Approve → Start → Execute → Verify → Finish
```

Each step:

- label in JetBrains Mono uppercase;
- short body in Inter;
- active step edge or dot in `#0055FF`;
- square card, border `#E5E5E2`;
- no colorful status rainbow.

### 8.7 Mode Comparison

Use original pricing/comparison structure, but map it to AgentPlane modes.

```txt
direct
Single checkout, short loops, current working tree.

branch_pr
Structured per-task branch/worktree flow, explicit PR artifacts.
```

Design:

- two or three cards in grid;
- same height;
- square cards;
- primary accent only on selected/default mode;
- secondary pill labels for mode names;
- avoid “pricing tier” semantics unless real pricing exists.

### 8.8 Verification Record Card

A verification card should look like a proof object, not a marketing card.

```txt
VERIFY RECORD
Task: AP-102
Status: ok
By: REVIEWER
Note: CLI contract passes fast checks.
Closed with: deterministic finish commit
```

Design:

- mono header;
- Inter explanatory line;
- optional dark terminal inset;
- blue accent line, not full blue background.

### 8.9 CTA Surface

CTA can be slightly richer but must remain inside Nova visual grammar.

Recommended CTA:

```txt
Start with a governed task.
npm install -g agentplane
agentplane init
agentplane quickstart
```

Use:

- gradient border shell;
- white or `#FAFAF7` surface;
- primary black square button;
- secondary pill docs button;
- optional command pill.

## 9. Page Recipes

### 9.1 Homepage

Order:

1. Hero: category, value, proof stack.
2. Problem: raw agent changes vs governed repo workflow.
3. Repository surface: what appears in the repo.
4. Workflow rail: plan → start → verify → finish.
5. Mode comparison: `direct` / `branch_pr`.
6. Trust mechanism: approvals, task state, verification, closure.
7. Docs rail.
8. Closing CTA.

Visual constraint: every major section must include one concrete artifact or control surface.

### 9.2 Docs Landing

Order:

1. Compact hero.
2. Quickstart command card.
3. First task path.
4. Workflow modes.
5. Command reference rail.
6. Recovery/troubleshooting.

Docs pages can be quieter than homepage but must keep the same typography and borders.

### 9.3 Workflow Page

Use horizontal or vertical control loop.

Core visual:

```txt
task new
plan set
plan approve
start-ready
verify
finish
```

Use command pills and artifact cards.
Avoid generic process diagrams with abstract icons only.

### 9.4 Pricing / Plan Comparison

If AgentPlane receives a pricing page, preserve the original Nova pricing DNA:

- full-bleed grid;
- plan comparison blocks;
- square white cards;
- black primary CTA;
- pill secondary controls;
- mono plan labels;
- blue accent only for recommended/default plan.

Do not invent visual metaphors beyond the existing pricing comparison system.

## 10. Copy and Content Fit

Use concrete nouns:

```txt
repo
task
plan
approval
verification
closure
artifact
workflow
direct
branch_pr
AGENTS.md
.agentplane/
```

Avoid vague AI language:

```txt
magical
autonomous workforce
AI operating system
agentic future
unlock productivity
next-gen intelligence
```

Preferred claim structure:

```txt
Claim: Agent work needs visible state.
Rationale: Chat-style changes are hard to review and close.
Proof: .agentplane/tasks/<task-id>/verify.md
Route: Read the workflow docs.
```

Every major UI block should include:

1. one-line claim;
2. short rationale;
3. one artifact/control surface;
4. one route or action.

## 11. Motion

Motion should keep Nova’s expressive interface feel but remain controlled for AgentPlane.

Allowed:

- color changes;
- text/stroke transitions;
- underline expansion;
- subtle fade/rise;
- grayscale-to-normal artifact previews;
- ScrollTrigger section reveal when it improves pacing.

Durations:

```txt
150ms fast feedback
300ms normal transition
500ms reveal
700ms section choreography
2000ms ambient background only
```

Avoid:

- bounce;
- elastic easing;
- parallax theater;
- fast decorative particle systems;
- motion that delays reading.

Respect `prefers-reduced-motion`.

## 12. Accessibility

Minimum rules:

- primary text must stay near-black on white/surface backgrounds;
- focus states must be visible and may use `#0055FF`;
- chips cannot rely only on color;
- terminal blocks need high contrast;
- gradients cannot carry essential meaning;
- motion must be reducible.

## 13. Implementation Guardrails

### Do

- Use the original Nova palette and typography.
- Keep square premium cards and pill chips.
- Use AgentPlane artifacts as visual proof.
- Use `#0055FF` for action, active state, and key emphasis.
- Use 4px rhythm.
- Keep glass surfaces consistent.
- Keep copy concrete and repo-native.

### Don’t

- Don’t adopt AgentPlane’s existing Geist-based visual direction if preserving Nova is the goal.
- Don’t add neon AI gradients.
- Don’t use decorative bento cards without artifacts.
- Don’t make all cards dark.
- Don’t use rounded SaaS cards where Nova requires square surfaces.
- Don’t add unrelated accent colors.
- Don’t use mock dashboards that do not correspond to real AgentPlane behavior.

## 14. QA Checklist

A generated AgentPlane screen matches this style only if all are true:

### Visual fidelity

- [ ] Palette matches Nova: `#FFFFFF`, `#FAFAF7`, `#111111`, `#444444`, `#E5E5E2`, `#0055FF`.
- [ ] Display type uses Fraunces.
- [ ] Body type uses Inter.
- [ ] Labels/code use JetBrains Mono.
- [ ] Cards are square, not softly rounded.
- [ ] Chips and secondary controls are pill-shaped.
- [ ] Glass shell uses border/blur/gradient edge rather than heavy glow.

### Product fit

- [ ] First screen makes AgentPlane repo-native and auditable.
- [ ] At least one repo artifact or CLI proof appears early.
- [ ] Claims are tied to task state, approvals, verification, closure, or workflow modes.
- [ ] `direct` and `branch_pr` are represented as workflow modes, not decorative tiers.
- [ ] The interface does not imply a hosted AI assistant.

### Conversion fit

- [ ] Primary CTA is obvious and square black.
- [ ] Secondary CTA is pill or link style.
- [ ] Docs/install/quickstart routes are visible.
- [ ] Artifact blocks remain readable.

## 15. Minimal Tailwind Token Map

```ts
export const agentplaneNovaTheme = {
  colors: {
    primary: "#0055FF",
    secondary: "#FFFFFF",
    tertiary: "#640AFF",
    background: "#FFFFFF",
    surface: "#FAFAF7",
    textPrimary: "#111111",
    textSecondary: "#444444",
    textMuted: "#666666",
    border: "#E5E5E2",
    terminal: "#0A0A0A",
  },
  fontFamily: {
    display: ["Fraunces", "serif"],
    body: ["Inter", "sans-serif"],
    mono: ["JetBrains Mono", "monospace"],
  },
  borderRadius: {
    none: "0px",
    md: "0px",
    full: "9999px",
  },
  spacing: {
    base: "4px",
    sm: "1px",
    md: "4px",
    lg: "10px",
    xl: "12px",
    gap: "8px",
    card: "32px",
    section: "32px",
  },
  boxShadow: {
    subtle: "rgba(0,0,0,0.05) 0px 1px 2px 0px",
    deep: "rgba(0,0,0,0.1) 0px 20px 25px -5px, rgba(0,0,0,0.1) 0px 8px 10px -6px",
  },
};
```

## 16. Canonical Prompt for Future Generation

```txt
Create an AgentPlane interface using the Nova Framework visual lineage.

Preserve:
- white full-bleed editorial grid;
- Fraunces display typography;
- Inter body typography;
- JetBrains Mono uppercase labels;
- #0055FF primary accent;
- #FAFAF7 surfaces;
- #111111 text;
- #E5E5E2 borders;
- square cards with 0px radius;
- pill chips with 9999px radius;
- glass shells with gradient border edges;
- subtle shadows and blur.

Represent AgentPlane through real workflow evidence:
repo artifacts, AGENTS.md / CLAUDE.md, .agentplane/, task records, approval state, verification records, finish/closure, direct and branch_pr modes.

Avoid:
generic AI SaaS dashboards, neon futurism, abstract agent illustrations, unrelated accent colors, decorative cards without proof, dark-mode takeover.
```
