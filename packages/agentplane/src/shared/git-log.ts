export function parseGitLogHashSubject(stdout: string): { hash: string; subject: string } {
  const trimmed = stdout.trimEnd();
  const idx = trimmed.indexOf("\0");
  if (idx === -1) {
    throw new Error("Unexpected git log output (missing NUL separator)");
  }

  const hash = trimmed.slice(0, idx).trim();
  const subject = trimmed.slice(idx + 1);
  if (!hash) throw new Error("Unexpected git log output (missing hash)");
  if (!subject) throw new Error("Unexpected git log output (missing subject)");
  return { hash, subject };
}
