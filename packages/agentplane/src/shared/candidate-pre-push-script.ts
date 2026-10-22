/** Render the standalone Git pre-push process. Git, not the CLI parser, supplies its argv/stdin. */
export function candidatePrePushScript(
  executable: string,
  identity: { commit: string; candidate_ref: string; remote_url: string },
  original: string | null,
  receipt: string,
): string {
  return (
    `#!${executable}\n` +
    `const fs = require('node:fs'); const cp = require('node:child_process');\n` +
    `const expected = ${JSON.stringify(identity)}; const original = ${JSON.stringify(original)};\n` +
    `if (process.argv[3] !== expected.remote_url) process.exit(94);\n` +
    `const input = fs.readFileSync(0, 'utf8'); const rows = input.trim().split('\\n').filter(Boolean);\n` +
    `if (rows.length !== 1) process.exit(91);\n` +
    `const fields = rows[0].split(/\\s+/);\n` +
    `if (fields.length !== 4 || fields[1] !== expected.commit || fields[2] !== expected.candidate_ref || !/^0+$/.test(fields[3]) || fields[3].length !== expected.commit.length) process.exit(92);\n` +
    `if (original) { const r = cp.spawnSync(original, process.argv.slice(2), {input, stdio: ['pipe','inherit','inherit'], timeout:120000}); if (r.error || r.status !== 0) process.exit(r.status || 93); }\n` +
    `fs.writeFileSync(${JSON.stringify(receipt)}, JSON.stringify(expected), {flag:'wx', mode:0o600});\n`
  );
}
