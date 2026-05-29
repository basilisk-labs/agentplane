const HOSTED_COMMAND_LINE_MAX = 100;
const HOSTED_COMMAND_BULLET_MIN = 120;
const VERIFICATION_SECTION = "## Verification";
const SHELL_COMMAND_PATTERN =
  /^(?:[A-Z_][A-Z0-9_]*=\S+\s+)*(?:\.\/|ap\b|agentplane\b|bash\b|bun\b|eslint\b|gh\b|git\b|node\b|npm\b|npx\b|pnpm\b|prettier\b|sh\b|tsc\b|vitest\b|yarn\b)/u;

function stripCommandLead(value: string): string {
  return value
    .trim()
    .replace(/^`(.+)`$/u, "$1")
    .replace(/^(?:check|command|execute|executed|run|running):\s*/iu, "")
    .replace(/^run\s+/iu, "")
    .trim();
}

function isLikelyShellCommand(value: string): boolean {
  return SHELL_COMMAND_PATTERN.test(stripCommandLead(value));
}

function wrapWords(value: string, maxChars: number, continuationIndent = ""): string[] {
  const clean = value.trim().replaceAll(/\s+/g, " ");
  if (clean.length <= maxChars) return [clean];

  const lines: string[] = [];
  let current = "";

  for (const token of clean.split(" ")) {
    const next = current ? `${current} ${token}` : token;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = `${continuationIndent}${token}`;
      continue;
    }
    current = next;
  }

  if (current) lines.push(current);
  return lines;
}

function wrapHostedShellCommand(command: string): string[] {
  const clean = stripCommandLead(command).replaceAll(/\s+/g, " ");
  if (clean.length <= HOSTED_COMMAND_LINE_MAX) return [clean];

  return wrapWords(clean, HOSTED_COMMAND_LINE_MAX, "  ").map((line, index, lines) =>
    index < lines.length - 1 ? `${line} \\` : line,
  );
}

function renderHostedLongBullet(line: string): string[] | null {
  if (line.length < HOSTED_COMMAND_BULLET_MIN) return null;

  const match = /^(?<indent>\s*)-\s+(?:(?<label>[A-Za-z][A-Za-z ]{0,24}):\s*)?(?<body>.+)$/u.exec(
    line,
  );
  const body = match?.groups?.body?.trim() ?? "";
  if (!body) return null;

  const indent = match?.groups?.indent ?? "";
  const shellCommand = isLikelyShellCommand(body);
  const label = match?.groups?.label?.trim() ?? (shellCommand ? "Command" : "Note");
  return [
    `${indent}- ${label}:`,
    "",
    shellCommand ? "```bash" : "```text",
    ...(shellCommand ? wrapHostedShellCommand(body) : wrapWords(body, HOSTED_COMMAND_LINE_MAX)),
    "```",
  ];
}

export function formatHostedVerificationMarkdown(markdown: string): string {
  const lines = markdown.split("\n");
  const formatted: string[] = [];
  let inVerification = false;
  let inFence = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      formatted.push(line);
      continue;
    }

    if (!inFence && line.startsWith("## ")) {
      inVerification = line === VERIFICATION_SECTION;
      formatted.push(line);
      continue;
    }

    if (inVerification && !inFence) {
      const hostedBullet = renderHostedLongBullet(line);
      if (hostedBullet) {
        formatted.push(...hostedBullet);
        continue;
      }
    }

    formatted.push(line);
  }

  return formatted.join("\n");
}
