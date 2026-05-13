import {
  collectLifecycleParityFindings,
  formatLifecycleParityFindings,
} from "../../packages/agentplane/src/workflow-lifecycle/parity-check.js";

const findings = await collectLifecycleParityFindings(process.cwd());
const message = formatLifecycleParityFindings(findings);

if (findings.length === 0) {
  process.stdout.write(`${message}\n`);
} else {
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}
